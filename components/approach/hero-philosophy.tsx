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

        {/* Problem narrative */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="max-w-3xl"
        >
          <p className="text-lg leading-relaxed text-brand-dark/70 mb-6">
            We keep hearing the same story. A business invests in a new platform. There's a town hall, they've 'trained the trainers', but within a few months the team has rebuilt their old spreadsheets and found workarounds for the bits that don't fit.
          </p>
          <p className="text-lg leading-relaxed text-brand-dark/70 mb-6">
            The technology works but the project failed — because it started with the platform and believed the people would follow. They rarely do.
          </p>
          <p className="text-lg leading-relaxed text-brand-dark/70 mb-6">
            The same thing is happening with AI — but on steroids. Teams are piloting agents without redesigning the workflows around them. Same pattern, same result: technology that works in isolation but fails in practice.
          </p>
          <p className="text-lg leading-relaxed text-brand-dark font-semibold">
            Workflows follow behaviour. AI transformation shouldn't be led by whoever owns the technology budget. It should be led by those responsible for outcomes.
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
