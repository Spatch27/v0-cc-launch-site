"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"
import { MomentumDiagram } from "@/components/approach/momentum-diagram"

export function MomentumSection() {
  return (
    <Section background="dark" className="py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="w-full"
      >
        {/* Heading */}
        <motion.h2 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-brand-white mb-16 text-center">
          Momentum, by design
        </motion.h2>

        {/* Diagram - full width */}
        <motion.div variants={fadeInUp}>
          <MomentumDiagram />
        </motion.div>
      </motion.div>
    </Section>
  )
}
