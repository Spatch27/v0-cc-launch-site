"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

export function HeroPhilosophy() {
  return (
    <section className="relative bg-brand-pink px-6 pt-40 pb-16 lg:px-12 lg:pt-48 lg:pb-24">
      <div className="mx-auto max-w-[1400px]">
        {/* Main headline */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16"
        >
          <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-brand-dark text-balance">
            Only people <br />
            create <i>flow.</i>
          </h1>
        </motion.div>

        {/* Supporting copy */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="max-w-3xl"
        >
          <p className="text-xl leading-relaxed text-brand-dark/80">
            Every failed transformation started with a platform and assumed the people would follow. They rarely do.
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
        </motion.div>
      </div>
    </section>
  )
}
