import type { Metadata } from "next"
import { HeroPhilosophy } from "@/components/approach/hero-philosophy"
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
      <MomentumSection />
      <PhilosophySection />
      <EngagementsSection />
      <CtaBand
        heading="Discuss which engagement is right for you"
        ctaLabel="Get in touch"
        background="yellow-deep"
      />
    </>
  )
}
