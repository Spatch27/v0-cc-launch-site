"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function OutcomesHero() {
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
      className="relative min-h-svh lg:h-screen bg-brand-dark px-6 lg:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col pt-20 lg:pt-28 pb-24 lg:pb-16 gap-52 lg:gap-32 lg:h-full lg:justify-between">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-brand-white"
        >
          When the work flows, results <i>fly</i>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl self-end text-right text-lg leading-relaxed text-brand-white/50"
        >
          Marketing teams don't collapse, they get dragged down. Timelines stretch. Reporting gets contested. Smart people spend more time unblocking than building. The energy is there, but the momentum isn't.{' '}
          <br />
          <span className="font-semibold text-brand-white">Here are four examples of the work we do.</span>
        </motion.p>
      </div>
    </motion.section>
  )
}
