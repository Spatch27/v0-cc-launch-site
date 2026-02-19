import { HeroSection } from "@/components/home/hero-section"
import { WaitlistSection } from "@/components/home/waitlist-section"
import { ProblemSection } from "@/components/home/problem-section"
import { PainSection } from "@/components/home/pain-section"
import { WhatChangesSection } from "@/components/home/what-changes-section"
import { SocialProofSection } from "@/components/home/social-proof-section"
import { InsightsPreviewSection } from "@/components/home/insights-preview-section"
import { CtaBand } from "@/components/cta-band"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WaitlistSection />
      <ProblemSection />
      <PainSection />
      <WhatChangesSection />
      <SocialProofSection />
      <InsightsPreviewSection />
      <CtaBand
        heading="Want to see results in six weeks?"
        background="pink"
      />
    </>
  )
}
