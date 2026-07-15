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
              We operate a highly capable core, drawing on the talents of specialist practitioners in data architecture, agentic AI, martech, and governance.
            </p>
            <p>
              Our advisory board is working, not ornamental. Senior operators we draw on directly in delivery - shaping thinking, pressure-testing decisions, strengthening outcomes.
            </p>
            <p className="font-bold text-brand-dark">
              We have no generalists posing as experts. No expensive talent overhead taking on junior tasks or sitting idle. Instead, we call on a trusted, senior network of operators with a depth of experience, aligned to a single Committed Citizens method.
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
