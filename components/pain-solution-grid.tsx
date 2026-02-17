"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

const painSolutions = [
  {
    pain: "Broken journeys",
    quote: "Consumer intent is missed and our personalisation is patchy",
    solution: "We fix journeys",
    description:
      "We recognise customer signals and orchestrate the right real-time response.",
    accent: "bg-brand-pink",
    accentText: "text-brand-pink",
  },
  {
    pain: "Unclear impact",
    quote: "Our data is unreliable and our dashboards can\u2019t be trusted",
    solution: "We prove progress",
    description:
      "We build telemetry to show throughput, quality, and cycle-time improvements.",
    accent: "bg-brand-orange",
    accentText: "text-brand-orange",
  },
  {
    pain: "Slow work",
    quote: "Decisions drag and our processes are handbrakes \u2014 work gets stuck",
    solution: "We increase velocity",
    description:
      "We redesign workflows and deploy agents where they can shorten cycles.",
    accent: "bg-brand-yellow-deep",
    accentText: "text-brand-yellow-deep",
  },
  {
    pain: "Messy stacks",
    quote: "Tech promises transformation, but mostly delivers complexity",
    solution: "We streamline stacks",
    description:
      "We rationalise platforms, improve data flows and operationalise agents.",
    accent: "bg-brand-pink",
    accentText: "text-brand-pink",
  },
  {
    pain: "Burnt out teams",
    quote: "Too much time is wasted on workarounds and firefighting",
    solution: "We reignite teams",
    description:
      "We restore rhythm, confidence and clarity. \u201CEveryone gets a jetpack.\u201D",
    accent: "bg-brand-orange",
    accentText: "text-brand-orange",
  },
]

export function PainSolutionGrid() {
  return (
    <div className="grid gap-px overflow-hidden bg-brand-dark/10 md:grid-cols-2 lg:grid-cols-5">
      {painSolutions.map((item, i) => (
        <motion.div
          key={item.pain}
          variants={fadeInUp}
          custom={i}
          className="group flex flex-col bg-brand-light p-8 transition-colors duration-300 hover:bg-brand-dark"
        >
          {/* Accent line */}
          <div className={`mb-6 h-1 w-10 rounded-full ${item.accent}`} />

          {/* Pain label */}
          <span className={`mb-3 text-xs font-semibold tracking-[0.15em] uppercase ${item.accentText} transition-colors duration-300`}>
            {item.pain}
          </span>

          {/* Quote */}
          <p className="mb-8 text-sm italic leading-relaxed text-brand-dark/50 transition-colors duration-300 group-hover:text-brand-white/60">
            &ldquo;{item.quote}&rdquo;
          </p>

          {/* Solution */}
          <div className="mt-auto">
            <h3 className="mb-2 font-display text-lg font-bold text-brand-dark transition-colors duration-300 group-hover:text-brand-white">
              {item.solution}
            </h3>
            <p className="text-sm leading-relaxed text-brand-dark/60 transition-colors duration-300 group-hover:text-brand-white/60">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
