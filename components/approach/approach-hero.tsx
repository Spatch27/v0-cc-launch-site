"use client"

import { motion } from "framer-motion"

export function ApproachHero() {
  return (
    <section className="relative bg-brand-pink px-6 pt-40 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-sm font-medium tracking-[0.2em] uppercase text-brand-dark/60"
        >
          Our approach
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-brand-dark"
        >
          Change doesn&apos;t start with technology. It begins with your people.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-brand-dark/60"
        >
          We combine deep marketing expertise with operational rigour to redesign how your team works.
        </motion.p>
      </div>
    </section>
  )
}
