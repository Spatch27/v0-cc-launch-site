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

  // Easing function for smoother transitions
  const easeOut = [0.32, 0.72, 0, 1]

  // Line 1: "Remove drag." - visible from 0 to 0.25, rolls up
  const line1Word1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.24], [0, 1, 1, 0])
  const line1Word1Y = useTransform(scrollYProgress, [0.18, 0.25], [0, -150], { ease: easeOut })
  
  const line1Word2Opacity = useTransform(scrollYProgress, [0.02, 0.1, 0.18, 0.25], [0, 1, 1, 0])
  const line1Word2Y = useTransform(scrollYProgress, [0.18, 0.26], [0, -150], { ease: easeOut })

  // Line 2: "Build momentum." - visible from 0.25 to 0.5, rolls up
  const line2Word1Opacity = useTransform(scrollYProgress, [0.22, 0.3, 0.43, 0.49], [0, 1, 1, 0])
  const line2Word1Y = useTransform(scrollYProgress, [0.43, 0.5], [0, -150], { ease: easeOut })
  
  const line2Word2Opacity = useTransform(scrollYProgress, [0.24, 0.32, 0.43, 0.5], [0, 1, 1, 0])
  const line2Word2Y = useTransform(scrollYProgress, [0.43, 0.51], [0, -150], { ease: easeOut })

  // Line 3: "Unlock growth." - visible from 0.5 onwards, holds longer
  const line3Word1Opacity = useTransform(scrollYProgress, [0.47, 0.55], [0, 1])
  const line3Word1Y = useTransform(scrollYProgress, [0.47, 0.55], [50, 0], { ease: easeOut })
  
  const line3Word2Opacity = useTransform(scrollYProgress, [0.49, 0.57], [0, 1])
  const line3Word2Y = useTransform(scrollYProgress, [0.49, 0.57], [50, 0], { ease: easeOut })

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
            {/* Line 1: Remove drag. - words animate separately */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                style={{ opacity: line1Word1Opacity, y: line1Word1Y }}
                className="font-display text-[clamp(5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-brand-pink"
              >
                Remove
              </motion.div>
              <motion.div
                style={{ opacity: line1Word2Opacity, y: line1Word2Y }}
                className="font-display text-[clamp(5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-brand-pink"
              >
                drag.
              </motion.div>
            </div>

            {/* Line 2: Build momentum. - words animate separately */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                style={{ opacity: line2Word1Opacity, y: line2Word1Y }}
                className="font-display text-[clamp(5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-brand-pink"
              >
                Build
              </motion.div>
              <motion.div
                style={{ opacity: line2Word2Opacity, y: line2Word2Y }}
                className="font-display text-[clamp(5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-brand-pink"
              >
                momentum.
              </motion.div>
            </div>

            {/* Line 3: Unlock growth. - words animate separately */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                style={{ opacity: line3Word1Opacity, y: line3Word1Y }}
                className="font-display text-[clamp(5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-yellow-300"
              >
                Unlock
              </motion.div>
              <motion.div
                style={{ opacity: line3Word2Opacity, y: line3Word2Y }}
                className="font-display text-[clamp(5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-yellow-300"
              >
                growth.
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
