import type { Metadata } from "next"
import { HeroPhilosophy } from "@/components/approach/hero-philosophy"
import { WorkflowsBehaviourSection } from "@/components/approach/workflows-behaviour-section"
import { AIPropellantSection } from "@/components/approach/ai-propellant-section"
import { OutcomesSection } from "@/components/approach/outcomes-section"
import { ApproachPhilosophySection } from "@/components/approach/approach-philosophy-section"
import { PhilosophySection } from "@/components/approach/philosophy-section"
import { MomentumSection } from "@/components/approach/momentum-section"
import { EngagementsSection } from "@/components/approach/engagements-section"
import { CtaBand } from "@/components/cta-band"

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Our people-first philosophy and operating model. We help your team build sustainable transformation through product team practices.",
}

export default function ApproachPage() {
  return (
    <>
      <HeroPhilosophy />
      <WorkflowsBehaviourSection />
      <AIPropellantSection />
      <OutcomesSection />
      <ApproachPhilosophySection />
      <MomentumSection />
      <PhilosophySection />
      <EngagementsSection />
      <CtaBand
        heading="Before committing a budget, commit an hour."
        body={[
          "One free hour. A two-page view of where to begin within 48 hours. Then a six-week cycle focused on a result your team can feel and your business can measure.",
          "Getting started is zero-risk: the Waypoint is free, and if you cannot feel a difference two weeks into your first cycle, we refund everything you’ve spent so far. Guaranteed."
        ]}
        ctaLabel="Book your Waypoint"
        ctaHref="/contact#book"
        background="yellow-deep"
      />
    </>
  )
}
