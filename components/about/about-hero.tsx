"use client"

import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="relative bg-brand-yellow-deep px-6 pt-40 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-snug text-brand-dark"
        >
          Making marketing work, work.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 max-w-2xl text-base font-medium leading-relaxed text-brand-dark"
        >
          We started Committed Citizens after seeing what happens when marketing teams are freed from operational drag. The system serves the people, and the work flies.
        </motion.p>
      </div>
    </section>
  )
}
