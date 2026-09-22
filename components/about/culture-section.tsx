"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function CultureSection() {
  return (
    <Section background="dark" compact>
      <motion.div variants={fadeInUp}>
        <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-white md:text-5xl">
          More human, in every interaction.
        </h2>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-brand-white/70">
          <p>
            We don't hide behind slide decks. We work inside your team, alongside the people doing the work. They know which rules get bent and where the last attempt failed, so they help shape what changes. Our workshops leave people energised, not drained by another afternoon of sticky notes and false consensus.
          </p>
          <p>
            We bring teams together where real decisions get made. Whether it's your boardroom or our barn in Devon, the approach doesn't change: plain talk, practical work and the energy to keep things moving.
          </p>
          <p className="font-bold text-brand-white/70">
            You'll know it's working when your team stops talking about the change as something done to them, and starts treating it as something they own.
          </p>
        </div>
      </motion.div>
    </Section>
  )
}
