"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const lines = ["Remove drag.", "Build momentum.", "Unlock growth."]

export function AnimatedTypeSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Parallax effect for background image
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/images/bridge-aerial-bw.jpg"
          alt=""
          fill
          className="object-cover grayscale brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </motion.div>

      <div className="mx-auto flex min-h-[80vh] max-w-[1400px] flex-col justify-center px-6 py-24 lg:px-12 lg:py-32">
        <div className="space-y-2">
          {lines.map((line, i) => {
            const lineRef = useRef(null)
            const { scrollYProgress: lineProgress } = useScroll({
              target: lineRef,
              offset: ["start 0.8", "start 0.3"],
            })

            const opacity = useTransform(lineProgress, [0, 1], [0.2, 1])
            const scale = useTransform(lineProgress, [0, 1], [0.95, 1])

            return (
              <motion.div key={line} ref={lineRef} className="relative">
                <motion.h2
                  style={{ opacity, scale }}
                  className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.1] tracking-tight text-brand-pink"
                >
                  {line}
                </motion.h2>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
