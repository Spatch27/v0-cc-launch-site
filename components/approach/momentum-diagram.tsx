"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"

const momentumItems = [
  {
    name: "3A Framework™",
    benefit: "We align objectives, activate teams, amplify results.",
    color: "from-brand-yellow-deep to-brand-orange",
    textColor: "text-brand-yellow-deep",
  },
  {
    name: "Cadence Loop™",
    benefit: "Proof of progress every six weeks. Guaranteed.",
    color: "from-brand-orange to-brand-pink",
    textColor: "text-brand-orange",
  },
  {
    name: "Telemetry Stack™",
    benefit: "Live dashboards. No waiting for the end-of-quarter report.",
    color: "from-brand-pink to-brand-pink",
    textColor: "text-brand-pink",
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
      <motion.h3 variants={fadeInUp} className="font-display text-3xl font-bold text-brand-dark mb-12">
        Momentum, by design
      </motion.h3>

      {/* Diagram Container */}
      <div className="relative w-full">
        {/* SVG Background with Circles */}
        <svg
          viewBox="0 0 1200 400"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd100" />
              <stop offset="100%" stopColor="#ff8600" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8600" />
              <stop offset="100%" stopColor="#fc66a7" />
            </linearGradient>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fc66a7" />
              <stop offset="100%" stopColor="#fc66a7" />
            </linearGradient>
          </defs>

          {/* Circle 1 */}
          <circle cx="250" cy="200" r="120" fill="none" stroke="url(#grad1)" strokeWidth="40" />

          {/* Circle 2 */}
          <circle cx="600" cy="200" r="120" fill="none" stroke="url(#grad2)" strokeWidth="40" />

          {/* Circle 3 */}
          <circle cx="950" cy="200" r="120" fill="none" stroke="url(#grad3)" strokeWidth="40" />
        </svg>

        {/* Text Overlays */}
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8">
          {momentumItems.map((item, idx) => (
            <motion.div
              key={item.name}
              variants={fadeInUp}
              custom={idx}
              className="flex flex-col items-center gap-4"
              style={{ width: "calc(33.333% - 1rem)" }}
            >
              {/* Product Name */}
              <h4 className="font-display text-lg font-bold text-brand-dark text-center leading-tight">
                {item.name}
              </h4>

              {/* Benefit Text */}
              <p className="text-sm text-brand-pink font-medium text-center leading-snug">
                {item.benefit}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile fallback - stacked cards */}
      <div className="lg:hidden space-y-6 mt-12">
        {momentumItems.map((item, idx) => (
          <motion.div
            key={item.name}
            variants={fadeInUp}
            custom={idx}
            className={`p-6 rounded-lg border-l-4 border-brand-dark/10 bg-gradient-to-r ${item.color} bg-opacity-5`}
          >
            <h4 className="font-display font-bold text-brand-dark mb-2">{item.name}</h4>
            <p className="text-sm text-brand-dark/70">{item.benefit}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
