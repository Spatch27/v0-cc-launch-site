import type { Metadata } from "next"
import { OutcomesHero } from "@/components/outcomes/outcomes-hero"
import { OutcomesCaseStudies } from "@/components/outcomes/outcomes-case-studies"
import { CtaBand } from "@/components/cta-band"

export const metadata: Metadata = {
  title: "Outcomes",
  description:
    "Proof that we deliver. Tangible evidence of operational uplift across marketing teams.",
}

export default function OutcomesPage() {
  return (
    <>
      <OutcomesHero />
      <OutcomesCaseStudies />
      <CtaBand
        heading="Let's talk about what's slowing your team down."
        background="orange"
      />
    </>
  )
}
