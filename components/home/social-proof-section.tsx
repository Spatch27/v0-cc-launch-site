"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { CaseStudyCards, type CaseStudy } from "@/components/case-study-cards"

const caseStudies: CaseStudy[] = [
  {
    client: "Global home security company",
    project: "Email marketing workflow re-engineering across EMEA",
    metrics: [
      { value: "57%", label: "Improvement in CTR" },
      { value: "25%", label: "Increase in CTOR" },
      { value: "15%", label: "Decrease in bounce rates" },
    ],
    testimonial:
      "They\u2019ve enabled us to get the results we always wanted out of an expensive, integrated system.",
    accentColor: "pink",
  },
  {
    client: "Leading IT consultancy",
    project: "Stack simplification and realignment / CX improvements",
    metrics: [
      { value: "22%", label: "Reduction in journey breaks" },
      { value: "12%", label: "Increase in page conversions" },
    ],
    testimonial:
      "They delivered a brilliant experience \u2014 great stakeholder mapping, flawless execution, and well-embedded adoption.",
    accentColor: "orange",
  },
  {
    client: "Top 10 wealth and asset management company",
    project: "Business transformation, web integration, and marketing team alignment",
    metrics: [
      { value: "30%", label: "Reduction in workarounds" },
      { value: "57%", label: "Licence fee reduction" },
    ],
    testimonial:
      "A business critical transformation at a crucial time for us \u2014 they executed it brilliantly.",
    accentColor: "yellow-deep",
  },
]

export function SocialProofSection() {
  return (
    <Section background="dark">
      <div className="mb-16 flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        <motion.div variants={fadeInUp} className="lg:w-1/4">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
            Results
          </span>
        </motion.div>
        <motion.div variants={fadeInUp} className="lg:w-3/4">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-white md:text-5xl">
            Proof, not promises.
          </h2>
        </motion.div>
      </div>
      <CaseStudyCards studies={caseStudies} limit={3} />
    </Section>
  )
}
