import type { Metadata } from "next"
import { OutcomesHero } from "@/components/outcomes/outcomes-hero"
import { OutcomesCaseStudies } from "@/components/outcomes/outcomes-case-studies"
import { CtaBand } from "@/components/cta-band"

export const metadata: Metadata = {
  title: "Outcomes",
  description:
    "Proof that we deliver. Tangible evidence of operational uplift across marketing teams.",
  openGraph: {
    title: "Outcomes | Committed Citizens",
    description: "Proof that we deliver. Tangible evidence of operational uplift across marketing teams.",
    url: "https://committedcitizens.co.uk/outcomes",
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
          "Waypoint is a free 60-minute working session. The hour is spent on your business, your team and the drag getting in their way.",
          "Within 48 hours, you receive a two-page Waypoint Marker: a clear view of what is holding you back and where to begin, written in language you can take into a budget conversation. It is yours to keep, whether we work together or not."
        ]}
        ctaLabel="Book your Waypoint"
        ctaHref="/contact#book"
        background="orange"
      />
    </>
  )
}
