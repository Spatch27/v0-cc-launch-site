"use client"

import { motion } from "framer-motion"

export function OutputsHero() {
  return (
    <section className="relative bg-brand-dark px-6 pt-40 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-brand-white"
        >
          When the work flows, results fly.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-brand-white/50"
        >
          Tangible evidence of operational uplift across marketing teams. Every metric is real, every testimonial is verified.
        </motion.p>
      </div>
    </section>
  )
}
