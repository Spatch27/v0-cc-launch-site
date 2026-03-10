"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function WorkflowsBehaviourSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <Section background="light">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="max-w-4xl"
      >
        <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
          Workflows follow behaviour.
        </h2>
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-brand-dark">
            We keep hearing the same story. Marketing invests in a new platform. There's a town hall, they train the trainers - and within months the team has rebuilt their old spreadsheets. The technology works but the project failed.
          </p>
          <p className="text-lg leading-relaxed text-brand-dark">
            The same thing is happening with AI - but on steroids. Teams are piloting agents without redesigning the workflows around them. Same pattern, same result: Technology that works in isolation but fails in practice.
          </p>
        </div>
      </motion.div>
    </Section>
  )
}
