"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { OperatingModelDiagram } from "@/components/approach/operating-model-diagram"

export function PhilosophySection() {
  return (
    <Section background="light">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="mb-6 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
          We operate like a product team.
        </h2>
        <div className="max-w-3xl space-y-4">
          <p className="text-lg leading-relaxed text-brand-dark">
            We&apos;re hands-on. A small team of specialists working alongside your people to build, test and learn in live work. Each engagement should leave you and your team more capable of making the next change yourselves.
          </p>
        </div>
      </motion.div>

      {/* Operating Model Diagram */}
      <div className="mt-6">
        <OperatingModelDiagram />
      </div>
    </Section>
  )
}
