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
  openGraph: {
    title: "Approach | Committed Citizens",
    description: "Our people-first philosophy and operating model. We help your team build sustainable transformation through product team practices.",
    url: "https://committedcitizens.co.uk/approach",
    type: "website",
    locale: "en_GB",
    siteName: "Committed Citizens",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Committed Citizens - Approach",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Approach | Committed Citizens",
    description: "Our people-first philosophy and operating model. We help your team build sustainable transformation through product team practices.",
    images: ["/og-image.jpg"],
  },
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
          "Book a free Waypoint - a structured 60-minute conversation that shows you exactly where operational drag is costing you the most."
        ]}
        ctaLabel="Book your Waypoint"
        ctaHref="/contact#book"
        background="yellow-deep"
      />
    </>
  )
}
