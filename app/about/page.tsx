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
      <section className="relative w-screen h-[600px] -mx-6 lg:-mx-12 flex items-center justify-center overflow-hidden">
        <img
          src="/images/about-quote-bg.jpg"
          alt="Boat on water"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-6 lg:px-12 mx-auto max-w-4xl text-center">
          <blockquote className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#FFD100]">
            "Never doubt that a small group of thoughtful, committed citizens can change the world. In fact, it's the only thing that ever has."
          </blockquote>
          <p className="mt-8 text-base md:text-lg font-medium text-[#FFD100]">
            — Margaret Mead
          </p>
        </div>
      </section>
      {/* Full-viewport-width image */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/P1000737-4-DlltoCjcAMPIrtcyQx1FpNnM5hxanl.jpg"
          alt="Two men standing on beach promenade overlooking coastal landscape"
          className="w-full h-[500px] object-cover object-right-top md:object-top"
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
