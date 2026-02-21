"use client"

import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="relative bg-brand-yellow-deep px-6 pt-40 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-snug text-brand-dark"
        >
          &ldquo;Never doubt that a small group of thoughtful, committed
          citizens can change the world. In fact, it&apos;s the only thing that
          ever has.&rdquo;
        </motion.blockquote>
        <motion.cite
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 block text-base font-medium not-italic text-brand-dark"
        >
          &mdash; Margaret Mead
        </motion.cite>
      </div>
    </section>
  )
}
