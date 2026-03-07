"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Section } from "@/components/section"

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const textChild = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function ApproachPhilosophySection() {
  const ref1 = useRef(null)
  const inView1 = useInView(ref1, { once: true, margin: "-80px" })

  const ref2 = useRef(null)
  const inView2 = useInView(ref2, { once: true, margin: "-80px" })

  return (
    <Section background="light">
      <div className="space-y-20">

        {/* AI as a propellant — Text Left, Image Right */}
        <div ref={ref1} className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            className="space-y-6"
            variants={textContainer}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
          >
            <motion.h2
              variants={textChild}
              className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl"
            >
              AI as a propellant.
            </motion.h2>
            <motion.div variants={textChild} className="max-w-3xl space-y-4">
              <p className="text-lg leading-relaxed text-brand-dark/70">
                We're not an AI consultancy. We're a transformation consultancy that knows how to put AI to work. We start with how your marketing actually works — and work out where AI removes drag and where it creates new capability. Sometimes that's automating handoffs. Sometimes it's surfacing insights your team couldn't reach before. Sometimes it's giving a lean team the output of one twice its size.
              </p>
              <p className="text-lg leading-relaxed text-brand-dark/70">
                We push back where it adds complexity but little value. Not every workflow needs an agent. Not every process needs automating. Most consultancies sell AI as the solution. We treat it as part of the solution — powerful when it's embedded properly, wasteful when it isn't.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-96 overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={inView1 ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.97 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/ai-propellant.jpg"
              alt="AI as a propellant - technology empowering teams"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Built for outcomes — Image Left, Text Right */}
        <div ref={ref2} className="grid items-center gap-12 border-t border-brand-dark/10 pt-12 lg:grid-cols-2">
          <motion.div
            className="relative h-96 overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: -40, scale: 0.97 }}
            animate={inView2 ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -40, scale: 0.97 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/outcomes-focus.jpg"
              alt="Built for outcomes - performance metrics and results"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={textContainer}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
          >
            <motion.h3
              variants={textChild}
              className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl"
            >
              Built for outcomes, not renewals.
            </motion.h3>
            <motion.div variants={textChild} className="max-w-3xl space-y-4">
              <p className="text-lg leading-relaxed text-brand-dark/70">
                Most transformation programmes are designed to sell you a platform, not fix how you work. Over 40% of the average marketing budget goes on technology and the agencies that implement it. Less than a third reaches your customers. The recommendation is the implementation. The implementation is the licence. The licence is the lock-in.
              </p>
              <p className="text-lg leading-relaxed text-brand-dark/70">
                We're platform-agnostic. No tech tie-ins. No renewal cycles to protect. Your operating model gets shaped around your team's needs, not someone else's contract terms.
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </Section>
  )
}
