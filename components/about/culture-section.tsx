"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function CultureSection() {
  return (
    <Section background="dark">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        <motion.div variants={fadeInUp} className="lg:w-1/4">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
            Our belief
          </span>
        </motion.div>
        <motion.div variants={fadeInUp} className="lg:w-3/4">
          <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-white md:text-5xl">
            Culture + orchestration.
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-brand-white/50">
            We remove operational drag, free time and resource, energise teams,
            and create conditions for sustainable growth. We are not a
            traditional consultancy. We embed, we build, we prove, and we leave
            teams stronger than we found them.
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
