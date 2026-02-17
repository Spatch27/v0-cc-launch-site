"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { fadeInUp, fadeIn } from "@/lib/animations"
import { HeroIllustration } from "@/components/hero-illustration"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-dark px-6 pt-32 pb-20 lg:px-8 lg:pt-40 lg:pb-28">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Text */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex max-w-2xl flex-1 flex-col gap-6"
        >
          <motion.p
            variants={fadeInUp}
            className="text-sm font-semibold uppercase tracking-widest text-brand-pink"
          >
            Embedded Consultancy for CMOs
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-balance font-display text-5xl font-bold leading-[1.05] text-brand-white md:text-7xl"
          >
            Freedom from drag.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="max-w-lg text-lg leading-relaxed text-brand-light/80"
          >
            We redesign how marketing work flows. Removing operational drag so your team builds momentum.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-pink px-8 py-4 text-base font-semibold text-brand-dark transition-opacity hover:opacity-90"
            >
              Talk to us
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex-1"
        >
          <HeroIllustration className="mx-auto max-w-md lg:max-w-lg" />
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 right-10 h-3 w-3 rounded-full bg-brand-yellow-light"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-20 left-16 h-2 w-2 rounded-full bg-brand-orange"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </section>
  )
}
