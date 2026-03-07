"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function AIPropellantSection() {
  return (
    <Section background="light">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
          AI as a propellant.
        </h2>
        <div className="max-w-3xl space-y-4">
          <p className="text-lg leading-relaxed text-brand-dark/70">
            We're not an AI consultancy. We're a transformation consultancy that knows how to put AI to work. We start with how your marketing actually works — and work out where AI removes drag and where it creates new capability. Sometimes that's automating handoffs. Sometimes it's surfacing insights your team couldn't reach before. Sometimes it's giving a lean team the output of one twice its size.
          </p>
          <p className="text-lg leading-relaxed text-brand-dark/70">
            We push back where it adds complexity but little value. Not every workflow needs an agent. Not every process needs automating. Most consultancies sell AI as the solution. We treat it as part of the solution — powerful when it's embedded properly, wasteful when it isn't.
          </p>
        </div>
      </motion.div>
    </Section>
  )
}
