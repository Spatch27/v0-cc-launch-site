"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Section } from "@/components/section"
import { fadeInUp } from "@/lib/animations"
import { 
  Link as LinkIcon, 
  Eye, 
  Clock, 
  CreditCard, 
  AlertCircle 
} from "lucide-react"

const problems = [
  {
    icon: LinkIcon,
    problem: "Customers falling through the gaps",
    solution:
      "We rebuild the handoffs between teams and platforms so signals get acted on in real time.",
  },
  {
    icon: Eye,
    problem: "Flying blind on what's working",
    solution:
      "We build telemetry your team will actually use, not another dashboard nobody opens.",
  },
  {
    icon: Clock,
    problem: "Everything takes too long",
    solution: "We redesign workflows and build agents that shorten cycles. Fast.",
  },
  {
    icon: CreditCard,
    problem: "Paying for tech nobody's really using",
    solution:
      "We rationalise the stack and make your technology serve your people.",
  },
  {
    icon: AlertCircle,
    problem: "Workarounds become the work",
    solution:
      'We restore confidence, clarity and energy. "Everyone gets a jetpack."',
  },
]

export function WhatLooksLikeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <Section background="white">
      <div ref={ref} className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl"
        >
          What it looks like.
        </motion.h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {problems.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.problem}
              initial={{ opacity: 0, y: 40 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col gap-6 border-2 border-brand-dark/10 bg-brand-light p-8 transition-all duration-300 hover:border-brand-pink hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pink/20 text-brand-dark transition-colors duration-300 group-hover:bg-brand-pink group-hover:text-brand-white">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-xl font-bold leading-tight text-brand-dark">
                {item.problem}
              </h3>
              <p className="leading-relaxed text-brand-dark/60">
                {item.solution}
              </p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
