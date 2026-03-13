"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="relative min-h-svh lg:h-screen bg-brand-orange px-6 lg:px-12"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col pt-20 lg:pt-28 pb-24 lg:pb-16 gap-52 lg:gap-32 lg:h-full lg:justify-between">
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 max-w-5xl font-display text-[clamp(3.5rem,9.5vw,9.5rem)] font-bold leading-[0.95] tracking-tight text-brand-dark"
        >
          Freedom
          <br />
          from <em>drag</em>.
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-end"
        >
          <p className="max-w-[28rem] text-xl font-semibold leading-relaxed text-brand-dark text-right">
            We are the consultancy for CMOs who want their marketing to move <em>faster</em>.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
