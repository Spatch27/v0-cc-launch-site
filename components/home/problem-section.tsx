"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function ProblemSection() {
  return (
    <Section background="white">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        {/* Left: label */}
        <motion.div variants={fadeInUp} className="lg:w-1/4">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
            The problem
          </span>
        </motion.div>

        {/* Right: big statement */}
        <motion.div variants={fadeInUp} className="lg:w-3/4">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl lg:text-6xl">
            Growth is an operating model challenge.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-brand-dark/60">
            Marketing ambition isn&apos;t the issue. Workflow, orchestration and
            adoption are. We fix how work flows across people, process, tech and
            agents.
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
