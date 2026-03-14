"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import BalloonPopIllustration from "@/components/illustrations/jigsaw"

export function OutcomesSection() {
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
        <div>
          <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Built for outcomes, not renewals.
          </h2>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-brand-dark">
              Most transformation programmes are designed to sell you a platform, not fix how you work. Over 40% of the average marketing budget goes on technology and the agencies that implement it. Less than a third reaches your customers. The recommendation is the implementation. The implementation is the licence. The licence is the lock-in.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              We're platform-agnostic. No tech tie-ins. No renewal cycles to protect. Your operating model gets shaped around your team's needs, not someone else's contract terms.
            </p>
          </div>
        </div>
        <div className="relative flex h-auto lg:min-h-[32rem] items-center justify-center overflow-hidden rounded-lg bg-[#e3dcdc]">
          <div className="w-full scale-130 origin-center max-h-[250px] lg:max-h-none overflow-hidden">
            <BalloonPopIllustration />
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
