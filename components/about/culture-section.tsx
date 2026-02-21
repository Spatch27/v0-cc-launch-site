"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function CultureSection() {
  return (
    <Section background="dark" noPadding>
      <div className="mb-12 w-full">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/red-zeppelin-Ay2PtJjOqos-unsplash-vUHj2qivOSVTrWKgIlJbBrI1a9A9J2.jpg"
          alt="Scenic tower overlooking valley landscape"
          className="w-full h-96 object-cover"
        />
      </div>
      <div className="px-6 py-16 lg:px-12 lg:py-24">
        <motion.div variants={fadeInUp}>
          <h2 className="mb-8 font-display text-4xl font-bold leading-snug text-brand-white md:text-5xl">
            More human, in every interaction.
          </h2>
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-brand-white/70">
            <p>
              We don't send proposals and wait. We show up inside your team, alongside the people
              actually doing the work. We run workshops that leave people energised. Not drained by
              another afternoon of sticky notes and false consensus.
            </p>
            <p>
              We bring teams together in spaces where real decisions actually get made. Whether it's your
              boardroom or our barn in Devon, the approach doesn't change - plain talk, practical work,
              and energy to keep things moving.
            </p>
            <p className="font-medium text-brand-white">
              You'll know it's working when your team stops talking about the work as something being
              done to them, and starts treating it as something they own.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
