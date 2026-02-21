"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const lines = ["Remove drag.", "Build momentum.", "Unlock growth."]

export function AnimatedTypeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] bg-brand-dark px-6 py-24 lg:px-12 lg:py-32"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col justify-center">
        <div className="space-y-4">
          {lines.map((line, i) => (
            <motion.h2
              key={line}
              initial={{ opacity: 0, y: 40 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.8,
                delay: i * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.1] tracking-tight text-brand-white"
            >
              {line}
            </motion.h2>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 30 }
          }
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 max-w-2xl text-lg leading-relaxed text-brand-white/70"
        >
          We redesign how work flows across people, process and technology. 
          Embedding inside your team, removing what&apos;s slowing you down, 
          and building marketing momentum that turns ambition into growth.
        </motion.p>
      </div>
    </section>
  )
}
