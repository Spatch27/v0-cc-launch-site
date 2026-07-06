import { HeroSection } from "@/components/home/hero-section"
import { BuriedSection } from "@/components/home/buried-section"
import { PeopleSection } from "@/components/home/people-section"
import { AnimatedTypeSection } from "@/components/home/animated-type-section"
import { MomentumSection } from "@/components/home/momentum-section"
import { WhatLooksLikeSection } from "@/components/home/what-looks-like-section"
import { WhatFeelsLikeSection } from "@/components/home/what-feels-like-section"
import { CtaBand } from "@/components/cta-band"
import { LazySection } from "@/components/lazy-section"

export default function HomePage() {
  return (
    <>
      {/* Above the fold - render immediately for fast LCP */}
      <HeroSection />
      <BuriedSection />

      <PeopleSection />
      
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
          heading="Momentum starts with a single move."
          body={[
            "Waypoint is a free 60-minute session. An open, honest conversation, backed by research – one hour spent on you, not on the state of the industry. Everyone's telling you where marketing is heading. But nobody's helping you work out what to do about it right now.",
            "Within 48 hours you get your Waypoint Marker: a two-page view of where you're being held back and what to focus on first. Board-ready language for a budget conversation – yours to keep, whether we work together or not."
          ]}
          ctaLabel="Book Your Waypoint"
          ctaHref="/contact#book"
          background="pink"
        />
      </LazySection>
    </>
  )
}
