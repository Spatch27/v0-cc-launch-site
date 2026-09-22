"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"

const engagements = [
  {
    eyebrow: "START BUILDING",
    name: "Initial6",
    description: [
      "We rebuild one campaign with your team. That might mean new decision rights, a redesigned workflow, or agents that take on the manual steps. You get a campaign that runs better, measured on speed and quality against how it ran before. Through this process, we see how your function really works: where time goes, which decisions stall, who owns what. That tells us where to focus next.",
    ],
    duration: "SIX WEEKS",
    accentColor: "bg-brand-orange",
  },
  {
    eyebrow: "KEEP COMPOUNDING",
    name: "Momentum6",
    description: [
      "Rolling 6-week cycles. Sometimes that’s another campaign, or the bigger stuff no single campaign can fix — who owns what, how decisions get made, the data everyone relies on, the tools that earn their place. This is also where we make the change safe to scale. We train your team as we go, so they can run what we’ve built and spot the next thing to improve.",
    ],
    duration: "SIX-WEEK ROLLING",
    accentColor: "bg-brand-yellow-deep",
  },
  {
    eyebrow: "ADVISORY SUPPORT",
    name: "Pathfinder6",
    description: [
      "When you need senior hands but not a full cycle — one of us ready to jump in as needed. Pressure-testing the business case before it goes to the CFO. Testing tools or platforms before you buy or renew. Helping you shape a new role, or write a brief for a new agency or partner. Every six weeks we review progress and help you choose what to take on next.",
    ],
    duration: "SIX-WEEK ROLLING",
    accentColor: "bg-brand-pink",
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
              {/* Eyebrow */}
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-white/40 mb-4">
                {engagement.eyebrow}
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

              {/* Duration */}
              <p className="mt-6 text-xs font-semibold tracking-[0.15em] uppercase text-brand-white/50">
                {engagement.duration}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </Section>
  )
}
