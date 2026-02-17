import type { Metadata } from "next"
import { AboutHero } from "@/components/about/about-hero"
import { PurposeSection } from "@/components/about/purpose-section"
import { TeamSection } from "@/components/about/team-section"
import { AdvisorySection } from "@/components/about/advisory-section"
import { CultureSection } from "@/components/about/culture-section"
import { CtaBand } from "@/components/cta-band"

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Committed Citizens exists. Meet our founders and advisory board.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <PurposeSection />
      <TeamSection />
      <AdvisorySection />
      <CultureSection />
      <CtaBand heading="Say hello" background="pink" />
    </>
  )
}
