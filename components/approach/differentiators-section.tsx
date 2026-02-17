"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { Heart, Timer, Cpu, Users } from "lucide-react"

const differentiators = [
  {
    icon: Heart,
    title: "Marketing champions",
    description:
      "We come from marketing. We understand the politics, the pressure, and the pace. We speak your language.",
  },
  {
    icon: Timer,
    title: "Six-week value cycles",
    description:
      "No twelve-month roadmaps. We generate demonstrable value every six weeks. If it isn\u2019t working, we adapt.",
  },
  {
    icon: Cpu,
    title: "Tech serves solution",
    description:
      "We start with the outcome, not the platform. Technology is the enabler, never the answer.",
  },
  {
    icon: Users,
    title: "Adoption is everything",
    description:
      "The best strategy fails without adoption. We embed new behaviours through capability-building, not decks.",
  },
]

export function DifferentiatorsSection() {
  return (
    <Section background="white">
      <div className="mb-12 text-center">
        <motion.h2
          variants={fadeInUp}
          className="text-balance font-display text-3xl font-bold text-brand-dark md:text-5xl"
        >
          We look and feel different
        </motion.h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {differentiators.map((d, i) => {
          const Icon = d.icon
          return (
            <motion.div
              key={d.title}
              variants={fadeInUp}
              custom={i}
              className="flex flex-col gap-4 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-pink/10">
                <Icon size={28} className="text-brand-pink" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-dark">
                {d.title}
              </h3>
              <p className="leading-relaxed text-brand-dark/70">
                {d.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
