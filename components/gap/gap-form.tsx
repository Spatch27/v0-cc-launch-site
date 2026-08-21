"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Send } from "lucide-react"
import { textRollDown, textRollUp } from "@/lib/animations"
import { cn } from "@/lib/utils"
import { GapSlider } from "./gap-slider"

const SLIDERS = [
  { key: "funding", label: "Winning belief, budget and board confidence" },
  { key: "howitruns", label: "How the work actually gets made and shipped" },
  { key: "measurement", label: "Knowing what's working, and proving it" },
  { key: "ai", label: "Getting AI to do something real" },
  { key: "stack", label: "The stack, and data people trust" },
  { key: "speed", label: "Speed, and how the team feels" },
  { key: "agencies", label: "Agencies and partners" },
] as const

type ScanKey = (typeof SLIDERS)[number]["key"]

const inputClass =
  "w-full border-0 border-b-2 border-brand-dark/10 bg-transparent px-0 py-3 text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-brand-pink"

const labelClass = "mb-3 block text-sm font-medium text-brand-dark"

const STARTERS = [
  { label: "Speed", stem: "The one we need moves " },
  { label: "Proof", stem: "The one we need can show " },
  { label: "Planning", stem: "The one we need plans, the one we've got " },
  { label: "The team", stem: "The one we need frees the team to " },
  { label: "The tools", stem: "The one we need actually uses " },
] as const

export function GapForm() {
  const [scanValues, setScanValues] = useState<Record<ScanKey, number>>(() =>
    Object.fromEntries(SLIDERS.map((s) => [s.key, 4])) as Record<ScanKey, number>
  )
  const [touched, setTouched] = useState<Set<ScanKey>>(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [q1, setQ1] = useState("")
  const [starter, setStarter] = useState<string | null>(null)
  const [isSubmitHovered, setIsSubmitHovered] = useState(false)
  const [caretTo, setCaretTo] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (caretTo !== null && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(caretTo, caretTo)
      setCaretTo(null)
    }
  }, [q1, caretTo])

  function pickStarter(selected: (typeof STARTERS)[number]) {
    if (starter === selected.label) {
      setQ1("")
      setStarter(null)
      setCaretTo(0)
      return
    }

    const untouched = q1 === "" || STARTERS.some((option) => q1 === option.stem)
    const next = untouched ? selected.stem : q1
    setQ1(next)
    setStarter(selected.label)
    setCaretTo(next.length)
  }

  const touchedCount = touched.size

  const markTouched = useMemo(
    () => (key: ScanKey) =>
      setTouched((prev) => {
        if (prev.has(key)) return prev
        const next = new Set(prev)
        next.add(key)
        return next
      }),
    []
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    const scan = Object.fromEntries(SLIDERS.map((s) => [s.key, scanValues[s.key]])) as Record<ScanKey, number>
    const maxValue = Math.max(...Object.values(scan))
    const minValue = Math.min(...Object.values(scan))
    const widest_gaps = SLIDERS.filter((s) => scan[s.key] === maxValue).map((s) => s.key)
    const closest = SLIDERS.find((s) => scan[s.key] === minValue)?.key

    try {
      const body = {
        submitted: new Date().toISOString(),
        person: {
          name: formData.get("name"),
          role: formData.get("role"),
          company: formData.get("company"),
          email: formData.get("email"),
          marketing_headcount: formData.get("marketing_headcount"),
        },
        biggest_difference: formData.get("biggest_difference"),
        q1_starter_used: starter,
        scan,
        widest_gaps,
        closest,
        would_protect: formData.get("would_protect"),
        tried_and_didnt_stick: formData.get("tried_and_didnt_stick"),
      }

      const res = await fetch("/api/gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(data.error || "Failed to submit form")
      }
    } catch (err) {
      console.error("[v0] Gap form submission error:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-white">
      <div className="mx-auto max-w-[660px] px-6 pt-32 pb-32 lg:pt-40 lg:pb-24">
        {/* Title */}
        <h1 className="text-balance font-display text-[clamp(2rem,6vw,3rem)] font-bold leading-[1.05] text-brand-dark">
          Where&apos;s the <span className="bg-brand-yellow-light px-1">gap</span> in your marketing?
        </h1>

        {/* Intro */}
        <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-brand-dark">
          <p>
            Most marketing functions aren&apos;t broken, they&apos;re buried. More channels, shorter cycles, new tools
            that only pay back if the function around them can keep up. And a board that wants proof by Friday.
          </p>
          <p>
            Capable teams become teams that cope. You sense a widening gap between the marketing function you&apos;ve
            got and the one you need.
          </p>
          <p>
            Four questions, two minutes of your time. Within a couple of days we&apos;ll send you a short video: how
            big we think that gap is, three things we think are holding it there, and where we&apos;d start.
          </p>
        </div>
        <hr className="mt-6 border-t border-brand-dark/10" />

        {submitted ? (
          <div className="flex flex-col gap-6 py-16">
            <CheckCircle size={48} className="text-brand-pink" />
            <h2 className="font-display text-3xl font-bold text-brand-dark">Thanks — the video is on its way.</h2>
            <p className="text-lg text-brand-dark">
              We&apos;ll be back to you within two working days with your three-minute video.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            {error && (
              <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Question 1 */}
            <div className="py-10">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">One</span>
              <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-brand-dark">
                Compare the marketing function you&apos;ve got to the one you need. What&apos;s the biggest
                difference between those two versions?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">One line is plenty.</p>
              <div className="mt-6 flex flex-col gap-4">
                <label htmlFor="biggest_difference" className="sr-only">
                  Biggest difference
                </label>
                <input
                  ref={inputRef}
                  id="biggest_difference"
                  name="biggest_difference"
                  type="text"
                  maxLength={180}
                  value={q1}
                  onChange={(event) => {
                    setQ1(event.target.value)
                    setStarter(null)
                  }}
                  className={inputClass}
                  placeholder="e.g. the one we need plans, the one we've got reacts"
                />
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground">Stuck? Start from one of these.</p>
                  <div className="flex flex-wrap gap-2" aria-label="Starter answers">
                    {STARTERS.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        aria-pressed={starter === option.label}
                        className={cn(
                          "rounded-full border px-[15px] py-2 text-sm text-brand-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink",
                          starter === option.label
                            ? "border-brand-pink bg-brand-pink font-medium"
                            : "border-[#E3DCDC] bg-background hover:border-brand-pink hover:bg-[#FFE8F2]"
                        )}
                        onClick={() => pickStarter(option)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-t border-brand-dark/10" />

            {/* Question 2 */}
            <div className="py-10">
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
              <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-brand-dark">
                And how far off is each of these from the version you need?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Not a score for your team. This is the distance between the two versions, area by area.
              </p>

              <div className="mt-8 flex justify-between border-b border-brand-dark/10 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <span>Already there</span>
                <span>Nowhere near</span>
              </div>

              <div className="flex flex-col divide-y divide-brand-dark/10">
                {SLIDERS.map((slider) => (
                  <GapSlider
                    key={slider.key}
                    label={slider.label}
                    value={scanValues[slider.key]}
                    touched={touched.has(slider.key)}
                    onChange={(value) => setScanValues((prev) => ({ ...prev, [slider.key]: value }))}
                    onTouch={() => markTouched(slider.key)}
                  />
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div className="py-10">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Three</span>
              <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-brand-dark">
                What&apos;s the one part you&apos;d protect if you had to cut everything else?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">A few words will do.</p>
              <div className="mt-6">
                <label htmlFor="would_protect" className="sr-only">
                  What would you protect
                </label>
                <input
                  id="would_protect"
                  name="would_protect"
                  type="text"
                  className={inputClass}
                  placeholder="e.g. the brand team, our events, the way we do research"
                />
              </div>
            </div>

            {/* Question 4 */}
            <div className="py-10">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Four</span>
              <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-brand-dark">
                What&apos;s the fix that keeps coming back?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Something you&apos;ve solved before and it didn&apos;t stick. Name it, that&apos;s all.
              </p>
              <div className="mt-6">
                <label htmlFor="tried_and_didnt_stick" className="sr-only">
                  Recurring fix
                </label>
                <input
                  id="tried_and_didnt_stick"
                  name="tried_and_didnt_stick"
                  type="text"
                  className={inputClass}
                  placeholder="e.g. attribution, the briefing process, agency handovers"
                />
              </div>
            </div>

            {/* Details panel */}
            <div className="flex flex-col gap-8 py-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name <span className="text-brand-pink">*</span>
                  </label>
                  <input id="name" name="name" type="text" required className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label htmlFor="role" className={labelClass}>
                    Role
                  </label>
                  <input id="role" name="role" type="text" className={inputClass} placeholder="Your role" />
                </div>
              </div>
              <div>
                <label htmlFor="marketing_headcount" className={labelClass}>
                  Roughly how many people in marketing?
                </label>
                <input
                  id="marketing_headcount"
                  name="marketing_headcount"
                  type="text"
                  inputMode="numeric"
                  className={inputClass}
                  placeholder="a number is fine"
                />
              </div>
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
              Your answers stay between us. We don&apos;t share them, we don&apos;t publish them, and we don&apos;t
              put you on a mailing list.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
