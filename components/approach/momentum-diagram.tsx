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
 * Two continuous paths forming three interlocking rings.
 *
 * Forward path (big arcs): UP(1) → DOWN(2) → UP(3)
 * Return path (small arcs): DOWN(1) → line → UP(2) → line → DOWN(3)
 *
 * Centres spaced 2R apart. Small arcs have gaps bridged by
 * horizontal lines on the centre line.
 *
 * Layering creates chain-link overlap at the 2 crossing points.
 */
function FlowingCirclesSVG() {
  // The ring thickness comes from the difference between
  // the big arc radius and the small arc radius.
  // The stroke on each path = half that difference so they
  // meet in the middle and form a solid ring.
  const R = 140    // big (outer) arc radius
  const r = 60     // small (inner) arc radius
  const sw = R - r // stroke width = 80, so each path paints 40px
                   // inward/outward from its centre, filling the ring.
  const pad = sw / 2 + 4

  // Centres spaced 2R apart so big arcs connect at centre line.
  // Small arc centres are at the same x positions.
  const cx1 = pad + R
  const cx2 = cx1 + 2 * R
  const cx3 = cx2 + 2 * R
  const cy = pad + R

  const vw = cx3 + R + pad
  const vh = 2 * R + 2 * pad

  // Mid-radius for each path (halfway between R and r)
  const Rm = (R + r) / 2  // 100 - the radius the forward stroke centres on
  const rm = (R + r) / 2  // 100 - same for return path, but we use r-based arcs

  // Actually, simpler: draw the forward path at radius R with strokeWidth sw.
  // The stroke extends sw/2 inward and sw/2 outward from R.
  // Outer edge = R + sw/2 = 180, inner edge = R - sw/2 = 100.
  // Draw the return path at radius r with strokeWidth sw.
  // Outer edge = r + sw/2 = 100, inner edge = r - sw/2 = 20.
  // The forward inner edge (100) meets the return outer edge (100). 

  // Forward path: single continuous path along big arcs
  const forwardPath = [
    `M ${cx1 - R} ${cy}`,
    `A ${R} ${R} 0 0 0 ${cx1 + R} ${cy}`,
    `A ${R} ${R} 0 0 1 ${cx2 + R} ${cy}`,
    `A ${R} ${R} 0 0 0 ${cx3 + R} ${cy}`,
  ].join(" ")

  // Return path: single continuous path along small arcs
  // Small arcs don't reach each other, so horizontal lines bridge the gaps
  const returnPath = [
    `M ${cx3 + r} ${cy}`,
    `A ${r} ${r} 0 0 1 ${cx3 - r} ${cy}`,
    `L ${cx2 + r} ${cy}`,
    `A ${r} ${r} 0 0 0 ${cx2 - r} ${cy}`,
    `L ${cx1 + r} ${cy}`,
    `A ${r} ${r} 0 0 1 ${cx1 - r} ${cy}`,
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
          <stop offset="0%" stopColor="#ffd100" />
          <stop offset="50%" stopColor="#ff8600" />
          <stop offset="100%" stopColor="#fc66a7" />
        </linearGradient>
      </defs>

      {/* Layer 1 (back): return path drawn first */}
      <path
        d={returnPath}
        fill="none"
        stroke="url(#returnGrad)"
        strokeWidth={sw}
      />

      {/* Layer 2 (front): forward path drawn on top for overlap */}
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
