"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import LightbulbIllustration from "@/components/approach/lightbulb-illustration"

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
              Workflows follow behaviour. We see how people get work done: where time goes, which decisions stall, what they trust and what gets in their way. Then we build processes around the people to help them do the work.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              Every change should give the team more lift. Clearer decisions. More confidence. Less effort spent working around the system.
            </p>
          </div>
        </div>
        <div className="relative flex h-auto min-h-[300px] lg:min-h-[32rem] items-center justify-center overflow-hidden rounded-lg bg-[#e3dcdc]">
          <div className="w-full origin-center">
            <LightbulbIllustration />
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
