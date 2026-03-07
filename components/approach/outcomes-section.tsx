"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function OutcomesSection() {
  return (
    <Section background="light">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
          Built for outcomes, not renewals.
        </h2>
        <div className="max-w-3xl space-y-4">
          <p className="text-lg leading-relaxed text-brand-dark/70">
            Most transformation programmes are designed to sell you a platform, not fix how you work. Over 40% of the average marketing budget goes on technology and the agencies that implement it. Less than a third reaches your customers. The recommendation is the implementation. The implementation is the licence. The licence is the lock-in.
          </p>
          <p className="text-lg leading-relaxed text-brand-dark/70">
            We're platform-agnostic. No tech tie-ins. No renewal cycles to protect. Your operating model gets shaped around your team's needs, not someone else's contract terms.
          </p>
        </div>
      </motion.div>
    </Section>
  )
}
