"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import RocketWobbleIllustration from "@/components/illustrations/rocket-wobble"

export function AIPropellantSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <Section background="light" compact>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="grid items-center gap-4 lg:gap-12 lg:grid-cols-2"
      >
        <div className="relative lg:order-first order-last flex h-auto min-h-[300px] lg:min-h-[32rem] items-center justify-center overflow-hidden rounded-lg bg-[#e3dcdc]">
          <div className="w-full origin-center">
            <RocketWobbleIllustration />
          </div>
        </div>
        <div className="order-first lg:order-last">
          <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            AI as a propellant.
          </h2>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-brand-dark">
              AI has made producing things cheap – drafts, decks, variants – which moves the bottleneck up to the judgement layer. So we ready the workflows, data and decision rights first, then put agents to work where they genuinely shorten cycles. Because we don&apos;t sell specific AI solutions, we can be honest about where it works.
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
