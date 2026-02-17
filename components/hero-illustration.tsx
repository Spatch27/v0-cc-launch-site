"use client"

import { motion } from "framer-motion"

export function HeroIllustration({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 500 500" fill="none" className="h-full w-full">
        {/* Large semicircle - pink, dominant */}
        <motion.path
          d="M250 80C343.888 80 420 156.112 420 250H250V80Z"
          fill="#fc66a7"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Triangle wedge - orange */}
        <motion.path
          d="M250 250L380 380L120 380Z"
          fill="#ff8600"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Arc - yellow deep */}
        <motion.path
          d="M80 250C80 156.112 156.112 80 250 80V130C183.726 130 130 183.726 130 250H80Z"
          fill="#ffd100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Small floating circle - warm grey */}
        <motion.circle
          cx="400"
          cy="120"
          r="30"
          fill="#e3dcdc"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        {/* Small floating circle - yellow-light */}
        <motion.circle
          cx="100"
          cy="380"
          r="18"
          fill="#ffeb3e"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        {/* Floating arc accent */}
        <motion.path
          d="M350 350C350 377.614 327.614 400 300 400"
          stroke="#fc66a7"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
        {/* Small triangle - dark */}
        <motion.path
          d="M430 300L460 350L400 350Z"
          fill="#181716"
          opacity="0.3"
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 0.3, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        />
      </svg>
    </div>
  )
}
