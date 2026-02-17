"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { PainSolutionGrid } from "@/components/pain-solution-grid"

export function PainSection() {
  return (
    <Section background="white">
      <div className="mb-16 flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        <motion.div variants={fadeInUp} className="lg:w-1/4">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
            Pain & remedy
          </span>
        </motion.div>
        <motion.div variants={fadeInUp} className="lg:w-3/4">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            We free CMOs to do their best work.
          </h2>
        </motion.div>
      </div>
      <PainSolutionGrid />
    </Section>
  )
}
