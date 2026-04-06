"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Section } from "@/components/section"
import PaperPlaneIllustration from "@/components/approach/paper-plane-illustration"
import RocketIllustration from "@/components/home/rocket-illustration"

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const textChild = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function MomentumSection() {
  const ref1 = useRef(null)
  const inView1 = useInView(ref1, { once: true, margin: "-80px" })

  const ref2 = useRef(null)
  const inView2 = useInView(ref2, { once: true, margin: "-80px" })

  return (
    <Section background="light" compact>
      <div className="space-y-20">

        {/* How we work — Text Left, Image Right */}
        <div ref={ref1} className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2 grid-cols-1">
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
              How we work.
            </motion.h2>
            <motion.p variants={textChild} className="max-w-3xl text-lg leading-relaxed text-brand-dark">
              We redesign workflows, simplify stacks, and get AI agents working inside your team. We embed inside the marketing function, working alongside your team in focused six-week cycles - redesigning how work actually flows across people, process and technology. Measurable progress, not slideware.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex items-center justify-center w-full h-auto overflow-hidden rounded-lg order-last lg:order-first min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={inView1 ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.97 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <RocketIllustration />
          </motion.div>
        </div>

        {/* Systems launch agents — Image Left, Text Right */}
        <div ref={ref2} className="grid items-center gap-4 lg:gap-12 lg:grid-cols-2">
          <motion.div
            className="order-last flex items-center justify-center w-full h-auto overflow-hidden rounded-lg lg:order-first min-h-[300px] md:min-h-[400px] lg:min-h-[600px]"
            initial={{ opacity: 0, x: -40, scale: 0.97 }}
            animate={inView2 ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -40, scale: 0.97 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <PaperPlaneIllustration />
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
              Systems launch agents.
            </motion.h3>
            <motion.div variants={textChild} className="space-y-4">
              <p className="max-w-3xl text-lg leading-relaxed text-brand-dark">
                AI hasn&apos;t simplified things - it&apos;s added a new layer of complexity to systems that were already struggling. New tools arrive faster than teams can absorb them. Vendors promise efficiency - but the reality is more platforms, more decisions, more noise.
              </p>
              <p className="max-w-3xl text-lg font-semibold leading-relaxed text-brand-dark">
                AI only rewards the teams that are ready for it.
              </p>
              <p className="max-w-3xl text-lg leading-relaxed text-brand-dark">
                Workflows, data, and governance need to be redesigned. That&apos;s the gap we help you close. We get your system ready for AI - and then we help you deploy agents as working tools, not demo-day theatre.
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </Section>
  )
}
