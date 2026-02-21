"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function CheckpointSection() {
  return (
    <Section background="light">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        <motion.div variants={fadeInUp} className="lg:w-1/4">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
            Risk management
          </span>
        </motion.div>
        <motion.div variants={fadeInUp} className="lg:w-3/4">
          <div className="max-w-3xl">
            <h2 className="mb-8 font-display text-3xl font-bold leading-snug text-brand-dark md:text-4xl">
              Most clients start with Ignition6™.
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-brand-pink" />
                <div>
                  <h3 className="font-semibold text-brand-dark mb-2">Two-week checkpoint</h3>
                  <p className="text-brand-dark/60 leading-relaxed">
                    Every new engagement begins with a two-week checkpoint. If you can't feel the momentum building, you walk away.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-brand-orange" />
                <div>
                  <h3 className="font-semibold text-brand-dark mb-2">No awkward conversations</h3>
                  <p className="text-brand-dark/60 leading-relaxed">
                    No full invoice. This approach removes the risk and lets us prove value before you commit further.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
