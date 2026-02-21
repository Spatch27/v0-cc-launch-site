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
 * Three interlocking rings from 6 arcs, all at radius R.
 *
 * Forward: F1(up over C1) → F2(down under C2) → F3(up over C3)
 * Return:  R3(down under C3) → R2(up over C2) → R1(down under C1)
 *
 * Chain-link overlap:
 *   - At C1/C2 junction: C1 arcs (F1, R1) in FRONT of C2 arcs (F2, R2)
 *   - At C2/C3 junction: C3 arcs (F3, R3) in FRONT of C2 arcs (F2, R2)
 *
 * Uses gradientUnits="userSpaceOnUse" so one gradient flows
 * continuously across all 6 arc segments.
 */
function FlowingCirclesSVG() {
  const R = 130
  const sw = 52
  const pad = sw / 2 + 4

  const cx1 = pad + R
  const cx2 = cx1 + 2 * R
  const cx3 = cx2 + 2 * R
  const cy = pad + R

  const vw = cx3 + R + pad
  const vh = 2 * R + 2 * pad

  // Forward arcs (left → right)
  const F1 = `M ${cx1 - R} ${cy} A ${R} ${R} 0 0 0 ${cx1 + R} ${cy}` // up over C1
  const F2 = `M ${cx2 - R} ${cy} A ${R} ${R} 0 0 1 ${cx2 + R} ${cy}` // down under C2
  const F3 = `M ${cx3 - R} ${cy} A ${R} ${R} 0 0 0 ${cx3 + R} ${cy}` // up over C3

  // Return arcs (right → left)
  const R3 = `M ${cx3 + R} ${cy} A ${R} ${R} 0 0 0 ${cx3 - R} ${cy}` // down under C3
  const R2 = `M ${cx2 + R} ${cy} A ${R} ${R} 0 0 1 ${cx2 - R} ${cy}` // up over C2
  const R1 = `M ${cx1 + R} ${cy} A ${R} ${R} 0 0 0 ${cx1 - R} ${cy}` // down under C1

  const x0 = cx1 - R - sw / 2 // leftmost pixel
  const x1 = cx3 + R + sw / 2 // rightmost pixel

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Single gradient spanning full width in user-space coords */}
        <linearGradient id="ringGrad" gradientUnits="userSpaceOnUse" x1={x0} y1={cy} x2={x1} y2={cy}>
          <stop offset="0%" stopColor="#ffd100" />
          <stop offset="50%" stopColor="#ff8600" />
          <stop offset="100%" stopColor="#fc66a7" />
        </linearGradient>
      </defs>

      {/* Layer 1 (back): C2 arcs - always behind at both junctions */}
      <path d={F2} fill="none" stroke="url(#ringGrad)" strokeWidth={sw} />
      <path d={R2} fill="none" stroke="url(#ringGrad)" strokeWidth={sw} />

      {/* Layer 2 (front): C1 and C3 arcs - overlap C2 at the junctions */}
      <path d={F1} fill="none" stroke="url(#ringGrad)" strokeWidth={sw} />
      <path d={R1} fill="none" stroke="url(#ringGrad)" strokeWidth={sw} />
      <path d={F3} fill="none" stroke="url(#ringGrad)" strokeWidth={sw} />
      <path d={R3} fill="none" stroke="url(#ringGrad)" strokeWidth={sw} />
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
      {/* Desktop / Tablet Diagram */}
      <motion.div variants={fadeInUp} className="hidden md:block w-full">
        <div className="relative">
          {/* SVG Flowing Circles */}
          <FlowingCirclesSVG />

          {/* Text overlays positioned inside each circle */}
          <div className="absolute inset-0 flex items-center justify-center gap-[260px]">
            {/* Left circle (C1) - yellow accent */}
            <div className="text-center w-32">
              <h4 className="font-display text-base lg:text-lg font-bold text-white leading-tight mb-2">
                {momentumItems[0].name}
              </h4>
              <p className="text-xs lg:text-sm text-brand-yellow-deep font-medium leading-snug">
                {momentumItems[0].benefit}
              </p>
            </div>
            {/* Center circle (C2) - orange accent */}
            <div className="text-center w-32">
              <h4 className="font-display text-base lg:text-lg font-bold text-white leading-tight mb-2">
                {momentumItems[1].name}
              </h4>
              <p className="text-xs lg:text-sm text-brand-orange font-medium leading-snug">
                {momentumItems[1].benefit}
              </p>
            </div>
            {/* Right circle (C3) - pink accent */}
            <div className="text-center w-32">
              <h4 className="font-display text-base lg:text-lg font-bold text-white leading-tight mb-2">
                {momentumItems[2].name}
              </h4>
              <p className="text-xs lg:text-sm text-brand-pink font-medium leading-snug">
                {momentumItems[2].benefit}
              </p>
            </div>
          </div>
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
