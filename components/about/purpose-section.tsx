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
        <div className="relative flex h-auto lg:min-h-[32rem] items-center justify-center overflow-hidden rounded-lg bg-[#e3dcdc]">
          <div className="w-full scale-130 origin-center max-h-[250px] lg:max-h-none overflow-hidden">
            <AdoptionIllustration />
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
