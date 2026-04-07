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

  // Line 1: "Remove drag." - fade in quickly, hold for a long time, fade out
  const line1Word1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.25, 0.3, 0.35], [0, 1, 1, 1, 0])
  const line1Word1Y = useTransform(scrollYProgress, [0.25, 0.35], [0, -150])

  const line1Word2Opacity = useTransform(scrollYProgress, [0.02, 0.07, 0.25, 0.3, 0.37], [0, 1, 1, 1, 0])
  const line1Word2Y = useTransform(scrollYProgress, [0.25, 0.37], [0, -150])

  // Line 2: "Build momentum." - fade in, hold, fade out
  const line2Word1Opacity = useTransform(scrollYProgress, [0.38, 0.44, 0.6, 0.65, 0.7], [0, 1, 1, 1, 0])
  const line2Word1Y = useTransform(scrollYProgress, [0.6, 0.7], [0, -150])

  const line2Word2Opacity = useTransform(scrollYProgress, [0.4, 0.46, 0.6, 0.65, 0.72], [0, 1, 1, 1, 0])
  const line2Word2Y = useTransform(scrollYProgress, [0.6, 0.72], [0, -150])

  // Line 3: "Unlock growth." - fade in, hold, then fade out gently
  const line3Word1Opacity = useTransform(scrollYProgress, [0.73, 0.79, 0.88, 0.95], [0, 1, 1, 0])
  const line3Word1Y = useTransform(scrollYProgress, [0.73, 0.79, 0.88, 0.95], [50, 0, 0, -50])

  const line3Word2Opacity = useTransform(scrollYProgress, [0.75, 0.81, 0.88, 0.95], [0, 1, 1, 0])
  const line3Word2Y = useTransform(scrollYProgress, [0.75, 0.81, 0.88, 0.95], [50, 0, 0, -50])

  // Background fades out at the very end so the section dissolves rather than snapping away
  const bgOpacity = useTransform(scrollYProgress, [0.88, 1], [1, 0])

  return (
    <div className="relative -mt-1">
      <section
        ref={sectionRef}
        className="relative h-[800vh] md:h-[600vh] w-full"
      >
        {/* Sticky container that holds both background and text */}
        <motion.div style={{ opacity: bgOpacity }} className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background image - absolute within sticky container */}
          <div className="absolute inset-0">
            <Image
              src="/images/bridge-aerial-bw.jpg"
              alt=""
              fill
              className="object-cover grayscale brightness-[0.4]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          </div>

          {/* Text content that animates as you scroll - each phrase centered and stacked */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="relative text-center">
              {/* Line 1: Remove drag. - positioned absolutely so phrases overlap in center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-0">
                <motion.span
                  style={{ opacity: line1Word1Opacity, y: line1Word1Y }}
                  className="font-display text-[clamp(3.5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-brand-pink"
                >
                  Remove
                </motion.span>
                <motion.span
                  style={{ opacity: line1Word2Opacity, y: line1Word2Y }}
                  className="font-display text-[clamp(3.5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-brand-pink"
                >
                  drag.
                </motion.span>
              </div>

              {/* Line 2: Build momentum. */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-0">
                <motion.span
                  style={{ opacity: line2Word1Opacity, y: line2Word1Y }}
                  className="font-display text-[clamp(3.5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-brand-pink"
                >
                  Build
                </motion.span>
                <motion.span
                  style={{ opacity: line2Word2Opacity, y: line2Word2Y }}
                  className="font-display text-[clamp(3.5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-brand-pink"
                >
                  momentum.
                </motion.span>
              </div>

              {/* Line 3: Unlock growth. */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-0">
                <motion.span
                  style={{ opacity: line3Word1Opacity, y: line3Word1Y }}
                  className="font-display text-[clamp(3.5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-yellow-300"
                >
                  Unlock
                </motion.span>
                <motion.span
                  style={{ opacity: line3Word2Opacity, y: line3Word2Y }}
                  className="font-display text-[clamp(3.5rem,12vw,12rem)] font-bold leading-[1.05] tracking-tight text-yellow-300"
                >
                  growth.
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
