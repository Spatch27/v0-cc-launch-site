"use client"

import { lazy, Suspense, type ComponentType, type ReactNode } from "react"
import { LazySection } from "@/components/lazy-section"

const BuriedSection = lazy(() =>
  import("@/components/home/buried-section").then((module) => ({ default: module.BuriedSection })),
)
const AnimatedTypeSection = lazy(() =>
  import("@/components/home/animated-type-section").then((module) => ({ default: module.AnimatedTypeSection })),
)
const MomentumSection = lazy(() =>
  import("@/components/home/momentum-section").then((module) => ({ default: module.MomentumSection })),
)
const WhatLooksLikeSection = lazy(() =>
  import("@/components/home/what-looks-like-section").then((module) => ({ default: module.WhatLooksLikeSection })),
)
const WhatFeelsLikeSection = lazy(() =>
  import("@/components/home/what-feels-like-section").then((module) => ({ default: module.WhatFeelsLikeSection })),
)
const CtaBand = lazy(() =>
  import("@/components/cta-band").then((module) => ({ default: module.CtaBand as ComponentType<CtaProps> })),
)

type CtaProps = {
  heading: string
  body: string[]
  ctaLabel: string
  ctaHref: string
  background: "pink"
}

function DeferredSection({
  minHeight,
  children,
  rootMargin = "350px",
}: {
  minHeight: string
  children: ReactNode
  rootMargin?: string
}) {
  return (
    <LazySection minHeight={minHeight} rootMargin={rootMargin}>
      <Suspense fallback={null}>{children}</Suspense>
    </LazySection>
  )
}

export function DeferredHomeSections() {
  return (
    <>
      <DeferredSection minHeight="700px" rootMargin="0px">
        <BuriedSection />
      </DeferredSection>
      <DeferredSection minHeight="600px">
        <AnimatedTypeSection />
      </DeferredSection>
      <DeferredSection minHeight="900px">
        <MomentumSection />
      </DeferredSection>
      <DeferredSection minHeight="700px">
        <WhatLooksLikeSection />
      </DeferredSection>
      <DeferredSection minHeight="700px">
        <WhatFeelsLikeSection />
      </DeferredSection>
      <DeferredSection minHeight="500px">
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
      </DeferredSection>
    </>
  )
}
