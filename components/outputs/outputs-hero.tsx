"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

export function OutputsHero() {
  return (
    <section className="bg-brand-dark px-6 pt-32 pb-20 lg:px-8 lg:pt-40 lg:pb-28">
      <motion.div
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl text-center"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-pink"
        >
          Our outputs
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="text-balance font-display text-4xl font-bold leading-tight text-brand-white md:text-6xl"
        >
          When the work flows, results fly
        </motion.h1>
      </motion.div>
    </section>
  )
}
