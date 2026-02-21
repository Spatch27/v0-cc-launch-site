"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { Quote } from "lucide-react"

interface OutcomeStudy {
  client: string
  project: string
  metrics: { value: string; label: string }[]
  testimonial: string
  accentColor: string
}

const allCaseStudies: OutcomeStudy[] = [
  {
    client: "Global home security company",
    project: "Email marketing workflow re-engineering across EMEA",
    metrics: [
      { value: "57%", label: "improvement in CTR" },
      { value: "25%", label: "increase in CTOR" },
      { value: "15%", label: "decrease in bounce rates" },
    ],
    testimonial:
      "They've enabled us to get the results we always wanted out of an expensive, integrated system.",
    accentColor: "#fc66a7",
  },
  {
    client: "Leading IT consultancy",
    project: "Stack simplification and realignment / CX improvements",
    metrics: [
      { value: "22%", label: "reduction in journey breaks" },
      { value: "12%", label: "increase in page conversions" },
    ],
    testimonial:
      "They delivered a brilliant experience — great stakeholder mapping, flawless execution, and well-embedded adoption.",
    accentColor: "#ff8600",
  },
  {
    client: "Top 10 wealth and asset management company",
    project:
      "Business transformation, web integration, and marketing team alignment",
    metrics: [
      { value: "30%", label: "reduction in workarounds" },
      { value: "57%", label: "licence fee reduction" },
    ],
    testimonial:
      "A business critical transformation at a crucial time for us — they executed it brilliantly.",
    accentColor: "#ffd100",
  },
  {
    client: "Top 5 UK retailer",
    project:
      "Workflow assessment, agentic tool creation, training and change management",
    metrics: [
      { value: "100%", label: "team adoption" },
      { value: "1,300", label: "man-hours saved in Year 1" },
    ],
    testimonial:
      "They demonstrated a great understanding of the way we work, and quickly delivered tech and tools as part of an evolved workflow.",
    accentColor: "#fc66a7",
  },
]

export function OutcomesCaseStudies() {
  return (
    <Section background="light">
      <div className="flex flex-col gap-16">
        {allCaseStudies.map((study, i) => (
          <motion.div
            key={study.client}
            variants={fadeInUp}
            custom={i}
            className="group grid gap-10 border-b border-brand-dark/10 pb-16 last:border-0 last:pb-0 md:grid-cols-2"
          >
            {/* Left: info */}
            <div>
              <div
                className="mb-6 h-1 w-12 rounded-full"
                style={{ backgroundColor: study.accentColor }}
              />
              <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-grey">
                {study.client}
              </p>
              <h3 className="mb-8 font-display text-2xl font-bold leading-snug text-brand-dark lg:text-3xl">
                {study.project}
              </h3>

              {/* Metrics */}
              <div className="flex flex-wrap gap-8">
                {study.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="font-display text-4xl font-bold text-brand-dark">
                      {m.value}
                    </span>
                    <p className="mt-1 text-sm text-brand-dark/50">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: testimonial */}
            <div className="flex flex-col justify-center">
              <Quote size={20} className="mb-4 text-brand-dark/15" />
              <blockquote className="font-display text-xl font-medium italic leading-relaxed text-brand-dark/70 lg:text-2xl">
                &ldquo;{study.testimonial}&rdquo;
              </blockquote>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
