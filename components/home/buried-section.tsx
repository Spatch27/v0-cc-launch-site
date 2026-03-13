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
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function BuriedSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <Section background="light">
      <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2">

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
            You hired brilliant marketers. And then they got buried.
          </motion.h2>

          <motion.div variants={textChild} className="space-y-4">
            <p className="text-lg leading-relaxed text-brand-dark">
              Briefs that should take days take weeks. Platforms generate data nobody trusts. Approval loops are three people too long. Six-figure martech has become shelfware. AI isn&apos;t getting out of pilot. The processes you implemented six months ago are routinely worked around. Your best people spend more time unblocking work than doing it.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              For most CMOs, a quarter of the marketing budget goes on technology. And half of it isn&apos;t being used.
            </p>
            <p className="text-lg font-bold leading-relaxed text-brand-dark">
              That&apos;s operational drag. And it&apos;s a handbrake on your momentum.
            </p>
          </motion.div>
        </motion.div>

        {/* Illustration — right */}
        <motion.div
          className="flex items-center justify-center w-full h-auto min-h-[600px] overflow-hidden rounded-lg"
          initial={{ opacity: 0, x: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.97 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full scale-130 origin-center">
            <BusyWorkIllustration />
          </div>
        </motion.div>

      </div>
    </Section>
  )
}
