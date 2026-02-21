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
      {/* Full-viewport-width image */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-12">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/red-zeppelin-Ay2PtJjOqos-unsplash-vUHj2qivOSVTrWKgIlJbBrI1a9A9J2.jpg"
          alt="Scenic tower overlooking valley landscape"
          className="w-full h-96 object-cover"
        />
      </div>
      <CultureSection />
      <TeamSection />
      <AdvisorySection />
      <CtaBand heading="Want to talk through a challenge?" background="pink" />
    </>
  )
}
