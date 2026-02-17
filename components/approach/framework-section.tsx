"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { FrameworkDiagram } from "@/components/framework-diagram"

export function FrameworkSection() {
  return (
    <Section background="white">
      <div className="mb-12">
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-pink"
        >
          Operating model
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-balance font-display text-3xl font-bold text-brand-dark md:text-5xl"
        >
          The fundamentals of our operating model
        </motion.h2>
      </div>
      <FrameworkDiagram />
    </Section>
  )
}
