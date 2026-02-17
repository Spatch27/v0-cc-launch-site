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
      <div className="mb-12">
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-pink"
        >
          Results
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-balance font-display text-3xl font-bold text-brand-white md:text-5xl"
        >
          Proof, not promises
        </motion.h2>
      </div>
      <CaseStudyCards studies={caseStudies} limit={3} />
    </Section>
  )
}
