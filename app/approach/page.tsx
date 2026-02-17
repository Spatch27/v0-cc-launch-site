import type { Metadata } from "next"
import { ApproachHero } from "@/components/approach/approach-hero"
import { FrameworkSection } from "@/components/approach/framework-section"
import { ProductTeamSection } from "@/components/approach/product-team-section"
import { DifferentiatorsSection } from "@/components/approach/differentiators-section"
import { ProductsSection } from "@/components/approach/products-section"
import { CtaBand } from "@/components/cta-band"

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Our operating model, frameworks, and delivery approach. See how we remove operational drag from marketing teams.",
}

export default function ApproachPage() {
  return (
    <>
      <ApproachHero />
      <FrameworkSection />
      <ProductTeamSection />
      <DifferentiatorsSection />
      <ProductsSection />
      <CtaBand
        heading="Want to talk through a challenge?"
        background="yellow-deep"
      />
    </>
  )
}
