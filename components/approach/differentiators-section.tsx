"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

const differentiators = [
  {
    number: "01",
    title: "Marketing champions",
    description:
      "We come from marketing. We understand the politics, the pressure, and the pace. We speak your language.",
  },
  {
    number: "02",
    title: "Six-week value cycles",
    description:
      "No twelve-month roadmaps. We generate demonstrable value every six weeks. If it isn\u2019t working, we adapt.",
  },
  {
    number: "03",
    title: "Tech serves solution",
    description:
      "We start with the outcome, not the platform. Technology is the enabler, never the answer.",
  },
  {
    number: "04",
    title: "Adoption is everything",
    description:
      "The best strategy fails without adoption. We embed new behaviours through capability-building, not decks.",
  },
]

export function DifferentiatorsSection() {
  return (
    <Section background="white">
      <div className="mb-16 flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        <motion.div variants={fadeInUp} className="lg:w-1/4">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
            Why us
          </span>
        </motion.div>
        <motion.div variants={fadeInUp} className="lg:w-3/4">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            We look and feel different.
          </h2>
        </motion.div>
      </div>

      <div className="grid gap-16 md:grid-cols-2">
        {differentiators.map((d, i) => (
          <motion.div
            key={d.title}
            variants={fadeInUp}
            custom={i}
            className="group flex gap-6"
          >
            <span className="font-display text-5xl font-bold text-brand-light transition-colors duration-300 group-hover:text-brand-pink">
              {d.number}
            </span>
            <div>
              <h3 className="mb-3 font-display text-xl font-bold text-brand-dark">
                {d.title}
              </h3>
              <p className="leading-relaxed text-brand-dark/60">
                {d.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
