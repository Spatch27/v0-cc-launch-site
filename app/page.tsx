import { HeroSection } from "@/components/home/hero-section"
import { BuriedSection } from "@/components/home/buried-section"
import { AnimatedTypeSection } from "@/components/home/animated-type-section"
import { MomentumSection } from "@/components/home/momentum-section"
import { WhatFeelsLikeSection } from "@/components/home/what-feels-like-section"
import { CtaBand } from "@/components/cta-band"
import { LazySection } from "@/components/lazy-section"

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
      
      <LazySection minHeight="300px" rootMargin="200px">
        <WhatFeelsLikeSection />
      </LazySection>
      
      <LazySection minHeight="300px" rootMargin="200px">
        <CtaBand
          heading="Before you commit a budget, commit an hour."
          body={[
            "Waypoint is a free 60-minute working session. The hour is spent on your business, your team and the drag getting in their way.",
            "Within 48 hours, you receive a two-page Waypoint Marker: a clear view of what is holding you back and where to begin, written in language you can take into a budget conversation. It is yours to keep, whether we work together or not."
          ]}
          ctaLabel="Book your Waypoint"
          ctaHref="/contact#book"
          background="pink"
        />
      </LazySection>
    </>
  )
}
