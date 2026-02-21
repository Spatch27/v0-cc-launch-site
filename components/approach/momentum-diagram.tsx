"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"

const momentumItems = [
  {
    name: "3A Framework™",
    benefit: "We align objectives, activate teams, amplify results.",
    color: "text-brand-yellow-deep",
  },
  {
    name: "Cadence Loop™",
    benefit: "Proof of progress every six weeks. Guaranteed.",
    color: "text-brand-orange",
  },
  {
    name: "Telemetry Stack™",
    benefit: "Live dashboards. No waiting for the end-of-quarter report.",
    color: "text-brand-pink",
  },
]

export function MomentumDiagram() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="w-full"
    >
      {/* Title */}
      <motion.h3 variants={fadeInUp} className="font-display text-3xl font-bold text-brand-dark mb-16">
        Momentum, by design
      </motion.h3>

      {/* Diagram Container */}
      <div className="relative w-full">
        {/* SVG with Flowing Circles */}
        <svg
          viewBox="0 0 960 540"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="flowYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd100" />
              <stop offset="100%" stopColor="#ff8600" />
            </linearGradient>
            <linearGradient id="flowOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8600" />
              <stop offset="100%" stopColor="#fc66a7" />
            </linearGradient>
            <linearGradient id="flowPink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fc66a7" />
              <stop offset="100%" stopColor="#fc66a7" />
            </linearGradient>
          </defs>

          {/* Left Circle - Yellow to Orange */}
          <circle cx="220" cy="270" r="100" fill="none" stroke="url(#flowYellow)" strokeWidth="50" />

          {/* Center Circle - Orange to Pink */}
          <circle cx="480" cy="270" r="100" fill="none" stroke="url(#flowOrange)" strokeWidth="50" />

          {/* Right Circle - Pink */}
          <circle cx="740" cy="270" r="100" fill="none" stroke="url(#flowPink)" strokeWidth="50" />

          {/* Flow connectors between circles */}
          <path
            d="M 320 270 Q 400 250 380 270"
            fill="none"
            stroke="url(#flowOrange)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 580 270 Q 660 250 640 270"
            fill="none"
            stroke="url(#flowPink)"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>

        {/* Text Overlays - Desktop */}
        <div className="hidden lg:block absolute inset-0">
          {/* Left Item */}
          <motion.div
            variants={fadeInUp}
            className="absolute top-1/2 left-[12%] -translate-y-1/2 translate-x-0"
          >
            <div className="text-center max-w-[140px]">
              <h4 className="font-display text-lg font-bold text-brand-dark mb-2 leading-tight">
                {momentumItems[0].name}
              </h4>
              <p className="text-sm text-brand-pink font-medium leading-snug">
                {momentumItems[0].benefit}
              </p>
            </div>
          </motion.div>

          {/* Center Item */}
          <motion.div
            variants={fadeInUp}
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          >
            <div className="text-center max-w-[140px]">
              <h4 className="font-display text-lg font-bold text-brand-dark mb-2 leading-tight">
                {momentumItems[1].name}
              </h4>
              <p className="text-sm text-brand-pink font-medium leading-snug">
                {momentumItems[1].benefit}
              </p>
            </div>
          </motion.div>

          {/* Right Item */}
          <motion.div
            variants={fadeInUp}
            className="absolute top-1/2 right-[12%] -translate-y-1/2 translate-x-0"
          >
            <div className="text-center max-w-[140px]">
              <h4 className="font-display text-lg font-bold text-brand-dark mb-2 leading-tight">
                {momentumItems[2].name}
              </h4>
              <p className="text-sm text-brand-pink font-medium leading-snug">
                {momentumItems[2].benefit}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile fallback - stacked cards */}
      <div className="lg:hidden space-y-6 mt-8">
        {momentumItems.map((item, idx) => (
          <motion.div
            key={item.name}
            variants={fadeInUp}
            custom={idx}
            className="p-6 rounded-lg border-l-4 border-brand-dark/10 bg-gradient-to-r from-brand-yellow-deep/5 to-brand-pink/5"
          >
            <h4 className="font-display font-bold text-brand-dark mb-2">{item.name}</h4>
            <p className="text-sm text-brand-dark/70">{item.benefit}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
