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
 * Three interlocking rings built from 6 semicircular arcs.
 *
 * The single continuous path is:
 *   1. Top half of big circle 1 (left → right)
 *   2. Top half of small circle 2 (left → right)
 *   3. Top half of big circle 3 (left → right)
 *   4. Bottom half of big circle 3 (right → left)
 *   5. Bottom half of small circle 2 (right → left)
 *   6. Bottom half of big circle 1 (right → left, back to start)
 *
 * Key constraint: distance between centres = R + r
 * so the arcs connect seamlessly at the centre line.
 *
 * The line overlaps itself at 2 crossing points on the centre line.
 * We draw back arcs first, then front arcs on top.
 */
function FlowingCirclesSVG() {
  const R = 140   // big circle radius
  const r = 65    // small circle radius
  const sw = 28   // stroke width
  const d = R + r // distance between centres = 205

  const cx1 = R + sw  // 168
  const cx2 = cx1 + d // 373
  const cx3 = cx2 + d // 578
  const cy = R + sw    // 168

  const vw = cx3 + R + sw  // 746
  const vh = cy + R + sw   // 336

  // The 6 arcs as individual path strings
  // Top arcs go left-to-right (sweep-flag = 1 for clockwise)
  // Bottom arcs go right-to-left (sweep-flag = 1 for clockwise)

  // Arc 1: Top half big circle 1
  const arc1 = `M ${cx1 - R} ${cy} A ${R} ${R} 0 0 1 ${cx1 + R} ${cy}`
  // Arc 2: Top half small circle 2
  const arc2 = `M ${cx2 - r} ${cy} A ${r} ${r} 0 0 1 ${cx2 + r} ${cy}`
  // Arc 3: Top half big circle 3
  const arc3 = `M ${cx3 - R} ${cy} A ${R} ${R} 0 0 1 ${cx3 + R} ${cy}`
  // Arc 4: Bottom half big circle 3
  const arc4 = `M ${cx3 + R} ${cy} A ${R} ${R} 0 0 1 ${cx3 - R} ${cy}`
  // Arc 5: Bottom half small circle 2
  const arc5 = `M ${cx2 + r} ${cy} A ${r} ${r} 0 0 1 ${cx2 - r} ${cy}`
  // Arc 6: Bottom half big circle 1
  const arc6 = `M ${cx1 + R} ${cy} A ${R} ${R} 0 0 1 ${cx1 - R} ${cy}`

  const strokeProps = {
    fill: "none",
    strokeWidth: sw,
    strokeLinecap: "round" as const,
  }

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient flows across the full width: yellow → orange → pink */}
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffd100" />
          <stop offset="35%" stopColor="#ff8600" />
          <stop offset="100%" stopColor="#fc66a7" />
        </linearGradient>
      </defs>

      {/*
        Layer 1 (back): bottom arcs (4, 5, 6)
        These sit behind at the crossing points.
      */}
      <path d={arc6} stroke="url(#flowGrad)" {...strokeProps} />
      <path d={arc5} stroke="url(#flowGrad)" {...strokeProps} />
      <path d={arc4} stroke="url(#flowGrad)" {...strokeProps} />

      {/*
        Layer 2 (front): top arcs (1, 2, 3)
        These pass over the bottom arcs at the crossings.
      */}
      <path d={arc1} stroke="url(#flowGrad)" {...strokeProps} />
      <path d={arc2} stroke="url(#flowGrad)" {...strokeProps} />
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
