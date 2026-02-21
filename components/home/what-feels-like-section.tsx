"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Section } from "@/components/section"

const benefits = [
  {
    title: "Rapid progress.",
    description:
      "Six-week time-to-value cycles. No six-month roadmaps that slip before they ship.",
  },
  {
    title: "Fix that sticks.",
    description:
      "Built around how your team actually works. So it gets used, not just implemented.",
  },
  {
    title: "Proven impact.",
    description:
      "Real-time telemetry. See progress as it happens, not at the end of the quarter.",
  },
  {
    title: "Risk free.",
    description:
      "If you can't feel it within three weeks, you don't pay for it. Guaranteed.",
  },
]

export function WhatFeelsLikeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <Section background="light">
      <div ref={ref} className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl"
        >
          What it feels like.
        </motion.h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {benefits.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group flex flex-col gap-4 border-l-4 border-brand-pink bg-brand-white p-8 transition-all duration-300 hover:border-brand-dark hover:shadow-lg"
          >
            <h3 className="font-display text-2xl font-bold text-brand-dark">
              {item.title}
            </h3>
            <p className="leading-relaxed text-brand-dark/60">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
