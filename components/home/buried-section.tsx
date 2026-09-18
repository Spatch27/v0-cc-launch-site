"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Section } from "@/components/section"
import BusyWorkIllustration from "@/components/home/busy-work-illustration"

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const textChild = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" } },
}

export function BuriedSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <Section background="light">
      <div ref={ref} className="grid items-center gap-4 lg:gap-12 lg:grid-cols-2">

        {/* Text — left */}
        <motion.div
          className="space-y-6"
          variants={textContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={textChild}
            className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl"
          >
            AI makes the doing faster. The work still waits.
          </motion.h2>

          <motion.div variants={textChild} className="space-y-4">
            <p className="text-lg leading-relaxed text-brand-dark">
              A brief takes minutes to write and a week to sign off. Your team produces more ideas, assets and analysis than ever, and nobody&apos;s sure what to act on. The platform takes the blame, but the problem sits in how the work moves.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              Every part of the business is working out what AI means for it. Marketing should be leading that conversation, with a clear view of what it can now do better. The functions that work this out now will pull ahead. The rest will spend the next few years catching up.
            </p>
          </motion.div>
        </motion.div>

        {/* Illustration — right */}
        <motion.div
          className="relative flex h-auto min-h-[300px] lg:min-h-[32rem] items-center justify-center overflow-hidden rounded-lg bg-[#e3dcdc]"
          initial={{ opacity: 0, x: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.97 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full origin-center">
            <BusyWorkIllustration />
          </div>
        </motion.div>

      </div>
    </Section>
  )
}
