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
    color: "bg-brand-pink",
  },
  {
    pain: "Unclear impact",
    quote: "Our data is unreliable and our dashboards can't be trusted",
    solution: "We prove progress",
    description:
      "We build telemetry to show throughput, quality, and cycle-time improvements.",
    color: "bg-brand-orange",
  },
  {
    pain: "Slow work",
    quote: "Decisions drag and our processes are handbrakes \u2014 work gets stuck",
    solution: "We increase velocity",
    description:
      "We redesign workflows and deploy agents where they can shorten cycles.",
    color: "bg-brand-yellow-deep",
  },
  {
    pain: "Messy stacks",
    quote: "Tech promises transformation, but mostly delivers complexity",
    solution: "We streamline stacks",
    description:
      "We rationalise platforms, improve data flows and operationalise agents.",
    color: "bg-brand-yellow-light",
  },
  {
    pain: "Burnt out teams",
    quote: "Too much time is wasted on workarounds and firefighting",
    solution: "We reignite teams",
    description:
      'We restore rhythm, confidence and clarity. "Everyone gets a jetpack."',
    color: "bg-brand-pink",
  },
]

export function PainSolutionGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      {painSolutions.map((item, i) => (
        <motion.div
          key={item.pain}
          variants={fadeInUp}
          custom={i}
          className="group flex flex-col"
        >
          {/* Pain card top */}
          <div className="flex flex-1 flex-col rounded-t-xl bg-brand-dark p-6 text-brand-white">
            <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-pink">
              {item.pain}
            </span>
            <p className="mt-auto text-sm italic leading-relaxed text-brand-light/80">
              &ldquo;{item.quote}&rdquo;
            </p>
          </div>
          {/* Solution card bottom */}
          <div className={`rounded-b-xl ${item.color} p-6 text-brand-dark transition-transform duration-300 group-hover:-translate-y-1`}>
            <h3 className="mb-2 font-display text-lg font-bold">
              {item.solution}
            </h3>
            <p className="text-sm leading-relaxed opacity-80">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
