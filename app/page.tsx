import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { BuriedSection } from "@/components/home/buried-section"
import { AnimatedTypeSection } from "@/components/home/animated-type-section"
import { MomentumSection } from "@/components/home/momentum-section"
import { WhatLooksLikeSection } from "@/components/home/what-looks-like-section"
import { WhatFeelsLikeSection } from "@/components/home/what-feels-like-section"
import { CtaBand } from "@/components/cta-band"
import { LazySection } from "@/components/lazy-section"

export const metadata: Metadata = {
  title: "Marketing Operations Consultancy | Committed Citizens UK",
  description:
    "Marketing operations and transformation consultancy for CMOs. We help marketing teams remove operational drag and streamline workflows through embedded consulting and product team practices.",
  openGraph: {
    title: "Marketing Operations Consultancy | Committed Citizens",
    description:
      "Marketing operations and transformation consultancy for CMOs. We help marketing teams remove operational drag and streamline workflows.",
    url: "https://committedcitizens.co.uk",
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
      
      {/* Below the fold - lazy load for better initial performance */}
      <LazySection minHeight="600px" rootMargin="300px">
        <AnimatedTypeSection />
      </LazySection>
      
      <LazySection minHeight="500px" rootMargin="200px">
        <MomentumSection />
      </LazySection>

      <LazySection minHeight="400px" rootMargin="200px">
        <WhatLooksLikeSection />
      </LazySection>
      
      <LazySection minHeight="300px" rootMargin="200px">
        <WhatFeelsLikeSection />
      </LazySection>
      
      <LazySection minHeight="300px" rootMargin="200px">
        <CtaBand
          heading="Not sure where to start? Start here."
          body={[
            "Waypoint is a free 60-minute session. No pitch. No audit. Just a conversation about your business, your team and the drag getting in their way.",
            "Within 48 hours, you receive a two-page Waypoint Marker: a clear view of what is holding you back and where to begin, written in board-ready language for a budget conversation. It is yours to keep, whether we work together or not."
          ]}
          ctaLabel="Book your Waypoint"
          ctaHref="/contact#book"
          background="pink"
        />
      </LazySection>
    </>
  )
}
