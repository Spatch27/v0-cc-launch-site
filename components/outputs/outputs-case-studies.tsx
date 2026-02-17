"use client"

import { Section } from "@/components/section"
import { CaseStudyCards, type CaseStudy } from "@/components/case-study-cards"

const allCaseStudies: CaseStudy[] = [
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
    project:
      "Business transformation, web integration, and marketing team alignment. Impact over 12 weeks.",
    metrics: [
      { value: "30%", label: "Reduction in workarounds" },
      { value: "57%", label: "Licence fee reduction" },
    ],
    testimonial:
      "A business critical transformation at a crucial time for us \u2014 they executed it brilliantly.",
    accentColor: "yellow-deep",
  },
  {
    client: "Top 5 UK retailer",
    project:
      "Workflow assessment, tool creation, training and change management programme. Impact felt within 6 weeks.",
    metrics: [
      { value: "100%", label: "Team adoption" },
      { value: "1,300", label: "Man-hours saved in Year 1" },
    ],
    testimonial:
      "They demonstrated a great understanding of the way we work, and quickly delivered tech and tools as part of an evolved workflow.",
    accentColor: "yellow-light",
  },
]

export function OutputsCaseStudies() {
  return (
    <Section background="light">
      <CaseStudyCards studies={allCaseStudies} />
    </Section>
  )
}
