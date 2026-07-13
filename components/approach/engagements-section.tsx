"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const engagements = [
  {
    name: "Drag Diagnostic",
    description: [
      "We trace how work moves. We gather evidence of where momentum is lost, what that drag is costing and where improved flow is most readily accessible.",
      "The Diagnostic ends with your Flow Map: a short report that plots Team, Process, Data and Tech. The map shows where work is slowing, where the team is ready to move and which fix has the strongest case to go first. Together, we agree the outcome, baseline and success measures.",
    ],
    duration: "2 weeks",
    accentColor: "bg-brand-pink",
  },
  {
    name: "Fix One Thing First",
    description: [
      "We build the fix with your team and prove it through live work. That could mean clearer roles, a new workflow or an AI-supported way of working. We measure the result against the baseline, capture the evidence and recommend the next move.",
      "Already know your first fix? You can skip the Diagnostic and start here. We open by setting the start line — the outcome, the baseline and the success measures that will prove impact — then get to work.",
    ],
    duration: "6 weeks",
    accentColor: "bg-brand-orange",
  },
  {
    name: "Momentum 6",
    description: [
      "Fixing one thing builds momentum. Rolling six-week cycles compound it. Each cycle takes the next priority, delivers it in live work and adds to the evidence. Over time, the cycles combine into something bigger: a marketing operating model built around your team, moving at the speed your business needs.",
      "The basis for our work never changes: one clear outcome per cycle, delivery in live work and evidence of what changed.",
    ],
    duration: "6-week rolling",
    accentColor: "bg-brand-yellow-deep",
  },
]

export function EngagementsSection() {
  return (
    <Section background="dark">
      {/* Header */}
      <motion.div variants={fadeInUp} className="mb-20">
        <h2 className="font-display text-4xl font-bold leading-snug text-brand-white md:text-5xl">
          Find it. Map it. Fix it.
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
