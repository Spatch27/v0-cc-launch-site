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

function metricsGridClass(count: number) {
  if (count === 4) return "grid grid-cols-2 gap-6 xl:grid-cols-4"
  if (count === 2) return "grid grid-cols-2 gap-6"
  return "grid grid-cols-2 gap-6 md:grid-cols-3"
}

const allCaseStudies: OutcomeStudy[] = [
  {
    client: "Top 5 retailer",
    title: "Workarounds had become the work",
    project: "Workflow redesign, AI-assisted reporting, training and change management",
    description:
      "The team was capable, but its tools weren't serving it. Time that should have gone on marketing was going on workarounds nobody questioned any more.\n\nWe mapped how the work really got done, redesigned the workflow, then built a system that used AI to pull together first and third-party data and present it in a form the team could act on. It went from days of manual assembly to something that ran itself. The team felt the difference within six weeks:",
    metrics: [
      { value: "100%", label: "weekly active use, across both teams" },
      { value: "1,300", label: "hours returned in year one (estimated)" },
    ],
    afterMetrics:
      "Those hours went straight back into marketing. The team used them to get to grips with GEO, getting the brand ready for AI search while it was still an emerging discipline. It was also their first reliable use of AI on a repeatable task, which is what moved it from proof of concept to something they trusted enough to build on.",
    testimonial:
      "They demonstrated a great understanding of the way we work, and quickly delivered tech and tools as part of an evolved workflow.",
    accentColor: "#fc66a7",
  },
  {
    client: "Global home security company",
    title: "Campaigns too slow to catch the customer",
    project: "Email campaign workflow rebuilt across Europe",
    description:
      "Customers were showing intent, but campaigns couldn't respond in time. The platform had been installed on the assumption it would run cleanly on its own, so people worked round it. Emails went out late, to the wrong segments, or not at all.\n\nWe rebuilt the workflow end to end, moved the journeys from batch sends to intent-triggered, and built a loop that fed campaign results back into the copywriting so each campaign learned from the last. Campaign cycle time dropped from 3 weeks to 6 days, and:",
    metrics: [
      { value: "80%", label: "reduction in errors across 11 languages" },
      { value: "50%", label: "revenue increase on Black Friday, like for like" },
      { value: "14", label: "customer journeys replatformed in 4 weeks" },
    ],
    afterMetrics:
      "The copy loop kept improving after we left. Because the workflow held, the AI inside it had something reliable to learn from.",
    testimonial:
      "They've enabled us to get the results we always wanted out of an expensive, integrated system.",
    accentColor: "#ff8600",
  },
  {
    client: "Leading IT consultancy",
    title: "Flying blind on what's working",
    project: "Stack simplification, data flows rebuilt, platform AI put to work",
    description:
      "The stack had grown but trust in the data hadn't. Decisions came down to instinct because nobody could rely on the dashboards. Journeys were breaking, and nobody noticed until customers had gone.\n\nWe simplified the stack, rebuilt the data flows and fixed identity resolution, then rewrote the workflows so ownership was clear and the platform's own AI features could actually be used. That last part is the bit most implementations skip, and it's why the AI in most platforms sits idle:",
    metrics: [
      { value: "60%", label: "increase in customer identity resolution" },
      { value: "250%", label: "traffic growth through organic channels, in six months" },
      { value: "300%", label: "uplift to conversion rates on campaign forms" },
      { value: "57%", label: "reduction in licence fees, within 12 weeks" },
    ],
    afterMetrics:
      "We didn't build the AI here. We built the conditions in which it worked.",
    testimonial:
      "They delivered a brilliant experience - great stakeholder mapping, flawless execution, and well-embedded adoption.",
    accentColor: "#ffd100",
  },
  {
    client: "Top 10 wealth and asset management company",
    title: "Five platforms, no single story",
    project: "Business transformation, web integration, and marketing team alignment",
    description:
      "IT and marketing had never worked together like this before. Content was spread across five platforms, split between agency and in-house teams, and the brand looked different depending on where you landed.\n\nWe brought in a new composable stack with one design system, and redesigned the workflows around it so both teams could use it well. We built personalised journeys for key audiences and set up content operations that grew with the team. The harder win was earning IT's trust in a marketing partner, which is what made the rest possible:",
    metrics: [
      { value: "5→11", label: "pages a month, same team" },
      { value: "5→1", label: "content platforms to one headless CMS" },
      { value: "25%", label: "more traffic to the new consolidated site than the 2 it replaced" },
    ],
    afterMetrics:
      "Structured content in a headless stack with one design system is the foundation for content at machine speed. They have it, and they own it.",
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
              <div className={metricsGridClass(study.metrics.length)}>
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
