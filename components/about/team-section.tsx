"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

const founders = [
  {
    name: "Ben Bushby",
    bio: "Ben is a behaviour-change specialist with a decade spent helping teams at the BBC and Not-On-The-High-Street adopt new ways of working. He ensures transformation actually sticks by building confidence, capability and the conditions for fast adoption.",
    initials: "BB",
  },
  {
    name: "Tim Burley",
    bio: "Tim brings 25 years of senior marketing and strategy experience across Argos, Capita and the NHS. He sharpens objectives, aligns the C-Suite and creates the value case that keeps complex transformation moving and measurable.",
    initials: "TB",
  },
  {
    name: "Kate Salter",
    bio: "Kate has ten years designing workflows and operating models for tech firms, agencies and NASA. She maps how work really happens, rebuilds end-to-end systems, and fits people and agents together in a way that removes friction.",
    initials: "KS",
  },
  {
    name: "Ben Scoggins",
    bio: "Ben has led marketing and digital teams for 25 years, supporting brands like PepsiCo, Johnson & Johnson and Sainsbury\u2019s Group. He defines commercial ambition, builds internal alignment, and keeps transformation tied to outcomes that matter.",
    initials: "BS",
  },
]

export function TeamSection() {
  return (
    <Section background="light">
      <div className="mb-16 flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        <motion.div variants={fadeInUp} className="lg:w-1/4">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
            Founders
          </span>
        </motion.div>
        <motion.div variants={fadeInUp} className="lg:w-3/4">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            The team.
          </h2>
        </motion.div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {founders.map((member, i) => (
          <motion.div
            key={member.name}
            variants={fadeInUp}
            custom={i}
            className="group flex flex-col rounded-2xl bg-brand-white p-10 transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="mb-6 flex items-center gap-5">
              {/* Initials avatar */}
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-brand-dark font-display text-lg font-bold text-brand-white">
                {member.initials}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-brand-dark">
                  {member.name}
                </h3>
                <p className="text-sm text-brand-pink">Founder</p>
              </div>
            </div>
            <p className="leading-relaxed text-brand-dark/60">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
