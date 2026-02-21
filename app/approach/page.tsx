import type { Metadata } from "next"
import { HeroPhilosophy } from "@/components/approach/hero-philosophy"
import { PhilosophySection } from "@/components/approach/philosophy-section"
import { EngagementsSection } from "@/components/approach/engagements-section"
import { CheckpointSection } from "@/components/approach/checkpoint-section"
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
      <PhilosophySection />
      <EngagementsSection />
      <CheckpointSection />
      <CtaBand
        heading="Discuss which engagement is right for you"
        ctaLabel="Get in touch"
        background="yellow-deep"
      />
    </>
  )
}
