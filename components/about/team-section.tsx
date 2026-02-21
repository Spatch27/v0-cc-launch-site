"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

const founders = [
  {
    name: "Ben Scoggins",
    bio: "Ben has led marketing and digital teams for 25 years, supporting brands like PepsiCo, Johnson & Johnson and Sainsbury's Group. He defines commercial ambition, builds internal alignment, and keeps transformation tied to outcomes that matter.",
    initials: "BS",
  },
  {
    name: "Tim Burley",
    bio: "Tim brings 25 years of senior marketing and strategy experience across Argos, Capita and the NHS. He sharpens objectives, aligns the C-Suite and creates the value case that keeps complex transformation moving and measurable.",
    initials: "TB",
  },
]

export function TeamSection() {
  return (
    <Section background="white">
      <motion.div variants={fadeInUp} className="mb-12">
        <h2 className="mb-6 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
          The founders.
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-brand-dark/60">
          You won't be handed to a team you haven't met. You'll work with the founders and a handful
          of discipline specialists.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {founders.map((member, i) => (
          <motion.div
            key={member.name}
            variants={fadeInUp}
            custom={i}
            className="group flex flex-col bg-brand-light p-10 transition-shadow duration-300 hover:shadow-lg"
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
