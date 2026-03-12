"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"

export function HeroPhilosophy() {
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
      className="relative h-screen bg-brand-pink px-6 lg:px-12"
    >
      <div className="mx-auto flex h-full max-w-[1400px] flex-col justify-between pt-24 lg:pt-28 pb-12">
        {/* Main headline */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-20"
        >
          <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-brand-dark text-balance">
            Only people <br />
            create <i>flow.</i>
          </h1>
        </motion.div>

        {/* Supporting copy */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="self-end"
        >
          <p className="max-w-2xl text-right text-xl leading-relaxed text-brand-dark/80">
            Every failed transformation started with a platform and assumed the people would follow. They rarely do.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
