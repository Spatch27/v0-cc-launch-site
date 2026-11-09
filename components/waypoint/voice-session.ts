import { duplexOpen, leakFromPlayback, readMicProcessing, shouldSendMic, type MicProcessing } from "@/lib/voice/aec"
import {
  floatToPcm16Base64,
  pcm16Base64ToFloat32,
  resampleLinear,
  rms,
  TARGET_RATE,
} from "@/lib/voice/audio"
import { attachSpeakerReference, type SpeakerReference } from "@/lib/voice/echo-path"
import { buildSessionUpdate, REALTIME_URL } from "@/lib/voice/instructions"
import { createVoiceLogger, createVoiceSessionId, type VoiceLogger } from "@/lib/voice/logger"
import { parseResearch, type IdentityFields, type WaypointResearch } from "@/lib/waypoint"

export type VoicePhase = "connecting" | "listening" | "thinking" | "speaking"

export type CaptionLine = {
  id: string
  role: "user" | "assistant"
  text: string
}

export type PersistResult = { ok: true; already?: boolean } | { ok: false; error: string; field?: string }

export type VoiceHandlers = {
  onPhase: (phase: VoicePhase) => void
  onCaptions: (lines: CaptionLine[]) => void
  onSpokenIdentity: (spoken: Record<string, unknown>) => IdentityFields
  onConsent: (yes: boolean) => void
  getIdentity: () => IdentityFields
  onResearch: (research: WaypointResearch) => void
  persist: (research: WaypointResearch, transcript: string) => Promise<PersistResult>
  onError: (message: string) => void
  onLiveChange: (live: boolean) => void
  onEchoCancellation: (available: boolean) => void
}

type ToolCall = { name: string; callId: string; args: Record<string, unknown> }

const MAX_PENDING_CHUNKS = 100

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

function clientSecretProtocol(token: string): string {
  const prefix = "xai-client-secret."
  const value = token.startsWith(prefix) ? token.slice(prefix.length) : token
  return `${prefix}${value}`
}

function publicVoiceError(value: unknown, fallback: string): string {
  if (typeof value !== "string" || !value.trim()) return fallback
  if (/bearer\s+\S+|xai-realtime|sk-[a-z0-9]/i.test(value)) return fallback
  return value.slice(0, 300)
}

class PcmPlayer {
  private nextTime = 0
  private sources: AudioBufferSourceNode[] = []
  private leadArmed = false
  underruns = 0
  drainMax = 0
  private drainCallback: (() => void) | null = null

  constructor(
    private readonly ctx: AudioContext,
    private readonly output: AudioNode,
  ) {}

  resetTurn() {
    this.leadArmed = false
    this.underruns = 0
    this.drainMax = 0
  }

  queuedMs(): number {
    return Math.max(0, (this.nextTime - this.ctx.currentTime) * 1000)
  }

  isPlaying(): boolean {
    return this.sources.length > 0
  }

  enqueue(samples: Float32Array) {
    if (!samples.length || this.ctx.state === "closed") return
    const buffer = this.ctx.createBuffer(1, samples.length, TARGET_RATE)
    buffer.copyToChannel(samples, 0)
    const source = this.ctx.createBufferSource()
    source.buffer = buffer
    source.connect(this.output)
    const now = this.ctx.currentTime
    let startAt: number
    if (!this.leadArmed) {
      startAt = now + 0.15
      this.leadArmed = true
    } else if (this.nextTime < now) {
      this.underruns += 1
      this.drainMax = Math.max(this.drainMax, (now - this.nextTime) * 1000)
      startAt = now + 0.02
    } else {
      startAt = this.nextTime
    }
    source.start(startAt)
    this.nextTime = startAt + buffer.duration
    this.sources.push(source)
    source.onended = () => {
      this.sources = this.sources.filter((item) => item !== source)
      if (this.sources.length === 0) this.fireDrain()
    }
  }

  whenDrained(callback: () => void) {
    if (this.sources.length === 0 || this.queuedMs() <= 40) {
      callback()
      return
    }
    this.drainCallback = callback
  }

  halt(): number {
    const dropped = this.queuedMs()
    for (const source of this.sources) {
      try {
        source.onended = null
        source.stop()
      } catch {
        // already stopped
      }
    }
    this.sources = []
    this.nextTime = 0
    this.leadArmed = false
    this.drainCallback = null
    return dropped
  }

  private fireDrain() {
    const callback = this.drainCallback
    this.drainCallback = null
    callback?.()
  }
}

export class WaypointVoiceSession {
  readonly sessionId = createVoiceSessionId()
  private readonly handlers: () => VoiceHandlers
  private logger: VoiceLogger | null = null
  private ctx: AudioContext | null = null
  private player: PcmPlayer | null = null
  private ws: WebSocket | null = null
  private stream: MediaStream | null = null
  private micTrack: MediaStreamTrack | null = null
  private stopped = false
  private saved = false
  private closeBy = "client"
  private phase: VoicePhase = "connecting"
  private greeted = false
  private greetTimer: ReturnType<typeof setTimeout> | null = null
  private thanksTimer: ReturnType<typeof setTimeout> | null = null
  private thanksPending = false
  private responseOpen = false
  private pendingAudio: string[] = []
  private pendingTools: ToolCall[] = []
  private flushing = false
  private captions: CaptionLine[] = []
  private captionFrame: number | null = null
  private speechStoppedAt = 0
  private createdAt = 0
  private turn = emptyTurn()
  private audioIn = emptyAudioIn()
  private gatedInWindow = 0
  private outputEl: HTMLAudioElement | null = null
  private speaker: SpeakerReference | null = null
  private micProcessing: MicProcessing | null = null
  private playbackPath: "webrtc" | "direct" | "pending" = "pending"
  private leak = false
  private quietRms = 0.004
  private playSum = 0
  private playPeak = 0
  private playWindows = 0

  constructor(handlers: () => VoiceHandlers) {
    this.handlers = handlers
  }

  getTranscript(): string {
    return this.captions
      .filter((line) => line.text.trim())
      .map((line) => `${line.role === "user" ? "Visitor" : "Interviewer"}: ${line.text.trim()}`)
      .join("\n")
  }

  async start(ctx: AudioContext) {
    this.ctx = ctx
    this.logger = createVoiceLogger(this.sessionId)
    this.logger.log("start", { url: REALTIME_URL, target_rate: TARGET_RATE })
    this.armPlayback(ctx)
    this.handlers().onLiveChange(true)
    this.setPhase("connecting")

    const tokenStarted = performance.now()
    const tokenPromise = this.fetchToken(tokenStarted)
    const micPromise = this.openMic(ctx).catch((err: unknown) => {
      if (!this.stopped) this.fail(micMessage(err), "mic", err)
    })
    const token = await tokenPromise
    if (this.stopped || !token) return
    await micPromise
    if (!this.stopped) this.openSocket(token)
  }

  notifySaved() {
    this.saved = true
    this.armThanksStop()
    this.send({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: "The visitor checked the details on the page and the interview is saved. Thank them briefly. The video is on its way. Do not ask more questions.",
          },
        ],
      },
    })
    this.send({ type: "response.create" })
  }

  stop(by = "client") {
    if (this.stopped) return
    this.stopped = true
    this.closeBy = by
    if (this.greetTimer) clearTimeout(this.greetTimer)
    if (this.thanksTimer) clearTimeout(this.thanksTimer)
    if (this.captionFrame != null) cancelAnimationFrame(this.captionFrame)
    const dropped = this.player?.halt() ?? 0
    if (dropped > 20) this.logger?.log("play.stop", { reason: by, dropped_ms: Math.round(dropped) })
    this.logger?.log("stop", { by, phase: this.phase })
    this.stream?.getTracks().forEach((track) => track.stop())
    this.speaker?.close()
    this.speaker = null
    if (this.outputEl) {
      this.outputEl.pause()
      this.outputEl.srcObject = null
      this.outputEl.remove()
      this.outputEl = null
    }
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      this.ws.close()
    }
    void this.ctx?.close().catch(() => undefined)
    this.logger?.close()
    this.handlers().onLiveChange(false)
  }

  private async fetchToken(started: number): Promise<string | null> {
    try {
      const response = await fetch("/api/voice/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: this.sessionId }),
      })
      const data: unknown = await response.json().catch(() => null)
      const record = asRecord(data)
      if (!response.ok || !record || typeof record.token !== "string") {
        const message = publicVoiceError(record?.error, "The voice interview didn’t start. Please try again.")
        this.fail(message, "token", new Error(message), performance.now() - started)
        return null
      }
      this.logger?.log("token.ok", { ms: Math.round(performance.now() - started) })
      return record.token
    } catch (err) {
      this.fail("The voice interview didn’t start. Please try again.", "token", err, performance.now() - started)
      return null
    }
  }

  private async openMic(ctx: AudioContext) {
    const started = performance.now()
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: { ideal: 1 },
        echoCancellation: { ideal: true },
        noiseSuppression: { ideal: true },
        autoGainControl: { ideal: true },
      },
      video: false,
    })
    if (this.stopped) {
      stream.getTracks().forEach((track) => track.stop())
      return
    }
    this.stream = stream
    const track = stream.getAudioTracks()[0]
    this.micTrack = track ?? null
    const settings = track?.getSettings() ?? {}
    this.micProcessing = readMicProcessing(settings)
    this.logger?.log("mic.ok", {
      ms: Math.round(performance.now() - started),
      label: track?.label ?? "",
      settings,
      echoCancellation: this.micProcessing.echoCancellation,
      noiseSuppression: this.micProcessing.noiseSuppression,
      autoGainControl: this.micProcessing.autoGainControl,
    })
    this.publishEchoMode()
    await ctx.audioWorklet.addModule("/waypoint-pcm-capture.js")
    if (this.stopped) return
    const source = ctx.createMediaStreamSource(stream)
    const node = new AudioWorkletNode(ctx, "waypoint-pcm-capture")
    node.port.onmessage = (event: MessageEvent<Float32Array>) => {
      if (event.data instanceof Float32Array) this.onMicChunk(event.data)
    }
    const mute = ctx.createGain()
    mute.gain.value = 0
    source.connect(node)
    node.connect(mute)
    mute.connect(ctx.destination)
    this.logger?.log("env", {
      ua: navigator.userAgent,
      mic_rate: ctx.sampleRate,
      mic_state: track?.readyState ?? "none",
      play_rate: ctx.sampleRate,
      play_state: ctx.state,
      capture_frames: Math.round(ctx.sampleRate * 0.1),
      target_rate: TARGET_RATE,
    })
  }

  private onMicChunk(samples: Float32Array) {
    if (this.stopped || !this.ctx) return
    const level = rms(samples)
    const playing = this.player?.isPlaying() ?? false
    this.observeLevel(level, playing)
    const gated = !shouldSendMic(this.isDuplex(), playing)
    const encoded = floatToPcm16Base64(resampleLinear(samples, this.ctx.sampleRate, TARGET_RATE))
    this.noteAudioIn(encoded.bytes, level, gated)
    if (gated) return
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.pendingAudio.push(encoded.base64)
      if (this.pendingAudio.length > MAX_PENDING_CHUNKS) this.pendingAudio.shift()
      return
    }
    this.ws.send(JSON.stringify({ type: "input_audio_buffer.append", audio: encoded.base64 }))
  }

  private noteAudioIn(bytes: number, level: number, gated: boolean) {
    const now = performance.now()
    if (!this.audioIn.started) this.audioIn.started = now
    this.audioIn.chunks += 1
    this.audioIn.bytes += bytes
    this.audioIn.rmsMax = Math.max(this.audioIn.rmsMax, level)
    this.audioIn.rmsSum += level
    if (gated) this.gatedInWindow += 1
    if (now - this.audioIn.started < 2000) return
    const chunks = this.audioIn.chunks
    this.logger?.log("audio.in", {
      chunks,
      bytes: this.audioIn.bytes,
      gated: this.gatedInWindow,
      rms_max: Number(this.audioIn.rmsMax.toFixed(4)),
      rms_avg: Number((this.audioIn.rmsSum / Math.max(1, chunks)).toFixed(4)),
      pending: this.pendingAudio.length,
      mic_state: this.micTrack?.readyState ?? "none",
      phase: this.phase,
    })
    this.audioIn = emptyAudioIn()
    this.gatedInWindow = 0
    this.audioIn.started = now
  }

  private openSocket(token: string) {
    this.logger?.log("ws.connecting", {})
    const openedAt = performance.now()
    const ws = new WebSocket(REALTIME_URL, [clientSecretProtocol(token)])
    this.ws = ws
    ws.addEventListener("open", () => {
      this.logger?.log("ws.open", { ms: Math.round(performance.now() - openedAt) })
      this.send(buildSessionUpdate())
      this.flushPendingAudio()
      this.greetTimer = setTimeout(() => this.greet(), 1200)
    })
    ws.addEventListener("message", (event) => {
      if (typeof event.data !== "string") return
      this.onMessage(event.data)
    })
    ws.addEventListener("error", () => {
      this.logger?.log("ws.error", {})
    })
    ws.addEventListener("close", (event) => {
      this.logger?.log("ws.close", {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
        by: this.closeBy,
      })
      if (!this.stopped && !this.saved) {
        this.handlers().onError(`The conversation disconnected. Start again if you’d like to continue. (voice session ${this.sessionId})`)
      }
      this.stop(this.closeBy)
    })
  }

  private flushPendingAudio() {
    const chunks = this.pendingAudio.splice(0)
    this.logger?.log("audio.flush", { chunks: chunks.length })
    for (const audio of chunks) {
      this.ws?.send(JSON.stringify({ type: "input_audio_buffer.append", audio }))
    }
  }

  private greet() {
    if (this.greeted || this.stopped) return
    this.greeted = true
    if (this.greetTimer) clearTimeout(this.greetTimer)
    this.send({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "The visitor just started the conversation. Begin at the opening." }],
      },
    })
    this.send({ type: "response.create" })
  }

  private send(event: Record<string, unknown>) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return
    this.ws.send(JSON.stringify(event))
    if (event.type !== "input_audio_buffer.append") this.logger?.client(event)
  }

  private onMessage(raw: string) {
    let parsed: unknown
    try {
      parsed = JSON.parse(raw)
    } catch {
      return
    }
    const event = asRecord(parsed)
    if (!event || typeof event.type !== "string") return
    const type = event.type

    if (type === "response.output_audio.delta" || type === "response.audio.delta") {
      this.onAudioDelta(event)
      return
    }

    this.logger?.server(event, { phase: this.phase })

    if (type === "session.updated") this.greet()
    else if (type === "input_audio_buffer.speech_started") this.onSpeechStarted()
    else if (type === "input_audio_buffer.speech_stopped") this.onSpeechStopped()
    else if (type === "input_audio_buffer.committed") this.upsertCaption(stringField(event, "item_id") || "user-turn", "user", "", "replace")
    else if (type === "conversation.item.input_audio_transcription.updated" || type === "conversation.item.input_audio_transcription.completed") {
      const text = cumulativeTranscript(event)
      if (text != null) this.upsertCaption(stringField(event, "item_id") || "user-turn", "user", text, "replace")
    } else if (type === "response.created") this.onResponseCreated(stringField(event, "response_id") || "response")
    else if (type === "response.output_audio_transcript.delta") {
      const delta = stringField(event, "delta")
      if (delta) this.upsertCaption(this.turn.responseId || "assistant", "assistant", delta, "append")
    } else if (type === "response.output_audio_transcript.done") {
      const text = stringField(event, "transcript")
      if (text) this.upsertCaption(this.turn.responseId || "assistant", "assistant", text, "replace")
    } else if (type === "response.function_call_arguments.done") this.queueTool(event)
    else if (type === "response.done") this.onResponseDone(event)
    else if (type === "error") {
      const nested = asRecord(event.error)
      const message = publicVoiceError(nested?.message ?? event.message, "The voice interview hit a problem. Please try again.")
      this.handlers().onError(`${message} (voice session ${this.sessionId})`)
    }
  }

  private onAudioDelta(event: Record<string, unknown>) {
    const delta = stringField(event, "delta") || stringField(event, "audio")
    if (!delta || !this.player || !this.ctx) return
    const now = performance.now()
    if (this.turn.deltas === 0) {
      this.logger?.log("audio.out.first", {
        response_id: this.turn.responseId,
        bytes: delta.length,
        since_response_created_ms: this.createdAt ? Math.round(now - this.createdAt) : null,
        since_speech_stopped_ms: this.speechStoppedAt ? Math.round(now - this.speechStoppedAt) : null,
        play_state: this.ctx.state,
      })
      this.setPhase("speaking")
    } else if (this.turn.lastDeltaAt) {
      this.turn.maxGapMs = Math.max(this.turn.maxGapMs, now - this.turn.lastDeltaAt)
    }
    const samples = pcm16Base64ToFloat32(delta)
    this.turn.deltas += 1
    this.turn.bytes += delta.length
    this.turn.samples += samples.length
    this.turn.lastDeltaAt = now
    this.player.enqueue(samples)
  }

  private onSpeechStarted() {
    const playing = (this.player?.isPlaying() ?? false) || this.phase === "speaking"
    if (playing && !this.isDuplex()) {
      this.send({ type: "input_audio_buffer.clear" })
      this.logger?.log("aec.gate", { reason: "speech-while-gated" })
      return
    }
    const dropped = this.player?.halt() ?? 0
    this.logger?.log("play.stop", { reason: "barge-in", dropped_ms: Math.round(dropped) })
    this.setPhase("listening")
    if (!this.responseOpen) void this.flushTools()
  }

  private onSpeechStopped() {
    this.speechStoppedAt = performance.now()
    this.setPhase("thinking")
  }

  private onResponseCreated(responseId: string) {
    const dropped = this.player?.halt() ?? 0
    if (dropped > 20) this.logger?.log("play.stop", { reason: "next-response", dropped_ms: Math.round(dropped) })
    this.player?.resetTurn()
    this.responseOpen = true
    this.createdAt = performance.now()
    this.turn = emptyTurn()
    this.turn.responseId = responseId
    this.setPhase("thinking")
  }

  private onResponseDone(event: Record<string, unknown>) {
    this.responseOpen = false
    const response = asRecord(event.response)
    const status = stringField(response ?? {}, "status") || stringField(event, "status") || "completed"
    this.logger?.log("audio.out", {
      response_id: this.turn.responseId,
      status,
      deltas: this.turn.deltas,
      bytes: this.turn.bytes,
      audio_ms: Math.round((this.turn.samples / TARGET_RATE) * 1000),
      wall_ms: this.createdAt ? Math.round(performance.now() - this.createdAt) : 0,
      max_gap_ms: Math.round(this.turn.maxGapMs),
      queued_ms: Math.round(this.player?.queuedMs() ?? 0),
      underruns: this.player?.underruns ?? 0,
      drain_ms_max: Math.round(this.player?.drainMax ?? 0),
    })
    const afterPlayback = () => {
      if (this.phase === "speaking" && !this.responseOpen) this.setPhase("listening")
      if (this.thanksPending) {
        this.stop("saved")
        return
      }
      void this.flushTools()
    }
    if ((this.player?.queuedMs() ?? 0) > 40) this.player?.whenDrained(afterPlayback)
    else afterPlayback()
  }

  private queueTool(event: Record<string, unknown>) {
    const name = stringField(event, "name")
    const callId = stringField(event, "call_id")
    if (!name || !callId) return
    let args: Record<string, unknown> = {}
    const raw = event.arguments
    if (typeof raw === "string") {
      try {
        args = asRecord(JSON.parse(raw)) ?? {}
      } catch {
        args = {}
      }
    }
    this.pendingTools.push({ name, callId, args })
    if (!this.responseOpen && (this.player?.queuedMs() ?? 0) <= 40) void this.flushTools()
  }

  private async flushTools() {
    if (this.flushing || this.responseOpen || !this.pendingTools.length || this.stopped) return
    this.flushing = true
    const calls = this.pendingTools.splice(0).sort((a, b) => toolOrder(a.name) - toolOrder(b.name))
    try {
      for (const call of calls) {
        const output = await this.runTool(call)
        this.send({
          type: "conversation.item.create",
          item: { type: "function_call_output", call_id: call.callId, output: JSON.stringify(output) },
        })
      }
      if (!this.stopped) this.send({ type: "response.create" })
    } finally {
      this.flushing = false
      if (this.pendingTools.length) void this.flushTools()
    }
  }

  private async runTool(call: ToolCall): Promise<Record<string, unknown>> {
    if (call.name === "note_consent") {
      const yes = call.args.yes === true
      this.handlers().onConsent(yes)
      return { ok: true, yes }
    }
    if (call.name === "note_identity") {
      const onPage = this.handlers().onSpokenIdentity(call.args)
      return { ok: true, on_page: onPage }
    }
    if (call.name === "submit_interview") {
      const research = parseResearch(call.args)
      if (!research.ok) return { ok: false, saved: false, error: research.error, on_page: this.handlers().getIdentity() }
      this.handlers().onResearch(research.value)
      const result = await this.handlers().persist(research.value, this.getTranscript())
      if (!result.ok) return { ok: false, saved: false, error: result.error, on_page: this.handlers().getIdentity() }
      if (!result.already) this.armThanksStop()
      this.saved = true
      return { ok: true, saved: true, already: Boolean(result.already), on_page: this.handlers().getIdentity() }
    }
    return { ok: false, error: "That action is not available." }
  }

  private armThanksStop() {
    this.thanksPending = true
    if (this.thanksTimer) clearTimeout(this.thanksTimer)
    this.thanksTimer = setTimeout(() => this.stop("saved"), 20_000)
  }

  private upsertCaption(id: string, role: CaptionLine["role"], text: string, mode: "replace" | "append") {
    const index = this.captions.findIndex((line) => line.id === id)
    if (index === -1) this.captions.push({ id, role, text })
    else if (mode === "append") this.captions[index] = { ...this.captions[index], text: this.captions[index].text + text }
    else this.captions[index] = { ...this.captions[index], text }
    if (this.captionFrame != null) return
    this.captionFrame = requestAnimationFrame(() => {
      this.captionFrame = null
      this.handlers().onCaptions(this.captions.map((line) => ({ ...line })))
    })
  }

  private setPhase(phase: VoicePhase) {
    if (this.phase === phase) return
    this.phase = phase
    this.logger?.log("phase", { phase })
    this.handlers().onPhase(phase)
  }

  private armPlayback(ctx: AudioContext) {
    const bus = ctx.createGain()
    bus.gain.value = 1
    const streamDest = ctx.createMediaStreamDestination()
    bus.connect(streamDest)
    this.player = new PcmPlayer(ctx, bus)
    const audio = document.createElement("audio")
    audio.autoplay = true
    audio.setAttribute("playsinline", "")
    audio.setAttribute("data-waypoint-playback", "")
    audio.style.cssText = "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none"
    document.body.appendChild(audio)
    // Unlock the element inside the click, before any await. srcObject replaces this once the loopback is up.
    audio.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="
    void audio.play().catch(() => undefined)
    this.outputEl = audio
    const track = streamDest.stream.getAudioTracks()[0]
    if (!track) {
      this.useDirectPlayback(ctx, bus)
      return
    }
    void attachSpeakerReference(track, audio)
      .then((reference) => {
        if (this.stopped) {
          reference.close()
          return
        }
        this.speaker = reference
        this.playbackPath = "webrtc"
        this.logger?.log("aec.path", { playback: "webrtc" })
        this.publishEchoMode()
      })
      .catch((err: unknown) => {
        this.logger?.error("aec", err)
        this.useDirectPlayback(ctx, bus)
      })
  }

  private useDirectPlayback(ctx: AudioContext, bus: GainNode) {
    if (this.playbackPath === "direct") return
    bus.connect(ctx.destination)
    this.playbackPath = "direct"
    this.logger?.log("aec.path", { playback: "direct" })
    this.publishEchoMode()
  }

  private isDuplex(): boolean {
    return duplexOpen({
      echoCancellation: this.micProcessing?.echoCancellation === true,
      playback: this.playbackPath,
      leak: this.leak,
    })
  }

  private publishEchoMode() {
    if (!this.micProcessing || this.playbackPath === "pending") return
    const available = this.micProcessing.echoCancellation && this.playbackPath === "webrtc"
    this.logger?.log("aec.mode", {
      echoCancellation: this.micProcessing.echoCancellation,
      noiseSuppression: this.micProcessing.noiseSuppression,
      autoGainControl: this.micProcessing.autoGainControl,
      playback: this.playbackPath,
      duplex: this.isDuplex(),
    })
    this.handlers().onEchoCancellation(available)
  }

  private observeLevel(level: number, playing: boolean) {
    if (!playing) {
      this.playSum = 0
      this.playPeak = 0
      this.playWindows = 0
      if (this.phase !== "speaking") this.quietRms = this.quietRms * 0.92 + level * 0.08
      return
    }
    this.playSum += level
    this.playPeak = Math.max(this.playPeak, level)
    this.playWindows += 1
    if (this.leak || !this.isDuplex()) return
    const mean = this.playSum / this.playWindows
    if (
      leakFromPlayback({
        quietRms: this.quietRms,
        meanPlaybackRms: mean,
        peakPlaybackRms: this.playPeak,
        windows: this.playWindows,
      })
    ) {
      this.leak = true
      this.logger?.log("aec.fallback", {
        reason: "residual-echo",
        quiet_rms: Number(this.quietRms.toFixed(4)),
        playback_rms: Number(mean.toFixed(4)),
        peak_rms: Number(this.playPeak.toFixed(4)),
      })
      this.send({ type: "input_audio_buffer.clear" })
    }
  }

  private fail(message: string, where: string, err: unknown, ms?: number) {
    this.logger?.error(where, err, ms == null ? {} : { ms: Math.round(ms) })
    this.handlers().onError(`${message} (voice session ${this.sessionId})`)
    this.stop("error")
  }
}

function emptyTurn() {
  return { responseId: "", deltas: 0, bytes: 0, samples: 0, lastDeltaAt: 0, maxGapMs: 0 }
}

function emptyAudioIn() {
  return { chunks: 0, bytes: 0, rmsMax: 0, rmsSum: 0, started: 0 }
}

function stringField(event: Record<string, unknown>, key: string): string {
  const value = event[key]
  return typeof value === "string" ? value : ""
}

function cumulativeTranscript(event: Record<string, unknown>): string | null {
  if (typeof event.transcript === "string") return event.transcript
  if (typeof event.text === "string") return event.text
  if (typeof event.delta === "string") return event.delta
  return null
}

function toolOrder(name: string): number {
  if (name === "note_consent") return 0
  if (name === "note_identity") return 1
  if (name === "submit_interview") return 2
  return 3
}

function micMessage(err: unknown): string {
  const name = err instanceof DOMException || err instanceof Error ? err.name : ""
  if (name === "NotAllowedError" || name === "SecurityError") {
    return "The microphone is blocked. Allow it in the browser and start again."
  }
  if (name === "NotFoundError" || name === "OverconstrainedError") {
    return "No microphone was found. Check the device and start again."
  }
  return "The microphone didn’t start. Check the browser permission and try again."
}

export function createVoiceContext(): AudioContext {
  try {
    return new AudioContext({ sampleRate: TARGET_RATE })
  } catch {
    return new AudioContext()
  }
}
