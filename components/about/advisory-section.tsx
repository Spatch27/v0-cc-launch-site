"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import LightbulbIllustration from "./lightbulb-illustration"

export function AdvisorySection() {
  return (
    <Section background="light">
      <div className="grid gap-4 lg:gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div variants={fadeInUp}>
          <h2 className="mb-6 max-w-4xl font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Built small. And mighty.
          </h2>
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-brand-dark">
            <p>
              We run a small, senior core and draw on specialist practitioners in agentic AI, data architecture, martech and governance.
            </p>
            <p>
              Our advisory board is working, not ornamental. They're senior operators who shape our thinking and pressure-test our decisions.
            </p>
            <p className="font-bold text-brand-dark">
              No expensive overhead doing junior work or sitting idle. Just a trusted network of senior operators, all working to one Committed Citizens method.
            </p>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <div className="relative flex h-auto min-h-[300px] lg:min-h-[32rem] items-center justify-center overflow-hidden rounded-lg bg-[#e3dcdc]">
            <div className="w-full scale-130 origin-center">
              <LightbulbIllustration />
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
