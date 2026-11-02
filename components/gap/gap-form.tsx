"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, ChevronDown, Send } from "lucide-react"
import { GAP_AREAS, type GapAreaKey, buildGapAreasPayload, isGapAreaKey, isValidEmail, optionalText } from "@/lib/gap"
import { textRollDown, textRollUp } from "@/lib/animations"
import { cn } from "@/lib/utils"
import { GapAreaList } from "./gap-area-list"

const inputClass =
  "w-full border-0 border-b-2 border-brand-dark/10 bg-transparent px-0 py-3 text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-brand-pink"

const labelClass = "mb-3 block text-sm font-medium text-brand-dark"

const hintClass = "mt-1 text-sm italic text-muted-foreground"

/**
 * Insights article columns: 280px question column, answer column capped at the
 * article body width (720px). Heading and short-question inputs share this grid
 * so their right edge is the answer column's right edge.
 */
const columnGridClass = "gap-columns grid lg:grid-cols-[280px_minmax(0,720px)] lg:gap-x-12"

const questionGridClass = cn(columnGridClass, "items-start gap-12 py-10")

/** Extra space between the fixed header's bottom edge and the scrolled target. */
const NAV_CLEARANCE_GAP = 16

type GapFieldId = "must_achieve" | "scan" | "most_important" | "shows_the_gap" | "name" | "email"

type GapFieldError = {
  field: GapFieldId
  message: string
  area?: GapAreaKey
}

type GapScrollIntent = {
  nonce: number
  targetId: string
  focusId: string
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function FieldAlert({ id, message }: { id: string; message: string | null }) {
  if (!message) return null
  return (
    <p id={id} role="alert" aria-live="assertive" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      {message}
    </p>
  )
}

/** Same cap as the Insights article body, so answers end where article text does. */
const answerColumnClass = "min-w-0 lg:max-w-[720px]"

function ShortQuestion({
  kicker,
  title,
  note,
  example,
  fieldId,
  scrollId,
  maxLength,
  error,
  onValueChange,
}: {
  kicker: string
  title: string
  note: string
  example: string
  fieldId: string
  scrollId: string
  maxLength?: number
  error: string | null
  onValueChange: () => void
}) {
  const errorId = `${fieldId}-error`
  return (
    <div id={scrollId} className={cn(columnGridClass, "gap-scroll-target py-10")}>
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground lg:col-start-1 lg:row-start-1">
        {kicker}
      </span>
      <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-brand-dark lg:col-start-1 lg:row-start-2 lg:self-end">
        {title}
      </h2>
      <div className="lg:col-start-1 lg:row-start-3">
        <p className="mt-2 text-sm text-muted-foreground">{note}</p>
        <p className={hintClass}>{example}</p>
      </div>
      <div className={cn(answerColumnClass, "gap-short-field lg:col-start-2 lg:row-start-2 lg:self-end")}>
        <label htmlFor={fieldId} className="sr-only">
          {title}
        </label>
        <input
          id={fieldId}
          name={fieldId}
          type="text"
          required
          aria-required="true"
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(inputClass, error && "border-red-400")}
          onChange={onValueChange}
        />
        <FieldAlert id={errorId} message={error} />
      </div>
    </div>
  )
}

function FocusQuestion({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (value: string) => void
  error: string | null
}) {
  const title = "Of the 7 areas above, which is the most important area of focus for you right now?"
  const selected = GAP_AREAS.find((area) => area.key === value)

  return (
    <div id="gap-q3-block" className={cn(columnGridClass, "gap-scroll-target py-10")}>
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground lg:col-start-1 lg:row-start-1">
        Three
      </span>
      <h2
        id="gap-q3"
        className="mt-2 font-display text-xl font-semibold leading-snug text-brand-dark lg:col-start-1 lg:row-start-2 lg:self-end"
      >
        {title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground lg:col-start-1 lg:row-start-3">Choose one.</p>
      <div className={cn(answerColumnClass, "gap-short-field lg:col-start-2 lg:row-start-2 lg:self-end")}>
        <label htmlFor="most_important" className="sr-only">
          {title}
        </label>
        <div className="group relative">
          <select
            id="most_important"
            name="most_important"
            required
            aria-required="true"
            value={value}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "gap-most-important-error" : undefined}
            onChange={(event) => onChange(event.target.value)}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          >
            <option value="" disabled>
              Select an area
            </option>
            {GAP_AREAS.map((area) => (
              <option key={area.key} value={area.key}>
                {area.label}
              </option>
            ))}
          </select>
          <div
            aria-hidden="true"
            className="pointer-events-none border-b-2 border-brand-dark/10 py-3 pr-8 text-base leading-snug text-brand-dark transition-colors group-focus-within:border-brand-pink"
          >
            {selected ? selected.label : <span className="text-brand-dark/30">Select an area</span>}
          </div>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-0 size-5 -translate-y-1/2 text-brand-dark/50"
          />
        </div>
        <FieldAlert id="gap-most-important-error" message={error} />
      </div>
    </div>
  )
}

export function GapForm() {
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollNonce = useRef(0)
  const [scanValues, setScanValues] = useState<Record<GapAreaKey, number>>(() =>
    Object.fromEntries(GAP_AREAS.map((area) => [area.key, 4])) as Record<GapAreaKey, number>
  )
  const [focusArea, setFocusArea] = useState("")
  const [touched, setTouched] = useState<Set<GapAreaKey>>(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldError, setFieldError] = useState<GapFieldError | null>(null)
  const [scrollIntent, setScrollIntent] = useState<GapScrollIntent | null>(null)
  const [isSubmitHovered, setIsSubmitHovered] = useState(false)

  const touchedCount = touched.size

  useEffect(() => {
    const header = document.querySelector("header")
    const root = rootRef.current
    if (!header || !root) return

    const apply = () => {
      const clearance = Math.ceil(header.getBoundingClientRect().height) + NAV_CLEARANCE_GAP
      root.style.setProperty("--gap-nav-clearance", `${clearance}px`)
    }

    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(header)
    window.addEventListener("resize", apply)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", apply)
    }
  }, [])

  useEffect(() => {
    if (!scrollIntent) return
    let cancelled = false
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (cancelled) return
        const target = document.getElementById(scrollIntent.targetId)
        target?.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
          inline: "nearest",
        })
        document.getElementById(scrollIntent.focusId)?.focus({ preventScroll: true })
      })
    })
    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
    }
  }, [scrollIntent])

  const markTouched = useMemo(
    () => (key: GapAreaKey) =>
      setTouched((prev) => {
        if (prev.has(key)) return prev
        const next = new Set(prev)
        next.add(key)
        return next
      }),
    []
  )

  function queueScroll(targetId: string, focusId: string) {
    scrollNonce.current += 1
    setScrollIntent({ nonce: scrollNonce.current, targetId, focusId })
  }

  function revealField(field: GapFieldId, targetId: string, focusId: string, message: string, area?: GapAreaKey) {
    setError(null)
    setFieldError({ field, message, area })
    queueScroll(targetId, focusId)
  }

  function clearFieldError(field: GapFieldId) {
    setFieldError((current) => (current?.field === field ? null : current))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return

    const form = e.currentTarget
    const formData = new FormData(form)

    const mustAchieve = optionalText(formData.get("must_achieve"))
    if (!mustAchieve) {
      revealField("must_achieve", "gap-q1-block", "must_achieve", "Tell us what marketing must achieve.")
      return
    }

    const firstUntouched = GAP_AREAS.find((area) => !touched.has(area.key))
    if (firstUntouched) {
      const focusId = `gap-slider-${firstUntouched.key}`
      const targetId = firstUntouched.key === GAP_AREAS[0].key ? "gap-q2" : `gap-area-${firstUntouched.key}`
      revealField("scan", targetId, focusId, "Select the gap size for each area.", firstUntouched.key)
      return
    }

    const mostImportant = formData.get("most_important")
    if (!isGapAreaKey(mostImportant)) {
      revealField("most_important", "gap-q3-block", "most_important", "Choose the most important area of focus.")
      return
    }

    const showsTheGap = optionalText(formData.get("shows_the_gap"))
    if (!showsTheGap) {
      revealField("shows_the_gap", "gap-q4-block", "shows_the_gap", "Name a campaign or piece of work that shows the gap.")
      return
    }

    const name = optionalText(formData.get("name"))
    const email = optionalText(formData.get("email"))
    if (!name) {
      revealField("name", "gap-name-field", "name", "Name and email are required.")
      return
    }
    if (!email) {
      revealField("email", "gap-email-field", "email", "Name and email are required.")
      return
    }
    if (!isValidEmail(email)) {
      revealField("email", "gap-email-field", "email", "Enter a valid email address.")
      return
    }

    setLoading(true)
    setError(null)
    setFieldError(null)

    const scan = Object.fromEntries(GAP_AREAS.map((area) => [area.key, scanValues[area.key]])) as Record<
      GapAreaKey,
      number
    >
    const maxValue = Math.max(...Object.values(scan))
    const minValue = Math.min(...Object.values(scan))
    const widest_gaps = GAP_AREAS.filter((area) => scan[area.key] === maxValue).map((area) => area.key)
    const closest = GAP_AREAS.find((area) => scan[area.key] === minValue)?.key
    const areas = buildGapAreasPayload(scan)

    try {
      const body = {
        submitted: new Date().toISOString(),
        person: {
          name,
          email,
        },
        anything_else: optionalText(formData.get("anything_else")),
        must_achieve: mustAchieve,
        scan,
        areas,
        most_important: mostImportant,
        widest_gaps,
        closest,
        shows_the_gap: showsTheGap,
      }

      const res = await fetch("/api/gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        queueScroll("gap-success", "gap-success")
      } else {
        setError(data.error || "Failed to submit form")
        queueScroll("gap-form-error", "gap-form-error")
      }
    } catch (err) {
      console.error("[v0] Gap form submission error:", err)
      setError("An error occurred. Please try again.")
      queueScroll("gap-form-error", "gap-form-error")
    } finally {
      setLoading(false)
    }
  }

  const nameError = fieldError?.field === "name" ? fieldError.message : null
  const emailError = fieldError?.field === "email" ? fieldError.message : null

  return (
    <div ref={rootRef} className="min-h-screen bg-brand-white px-6 pb-32 lg:px-12 lg:pb-24">
      <div className="mx-auto max-w-[1400px]">
        <style>{`
          .gap-scroll-target { scroll-margin-top: var(--gap-nav-clearance, 6rem); }
          @media (max-width: 1023px) {
            .gap-short-field { margin-top: 1.5rem; }
          }
          @media (min-width: 1024px) {
            .gap-columns {
              grid-template-columns: 280px minmax(0, 720px);
              column-gap: 3rem;
            }
          }
        `}</style>
        {submitted ? (
          <div className={cn(columnGridClass, "py-16")}>
            <div
              id="gap-success"
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="gap-scroll-target flex flex-col gap-6 outline-none lg:col-span-2"
            >
              <CheckCircle size={48} className="text-brand-pink" />
              <h2 className="font-display text-3xl font-bold text-brand-dark">Thanks — the video is on its way.</h2>
              <p className="text-lg leading-relaxed text-brand-dark">
                We’ll be back to you shortly with a short personal video.
              </p>
              <p className="text-lg leading-relaxed text-brand-dark">
                If there’s a useful next step, Waypoint is a free, 30-minute call with the founders to find where your
                team’s hours are going and which one thing to fix first.
              </p>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="flex flex-col">
            {error && (
              <div
                id="gap-form-error"
                tabIndex={-1}
                role="alert"
                aria-live="assertive"
                className="gap-scroll-target mt-8 rounded-lg border border-red-200 bg-red-50 p-4 outline-none"
              >
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <ShortQuestion
              kicker="One"
              title="What must marketing achieve that it cannot reliably do today?"
              note="One line is plenty."
              example="e.g. plan with confidence / ship campaigns faster / prove what’s working / free the team for higher-value work"
              fieldId="must_achieve"
              scrollId="gap-q1-block"
              maxLength={180}
              error={fieldError?.field === "must_achieve" ? fieldError.message : null}
              onValueChange={() => clearFieldError("must_achieve")}
            />

            <div className={cn(questionGridClass, "gap-scroll-target")} id="gap-q2">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Two</span>
                  <span className="flex items-center gap-2 text-sm font-medium text-brand-dark">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        touchedCount === 7 ? "bg-brand-pink" : "border border-brand-dark/20 bg-brand-light"
                      )}
                      aria-hidden="true"
                    />
                    {touchedCount} of 7
                  </span>
                </div>
                <h2 id="gap-q2-score" className="mt-2 font-display text-xl font-semibold leading-snug text-brand-dark">
                  How big is the gap in each area?
                </h2>
                <div className="mt-2 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Here is a list of areas where a gap often exists between the marketing function you have and the one
                    you need.
                  </p>
                  <p>
                    Select the number on each that corresponds to the size of the gap currently (1 = already there, 7 =
                    nowhere near).
                  </p>
                </div>
              </div>

              <div className={answerColumnClass}>
                <GapAreaList
                  scanValues={scanValues}
                  onScanChange={(key, value) => setScanValues((prev) => ({ ...prev, [key]: value }))}
                  touched={touched}
                  onSliderTouch={(key) => {
                    markTouched(key)
                    clearFieldError("scan")
                  }}
                  invalidArea={fieldError?.field === "scan" ? fieldError.area ?? null : null}
                  errorMessage={fieldError?.field === "scan" ? fieldError.message : null}
                />
              </div>
            </div>

            <FocusQuestion
              value={focusArea}
              error={fieldError?.field === "most_important" ? fieldError.message : null}
              onChange={(value) => {
                setFocusArea(value)
                clearFieldError("most_important")
              }}
            />

            <ShortQuestion
              kicker="Four"
              title="Name a campaign or piece of work that shows the gap — and what makes it harder than it should be."
              note="Something live or recent. One short answer is enough."
              example="e.g. Q4 always-on — approvals stall every cycle / weekly competitive report — still assembled by hand / product launch — briefs bounce between teams"
              fieldId="shows_the_gap"
              scrollId="gap-q4-block"
              error={fieldError?.field === "shows_the_gap" ? fieldError.message : null}
              onValueChange={() => clearFieldError("shows_the_gap")}
            />

            <div className={questionGridClass}>
              <div className={cn(answerColumnClass, "flex flex-col gap-8 lg:col-start-2")}>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
                  <div id="gap-name-field" className="gap-scroll-target">
                    <label htmlFor="name" className={labelClass}>
                      Name <span className="text-brand-pink">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={nameError ? true : undefined}
                      aria-describedby={nameError ? "gap-name-error" : undefined}
                      className={cn(inputClass, nameError && "border-red-400")}
                      placeholder="Your name"
                      onChange={() => clearFieldError("name")}
                    />
                    <FieldAlert id="gap-name-error" message={nameError} />
                  </div>
                  <div id="gap-email-field" className="gap-scroll-target">
                    <label htmlFor="email" className={labelClass}>
                      Email <span className="text-brand-pink">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={emailError ? true : undefined}
                      aria-describedby={emailError ? "gap-email-error" : undefined}
                      className={cn(inputClass, emailError && "border-red-400")}
                      placeholder="your@email.com"
                      onChange={() => clearFieldError("email")}
                    />
                    <FieldAlert id="gap-email-error" message={emailError} />
                  </div>
                </div>
                <div>
                  <label htmlFor="anything_else" className={labelClass}>
                    Anything else we should know? (optional)
                  </label>
                  <textarea
                    id="anything_else"
                    name="anything_else"
                    rows={4}
                    className={`${inputClass} min-h-28 resize-y`}
                  />
                </div>

                <style>{`
                  .gap-send-button:hover {
                    background-color: var(--brand-white) !important;
                  }
                `}</style>
                <button
                  type="submit"
                  disabled={loading}
                  className="gap-send-button group mt-4 inline-flex w-fit items-center gap-3 self-start rounded-lg border-2 border-brand-dark bg-brand-light px-8 py-4 text-base font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-white hover:text-brand-white disabled:opacity-50"
                  style={{ borderRadius: "4px" }}
                  onMouseEnter={() => setIsSubmitHovered(true)}
                  onMouseLeave={() => setIsSubmitHovered(false)}
                >
                  <span className="relative inline-block overflow-hidden">
                    <motion.span
                      initial="initial"
                      animate={isSubmitHovered ? "hover" : "initial"}
                      variants={textRollUp}
                      className="block"
                    >
                      {loading ? "Sending..." : "Send me the video"}
                    </motion.span>
                    <motion.span
                      initial="initial"
                      animate={isSubmitHovered ? "hover" : "initial"}
                      variants={textRollDown}
                      className="absolute inset-0 block"
                    >
                      {loading ? "Sending..." : "Send me the video"}
                    </motion.span>
                  </span>
                  <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Your answers stay between us. We don’t share them, we don’t publish them, and we don’t put you on a
                  mailing list.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
