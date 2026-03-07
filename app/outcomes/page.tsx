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
        heading="See how we'd approach your challenge."
        description="Book a free Drag Diagnostic - 60 minutes, no pitch, and you'll walk away with a clear picture of what to fix first."
        ctaLabel="Book a Drag Diagnostic"
        background="orange"
      />
    </>
  )
}
