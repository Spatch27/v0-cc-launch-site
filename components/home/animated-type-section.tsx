"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const lines = ["Remove drag.", "Build momentum.", "Unlock growth."]

export function AnimatedTypeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect for background image
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  // Transform for text based on scroll
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.2, 1, 1])
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.4, 0.6], [0.2, 1, 1])
  const opacity3 = useTransform(scrollYProgress, [0.2, 0.5, 0.7], [0.2, 1, 1])

  const scale1 = useTransform(scrollYProgress, [0, 0.3], [0.95, 1])
  const scale2 = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1])
  const scale3 = useTransform(scrollYProgress, [0.2, 0.5], [0.95, 1])

  const opacities = [opacity1, opacity2, opacity3]
  const scales = [scale1, scale2, scale3]

  return (
    <section
      ref={sectionRef}
      className="relative -mt-1 min-h-[80vh] overflow-hidden"
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
          {lines.map((line, i) => (
            <motion.h2
              key={line}
              style={{ opacity: opacities[i], scale: scales[i] }}
              className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.1] tracking-tight text-brand-pink"
            >
              {line}
            </motion.h2>
          ))}
        </div>
      </div>
    </section>
  )
}
