"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

interface OutcomeStudy {
  client: string
  title: string
  project: string
  description: string
  afterMetrics?: string
  metrics: { value: string; label: string }[]
  testimonial: string
  accentColor: string
}

const allCaseStudies: OutcomeStudy[] = [
  {
    client: "Top 5 retailer",
    title: "Workarounds had become the work",
    project: "Workflow redesign, agentic tools, training and change management",
    description:
      "The team was capable, but its tools weren't serving it. Time that should have gone on marketing was going on workarounds nobody questioned any more.\n\nWe redesigned the workflow, built agentic AI tools to take out the manual steps and ran the change programme with the team. The work got faster, and the team felt the difference within six weeks:",
    metrics: [
      { value: "100%", label: "team adoption" },
      { value: "1,300", label: "hours saved in year one" },
    ],
    afterMetrics:
      "Those hours went straight back into marketing. The team used them to get to grips with GEO, getting the brand ready for AI search while it was still an emerging discipline.",
    testimonial:
      "They demonstrated a great understanding of the way we work, and quickly delivered tech and tools as part of an evolved workflow.",
    accentColor: "#fc66a7",
  },
  {
    client: "Global home security company",
    title: "Campaigns too slow to catch the customer",
    project: "Email campaign workflow rebuilt across EMEA",
    description:
      "Customers were showing intent, but campaigns couldn't respond in time. Handovers between teams and platforms meant emails went out late, to the wrong segments, or not at all. The platform wasn't the problem. The workflow was.\n\nWe rebuilt the email workflow end to end. Campaign cycle time dropped from 3 weeks to 6 days, and:",
    metrics: [
      { value: "80%", label: "reduction in errors across 11 languages" },
      { value: "50%", label: "revenue increase in key campaigns" },
      { value: "14", label: "customer journeys replatformed in 4 weeks" },
    ],
    testimonial:
      "They've enabled us to get the results we always wanted out of an expensive, integrated system.",
    accentColor: "#ff8600",
  },
  {
    client: "Leading IT consultancy",
    title: "Flying blind on what's working",
    project: "Stack simplification and realignment / CX improvements",
    description:
      "The stack had grown but trust in the data hadn't. Decisions came down to instinct because nobody could rely on the dashboards. Journeys were breaking, and nobody noticed until customers had gone.\n\nWe simplified the stack, cleaned up the workflows so everyone knew who did what, and rebuilt the data flows. The confusion went, and the team got reporting it could act on:",
    metrics: [
      { value: "60%", label: "increase in customer identity resolution" },
      { value: "250%", label: "traffic growth through organic channels" },
      { value: "300%", label: "uplift to conversion rates on campaign forms" },
    ],
    testimonial:
      "They delivered a brilliant experience - great stakeholder mapping, flawless execution, and well-embedded adoption.",
    accentColor: "#ffd100",
  },
  {
    client: "Top 10 wealth and asset management company",
    title: "Five platforms, no single story",
    project: "Business transformation, web integration, and marketing team alignment",
    description:
      "IT and marketing had never worked together like this before. Content was spread across five platforms, split between agency and in-house teams.\n\nWe brought in a new composable stack with one design system, and redesigned the workflows around it so both teams could use it well. We built personalised journeys for key audiences and set up content operations that grew with the team. The team came out more confident, delivering faster and more consistently:",
    metrics: [
      { value: "100%", label: "increase in content production capability" },
      { value: "5", label: "different content platforms reduced to a single headless CMS" },
      { value: "25%", label: "more traffic to a new consolidated site than the 2 it replaced" },
    ],
    testimonial:
      "A business critical transformation at a crucial time for us - they executed it brilliantly.",
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
              <div className="mb-8 leading-relaxed text-brand-dark whitespace-pre-line">
                {study.description}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6">
                {study.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="font-display text-4xl font-bold text-brand-dark">
                      {m.value}
                    </span>
                    <p className="mt-1 text-sm leading-snug text-brand-dark">{m.label}</p>
                  </div>
                ))}
              </div>

              {study.afterMetrics ? (
                <div className="mt-8 leading-relaxed text-brand-dark">
                  {study.afterMetrics}
                </div>
              ) : null}
            </div>

            {/* Right: testimonial */}
            <div className="flex flex-col justify-between text-right">
              <blockquote className="pt-10 font-display text-2xl font-medium italic leading-relaxed text-brand-dark lg:text-3xl">
                &ldquo;{study.testimonial}&rdquo;
              </blockquote>
              <p className="mt-6 md:mt-0 text-xs font-semibold tracking-[0.15em] uppercase text-brand-grey">
                {study.client}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
