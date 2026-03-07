"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function ApproachPhilosophySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <Section background="light">
      <div ref={ref} className="space-y-20">
        {/* First subsection: AI as a propellant - Text Left, Image Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <div className="space-y-6">
            <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
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

        {/* Second subsection: Built for outcomes - Image Left, Text Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid items-center gap-12 border-t border-brand-dark/10 pt-12 lg:grid-cols-2"
        >
          <div className="relative h-96 overflow-hidden rounded-lg">
            <Image
              src="/images/outcomes-focus.jpg"
              alt="Built for outcomes - performance metrics and results"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-6">
            <h3 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
              Built for outcomes, not renewals.
            </h3>
            <div className="max-w-3xl space-y-4">
              <p className="text-lg leading-relaxed text-brand-dark/70">
                Most transformation programmes are designed to sell you a platform, not fix how you work. Over 40% of the average marketing budget goes on technology and the agencies that implement it. Less than a third reaches your customers. The recommendation is the implementation. The implementation is the licence. The licence is the lock-in.
              </p>
              <p className="text-lg leading-relaxed text-brand-dark/70">
                We're platform-agnostic. No tech tie-ins. No renewal cycles to protect. Your operating model gets shaped around your team's needs, not someone else's contract terms.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
