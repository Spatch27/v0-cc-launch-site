"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"

const engagements = [
  {
    name: "Flow6",
    description: [
      "We rebuild one campaign with your team across Team, Process, Data and Tech, with AI as the propellant. That might mean new decision rights, a redesigned workflow, or agents that take on the manual steps. You get a campaign that runs better, measured on speed and quality against how it ran before.",
      "In rebuilding the campaign, we get to see how your function really works: where time goes, which decisions stall, who owns what. That tells us where to focus next.",
      "Two weeks in, we review progress together. By then you'll have the campaign mapped as it really runs, a baseline to measure against, and a clear picture of what good looks like. If either of us thinks it's the wrong place to start, we stop there. It's £15K, and you keep everything we've built. Carry on and it's £40K for the full six weeks.",
    ],
    tagline: "RESULTS IN SIX WEEKS.",
    duration: "SIX WEEKS",
    accentColor: "bg-brand-orange",
    price: "£40K, or £15K if you stop at two weeks",
  },
  {
    name: "Momentum6",
    description: [
      "Each cycle takes on something Flow6 uncovered. Sometimes that's another campaign. Often it's the bigger stuff no single campaign can fix: who owns what, how decisions get made, the data everyone relies on, the tools that earn their place.",
      "This is also where we make the change safe to scale. AI in marketing raises real questions about brand risk, data protection and, in regulated sectors, what your compliance team needs to sign off. We build those checks into the workflow, not on top of it, so approvals get faster, not slower. And we train your team as we go, so they can run what we've built and spot the next thing to improve.",
      "Each cycle stands on its own, with its own measures. Together they add up to a marketing function redesigned for how marketing works now.",
    ],
    tagline: "ONE CYCLE AT A TIME.",
    duration: "SIX-WEEK ROLLING",
    accentColor: "bg-brand-yellow-deep",
    price: "£40K per cycle",
  },
  {
    name: "Pathfinder6",
    description: [
      "For anything that needs senior hands but not a full cycle. A founder stays in step with you, without being in the room every day, and gets stuck in when something needs doing.",
      "That might mean pressure-testing the business case before it goes to the CFO. Testing tools or platforms before you buy or renew. Helping you shape a new role, or write a brief for a new agency or partner. Flagging what a change in regulation means for your team before it lands on your desk.",
      "Every six weeks we review progress against the measures we set together and help you choose what to take on next. And in between, someone senior to call who knows the detail.",
    ],
    tagline: "STAYING AHEAD.",
    duration: "SIX-WEEK ROLLING",
    accentColor: "bg-brand-pink",
    price: "£10K per cycle",
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
                  <span
                    className={`font-display font-bold leading-snug text-brand-white ${
                      engagement.price.length > 24
                        ? "text-xl md:text-2xl"
                        : "text-3xl"
                    }`}
                  >
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
