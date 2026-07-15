"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const engagements = [
  {
    name: "Flow6",
    description: [
      "Our Drag Diagnostic assesses where momentum is lost, what that drag is costing and where improved flow is most readily accessible.",
      "Our Flow Map plots Team, Process, Data and Tech. The map shows where work is slow, where the team is ready to move and what to fix first.",
      "Our Progress Plan aligns your team, validates priorities and agrees the metrics for success. Together, a plan to liberate your team and unlock growth.",
      "BOARD-READY IN SIX WEEKS.",
    ],
    duration: "SIX WEEKS",
    accentColor: "bg-brand-pink",
  },
  {
    name: "Fix6",
    description: [
      "We always start with a clear focus on the next best action, and we build the fix with your team and prove it through live work. That could mean restructuring roles, remapping workflows, or implementing agentic solutions. We measure the result against the baseline, capture the evidence and recommend the next move.",
      "RESULTS IN A QUARTER.",
    ],
    duration: "SIX WEEKS",
    accentColor: "bg-brand-orange",
  },
  {
    name: "Momentum6",
    description: [
      "Continuous improvement compounds to build a better engine.",
      "A rolling programme of 6-week cycles, drawing on a suite of 59 customisable products covering 7 key areas. Every step creates value while adding up to something bigger: a new, more capable marketing operating model.",
      "PERMANENTLY.",
    ],
    duration: "SIX-WEEK ROLLING",
    accentColor: "bg-brand-yellow-deep",
  },
]

export function EngagementsSection() {
  return (
    <Section background="dark">
      {/* Header */}
      <motion.div variants={fadeInUp} className="mb-20">
        <h2 className="font-display text-4xl font-bold leading-snug text-brand-white md:text-5xl">
          Products that drive growth.
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
              <div className="flex flex-col gap-4">
                {engagement.description.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-brand-white/70">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </Section>
  )
}
