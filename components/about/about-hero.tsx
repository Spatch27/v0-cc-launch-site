"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function AboutHero() {
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
      className="relative min-h-svh lg:h-screen bg-brand-yellow-deep px-6 lg:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col pt-20 lg:pt-28 pb-24 lg:pb-16 gap-52 lg:gap-32 lg:h-full lg:justify-between">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-brand-dark"
        >
          Making marketing work, work.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-xl self-end text-right text-lg leading-relaxed text-brand-dark"
        >
          We started Committed Citizens after seeing what happens when marketing teams are freed from operational drag. <strong>The system serves the people, and the work flies.</strong>
        </motion.p>
      </div>
    </motion.section>
  )
}
