"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function PurposeSection() {
  return (
    <Section background="white">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          variants={fadeInUp}
          className="mb-6 text-balance font-display text-3xl font-bold text-brand-dark md:text-5xl"
        >
          We are Committed Citizens
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="mb-8 text-xl leading-relaxed text-brand-dark/70"
        >
          A consultancy for CMOs who want more forward momentum.
        </motion.p>
        <motion.p
          variants={fadeInUp}
          className="text-lg leading-relaxed text-brand-dark/70"
        >
          We believe that culture is the defensible competitive advantage. And
          exceptional marketing comes through the better orchestration of
          people, process and technology.
        </motion.p>
      </div>
    </Section>
  )
}
