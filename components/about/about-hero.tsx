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
      className="relative flex min-h-svh flex-col bg-brand-yellow-deep px-6 lg:px-12"
    >
      <div className="mx-auto flex w-full min-h-svh max-w-[1400px] flex-col justify-between gap-10 pt-32 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] md:gap-16 md:pt-40 md:pb-20 lg:gap-20 lg:pt-44 lg:pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
          className="max-w-4xl text-balance font-display text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-brand-dark"
        >
          Making marketing work, <em>work.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-xl self-end text-right text-lg leading-relaxed text-brand-dark md:text-xl"
        >
          We're hands-on consultants who help CMOs redesign their marketing function for the way marketing works now. <strong>The right people make the right calls, AI does the heavy lifting, and the work flies.</strong>
        </motion.p>
      </div>
    </motion.section>
  )
}
