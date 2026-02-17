"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { User } from "lucide-react"

const advisors = [
  {
    name: "David Crawford",
    bio: "David has 25 years of experience turning complex technology into practical, workflow-ready systems. A former enterprise CTO, he specialises in digital architecture, data integration and scalable design.",
  },
  {
    name: "Victoria Paling",
    bio: "Victoria is an FS CMO with two decades spent modernising marketing in regulated, multi-stakeholder environments. She brings deep experience in unifying brand, digital and customer strategy.",
  },
  {
    name: "Anit Roy-Choudhury",
    bio: "Anit has 25 years advising global companies on intelligent systems, governance and scaled adoption. A former KPMG leader, he helps ensure that transformation is commercially grounded and risk-aware.",
  },
  {
    name: "Tia Collard",
    bio: "Tia is an AI agency founder who builds agent-enabled solutions and helps teams embed new ways of working. She brings hands-on expertise in capability-building and adoption.",
  },
]

export function AdvisorySection() {
  return (
    <Section background="white">
      <div className="mb-12">
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-pink"
        >
          Advisors
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-balance font-display text-3xl font-bold text-brand-dark md:text-5xl"
        >
          Advisory Board
        </motion.h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {advisors.map((advisor, i) => (
          <motion.div
            key={advisor.name}
            variants={fadeInUp}
            custom={i}
            className="flex gap-4 rounded-xl border border-brand-light bg-brand-white p-6"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-brand-dark">
                {advisor.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-dark/70">
                {advisor.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
