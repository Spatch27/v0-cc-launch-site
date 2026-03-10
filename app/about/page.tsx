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
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/P1000737-4-xZ24xj852BfBuyXy9BzyT6AKZl0hKl.jpg"
          alt="Two men standing on beach promenade overlooking coastal landscape"
          className="w-full h-[500px] object-cover object-top"
        />
      </div>
      <CultureSection />
      <TeamSection />
      <AdvisorySection />
      <CtaBand 
        heading="Want to meet the team? Start with a conversation." 
        body={[
          "Book a free Drag Diagnostic - 60 minutes with the founders, focused on where your drag is and what to do about it first."
        ]}
        ctaLabel="Book a Drag Diagnostic"
        background="pink" 
      />
    </>
  )
}
