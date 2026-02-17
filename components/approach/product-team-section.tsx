"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { ProductTeamDiagram } from "@/components/product-team-diagram"

export function ProductTeamSection() {
  return (
    <Section background="light">
      <div className="mb-12">
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-pink"
        >
          How we work
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="mb-4 text-balance font-display text-3xl font-bold text-brand-dark md:text-5xl"
        >
          We operate like a Product Team
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="max-w-2xl text-lg leading-relaxed text-brand-dark/70"
        >
          Five interconnected disciplines, all oriented around a marketing
          outcome. Managed by an embedded pod of experts.
        </motion.p>
      </div>
      <ProductTeamDiagram />
    </Section>
  )
}
