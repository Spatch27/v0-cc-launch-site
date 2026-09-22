"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Section } from "@/components/section"

const benefits = [
  {
    title: "Rapid progress.",
    description:
      "Six-week cycles that end with something running, not a recommendation.",
  },
  {
    title: "Change that sticks.",
    description:
      "Built with your team, so that they understand it, own it, and know how to improve it.",
  },
  {
    title: "Proven impact.",
    description:
      "We measure how long the campaign takes to get out the door, and agree with you how to judge its quality. Then we show you the difference.",
  },
  {
    title: "Progress that builds.",
    description:
      "Every campaign we rebuild shows us what else to take on, so each cycle sets up the next. Functional redesign in bite-sized chunks.",
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
              ease: "easeInOut",
            }}
            className="group flex flex-col gap-4 border-l-4 border-brand-pink bg-brand-white p-8 transition-all duration-300 hover:border-brand-dark hover:shadow-lg"
          >
            <h3 className="font-display text-2xl font-bold text-brand-dark">
              {item.title}
            </h3>
            <p className="leading-relaxed text-brand-dark">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
