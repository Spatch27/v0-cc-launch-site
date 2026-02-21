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
 * Three interlocking rings from a single thick-stroked path.
 *
 * The path is 3 semicircular arcs (like a sine wave):
 *   Arc 1: UP over circle 1
 *   Arc 2: DOWN under circle 2
 *   Arc 3: UP over circle 3
 *
 * All arcs share the same radius R. Centres are spaced 2R apart
 * so endpoints meet exactly on the centre line.
 *
 * A thick stroke gives the rings their width.
 * Arcs 1 & 3 are drawn in front of arc 2 to create the
 * chain-link overlap at the two crossing points.
 */
function FlowingCirclesSVG() {
  const R = 130    // arc radius
  const sw = 48    // stroke width (ring thickness)
  const pad = sw   // padding around edges

  // Centres of the 3 arcs, spaced 2R apart
  const cx1 = pad + R           // 178
  const cx2 = cx1 + 2 * R      // 438
  const cx3 = cx2 + 2 * R      // 698
  const cy = pad + R            // 178 (centre line)

  const vw = cx3 + R + pad     // 876
  const vh = 2 * R + 2 * pad   // 356

  // Arc 1: UP over circle 1 (sweep=0 = counter-clockwise in SVG = visually upward)
  const arc1 = `M ${cx1 - R} ${cy} A ${R} ${R} 0 0 0 ${cx1 + R} ${cy}`

  // Arc 2: DOWN under circle 2 (sweep=1 = clockwise in SVG = visually downward)
  const arc2 = `M ${cx2 - R} ${cy} A ${R} ${R} 0 0 1 ${cx2 + R} ${cy}`

  // Arc 3: UP over circle 3 (sweep=0 = visually upward)
  const arc3 = `M ${cx3 - R} ${cy} A ${R} ${R} 0 0 0 ${cx3 + R} ${cy}`

  const strokeProps = {
    fill: "none",
    strokeWidth: sw,
    strokeLinejoin: "round" as const,
    strokeLinecap: "butt" as const,
  }

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffd100" />
          <stop offset="35%" stopColor="#ff8600" />
          <stop offset="100%" stopColor="#fc66a7" />
        </linearGradient>
      </defs>

      {/* Layer 1 (back): arc 2 goes DOWN, drawn first so it sits behind */}
      <path d={arc2} stroke="url(#flowGrad)" {...strokeProps} />

      {/* Layer 2 (front): arcs 1 & 3 go UP, drawn on top to overlap at crossings */}
      <path d={arc1} stroke="url(#flowGrad)" {...strokeProps} />
      <path d={arc3} stroke="url(#flowGrad)" {...strokeProps} />
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
