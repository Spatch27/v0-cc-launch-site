import { rm } from "fs/promises"
import { GAP_AREAS, type GapScan } from "../lib/gap"
import { duplexOpen, leakFromPlayback, readMicProcessing, shouldSendMic } from "../lib/voice/aec"
import { buildSessionUpdate, INTERVIEW_VOICE } from "../lib/voice/instructions"
import { resampleLinear } from "../lib/voice/audio"
import { redactEvent } from "../lib/voice/redact"
import { VOICE_LOG_DIR } from "../lib/voice/sink"
import {
  applySpokenIdentity,
  buildWaypointBody,
  EMPTY_IDENTITY,
  formatWaypointEmailHtml,
  parseResearch,
  type WaypointResearch,
} from "../lib/waypoint"
import { POST as postGap } from "../app/api/gap/route"
import { POST as postWaypoint } from "../app/api/waypoint/route"
import { POST as postLog } from "../app/api/voice/log/route"
import { POST as postSession } from "../app/api/voice/session/route"

function assert(condition: unknown, message: string) {
  if (!condition) throw new Error(message)
}

function research(): WaypointResearch {
  const area_notes = Object.fromEntries(
    GAP_AREAS.map((area) => [area.key, { success: `${area.key} feels uneven`, opportunity: `${area.key} could be simpler` }]),
  ) as WaypointResearch["area_notes"]
  return {
    tenure: "Three years",
    function_now_and_next: "We ship, but we cannot prove it. Next we need a function the board believes.",
    area_notes,
    pressing_project: {
      what: "The always-on relaunch",
      difference: "It would free the team from rebuilding the same deck",
      success: "One brief, one owner, a date that holds",
      progress_by: "Before the March board",
    },
    anything_else: null,
  }
}

async function main() {
  const session = buildSessionUpdate()
  assert(INTERVIEW_VOICE === "leo", "interview voice id is leo")
  assert(session.session.voice === "leo", "session.update uses leo")
  assert(!JSON.stringify(session.session).includes('"eve"'), "session config does not set eve")
  assert(session.session.audio.input.transcription.model === "grok-transcribe", "user transcription is enabled")
  assert(session.session.turn_detection.type === "server_vad", "server VAD is on")
  assert(session.session.instructions.includes("Do not ask for a number"), "Leo is told not to score the seven areas")
  assert(!session.session.instructions.includes("nowhere near"), "Leo is not given a 1 to 7 scale")
  assert(session.session.instructions.includes("That is the only details check"), "personal details are checked once, at the start")
  assert(!session.session.instructions.includes("once more at the end"), "Leo does not re-check personal details at the close")
  assert(!JSON.stringify(session.session.tools).includes('"scan"'), "the save tool has no score payload")
  assert(!JSON.stringify(session.session.tools).includes('"minimum"'), "the save tool has no numeric score")
  for (const term of session.session.audio.input.transcription.keyterms) {
    assert(term.length <= 50, `keyterm too long: ${term}`)
  }

  const heard = applySpokenIdentity(
    { ...EMPTY_IDENTITY, name: "Smith", email: "old@example.com", role: "CMO", company: "Acme" },
    { name: "Smyth", email: "right@example.com" },
    null,
  )
  assert(heard.name === "Smyth", "a spoken spelling replaces the name on the page")
  assert(heard.email === "right@example.com", "a spoken spelling replaces the email on the page")
  const typing = applySpokenIdentity(heard, { email: "wrong@example.com" }, "email")
  assert(typing.email === "right@example.com", "a field being typed is not overwritten")

  const parsed = parseResearch({ ...research(), email: "guess@example.com", name: "Smith" })
  assert(parsed.ok && !("email" in parsed.value) && !("name" in parsed.value), "research notes do not keep an identity guess")

  const body = buildWaypointBody({
    identity: { name: "Smyth", email: "right@example.com", role: "CMO", company: "Northwind" },
    consent: true,
    research: research(),
    transcript: "Visitor: the recording guessed Smith and guess@example.com",
  })
  assert(body.ok, "checked details build a submission")
  if (!body.ok) return
  assert(body.body.person.name === "Smyth", "submission keeps the corrected name")
  assert(body.body.person.email === "right@example.com", "submission keeps the corrected email")
  const html = formatWaypointEmailHtml(body.body)
  assert(html.includes("Name: Smyth"), "email leads with the corrected name")
  assert(html.includes("Email: right@example.com"), "email leads with the corrected address")
  assert(html.includes("these fields win"), "email tells the team to prefer the checked details")
  assert(html.indexOf("Name: Smyth") < html.indexOf("guessed Smith"), "the checked name comes before the transcript guess")
  assert(!html.includes("already there"), "the email does not include a 1 to 7 scale")
  assert(!("scan" in body.body), "the saved interview has no score object")
  const withScores = parseResearch({ ...research(), scan: { funding: 7 } })
  assert(withScores.ok && !("scan" in withScores.value), "a numeric score sent by the model is dropped")

  const badEmail = buildWaypointBody({
    identity: { name: "Smyth", email: "not-an-email", role: "CMO", company: "Northwind" },
    consent: true,
    research: research(),
    transcript: "Visitor: hello",
  })
  assert(!badEmail.ok && badEmail.field === "email", "a bad email is rejected")

  delete process.env.RESEND_API_KEY
  const saved = await postWaypoint(
    new Request("http://local.test/api/waypoint", { method: "POST", body: JSON.stringify(body.body) }),
  )
  const savedJson = await saved.json()
  assert(saved.status === 200 && savedJson.success === true, `waypoint submission should succeed, got ${saved.status}`)

  const rejected = await postWaypoint(
    new Request("http://local.test/api/waypoint", {
      method: "POST",
      body: JSON.stringify({ ...body.body, person: { ...body.body.person, email: "nope" } }),
    }),
  )
  assert(rejected.status === 400, "the waypoint route rejects an invalid email")

  const gapScan = Object.fromEntries(GAP_AREAS.map((area) => [area.key, 4])) as GapScan
  gapScan.funding = 7
  const gap = await postGap(
    new Request("http://local.test/api/gap", {
      method: "POST",
      body: JSON.stringify({
        person: { name: "Ada Lovelace", email: "ada@example.com" },
        must_achieve: "Ship faster",
        scan: gapScan,
        most_important: "ai",
        shows_the_gap: "Q4 launch",
      }),
    }),
  )
  const gapJson = await gap.json()
  assert(gap.status === 200 && gapJson.success === true, "the written gap submission still succeeds")

  const resampled = resampleLinear(new Float32Array(480), 48000, 24000)
  assert(resampled.length === 240, `resample length should be 240, got ${resampled.length}`)
  const same = resampleLinear(new Float32Array([0.25, -0.5]), 24000, 24000)
  assert(same.length === 2 && same[1] === -0.5, "matching rates keep the samples")

  const applied = readMicProcessing({ echoCancellation: true, noiseSuppression: true, autoGainControl: true })
  assert(applied.echoCancellation && applied.noiseSuppression && applied.autoGainControl, "applied processing is read from settings")
  assert(!readMicProcessing({}).echoCancellation, "a missing echoCancellation setting is not treated as on")
  assert(duplexOpen({ echoCancellation: true, playback: "webrtc", leak: false }), "speakerphone stays full duplex when cancellation is on the WebRTC path")
  assert(!duplexOpen({ echoCancellation: true, playback: "direct", leak: false }), "direct speaker playback is not full duplex")
  assert(!duplexOpen({ echoCancellation: false, playback: "webrtc", leak: false }), "WebRTC playback without cancellation is not full duplex")
  assert(shouldSendMic(true, true), "full duplex keeps the mic open while the interviewer speaks")
  assert(!shouldSendMic(false, true), "half duplex does not upload the mic during playback")
  assert(shouldSendMic(false, false), "half duplex uploads the mic once playback has finished")
  assert(
    leakFromPlayback({ quietRms: 0.004, meanPlaybackRms: 0.03, peakPlaybackRms: 0.04, windows: 6 }),
    "flat residual energy during playback is treated as leaked speaker audio",
  )
  assert(
    !leakFromPlayback({ quietRms: 0.004, meanPlaybackRms: 0.05, peakPlaybackRms: 0.2, windows: 6 }),
    "a loud peak during playback stays barge-in, not a mute",
  )

  const redacted = redactEvent({
    type: "response.output_audio.delta",
    delta: Buffer.from("hello").toString("base64"),
    token: "should-not-appear",
  })
  assert(typeof redacted.bytes === "number" && redacted.bytes > 0, "audio deltas become byte counts")
  assert(!("delta" in redacted), "raw audio is dropped")
  assert(!("token" in redacted), "tokens are dropped")

  const env = process.env as Record<string, string | undefined>
  const previousNodeEnv = env.NODE_ENV
  env.NODE_ENV = "development"
  delete process.env.VOICE_LOG
  const logged = await postLog(
    new Request("http://local.test/api/voice/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: "smoke001", entries: [{ t: 0, ts: 0, kind: "start" }] }),
    }),
  )
  assert(logged.status === 204, `dev voice log should be 204, got ${logged.status}`)
  const badId = await postLog(
    new Request("http://local.test/api/voice/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: "../x", entries: [] }),
    }),
  )
  assert(badId.status === 400, "a path-like session id is rejected")
  env.NODE_ENV = "production"
  const hidden = await postLog(
    new Request("http://local.test/api/voice/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: "smoke001", entries: [{ t: 1, ts: 1, kind: "start" }] }),
    }),
  )
  assert(hidden.status === 404, "production voice log is off")
  if (previousNodeEnv === undefined) delete env.NODE_ENV
  else env.NODE_ENV = previousNodeEnv

  delete process.env.XAI_API_KEY
  const missingKey = await postSession(
    new Request("http://local.test/api/voice/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: "abc12345" }),
    }),
  )
  const missingText = await missingKey.text()
  assert(missingKey.status === 503, `missing XAI_API_KEY should be 503, got ${missingKey.status}`)
  assert(missingText.includes("XAI_API_KEY"), "the server says which env var is missing")
  assert(!/xai-realtime|bearer\s+\S+/i.test(missingText), "the missing-key response contains no token")

  await rm(VOICE_LOG_DIR, { recursive: true, force: true })
  console.log("waypoint checks passed")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
