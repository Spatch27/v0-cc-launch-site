"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function CultureSection() {
  return (
    <Section background="dark">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-pink"
        >
          Our belief
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="mb-8 text-balance font-display text-3xl font-bold text-brand-white md:text-5xl"
        >
          Belief in culture + orchestration
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-lg leading-relaxed text-brand-light/80"
        >
          We remove operational drag, free time and resource, energise teams,
          and create conditions for sustainable growth. We are not a
          traditional consultancy. We embed, we build, we prove, and we leave
          teams stronger than we found them.
        </motion.p>
      </div>
    </Section>
  )
}
