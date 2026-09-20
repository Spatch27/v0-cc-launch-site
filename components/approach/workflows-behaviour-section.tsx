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
            Own.<br />
            Outsource.<br />
            Automate.
          </h2>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-brand-dark">
              Marketers own the thinking. The craft goes to the right experts. The repetitive work goes to bots that do it better.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              The first redesign shows how your function really works: where time goes, which decisions stall and who owns what. That&apos;s where the bigger opportunities show up, in roles, structure and culture. From there we work out with your team what stays with people, what goes to specialists and what a bot can run.
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
