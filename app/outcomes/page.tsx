import type { Metadata } from "next"
import { OutcomesHero } from "@/components/outcomes/outcomes-hero"
import { OutcomesCaseStudies } from "@/components/outcomes/outcomes-case-studies"
import { CtaBand } from "@/components/cta-band"
import { canonicalAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Marketing Transformation Results",
  description:
    "See how our marketing operations consulting delivers measurable outcomes. Real results from marketing transformation and operational efficiency improvements for UK marketing teams.",
  alternates: canonicalAlternates("/outcomes"),
  openGraph: {
    title: "Outcomes | Committed Citizens",
    description: "Proof that we deliver. Tangible evidence of operational uplift across marketing teams.",
    url: "https://www.committedcitizens.co.uk/outcomes",
    type: "website",
    locale: "en_GB",
    siteName: "Committed Citizens",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Committed Citizens - Outcomes",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outcomes | Committed Citizens",
    description: "Proof that we deliver. Tangible evidence of operational uplift across marketing teams.",
    images: ["/og-image.jpg"],
  },
}

export default function OutcomesPage() {
  return (
    <>
      <OutcomesHero />
      <OutcomesCaseStudies />
      <CtaBand
        heading="See how we'd approach your challenge."
        body={[
          "Waypoint is a free 60-minute session with the founders. No pitch. We do the homework on your business first, so the hour goes on your team, your ambitions and the best place to start.",
          "Within 48 hours you get a two-page Waypoint Marker: where your function stands, the campaign to start with and where AI can make it better. It's yours to keep, whether we work together or not.",
        ]}
        ctaLabel="Book your Waypoint"
        ctaHref="/contact#book"
        background="orange"
      />
    </>
  )
}
