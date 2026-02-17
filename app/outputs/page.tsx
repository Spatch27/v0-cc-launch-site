import type { Metadata } from "next"
import { OutputsHero } from "@/components/outputs/outputs-hero"
import { OutputsCaseStudies } from "@/components/outputs/outputs-case-studies"
import { CtaBand } from "@/components/cta-band"

export const metadata: Metadata = {
  title: "Outputs",
  description:
    "Proof that we deliver. Tangible evidence of operational uplift across marketing teams.",
}

export default function OutputsPage() {
  return (
    <>
      <OutputsHero />
      <OutputsCaseStudies />
      <CtaBand
        heading="Let\u2019s talk about what\u2019s slowing your team down."
        background="orange"
      />
    </>
  )
}
