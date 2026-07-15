"use client"

import dynamic from "next/dynamic"
import { LazySection } from "@/components/lazy-section"

const AnimatedTypeSection = dynamic(
  () => import("@/components/home/animated-type-section").then((module) => module.AnimatedTypeSection),
  { ssr: false }
)
const MomentumSection = dynamic(
  () => import("@/components/home/momentum-section").then((module) => module.MomentumSection),
  { ssr: false }
)
const WhatLooksLikeSection = dynamic(
  () => import("@/components/home/what-looks-like-section").then((module) => module.WhatLooksLikeSection),
  { ssr: false }
)
const WhatFeelsLikeSection = dynamic(
  () => import("@/components/home/what-feels-like-section").then((module) => module.WhatFeelsLikeSection),
  { ssr: false }
)
const CtaBand = dynamic(
  () => import("@/components/cta-band").then((module) => module.CtaBand),
  { ssr: false }
)

export function DeferredHomeSections() {
  return (
    <>
      <LazySection minHeight="600px" rootMargin="500px">
        <AnimatedTypeSection />
      </LazySection>
      <LazySection minHeight="900px" rootMargin="500px">
        <MomentumSection />
      </LazySection>
      <LazySection minHeight="700px" rootMargin="500px">
        <WhatLooksLikeSection />
      </LazySection>
      <LazySection minHeight="700px" rootMargin="500px">
        <WhatFeelsLikeSection />
      </LazySection>
      <LazySection minHeight="500px" rootMargin="500px">
        <CtaBand
          heading="Not sure where to start? Start here."
          body={[
            "Waypoint is a free 60-minute session. No pitch. No audit. Just a conversation about your business, your team and the drag getting in their way.",
            "Within 48 hours, you receive a two-page Waypoint Marker: a clear view of what is holding you back and where to begin, written in board-ready language for a budget conversation. It is yours to keep, whether we work together or not.",
          ]}
          ctaLabel="Book your Waypoint"
          ctaHref="/contact#book"
          background="pink"
        />
      </LazySection>
    </>
  )
}
