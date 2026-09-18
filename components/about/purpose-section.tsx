"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import AdoptionIllustration from "@/components/illustrations/adoption"

export function PurposeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <Section background="light" compact>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="grid gap-4 lg:gap-12 lg:grid-cols-2 lg:items-center"
      >
        <motion.div variants={fadeInUp}>
          <h2 className="mb-8 max-w-4xl font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Built from the inside.
          </h2>
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-brand-dark">
            <p>
              We've both spent 25 years leading marketing teams and working inside agencies. We saw the same workflows fail again and again: approvals that stalled, handovers that dropped things, tools nobody used. When AI arrived, we saw a huge opportunity. We also saw that, handled badly, it would only make those problems worse, and faster. From inside an agency, we couldn't do much about either. So we started Committed Citizens.
            </p>
            <p>
              We work inside the marketing function, not from the sidelines. Teams worn out by the last transformation get their energy back. Marketers who were firefighting get to do the work they came to do. And marketing earns its place as an engine for growth.
            </p>
            <p className="font-bold text-brand-dark">
              A group of committed citizens doing the most effective work of their careers.
            </p>
          </div>
        </motion.div>
        <div className="relative flex h-auto min-h-[300px] lg:min-h-[32rem] items-center justify-center overflow-hidden rounded-lg bg-[#e3dcdc]">
          <div className="w-full scale-130 origin-center">
            <AdoptionIllustration />
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
