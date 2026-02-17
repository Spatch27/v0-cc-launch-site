"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-brand-orange px-6 lg:px-12">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-end pb-16 pt-32 lg:pb-24">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-sm font-medium tracking-[0.2em] uppercase text-brand-white"
        >
          Embedded Consultancy for CMOs
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl font-display text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.95] tracking-tight text-brand-dark"
        >
          Freedom
          <br />
          from drag.
        </motion.h1>

        {/* Subtitle + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-lg text-lg leading-relaxed text-brand-dark/70">
            We redesign how marketing work flows. Removing operational
            drag so your team builds momentum.
          </p>

          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-3 self-start bg-brand-light px-8 py-4 text-base font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-white"
          >
            Talk to us
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-brand-dark/30">
              Scroll
            </span>
            <div className="h-12 w-px bg-brand-dark/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
