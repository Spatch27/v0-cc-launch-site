"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function AIPropellantSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <Section background="light">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="grid items-center gap-12 lg:grid-cols-2"
      >
        <div>
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
        </div>
        <div className="relative h-96 overflow-hidden rounded-lg">
          <Image
            src="/images/ai-propellant.jpg"
            alt="AI as a propellant - technology empowering teams"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </Section>
  )
}
