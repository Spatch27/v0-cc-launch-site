"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { CheckCircle } from "lucide-react"
import { GAP_AREAS } from "@/lib/gap"
import { cn } from "@/lib/utils"
import {
  applySpokenIdentity,
  buildWaypointBody,
  EMPTY_IDENTITY,
  type IdentityFields,
  type IdentityKey,
  type WaypointResearch,
} from "@/lib/waypoint"
import {
  createVoiceContext,
  WaypointVoiceSession,
  type CaptionLine,
  type PersistResult,
  type VoiceHandlers,
  type VoicePhase,
} from "./voice-session"

const showSessionId = process.env.NODE_ENV !== "production"

const inputClass =
  "w-full border-0 border-b-2 border-brand-dark/10 bg-transparent px-0 py-3 text-base text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-brand-pink"

const fields: Array<{ key: IdentityKey; label: string; autoComplete: string; type?: string }> = [
  { key: "name", label: "Name", autoComplete: "name" },
  { key: "email", label: "Email", autoComplete: "email", type: "email" },
  { key: "role", label: "Role", autoComplete: "organization-title" },
  { key: "company", label: "Company", autoComplete: "organization" },
]

function statusCopy(phase: VoicePhase): string {
  if (phase === "connecting") return "Connecting…"
  if (phase === "listening") return "Listening…"
  if (phase === "thinking") return "Thinking…"
  return "Speaking…"
}

function WaveformIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M3 10v4M7 6v12M12 3v18M17 6v12M21 10v4" />
    </svg>
  )
}

function LiveBars({ phase }: { phase: VoicePhase }) {
  const duration = phase === "speaking" ? "0.55s" : phase === "listening" ? "1.15s" : "1.6s"
  const quiet = phase === "connecting" || phase === "thinking"
  return (
    <span className="inline-flex h-4 items-center gap-0.5" style={{ opacity: quiet ? 0.75 : 1 }} aria-hidden="true">
      {[0, 1, 2, 3].map((bar) => (
        <span key={bar} className="waypoint-bar w-[3px] bg-current" style={{ animationDuration: duration, animationDelay: `${bar * 0.12}s` }} />
      ))}
    </span>
  )
}

export function WaypointInterview() {
  const sessionRef = useRef<WaypointVoiceSession | null>(null)
  const liveRef = useRef(false)
  const handlersRef = useRef<VoiceHandlers | null>(null)
  const identityRef = useRef<IdentityFields>(EMPTY_IDENTITY)
  const consentRef = useRef(false)
  const researchRef = useRef<WaypointResearch | null>(null)
  const focusedRef = useRef<IdentityKey | null>(null)
  const savedRef = useRef(false)
  const savingRef = useRef<Promise<PersistResult> | null>(null)
  const captionEndRef = useRef<HTMLDivElement>(null)

  const [live, setLive] = useState(false)
  const [phase, setPhase] = useState<VoicePhase>("connecting")
  const [sessionId, setSessionId] = useState("")
  const [identity, setIdentity] = useState<IdentityFields>(EMPTY_IDENTITY)
  const [consent, setConsent] = useState(false)
  const [heard, setHeard] = useState(false)
  const [captions, setCaptions] = useState<CaptionLine[]>([])
  const [banner, setBanner] = useState<string | null>(null)
  const [fieldError, setFieldError] = useState<{ field: string; message: string } | null>(null)
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const hasDetail = Boolean(identity.name || identity.email || identity.role || identity.company)
  const status = live ? statusCopy(phase) : ""
  const visibleStatus = showSessionId && sessionId && status ? `${status} · session ${sessionId}` : status

  function rememberIdentity(next: IdentityFields) {
    identityRef.current = next
    setIdentity(next)
  }

  function rememberConsent(yes: boolean) {
    consentRef.current = yes
    setConsent(yes)
  }

  async function persist(research: WaypointResearch, transcript: string): Promise<PersistResult> {
    if (savedRef.current) return { ok: true, already: true }
    if (savingRef.current) return savingRef.current
    const run = (async (): Promise<PersistResult> => {
      const built = buildWaypointBody({
        identity: identityRef.current,
        consent: consentRef.current,
        research,
        transcript,
      })
      if (!built.ok) {
        setFieldError({ field: built.field, message: humanFieldMessage(built.field, built.error) })
        return { ok: false, error: built.speak, field: built.field }
      }
      const response = await fetch("/api/waypoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(built.body),
      })
      const data: unknown = await response.json().catch(() => null)
      if (!response.ok) {
        const record = data && typeof data === "object" ? (data as Record<string, unknown>) : {}
        const field = typeof record.field === "string" ? record.field : undefined
        const message = typeof record.speak === "string" ? record.speak : typeof record.error === "string" ? record.error : "We couldn’t send this just now."
        setFieldError({ field: field ?? "send", message: humanFieldMessage(field, message) })
        return { ok: false, error: message, field }
      }
      savedRef.current = true
      setSubmitted(true)
      return { ok: true }
    })()
    savingRef.current = run
    try {
      return await run
    } finally {
      savingRef.current = null
    }
  }

  handlersRef.current = {
    onPhase: setPhase,
    onCaptions: setCaptions,
    onSpokenIdentity: (spoken) => {
      const next = applySpokenIdentity(identityRef.current, spoken, focusedRef.current)
      rememberIdentity(next)
      setHeard(true)
      setFieldError((current) => (current && spoken[current.field] != null ? null : current))
      return next
    },
    onConsent: (yes) => {
      rememberConsent(yes)
      if (yes) setFieldError((current) => (current?.field === "consent" ? null : current))
    },
    getIdentity: () => identityRef.current,
    onResearch: (research) => {
      researchRef.current = research
    },
    persist,
    onError: (message) => setBanner(message),
    onLiveChange: (next) => {
      liveRef.current = next
      setLive(next)
    },
  }

  useEffect(() => {
    return () => sessionRef.current?.stop()
  }, [])

  useEffect(() => {
    captionEndRef.current?.scrollIntoView({ block: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
  }, [captions])

  function startOrStop() {
    if (liveRef.current) {
      liveRef.current = false
      sessionRef.current?.stop()
      return
    }
    setBanner(null)
    liveRef.current = true
    const ctx = createVoiceContext()
    void ctx.resume()
    const session = new WaypointVoiceSession(() => {
      if (!handlersRef.current) throw new Error("Voice handlers are not ready")
      return handlersRef.current
    })
    sessionRef.current = session
    setSessionId(session.sessionId)
    setPhase("connecting")
    setLive(true)
    void session.start(ctx)
  }

  async function onSend() {
    if (sending || submitted) return
    const research = researchRef.current
    if (!research) {
      setBanner("Keep talking for a moment. We’ll send this once the conversation has covered the research.")
      return
    }
    setSending(true)
    setBanner(null)
    const alreadySaving = savingRef.current
    const result = await persist(research, sessionRef.current?.getTranscript() ?? "")
    setSending(false)
    if (!result.ok) {
      setFieldError({ field: result.field ?? "send", message: humanFieldMessage(result.field, result.error) })
      if (result.field) document.getElementById(`waypoint-${result.field}`)?.focus()
      return
    }
    if (!alreadySaving) sessionRef.current?.notifySaved()
  }

  if (submitted) {
    return (
      <div className="bg-brand-white px-6 pt-12 pb-36 lg:px-12 lg:pb-24">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
          <div role="status" aria-live="polite" className="flex max-w-3xl flex-col gap-6">
            <CheckCircle size={48} className="text-brand-pink" aria-hidden="true" />
            <h2 className="font-display text-3xl font-bold text-brand-dark">Thanks — the video is on its way.</h2>
            <p className="text-lg leading-relaxed text-brand-dark">We’ll be back to you shortly with a short personal video.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-brand-white px-6 pt-10 pb-36 lg:px-12 lg:pt-14 lg:pb-24">
      <style>{`
        .waypoint-bar {
          height: 16px;
          transform-origin: center;
          animation-name: waypoint-bar;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          transform: scaleY(0.4);
        }
        @keyframes waypoint-bar {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .waypoint-bar { animation: none; transform: scaleY(0.7); }
        }
      `}</style>
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[280px_minmax(0,720px)] lg:gap-x-12">
        <div className="order-2 lg:order-1 lg:row-start-1">
          <h2 className="font-display text-xl font-semibold text-brand-dark">What we’ll talk through</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Your name, role, and company, and how long you’ve been in the role.</li>
            <li>The marketing function you have, and the one you know you’ll need next.</li>
            <li>Seven areas: how each one feels, and where it could be better.</li>
            <li>The most pressing thing on the list: what it is, the difference it would make, what success looks like, and when you need to show progress.</li>
          </ol>
          <ul className="mt-6 space-y-3 text-sm leading-snug text-brand-dark" aria-label="The seven areas">
            {GAP_AREAS.map((area, index) => (
              <li key={area.key} className="flex gap-3">
                <span className="font-medium tabular-nums text-brand-dark/50">{index + 1}</span>
                <span>{area.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Prefer to write it down? The short form is still{" "}
            <Link href="/gap" className="font-medium text-brand-dark underline decoration-brand-pink underline-offset-4">
              here
            </Link>
            .
          </p>
        </div>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <p className="max-w-[62ch] text-base leading-relaxed text-brand-dark">
            Headphones are best. On speakers the microphone can hear the reply, and the interviewer will answer itself.
          </p>

          <div className="flex flex-col items-start gap-3">
            <button
              type="button"
              className="inline-flex min-h-12 items-center gap-3 border-2 border-brand-dark bg-brand-light px-6 py-3 text-base font-semibold text-brand-dark transition-colors hover:bg-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
              style={{ borderRadius: 4 }}
              aria-pressed={live}
              onClick={startOrStop}
            >
              {live ? <LiveBars phase={phase} /> : <WaveformIcon />}
              {live ? "End conversation" : "Start the conversation"}
            </button>
            <p aria-hidden="true" className="min-h-5 text-sm font-medium text-brand-dark">
              {visibleStatus}
            </p>
            <p className="sr-only" role="status">
              {visibleStatus}
            </p>
          </div>

          {banner && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {banner}
            </p>
          )}

          <div>
            <h2 className="font-display text-xl font-semibold text-brand-dark">Check these</h2>
            <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-brand-dark">
              {hasDetail ? "Have I got this right? " : "I’ll read these back. "}
              Tell me how to spell anything I’ve got wrong. You can edit a field too.
            </p>
            {heard && <p className="mt-2 text-sm text-muted-foreground">Updated from what you said.</p>}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {fields.map((field) => {
                const message = fieldError?.field === field.key ? fieldError.message : null
                const errorId = `waypoint-${field.key}-error`
                return (
                  <div key={field.key} className="scroll-mt-32">
                    <label htmlFor={`waypoint-${field.key}`} className="mb-2 block text-sm font-medium text-brand-dark">
                      {field.label} <span className="text-brand-pink">*</span>
                    </label>
                    <input
                      id={`waypoint-${field.key}`}
                      name={field.key}
                      type={field.type ?? "text"}
                      autoComplete={field.autoComplete}
                      autoCapitalize={field.key === "email" ? "none" : "words"}
                      autoCorrect={field.key === "email" ? "off" : undefined}
                      spellCheck={field.key === "email" ? false : undefined}
                      inputMode={field.key === "email" ? "email" : undefined}
                      value={identity[field.key]}
                      aria-invalid={message ? true : undefined}
                      aria-describedby={message ? errorId : undefined}
                      className={cn(inputClass, message && "border-red-400")}
                      onFocus={() => {
                        focusedRef.current = field.key
                      }}
                      onBlur={() => {
                        if (focusedRef.current === field.key) focusedRef.current = null
                      }}
                      onChange={(event) => {
                        rememberIdentity({ ...identityRef.current, [field.key]: event.target.value })
                        setFieldError((current) => (current?.field === field.key ? null : current))
                      }}
                    />
                    {message && (
                      <p id={errorId} role="alert" className="mt-2 text-sm text-red-700">
                        {message}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="scroll-mt-32">
            <label htmlFor="waypoint-consent" className="flex items-start gap-3 text-base leading-relaxed text-brand-dark">
              <input
                id="waypoint-consent"
                type="checkbox"
                className="mt-1 size-5 accent-[var(--brand-pink)]"
                checked={consent}
                onChange={(event) => {
                  rememberConsent(event.target.checked)
                  setFieldError((current) => (current?.field === "consent" ? null : current))
                }}
              />
              <span>I’m happy for this conversation to be recorded and transcribed so you can send the video.</span>
            </label>
            {fieldError?.field === "consent" && (
              <p role="alert" className="mt-2 text-sm text-red-700">
                {fieldError.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="button"
              className="inline-flex min-h-12 items-center border-2 border-brand-dark bg-brand-light px-6 py-3 text-base font-semibold text-brand-dark transition-colors hover:bg-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark disabled:opacity-50"
              style={{ borderRadius: 4 }}
              disabled={sending}
              onClick={() => void onSend()}
            >
              {sending ? "Sending…" : "Send me the video"}
            </button>
            <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
              Say when this is right, or press send. Your answers stay between us. We don’t share them, we don’t publish them, and we don’t put you on a mailing list.
            </p>
          </div>

          <div role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversation" className="max-h-64 space-y-3 overflow-y-auto text-sm leading-relaxed text-brand-dark/80">
            {captions.filter((line) => line.text.trim()).map((line) => (
              <p key={line.id}>
                <span className="font-medium text-brand-dark">{line.role === "user" ? "You" : "Interviewer"}: </span>
                {line.text}
              </p>
            ))}
            <div ref={captionEndRef} />
          </div>
        </div>
      </div>
    </div>
  )
}

function humanFieldMessage(field: string | undefined, speak: string): string {
  if (field === "name") return "We still need your name. Say it, and spell it if it isn’t right."
  if (field === "email") return "Check the email. Say it again and spell it, or edit the field."
  if (field === "role") return "We still need your role. Say it, and spell it if it isn’t right."
  if (field === "company") return "We still need your company. Say it, and spell it if it isn’t right."
  if (field === "consent") return "We need a yes before we record the conversation and send the video."
  if (field === "transcript") return "There’s nothing from the conversation to send yet."
  return speak
}
