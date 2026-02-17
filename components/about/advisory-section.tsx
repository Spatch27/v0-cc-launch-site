"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

const advisors = [
  {
    name: "David Crawford",
    bio: "David has 25 years of experience turning complex technology into practical, workflow-ready systems. A former enterprise CTO, he specialises in digital architecture, data integration and scalable design.",
    initials: "DC",
  },
  {
    name: "Victoria Paling",
    bio: "Victoria is an FS CMO with two decades spent modernising marketing in regulated, multi-stakeholder environments. She brings deep experience in unifying brand, digital and customer strategy.",
    initials: "VP",
  },
  {
    name: "Anit Roy-Choudhury",
    bio: "Anit has 25 years advising global companies on intelligent systems, governance and scaled adoption. A former KPMG leader, he helps ensure that transformation is commercially grounded and risk-aware.",
    initials: "AR",
  },
  {
    name: "Tia Collard",
    bio: "Tia is an AI agency founder who builds agent-enabled solutions and helps teams embed new ways of working. She brings hands-on expertise in capability-building and adoption.",
    initials: "TC",
  },
]

export function AdvisorySection() {
  return (
    <Section background="light">
      <div className="mb-16 flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        <motion.div variants={fadeInUp} className="lg:w-1/4">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
            Advisors
          </span>
        </motion.div>
        <motion.div variants={fadeInUp} className="lg:w-3/4">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Advisory Board.
          </h2>
        </motion.div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {advisors.map((advisor, i) => (
          <motion.div
            key={advisor.name}
            variants={fadeInUp}
            custom={i}
            className="group flex gap-6 border-b border-brand-dark/10 pb-8 last:border-0"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-white font-display text-sm font-bold text-brand-dark">
              {advisor.initials}
            </div>
            <div>
              <h3 className="mb-2 font-display text-lg font-bold text-brand-dark">
                {advisor.name}
              </h3>
              <p className="text-sm leading-relaxed text-brand-dark/60">
                {advisor.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
