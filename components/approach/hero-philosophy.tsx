"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

export function HeroPhilosophy() {
  return (
    <section className="relative bg-brand-pink px-6 pt-40 pb-32 lg:px-12 lg:pt-48 lg:pb-48">
      <div className="mx-auto max-w-[1400px]">
        {/* Main headline */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16"
        >
          <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.9] tracking-tight text-brand-dark text-balance">
            Only people <br />
            create <i>flow.</i>
          </h1>
        </motion.div>

        {/* Problem narrative */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="max-w-3xl"
        >
          <p className="text-lg leading-relaxed text-brand-dark/70 mb-6">
            We keep hearing the same story. It goes like this. A business invests in a new platform. The implementation goes live. There's a town hall, they've 'trained the trainers', but within a few months the team has rebuilt their old spreadsheets and found workarounds for the bits that don't fit.
          </p>
          <p className="text-lg leading-relaxed text-brand-dark/70 mb-6">
            The technology works but the project failed. It failed because it started with the platform and believed the people would follow. They rarely do.
          </p>
          <p className="text-lg leading-relaxed text-brand-dark font-semibold">
            Workflows follow behaviour — which is why we start the other way round.
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
          <p className="font-display text-2xl font-semibold text-brand-dark/60">
            Momentum, by design.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
