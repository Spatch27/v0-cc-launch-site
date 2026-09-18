"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"

const engagements = [
  {
    name: "Bearing3",
    description: [
      "A team scan of your business. Not a hackathon — we start with the function not the tech. Interviews with the CMO's key team. A half-day workshop with heads of department to test hypotheses. You get priorities mapped and how to address them.",
    ],
    tagline: "Clarity & understanding.",
    duration: "THREE WEEKS",
    accentColor: "bg-brand-pink",
    price: "Up to £20K",
  },
  {
    name: "Flow6",
    description: [
      "Your first six-week cycle. We rebuild one campaign with your team across Team, Process, Data and Tech, with AI as the propellant. That could mean new decision rights, a redesigned workflow, or agents that take on the manual steps. You get a campaign that flows better, measured on speed and quality against how it ran before, and a clear view of what to tackle next.",
    ],
    tagline: "Results in six weeks.",
    duration: "SIX WEEKS",
    accentColor: "bg-brand-orange",
    price: "Up to £40k",
  },
  {
    name: "Momentum6",
    description: [
      "The first campaign opens up the next opportunities: more campaigns, how the team is structured, how marketing works with the rest of the business. Each cycle takes one on and stands on its own. Together they add up to a redesigned marketing function.",
    ],
    tagline: "One cycle at a time.",
    duration: "SIX-WEEK ROLLING",
    accentColor: "bg-brand-yellow-deep",
    price: "Up to £40k per cycle",
  },
]

export function EngagementsSection() {
  return (
    <Section background="dark">
      {/* Header */}
      <motion.div variants={fadeInUp} className="mb-20">
        <h2 className="font-display text-4xl font-bold leading-snug text-brand-white md:text-5xl">
          Products that build momentum.
        </h2>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid gap-8 md:grid-cols-3 mb-16"
      >
        {engagements.map((engagement, i) => (
          <motion.div
            key={engagement.name}
            variants={fadeInUp}
            custom={i}
            className={`group relative flex flex-col overflow-hidden bg-brand-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-brand-white/10 hover:shadow-xl`}
          >
            {/* Top accent bar */}
            <div className={`h-1 w-full ${engagement.accentColor}`} />

            {/* Content */}
            <div className="p-8 flex flex-col h-full">
              {/* Duration badge */}
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-white/40 mb-4">
                {engagement.duration}
              </span>

              {/* Name */}
              <h3 className="mb-4 font-display text-2xl font-bold text-brand-white">
                {engagement.name}
              </h3>

              {/* Description */}
              <div className="flex flex-col gap-4 flex-1">
                {engagement.description.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-brand-white/70">
                    {paragraph}
                  </p>
                ))}
              </div>

              {engagement.tagline && (
                <p className="mt-6 text-xs font-semibold tracking-[0.15em] uppercase text-brand-white/50">
                  {engagement.tagline}
                </p>
              )}

              {/* Pricing */}
              {engagement.price && (
                <div className="border-t border-brand-white/10 mt-8 pt-6">
                  <span className="font-display text-3xl font-bold text-brand-white">
                    {engagement.price}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

    </Section>
  )
}
