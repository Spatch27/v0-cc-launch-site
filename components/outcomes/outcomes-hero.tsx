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
      className="relative flex min-h-svh flex-col bg-brand-dark px-6 lg:px-12"
    >
      <div className="mx-auto flex w-full min-h-svh max-w-[1400px] flex-col justify-between gap-10 pt-32 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] md:gap-16 md:pt-40 md:pb-20 lg:gap-20 lg:pt-44 lg:pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-balance font-display text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-brand-white"
        >
          When the work flows, results <i>fly</i>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl self-end text-right text-lg leading-relaxed text-brand-white/50 md:text-xl"
        >
          Good marketing teams rarely fall short for lack of talent. They get held back by how the work gets done. Timelines stretch. Numbers get argued over. Smart people spend more time unblocking work than doing it. Redesign how the work gets done, put AI to work in the right places, and the results follow.{' '}
          <br />
          <span className="font-semibold text-brand-white">Here are four examples of the work we do.</span>
        </motion.p>
      </div>
    </motion.section>
  )
}
