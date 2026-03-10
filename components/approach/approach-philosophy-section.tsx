"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Section } from "@/components/section"

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const textChild = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function ApproachPhilosophySection() {
  const ref2 = useRef(null)
  const inView2 = useInView(ref2, { once: true, margin: "-80px" })

  return (
    <Section background="light">
      <div>
        {/* Built for outcomes — Image Left, Text Right */}
        <div ref={ref2} className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            className="relative h-96 overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: -40, scale: 0.97 }}
            animate={inView2 ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -40, scale: 0.97 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/outcomes-focus.jpg"
              alt="Built for outcomes - performance metrics and results"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={textContainer}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
          >
            <motion.h3
              variants={textChild}
              className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl"
            >
              Built for outcomes, not renewals.
            </motion.h3>
            <motion.div variants={textChild} className="max-w-3xl space-y-4">
              <p className="text-lg leading-relaxed text-brand-dark/70">
                Most transformation programmes are designed to sell you a platform, not fix how you work. Over 40% of the average marketing budget goes on technology and the agencies that implement it. Less than a third reaches your customers. The recommendation is the implementation. The implementation is the licence. The licence is the lock-in.
              </p>
              <p className="text-lg leading-relaxed text-brand-dark/70">
                We're platform-agnostic. No tech tie-ins. No renewal cycles to protect. Your operating model gets shaped around your team's needs, not someone else's contract terms.
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </Section>
  )
}
