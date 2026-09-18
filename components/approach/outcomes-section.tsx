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
    <Section background="light" compact className="cc-approach-paired-section">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="grid items-center gap-4 lg:gap-12 lg:grid-cols-2"
      >
        <div>
          <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Built for outcomes.
          </h2>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-brand-dark">
              Before we build we agree what success looks like. We measure against the starting point, and we distinguish the observable change from business results that take longer to land. Saved time is capacity; we look at how it gets used before claiming a return.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              We have no platform to sell and no licences to protect. Your workflows get shaped around what your business needs, not someone else&apos;s contract terms.
            </p>
          </div>
        </div>
        <div className="relative flex h-auto lg:min-h-[32rem] items-center justify-center overflow-hidden rounded-lg bg-[#e3dcdc]">
          <div className="w-full scale-130 origin-center">
            <BalloonPopIllustration />
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
