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
    <Section background="white">
      <div className="mb-12 text-center">
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-pink"
        >
          What changes
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-balance font-display text-3xl font-bold text-brand-dark md:text-5xl"
        >
          Building marketing momentum
        </motion.h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              custom={i}
              className="flex flex-col gap-4 rounded-xl border border-brand-light bg-brand-white p-8 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-pink/10">
                <Icon size={24} className="text-brand-pink" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-dark">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-brand-dark/70">
                {feature.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
