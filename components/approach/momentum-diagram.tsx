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
 * Three interlocking thick rings flowing into each other.
 * Each ring is drawn as two concentric arcs with connecting caps,
 * clipped so the overlaps create the chain-link illusion.
 *
 * Centres: C1(200, 220)  C2(420, 220)  C3(640, 220)
 * Outer radius 130, inner radius 80  -> ring stroke ~50
 * Overlap region ~90 px wide between adjacent circles.
 */
function FlowingCirclesSVG() {
  // Circle centres
  const cx1 = 200, cx2 = 420, cx3 = 640, cy = 220
  const R = 130 // outer radius
  const r = 80  // inner radius

  // Helper: full circle path (clockwise outer, counter-clockwise inner = ring)
  const ringPath = (cx: number) =>
    `M ${cx + R} ${cy} A ${R} ${R} 0 1 1 ${cx - R} ${cy} A ${R} ${R} 0 1 1 ${cx + R} ${cy} Z ` +
    `M ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} Z`

  // For the interlocking effect we split each ring into front and back halves.
  // The "back" half of the left ring goes behind the centre ring,
  // and the "front" half of the centre ring goes over the left ring, etc.
  //
  // We achieve this by drawing full rings but using clip-paths so
  // the overlap regions show the correct "over / under" ordering.

  // Intersection x-coordinates (approximate midpoints of overlap)
  const overlapLeftX = (cx1 + cx2) / 2   // 310
  const overlapRightX = (cx2 + cx3) / 2  // 530

  return (
    <svg
      viewBox="0 0 840 440"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="gradYellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd100" />
          <stop offset="100%" stopColor="#ff8600" />
        </linearGradient>
        <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8600" />
          <stop offset="100%" stopColor="#fc66a7" />
        </linearGradient>
        <linearGradient id="gradPink" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fc66a7" />
          <stop offset="100%" stopColor="#e8457a" />
        </linearGradient>

        {/* Clip: left side of overlap 1 (for left ring's back portion) */}
        <clipPath id="clipLeftBack">
          <rect x="0" y="0" width={overlapLeftX} height="440" />
        </clipPath>
        {/* Clip: right side of overlap 1 + left side of overlap 2 (center ring front) */}
        <clipPath id="clipCenterFront">
          <rect x={overlapLeftX} y="0" width={overlapRightX - overlapLeftX} height="440" />
        </clipPath>
        {/* Clip: right side only */}
        <clipPath id="clipRightBack">
          <rect x={overlapRightX} y="0" width="840" height="440" />
        </clipPath>

        {/* Full-width clips for the non-overlapping portions */}
        <clipPath id="clipLeftFull">
          <rect x="0" y="0" width={overlapLeftX - 1} height="440" />
        </clipPath>
        <clipPath id="clipRightFull">
          <rect x={overlapRightX + 1} y="0" width="440" height="440" />
        </clipPath>
      </defs>

      {/*
        Layer order (bottom to top):
        1. Left ring back half (behind center)
        2. Right ring back half (behind center)
        3. Center ring (full - goes over left and right at the overlaps' top)
        4. Left ring front half (goes over center at the overlap bottom)
        5. Right ring front half (goes over center at the overlap bottom)

        For the chain-link effect: at the TOP of each overlap, the center
        ring passes in front. At the BOTTOM, the outer rings pass in front.
      */}

      {/* === BACK LAYERS === */}

      {/* Left ring - back portion (top of overlap goes behind center) */}
      <path
        d={ringPath(cx1)}
        fill="url(#gradYellow)"
        fillRule="evenodd"
      />

      {/* Right ring - back portion */}
      <path
        d={ringPath(cx3)}
        fill="url(#gradPink)"
        fillRule="evenodd"
      />

      {/* === CENTER RING (middle layer) === */}
      <path
        d={ringPath(cx2)}
        fill="url(#gradOrange)"
        fillRule="evenodd"
      />

      {/* === FRONT LAYERS - outer rings overlap bottom in front === */}

      {/* Left ring - front portion at bottom of overlap */}
      <path
        d={ringPath(cx1)}
        fill="url(#gradYellow)"
        fillRule="evenodd"
        clipPath="url(#clipLeftBack)"
      />

      {/* Right ring - front portion at bottom of overlap */}
      <path
        d={ringPath(cx3)}
        fill="url(#gradPink)"
        fillRule="evenodd"
        clipPath="url(#clipRightBack)"
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
