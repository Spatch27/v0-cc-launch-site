"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"

const momentumItems = [
  {
    name: "3A Framework™",
    benefit: "We align objectives, activate teams, amplify results.",
  },
  {
    name: "Cadence Loop™",
    benefit: "Proof of progress every six weeks. Guaranteed.",
  },
  {
    name: "Telemetry Stack™",
    benefit: "Live dashboards. No waiting for the end-of-quarter report.",
  },
]

/**
 * Three interlocking rings from two continuous paths, both at radius R.
 *
 * Forward (left→right): UP(1) → DOWN(2) → UP(3)
 * Return  (right→left): DOWN(3) → UP(2) → DOWN(1)
 *
 * Both paths use the same radius R. Centres spaced 2R apart so
 * arcs connect seamlessly. Ring thickness = stroke width.
 * Forward drawn on top of return for chain-link overlap.
 */
function FlowingCirclesSVG() {
  const R = 130
  const sw = 52    // stroke width = ring thickness
  const pad = sw / 2 + 4

  const cx1 = pad + R
  const cx2 = cx1 + 2 * R
  const cx3 = cx2 + 2 * R
  const cy = pad + R

  const vw = cx3 + R + pad
  const vh = 2 * R + 2 * pad

  // Forward: UP over 1, DOWN under 2, UP over 3
  // sweep=0 (CCW) arcs upward left→right, sweep=1 (CW) arcs downward
  const forwardPath = [
    `M ${cx1 - R} ${cy}`,
    `A ${R} ${R} 0 0 0 ${cx1 + R} ${cy}`,  // up over 1
    `A ${R} ${R} 0 0 1 ${cx2 + R} ${cy}`,  // down under 2
    `A ${R} ${R} 0 0 0 ${cx3 + R} ${cy}`,  // up over 3
  ].join(" ")

  // Return: DOWN under 3, UP over 2, DOWN under 1
  // From right→left: sweep=0 (CCW) arcs downward, sweep=1 (CW) arcs upward
  const returnPath = [
    `M ${cx3 + R} ${cy}`,
    `A ${R} ${R} 0 0 0 ${cx3 - R} ${cy}`,  // down under 3
    `A ${R} ${R} 0 0 1 ${cx2 - R} ${cy}`,  // up over 2
    `A ${R} ${R} 0 0 0 ${cx1 - R} ${cy}`,  // down under 1
  ].join(" ")

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="forwardGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffd100" />
          <stop offset="50%" stopColor="#ff8600" />
          <stop offset="100%" stopColor="#fc66a7" />
        </linearGradient>
        <linearGradient id="returnGrad" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#fc66a7" />
          <stop offset="50%" stopColor="#ff8600" />
          <stop offset="100%" stopColor="#ffd100" />
        </linearGradient>
      </defs>

      {/* Layer 1 (back): return path */}
      <path
        d={returnPath}
        fill="none"
        stroke="url(#returnGrad)"
        strokeWidth={sw}
      />

      {/* Layer 2 (front): forward path overlaps at crossings */}
      <path
        d={forwardPath}
        fill="none"
        stroke="url(#forwardGrad)"
        strokeWidth={sw}
      />
    </svg>
  )
}

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
      <motion.h3 variants={fadeInUp} className="font-display text-3xl font-bold text-brand-dark mb-12 md:mb-16">
        Momentum, by design
      </motion.h3>

      {/* Desktop / Tablet Diagram */}
      <motion.div variants={fadeInUp} className="hidden md:block w-full max-w-5xl mx-auto">
        <div className="relative">
          {/* SVG Flowing Circles */}
          <FlowingCirclesSVG />

          {/* Text overlays positioned over each circle */}
          <div className="absolute inset-0 flex items-center">
            {/* Left circle text */}
            <div className="flex-1 flex justify-center">
              <div className="text-center max-w-[160px] -translate-y-2">
                <h4 className="font-display text-base lg:text-lg font-bold text-brand-dark leading-tight mb-1">
                  {momentumItems[0].name}
                </h4>
              </div>
            </div>
            {/* Center circle text */}
            <div className="flex-1 flex justify-center">
              <div className="text-center max-w-[160px] -translate-y-2">
                <h4 className="font-display text-base lg:text-lg font-bold text-brand-dark leading-tight mb-1">
                  {momentumItems[1].name}
                </h4>
              </div>
            </div>
            {/* Right circle text */}
            <div className="flex-1 flex justify-center">
              <div className="text-center max-w-[160px] -translate-y-2">
                <h4 className="font-display text-base lg:text-lg font-bold text-brand-dark leading-tight mb-1">
                  {momentumItems[2].name}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Benefit text below each circle */}
        <div className="flex items-start mt-8 gap-4">
          {momentumItems.map((item) => (
            <div key={item.name} className="flex-1 text-center px-4">
              <p className="text-sm lg:text-base text-brand-pink font-medium leading-snug">
                {item.benefit}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mobile fallback - stacked cards */}
      <div className="md:hidden space-y-6">
        {momentumItems.map((item, idx) => (
          <motion.div
            key={item.name}
            variants={fadeInUp}
            custom={idx}
            className="p-6 rounded-lg border-l-4 border-brand-orange bg-gradient-to-r from-brand-yellow-deep/5 to-brand-pink/5"
          >
            <h4 className="font-display text-lg font-bold text-brand-dark mb-2">{item.name}</h4>
            <p className="text-sm text-brand-dark/70 leading-relaxed">{item.benefit}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
