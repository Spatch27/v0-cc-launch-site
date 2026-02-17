"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function ProblemSection() {
  return (
    <Section background="white">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-pink"
        >
          The problem
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="mb-6 text-balance font-display text-3xl font-bold text-brand-dark md:text-5xl"
        >
          Growth is an operating model challenge
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-lg leading-relaxed text-brand-dark/70"
        >
          Marketing ambition isn&apos;t the issue. Workflow, orchestration and
          adoption are. We fix how work flows across people, process, tech and
          agents.
        </motion.p>
      </div>
    </Section>
  )
}
