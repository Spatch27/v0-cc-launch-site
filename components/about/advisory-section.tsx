"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

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
              We operate a highly capable core, drawing on the talents of a network of specialist
              practitioners in martech, agentic AI, data architecture, FS, and governance.
            </p>
            <p>
              Our advisory board is working, not ornamental. Senior operators we draw on directly in
              delivery - shaping thinking, pressure-testing decisions, strengthening outcomes.
            </p>
            <p className="font-medium text-brand-dark">
              We have no generalists posing as experts. No paying for bench time. Just the right depth, at
              the right moment, aligned to a single Committed Citizens method.
            </p>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex lg:justify-end">
          <img 
            src="/images/team-illustration-2.svg" 
            alt="Team illustration" 
            className="max-h-[300px] lg:max-h-[500px] w-auto"
          />
        </motion.div>
      </div>
    </Section>
  )
}
