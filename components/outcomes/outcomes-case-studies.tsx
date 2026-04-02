"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

interface OutcomeStudy {
  client: string
  title: string
  project: string
  description: string
  metrics: { value: string; label: string }[]
  testimonial: string
  accentColor: string
}

const allCaseStudies: OutcomeStudy[] = [
  {
    client: "Global home security company",
    title: "Customers falling through the gaps",
    project: "Email marketing workflow re-engineering across EMEA",
    description: "Customer intent was being missed because the handoffs between teams and platforms couldn't respond fast enough. Emails were going out late, to the wrong segments, or not at all. The workflow - not the platform - was the problem.\n\nWe re-engineered the end-to-end email workflow. Campaign cycle time dropped from 3 weeks to 6 days, resulting in:",
    metrics: [
      { value: "80%", label: "reduction in errors across 11 languages" },
      { value: "50%", label: "revenue increase in key campaigns" },
      { value: "14", label: "customer journeys replatformed in 4 weeks" },
    ],
    testimonial:
      "They've enabled us to get the results we always wanted out of an expensive, integrated system.",
    accentColor: "#fc66a7",
  },
  {
    client: "Leading IT consultancy",
    title: "Flying blind on what's working",
    project: "Stack simplification and realignment / CX improvements",
    description: "The stack had grown but trust in the data hadn't. Decisions were being made on instinct because dashboards couldn't be relied on. Journey breaks were going undetected until customers had already left.\n\nWe simplified the stack, rebuilt the data flows, and gave the team reporting they could actually act on:",
    metrics: [
      { value: "60%", label: "increase in customer identity resolution" },
      { value: "250%", label: "traffic growth through organic channels" },
      { value: "300%", label: "uplift to conversion rates on campaign forms" },
    ],
    testimonial:
      "They delivered a brilliant experience — great stakeholder mapping, flawless execution, and well-embedded adoption.",
    accentColor: "#ff8600",
  },
  {
    client: "Top 10 wealth and asset management company",
    title: "Paying for tech nobody's really using",
    project:
      "Business transformation, web integration, and marketing team alignment",
    description: "A new digital experience that brought IT and marketing together for the first time. A new composable stack with a unified design system spanning both agency and inhouse platforms.\n\nWe created personalised journeys for key audiences and supported content operations that grew as the team did.",
    metrics: [
      { value: "100%", label: "increase in content production capability" },
      { value: "5", label: "different content platforms reduced to a single headless CMS" },
      { value: "25%", label: "more traffic to a new consolidated site than the 2 it replaced" },
    ],
    testimonial:
      "A business critical transformation at a crucial time for us — they executed it brilliantly.",
    accentColor: "#ffd100",
  },
  {
    client: "Top 5 UK retailer",
    title: "Workarounds become the work",
    project:
      "Workflow assessment, agentic tool creation, training and change management",
    description: "The team was capable but the tools weren't serving them. A workflow assessment revealed that time which should have been spent on marketing was being lost to workarounds that had quietly become standard practice.\n\nWe redesigned the workflow, built agentic AI tools to eliminate the manual steps, and ran the change programme to embed new ways of working. Impact felt within six weeks:",
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
            className="group relative grid gap-10 border-b border-brand-dark/10 pb-16 last:border-0 last:pb-0 md:grid-cols-2"
          >
            {/* Left: info */}
            <div>
              <div
                className="mb-6 h-1 w-12 rounded-full"
                style={{ backgroundColor: study.accentColor }}
              />
              <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-grey">
                {study.title}
              </p>
              <h3 className="mb-8 font-display text-2xl font-bold leading-snug text-brand-dark lg:text-3xl">
                {study.project}
              </h3>
              <div className="mb-8 leading-relaxed text-brand-dark/70 whitespace-pre-line">
                {study.description}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6">
                {study.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="font-display text-4xl font-bold text-brand-dark">
                      {m.value}
                    </span>
                    <p className="mt-1 text-sm leading-snug text-brand-dark/50">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: testimonial */}
            <div className="flex flex-col justify-between text-right">
              <blockquote className="pt-10 font-display text-2xl font-medium italic leading-relaxed text-brand-dark/70 lg:text-3xl">
                &ldquo;{study.testimonial}&rdquo;
              </blockquote>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-grey">
                {study.client}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
