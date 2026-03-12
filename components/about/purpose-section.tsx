"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function PurposeSection() {
  return (
    <Section background="light">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div variants={fadeInUp}>
          <h2 className="mb-8 max-w-4xl font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Adoption is the only option.
          </h2>
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-brand-dark">
            <p>
              We've long believed that lasting change comes from people, not platforms. A small team of senior practitioners with the conviction and capability to make transformation stick. Not from the sidelines. Not via slide deck. From inside the marketing function.
            </p>
            <p>
              Teams exhausted by transformation fatigue become energised. Marketers who were firefighting start doing the work they came to do.
            </p>
            <p className="font-medium text-brand-dark">
              We leave behind teams that are fast, confident, and in control. That's what committed citizens look like. And that's what we create.
            </p>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="hidden lg:flex lg:justify-end">
          <img 
            src="/images/team-illustration.svg" 
            alt="Team illustration" 
            className="max-h-[500px] w-auto"
          />
        </motion.div>
      </div>
    </Section>
  )
}
