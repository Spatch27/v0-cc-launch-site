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
            You hired brilliant marketers. And then they got buried.
          </motion.h2>

          <motion.div variants={textChild} className="space-y-4">
            <p className="text-lg leading-relaxed text-brand-dark">
              Briefs that should take days. Dashboards with numbers nobody trusts. Expensive martech gathering dust. AI stuck in pilot. Your best people spending more time unblocking work than doing it.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              Your talent isn&apos;t the problem, your operating model is. Together, we&apos;ll build a better one, cycle by cycle, helping your team turn great ideas into brilliant outcomes, reliably.
            </p>
            <p className="text-lg font-bold leading-relaxed text-brand-dark">
              Close the gap between strategy and execution.
            </p>
          </motion.div>
        </motion.div>

        {/* Illustration — right */}
        <motion.div
          className="relative flex h-auto min-h-[300px] lg:min-h-[32rem] items-center justify-center overflow-hidden rounded-lg bg-[#e3dcdc]"
          initial={{ opacity: 0, x: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.97 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full origin-center">
            <BusyWorkIllustration />
          </div>
        </motion.div>

      </div>
    </Section>
  )
}
