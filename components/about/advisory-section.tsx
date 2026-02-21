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
      <motion.div variants={fadeInUp} className="mb-12">
        <h2 className="mb-6 max-w-4xl font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
          Built small. And mighty.
        </h2>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-brand-dark/60">
          <p>
            We operate a highly capable core, drawing on the talents of a network of specialist
            practitioners in martech, agentic AI, data architecture, FS, and governance.
          </p>
          <p>
            Our advisory board is working, not ornamental. Senior operators we draw on directly in
            delivery - shaping thinking, pressure-testing decisions, strengthening outcomes.
          </p>
          <p className="font-medium text-brand-dark">
            We have no generalists posing as experts. No paying for bench time. Just the right depth, at
            the right moment, aligned to a single Committed Citizens method.
          </p>
        </div>
      </motion.div>

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
