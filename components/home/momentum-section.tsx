"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Section } from "@/components/section"

export function MomentumSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <Section background="light">
      <div ref={ref} className="space-y-12">
        {/* First subsection: Increase marketing momentum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Increase marketing momentum.
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-brand-dark/70">
            We redesign workflows, simplify stacks, and get AI agents working inside your team. We embed inside the marketing function, working alongside your team in focused six-week cycles - redesigning how work actually flows across people, process and technology. Measurable progress, not slideware.
          </p>
        </motion.div>

        {/* Second subsection: Systems launch agents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 border-t border-brand-dark/10 pt-12"
        >
          <h3 className="font-display text-3xl font-bold leading-snug text-brand-dark md:text-4xl">
            Systems launch agents.
          </h3>
          <div className="space-y-4">
            <p className="max-w-3xl text-lg leading-relaxed text-brand-dark/70">
              AI hasn&apos;t simplified things - it&apos;s added a new layer of complexity to systems that were already struggling. New tools arrive faster than teams can absorb them. Vendors promise efficiency - but the reality is more platforms, more decisions, more noise.
            </p>
            <p className="max-w-3xl text-lg font-semibold leading-relaxed text-brand-dark">
              AI only rewards the teams that are ready for it.
            </p>
            <p className="max-w-3xl text-lg leading-relaxed text-brand-dark/70">
              Workflows, data, and governance need to be redesigned. That&apos;s the gap we help you close. We get your system ready for AI - and then we help you deploy agents as working tools, not demo-day theatre.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
