"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative bg-brand-yellow-deep px-6 lg:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col justify-center py-32 lg:py-48">
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl font-display text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.95] tracking-tight text-brand-dark"
        >
          Let's talk
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-brand-dark/80"
        >
          We're building something great and we'd love you to be part of it.
        </motion.p>
      </div>
    </section>
  )
}
