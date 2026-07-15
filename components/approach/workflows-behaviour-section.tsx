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
    <Section background="light" compact>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="grid items-center gap-4 lg:gap-12 lg:grid-cols-2"
      >
        <div>
          <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Everyone gets a jetpack.
          </h2>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-brand-dark">
              We start with the business need and assess how your people get work done: where time goes, which decisions stall, and what gets in their way. Then we enable people to do more effective work - sometimes aided by agentic automations.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              Every change should give the team more lift. More confidence and capability. Less effort spent working around the system.
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
