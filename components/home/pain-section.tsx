"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { PainSolutionGrid } from "@/components/pain-solution-grid"

export function PainSection() {
  return (
    <Section background="light">
      <div className="mb-12 text-center">
        <motion.h2
          variants={fadeInUp}
          className="text-balance font-display text-3xl font-bold text-brand-dark md:text-5xl"
        >
          We free CMOs to do their best work
        </motion.h2>
      </div>
      <PainSolutionGrid />
    </Section>
  )
}
