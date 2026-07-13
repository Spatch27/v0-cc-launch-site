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
              AI has made drafts, decks and variants cheaper and faster. The bottleneck has simply moved to the judgement layer. We put AI to work where it can shorten cycles and improve the result.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              Sometimes the answer is a better way of working. Sometimes it is a specific tool. We are free to recommend the solution that answers the problem.
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
