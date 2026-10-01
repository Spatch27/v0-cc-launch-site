"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Send } from "lucide-react"
import {
  GAP_AREAS,
  type GapAreaKey,
  buildGapAreasPayload,
  defaultImportanceOrder,
  importanceRanksFromOrder,
} from "@/lib/gap"
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

/** Same cap as the Insights article body, so answers end where article text does. */
const answerColumnClass = "min-w-0 lg:max-w-[720px]"

function ShortQuestion({
  kicker,
  title,
  note,
  example,
  fieldId,
  maxLength,
}: {
  kicker: string
  title: string
  note: string
  example: string
  fieldId: string
  maxLength?: number
}) {
  return (
    <div className={cn(columnGridClass, "py-10")}>
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
        <input id={fieldId} name={fieldId} type="text" maxLength={maxLength} className={inputClass} />
      </div>
    </div>
  )
}

export function GapForm() {
  const [scanValues, setScanValues] = useState<Record<GapAreaKey, number>>(() =>
    Object.fromEntries(GAP_AREAS.map((area) => [area.key, 4])) as Record<GapAreaKey, number>
  )
  const [importanceOrder, setImportanceOrder] = useState<GapAreaKey[]>(defaultImportanceOrder)
  const [importanceTouched, setImportanceTouched] = useState(false)
  const [touched, setTouched] = useState<Set<GapAreaKey>>(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitHovered, setIsSubmitHovered] = useState(false)

  const touchedCount = touched.size

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    const scan = Object.fromEntries(GAP_AREAS.map((area) => [area.key, scanValues[area.key]])) as Record<
      GapAreaKey,
      number
    >
    const maxValue = Math.max(...Object.values(scan))
    const minValue = Math.min(...Object.values(scan))
    const widest_gaps = GAP_AREAS.filter((area) => scan[area.key] === maxValue).map((area) => area.key)
    const closest = GAP_AREAS.find((area) => scan[area.key] === minValue)?.key
    const importance = importanceRanksFromOrder(importanceOrder)
    const areas = buildGapAreasPayload(scan, importanceOrder)

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
        must_achieve: formData.get("must_achieve"),
        scan,
        importance,
        importance_order: importanceOrder,
        importance_touched: importanceTouched,
        areas,
        most_important: importanceOrder[0],
        least_important: importanceOrder[importanceOrder.length - 1],
        widest_gaps,
        closest,
        would_protect: formData.get("would_protect"),
        shows_the_gap: formData.get("shows_the_gap"),
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
    <div className="min-h-screen bg-brand-white px-6 pt-32 pb-32 lg:px-12 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-[1400px]">
        <style>{`
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
        <div className={columnGridClass}>
          <div className="lg:col-span-2">
            <h1 className="font-display text-[clamp(2rem,6vw,3rem)] font-bold leading-[1.05] text-brand-dark">
              Where’s the <span className="bg-brand-yellow-light px-1">gap</span> in your marketing?
            </h1>

            <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-brand-dark">
              <p>
                You’ve added tools, developed capabilities and changed how your team works. Your people still hold the
                pieces together: chasing decisions, reconciling data and moving work between systems.
              </p>
              <p>
                AI creates an opportunity to rethink that arrangement. What could your marketing function achieve if less of
                your team’s effort went into making the work happen?
              </p>
              <p>
                <strong className="font-semibold">Four questions, two minutes.</strong> Within two working days we’ll send
                you a short personal video: our initial read on the opportunity, what may be getting in the way, and where
                we’d begin.
              </p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className={cn(columnGridClass, "py-16")}>
            <div className="flex flex-col gap-6 lg:col-span-2">
              <CheckCircle size={48} className="text-brand-pink" />
              <h2 className="font-display text-3xl font-bold text-brand-dark">Thanks — the video is on its way.</h2>
              <p className="text-lg leading-relaxed text-brand-dark">
                We’ll be back to you within two working days with a short personal video.
              </p>
              <p className="text-lg leading-relaxed text-brand-dark">
                If there’s a useful next step, Waypoint is a free hour with the founders to explore your situation and
                identify where to start. That start is often one live campaign.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            {error && (
              <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <ShortQuestion
              kicker="One"
              title="What must marketing achieve that it cannot reliably do today?"
              note="One line is plenty."
              example="e.g. plan with confidence / ship campaigns faster / prove what’s working / free the team for higher-value work"
              fieldId="must_achieve"
              maxLength={180}
            />

            <div className={questionGridClass} id="gap-q2">
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
                <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Below is a list of areas where a gap often exists between the marketing function you have and the one
                    you need.
                  </p>
                  <p>
                    <strong className="font-semibold">First,</strong> for each area click the number (1–7) that
                    corresponds to the size of the gap (1 = ALREADY THERE and 7 = NOWHERE NEAR)
                  </p>
                  <p>
                    <strong className="font-semibold">Second,</strong> drag them into order of importance (A should be the
                    most important area and G should be the least).
                  </p>
                </div>
              </div>

              <div className={answerColumnClass}>
                <GapAreaList
                  order={importanceOrder}
                  onReorder={setImportanceOrder}
                  onRank={() => setImportanceTouched(true)}
                  scanValues={scanValues}
                  onScanChange={(key, value) => setScanValues((prev) => ({ ...prev, [key]: value }))}
                  touched={touched}
                  onSliderTouch={markTouched}
                />
              </div>
            </div>

            <ShortQuestion
              kicker="Three"
              title="What’s the one part you’d protect if you had to cut everything else?"
              note="A few words will do."
              example="e.g. the brand team, our events, the way we do research"
              fieldId="would_protect"
            />

            <ShortQuestion
              kicker="Four"
              title="Name a campaign or piece of work that shows the gap — and what makes it harder than it should be."
              note="Something live or recent. One short answer is enough."
              example="e.g. Q4 always-on — approvals stall every cycle / weekly competitive report — still assembled by hand / product launch — briefs bounce between teams"
              fieldId="shows_the_gap"
            />

            <div className={questionGridClass}>
              <div className={cn(answerColumnClass, "flex flex-col gap-8 lg:col-start-2")}>
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
