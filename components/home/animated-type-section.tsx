"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function AnimatedTypeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Line 1: "Remove drag." - visible from 0 to 0.33, rolls up
  const line1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.33], [0, 1, 1, 0])
  const line1Y = useTransform(scrollYProgress, [0.25, 0.33], [0, -100])

  // Line 2: "Build momentum." - visible from 0.33 to 0.66, rolls up
  const line2Opacity = useTransform(scrollYProgress, [0.3, 0.38, 0.58, 0.66], [0, 1, 1, 0])
  const line2Y = useTransform(scrollYProgress, [0.58, 0.66], [0, -100])

  // Line 3: "Unlock growth." - visible from 0.66 onwards, stays
  const line3Opacity = useTransform(scrollYProgress, [0.63, 0.73], [0, 1])
  const line3Y = useTransform(scrollYProgress, [0.63, 0.73], [50, 0])

  return (
    <section
      ref={sectionRef}
      className="relative -mt-1 h-[300vh]"
    >
      {/* Sticky container that holds both background and text */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image - fixed in place */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bridge-aerial-bw.jpg"
            alt=""
            fill
            className="object-cover grayscale brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Text content that animates as you scroll */}
        <div className="flex h-full items-center justify-center">
          <div className="relative text-center">
            {/* Line 1: Remove drag. */}
            <motion.h2
              style={{ opacity: line1Opacity, y: line1Y }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-brand-pink"
            >
              Remove
              <br />
              drag.
            </motion.h2>

            {/* Line 2: Build momentum. */}
            <motion.h2
              style={{ opacity: line2Opacity, y: line2Y }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-brand-pink"
            >
              Build
              <br />
              momentum.
            </motion.h2>

            {/* Line 3: Unlock growth. */}
            <motion.h2
              style={{ opacity: line3Opacity, y: line3Y }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-yellow-300"
            >
              Unlock
              <br />
              growth.
            </motion.h2>
          </div>
        </div>
      </div>
    </section>
  )
}
