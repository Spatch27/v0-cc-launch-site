"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { Zap, Layers, Route, Bot, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Faster decision cycles",
    description: "Strip out bottlenecks and give teams the clarity to move.",
  },
  {
    icon: Layers,
    title: "Cleaner stacks",
    description: "Rationalise platforms so your tech serves the work, not the other way around.",
  },
  {
    icon: Route,
    title: "Responsive journeys",
    description: "Customer journeys that respond in real time to signals and intent.",
  },
  {
    icon: Bot,
    title: "Teams confident with AI",
    description: "Embed agents into real workflows with hands-on adoption support.",
  },
  {
    icon: TrendingUp,
    title: "Measurable uplift",
    description: "Live dashboards that prove operational improvement, not just activity.",
  },
]

export function WhatChangesSection() {
  return (
    <Section background="light">
      <div className="mb-16 flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        <motion.div variants={fadeInUp} className="lg:w-1/4">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
            What changes
          </span>
        </motion.div>
        <motion.div variants={fadeInUp} className="lg:w-3/4">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Building marketing momentum.
          </h2>
        </motion.div>
      </div>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              custom={i}
              className="group flex flex-col gap-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark text-brand-white transition-colors duration-300 group-hover:bg-brand-pink group-hover:text-brand-dark">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-dark">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-brand-dark/60">
                {feature.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
