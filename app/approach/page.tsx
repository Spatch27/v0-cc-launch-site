import type { Metadata } from "next"
import { HeroPhilosophy } from "@/components/approach/hero-philosophy"
import { FourPillarsSection } from "@/components/approach/four-pillars-section"
import { WorkflowsBehaviourSection } from "@/components/approach/workflows-behaviour-section"
import { AIPropellantSection } from "@/components/approach/ai-propellant-section"
import { OutcomesSection } from "@/components/approach/outcomes-section"
import { ApproachPhilosophySection } from "@/components/approach/approach-philosophy-section"
import { PhilosophySection } from "@/components/approach/philosophy-section"
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
      <FourPillarsSection />
      <WorkflowsBehaviourSection />
      <AIPropellantSection />
      <OutcomesSection />
      <ApproachPhilosophySection />
      <PhilosophySection />
      <EngagementsSection />
      <CtaBand
        heading="Before committing a budget, commit an hour."
        description="Not sure where to start? Schedule your Waypoint – and we'll build the session to ensure it's the most valuable hour of your next week."
        ctaLabel="Book Your Waypoint"
        ctaHref="/contact#book"
        background="yellow-deep"
      />
    </>
  )
}
