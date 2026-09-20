import type { Metadata } from "next"
import { HeroPhilosophy } from "@/components/approach/hero-philosophy"
import { WorkflowsBehaviourSection } from "@/components/approach/workflows-behaviour-section"
import { AIPropellantSection } from "@/components/approach/ai-propellant-section"
import { OutcomesSection } from "@/components/approach/outcomes-section"
import { PhilosophySection } from "@/components/approach/philosophy-section"
import { MomentumSection } from "@/components/approach/momentum-section"
import { EngagementsSection } from "@/components/approach/engagements-section"
import { CtaBand } from "@/components/cta-band"
import { canonicalAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Marketing Transformation Approach | One Campaign at a Time",
  description:
    "We redesign how marketing works with CMOs and their teams, one campaign at a time. Six-week cycles, AI as a propellant, and a product-team operating model that builds the confidence to go further.",
  alternates: canonicalAlternates("/approach"),
  openGraph: {
    title: "Approach | Committed Citizens",
    description: "Pick one campaign. Start there. We redesign marketing workflows with AI as a propellant — six weeks at a time.",
    url: "https://www.committedcitizens.co.uk/approach",
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
    description: "Pick one campaign. Start there. We redesign marketing workflows with AI as a propellant — six weeks at a time.",
    images: ["/og-image.jpg"],
  },
}

export default function ApproachPage() {
  return (
    <>
      <style>{`
        .cc-approach-paired-section {
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
        }
      `}</style>
      <HeroPhilosophy />
      <WorkflowsBehaviourSection />
      <AIPropellantSection />
      <OutcomesSection />
      <MomentumSection />
      <PhilosophySection />
      <EngagementsSection />
      <CtaBand
        heading="Before committing a budget, commit an hour."
        body={[
          "Book a free Waypoint: 60 minutes with the founders to find the campaign to start with and where AI can make it better.",
        ]}
        ctaLabel="Book your Waypoint"
        ctaHref="/contact#book"
        background="yellow-deep"
      />
    </>
  )
}
