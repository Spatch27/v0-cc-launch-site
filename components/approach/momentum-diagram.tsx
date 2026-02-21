"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"

const momentumItems = [
  {
    name: "3A Framework™",
    benefit: "We align objectives, activate teams, amplify results.",
    position: { desktop: "left-[12%]" }
  },
  {
    name: "Cadence Loop™",
    benefit: "Proof of progress every six weeks. Guaranteed.",
    position: { desktop: "left-1/2 -translate-x-1/2" }
  },
  {
    name: "Telemetry Stack™",
    benefit: "Live dashboards. No waiting for the end-of-quarter report.",
    position: { desktop: "right-[12%]" }
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
      <motion.h3 variants={fadeInUp} className="font-display text-3xl font-bold text-brand-dark mb-12 md:mb-16">
        Momentum, by design
      </motion.h3>

      {/* Desktop Diagram */}
      <div className="hidden md:block relative w-full max-w-5xl mx-auto">
        {/* SVG with Flowing Circles - from original design */}
        <svg
          viewBox="0 0 960 540"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients for circles */}
            <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd100" />
              <stop offset="50%" stopColor="#ffb800" />
              <stop offset="100%" stopColor="#ff8600" />
            </linearGradient>
            <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8600" />
              <stop offset="50%" stopColor="#fe7533" />
              <stop offset="100%" stopColor="#fc66a7" />
            </linearGradient>
            <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fc66a7" />
              <stop offset="100%" stopColor="#fc66a7" />
            </linearGradient>
          </defs>

          {/* Left Circle (Yellow) - 3A Framework */}
          <path 
            fill="none" 
            stroke="url(#yellowGrad)" 
            strokeWidth="32"
            d="M 248.25 352.75
               Q 284.48 351.94 314.15 331.82
               Q 340.91 313.98 355.78 285.65
               Q 356.25 285.27 356.40 285.19
               Q 346.40 139.35 332.27 126.23
               Q 296.39 92.93 246.46 92.09
               Q 214.25 91.55 186.30 105.57
               C 134.03 131.79 108.16 189.76 118.42 246.57
               C 124.00 277.47 140.59 304.84 164.96 324.58
               Q 197.76 351.15 242.82 352.83
               Q 245.59 352.94 248.25 352.75 Z"
          />

          {/* Center Circle (Orange) - Cadence Loop */}
          <path 
            fill="none" 
            stroke="url(#orangeGrad)" 
            strokeWidth="32"
            d="M 477.00 352.54
               Q 492.76 351.98 507.83 346.92
               C 536.54 338.11 561.47 316.44 576.74 291.12
               Q 577.02 290.65 578.33 288.02
               Q 579.37 285.93 580.48 285.35
               C 563.19 127.47 535.34 104.88 502.23 96.33
               C 462.37 86.03 419.69 93.86 388.15 120.64
               C 375.54 131.35 365.61 143.86 356.90 158.04
               Q 361.63 294.44 363.96 297.77
               C 389.97 335.04 431.54 355.20 477.00 352.54 Z"
          />

          {/* Right Circle (Pink) - Telemetry Stack */}
          <path 
            fill="none" 
            stroke="url(#pinkGrad)" 
            strokeWidth="32"
            d="M 720.58 350.14
               C 773.38 338.66 813.97 292.02 819.76 238.74
               C 823.24 206.75 814.93 172.49 796.20 145.99
               Q 783.59 128.15 765.58 115.16
               C 721.11 83.11 658.65 84.50 615.17 117.93
               Q 594.67 133.70 581.37 156.88
               Q 580.97 157.58 580.20 157.30
               Q 606.99 333.29 657.74 348.01
               Q 687.89 356.76 720.58 350.14 Z"
          />
        </svg>

        {/* Text Overlays */}
        <div className="absolute inset-0 flex items-center justify-between px-8">
          {momentumItems.map((item, idx) => (
            <motion.div
              key={item.name}
              variants={fadeInUp}
              custom={idx}
              className={`absolute top-1/2 -translate-y-1/2 ${item.position.desktop} max-w-[180px]`}
            >
              <div className="text-center space-y-3">
                <h4 className="font-display text-lg md:text-xl font-bold text-brand-yellow-deep leading-tight">
                  {item.name}
                </h4>
                <p className="text-sm md:text-base text-brand-pink font-medium leading-snug">
                  {item.benefit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
