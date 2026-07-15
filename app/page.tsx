import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { BuriedSection } from "@/components/home/buried-section"
import { DeferredHomeSections } from "@/components/home/deferred-sections"

export const metadata: Metadata = {
  title: "Marketing Operations Consultancy | Committed Citizens UK",
  description:
    "Marketing operations and transformation consultancy for CMOs. We help marketing teams remove operational drag and streamline workflows through embedded consulting and product team practices.",
  openGraph: {
    title: "Marketing Operations Consultancy | Committed Citizens",
    description:
      "Marketing operations and transformation consultancy for CMOs. We help marketing teams remove operational drag and streamline workflows.",
    url: "https://www.committedcitizens.co.uk",
    type: "website",
    locale: "en_GB",
    siteName: "Committed Citizens",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Committed Citizens - Freedom from drag",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Committed Citizens | Freedom from drag",
    description:
      "We redesign how marketing work flows. An embedded consultancy that helps CMOs remove operational drag from their marketing teams.",
    images: ["/og-image.jpg"],
  },
}

export default function HomePage() {
  return (
    <>
      {/* Above the fold - render immediately for fast LCP */}
      <HeroSection />
      <BuriedSection />

      {/* Below the fold - code-split and mounted shortly before scrolling into view */}
      <DeferredHomeSections />
    </>
  )
}
