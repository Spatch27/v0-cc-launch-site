import { HeroSection } from "@/components/home/hero-section"
import { BuriedSection } from "@/components/home/buried-section"
import { AnimatedTypeSection } from "@/components/home/animated-type-section"
import { MomentumSection } from "@/components/home/momentum-section"
import { WhatLooksLikeSection } from "@/components/home/what-looks-like-section"
import { WhatFeelsLikeSection } from "@/components/home/what-feels-like-section"
import { CtaBand } from "@/components/cta-band"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BuriedSection />
      <AnimatedTypeSection />
      <MomentumSection />
      <WhatLooksLikeSection />
      <WhatFeelsLikeSection />
      <CtaBand
        heading="Not sure where to start? Start here."
        body={[
          "The Drag Diagnostic is a free 60-minute session. No pitch. No audit. Just a structured conversation about where operational drag is costing you the most — and what to fix first.",
          "You'll walk away with a Flow Map: a single-page view of where friction is concentrated, what it's costing you, and which fix would yield the fastest return. Board-ready language for a budget conversation, not a feelings conversation. Yours to keep, whether or not we work together."
        ]}
        ctaLabel="Book a Drag Diagnostic"
        ctaHref="/contact#book"
        background="pink"
      />
    </>
  )
}
