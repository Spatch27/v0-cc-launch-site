import { HeroSection } from "@/components/home/hero-section"
import { AnimatedTypeSection } from "@/components/home/animated-type-section"
import { WhatLooksLikeSection } from "@/components/home/what-looks-like-section"
import { WhatFeelsLikeSection } from "@/components/home/what-feels-like-section"
import { CtaBand } from "@/components/cta-band"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnimatedTypeSection />
      <WhatLooksLikeSection />
      <WhatFeelsLikeSection />
      <CtaBand
        heading="Let's talk about what's slowing your team down."
        background="pink"
      />
    </>
  )
}
