"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import RocketIllustration from "@/components/home/rocket-illustration"

export function WorkflowsBehaviourSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <Section background="light" compact className="cc-approach-paired-section">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="grid items-center gap-4 lg:gap-12 lg:grid-cols-2"
      >
        <div>
          <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Do things better. Do better things.
          </h2>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-brand-dark">
              We look at how the work really gets done: where time goes, which decisions stall and who owns what. Then we define with your team where ownership, specialist skills and automation belong. Roles will change, and the people help shape what comes next.
            </p>
          </div>
        </div>
        <div className="relative flex h-auto min-h-[300px] lg:min-h-[32rem] items-center justify-center overflow-hidden rounded-lg bg-[#e3dcdc]">
          <div className="w-full origin-center">
            <RocketIllustration />
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
