"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"

const engagements = [
  {
    name: "Drag Diagnostic",
    tagline: "An in-depth diagnostic with CMO and trusted deputy – that pinpoints where drag occurs in your current system – and which area to tackle first.",
    duration: "6 WEEKS",
    accentColor: "bg-brand-pink",
  },
  {
    name: "Fix One Thing First",
    tagline: "A targeted piece of work to tackle your most pressing priority – proving rapid progress and building the case for what comes next.",
    duration: "6 WEEKS",
    accentColor: "bg-brand-orange",
  },
  {
    name: "Momentum Six",
    tagline: "A rolling programme of 6-week cycles, drawing on a suite of 59 customisable products covering 7 key areas.",
    duration: "6-WEEK ROLLING",
    accentColor: "bg-brand-yellow-deep",
  },
]

export function EngagementsSection() {
  return (
    <Section background="dark">
      {/* Header */}
      <motion.div variants={fadeInUp} className="mb-16">
        <h2 className="mb-4 font-display text-4xl font-bold leading-snug text-brand-white md:text-5xl">
          How we work together
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-brand-white/70">
          Every engagement starts with Waypoint, our structured needs assessment. Having agreed priorities together, we then work in focused 6-week cycles.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid gap-8 md:grid-cols-3"
      >
        {engagements.map((engagement, i) => (
          <motion.div
            key={engagement.name}
            variants={fadeInUp}
            custom={i}
            className="group relative flex flex-col overflow-hidden bg-brand-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-brand-white/10 hover:shadow-xl"
          >
            {/* Top accent bar */}
            <div className={`h-1 w-full ${engagement.accentColor}`} />

            {/* Content */}
            <div className="flex flex-col p-8">
              {/* Duration badge */}
              {engagement.duration && (
                <span className="mb-4 text-xs font-semibold tracking-[0.15em] uppercase text-brand-white/40">
                  {engagement.duration}
                </span>
              )}

              {/* Name */}
              <h3 className="mb-4 font-display text-2xl font-bold text-brand-white">
                {engagement.name}
              </h3>

              {/* Tagline */}
              <p className="text-base leading-relaxed text-brand-white/70">
                {engagement.tagline}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
