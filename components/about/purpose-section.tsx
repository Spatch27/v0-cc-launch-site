"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function PurposeSection() {
  return (
    <Section background="light">
      <motion.div variants={fadeInUp}>
        <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
          We've long believed that lasting change comes from people, not platforms.
        </h2>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-brand-dark/70">
          <p>
            So we started Committed Citizens. A small team of senior practitioners with the conviction
            and capability to make transformation stick. Not from the sidelines. Not via slide deck. From
            inside the marketing function.
          </p>
          <p>
            We've seen that when there is freedom from operational drag, something remarkable
            happens. Teams who were exhausted become energised. Marketers who were firefighting
            start doing the work they came to do. The system serves the people, the work flies. A
            marketing function ready to drive growth.
          </p>
          <p className="font-medium text-brand-dark">
            We leave behind teams that are fast, confident, and in control. That's what committed
            citizens look like. And that's what we create.
          </p>
        </div>
      </motion.div>
    </Section>
  )
}
