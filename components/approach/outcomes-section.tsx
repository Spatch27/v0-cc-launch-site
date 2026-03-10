"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function OutcomesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <Section background="light">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="grid items-center gap-12 lg:grid-cols-2"
      >
        <div className="relative h-96 overflow-hidden rounded-lg">
          <Image
            src="/images/outcomes-focus.jpg"
            alt="Built for outcomes - performance metrics and results"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Built for outcomes, not renewals.
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-lg leading-relaxed text-brand-dark">
              Most transformation programmes are designed to sell you a platform, not fix how you work. Over 40% of the average marketing budget goes on technology and the agencies that implement it. Less than a third reaches your customers. The recommendation is the implementation. The implementation is the licence. The licence is the lock-in.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              We're platform-agnostic. No tech tie-ins. No renewal cycles to protect. Your operating model gets shaped around your team's needs, not someone else's contract terms.
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
