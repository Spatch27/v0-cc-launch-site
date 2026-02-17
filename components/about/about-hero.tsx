"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

export function AboutHero() {
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
          Why we exist
        </motion.p>
        <motion.blockquote
          variants={fadeInUp}
          className="font-display text-2xl font-semibold italic leading-relaxed text-brand-white md:text-4xl"
        >
          &ldquo;Never doubt that a small group of thoughtful, committed
          citizens can change the world. In fact, it&apos;s the only thing that
          ever has.&rdquo;
        </motion.blockquote>
        <motion.cite
          variants={fadeInUp}
          className="mt-6 block text-base font-medium not-italic text-brand-light/70"
        >
          &mdash; Margaret Mead
        </motion.cite>
      </motion.div>
    </section>
  )
}
