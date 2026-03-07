import type { Metadata } from "next"
import { HeroPhilosophy } from "@/components/approach/hero-philosophy"
import { AIPropellantSection } from "@/components/approach/ai-propellant-section"
import { OutcomesSection } from "@/components/approach/outcomes-section"
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
      <AIPropellantSection />
      <OutcomesSection />
      <MomentumSection />
      <PhilosophySection />
      <EngagementsSection />
      <CtaBand
        heading="Before committing a budget, commit an hour."
        description="Book a free Drag Diagnostic - a structured 60-minute conversation that shows you exactly where operational drag is costing you the most."
        ctaLabel="Book a Drag Diagnostic"
        background="yellow-deep"
      />
    </>
  )
}
