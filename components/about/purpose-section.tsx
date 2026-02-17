"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function PurposeSection() {
  return (
    <Section background="light">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        <motion.div variants={fadeInUp} className="lg:w-1/4">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
            Purpose
          </span>
        </motion.div>
        <motion.div variants={fadeInUp} className="lg:w-3/4">
          <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            We are Committed Citizens.
          </h2>
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-brand-dark/60">
            <p>
              A consultancy for CMOs who want more forward momentum.
            </p>
            <p>
              We believe that culture is the defensible competitive advantage. And
              exceptional marketing comes through the better orchestration of
              people, process and technology.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
