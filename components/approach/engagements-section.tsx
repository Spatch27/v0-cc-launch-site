"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const engagements = [
  {
    name: "Ignition6™",
    tagline: "Your transformation story, your blockers mapped, your first six wins identified.",
    outcome: "Board-ready in six weeks.",
    duration: "6 weeks",
    price: "£40K",
    priceNote: null,
    accentColor: "bg-brand-pink",
    borderColor: "border-brand-pink",
  },
  {
    name: "Fly6™",
    tagline: "Six pilots delivered, live ROI dashboards live, governance embedded.",
    outcome: "Results in a quarter.",
    duration: "6 weeks",
    price: "£60K",
    priceNote: "+ outcome bonus",
    accentColor: "bg-brand-orange",
    borderColor: "border-brand-orange",
  },
  {
    name: "Flow6™",
    tagline: "Rhythm, adoption and continuous improvement built into your marketing operation.",
    outcome: "Permanently.",
    duration: "6-week rolling",
    price: "£10K",
    priceNote: "/ week",
    accentColor: "bg-brand-yellow-deep",
    borderColor: "border-brand-yellow-deep",
  },
]

export function EngagementsSection() {
  return (
    <Section background="dark">
      {/* Header */}
      <motion.div variants={fadeInUp} className="mb-20">
        <h2 className="font-display text-4xl font-bold leading-snug text-brand-white md:text-5xl">
          Three engagements, one goal.
        </h2>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="grid gap-8 md:grid-cols-3 mb-16"
      >
        {engagements.map((engagement, i) => (
          <motion.div
            key={engagement.name}
            variants={fadeInUp}
            custom={i}
            className={`group relative flex flex-col overflow-hidden bg-brand-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-brand-white/10 hover:shadow-xl`}
          >
            {/* Top accent bar */}
            <div className={`h-1 w-full ${engagement.accentColor}`} />

            {/* Content */}
            <div className="p-8 flex flex-col h-full">
              {/* Duration badge */}
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-white/40 mb-4">
                {engagement.duration}
              </span>

              {/* Name */}
              <h3 className="mb-4 font-display text-2xl font-bold text-brand-white">
                {engagement.name}
              </h3>

              {/* Tagline */}
              <p className="mb-4 text-base leading-relaxed text-brand-white/70">
                {engagement.tagline}
              </p>

              {/* Outcome */}
              <p className="mb-8 text-sm font-semibold text-brand-white/50 uppercase tracking-wide">
                {engagement.outcome}
              </p>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Price */}
              <div className="border-t border-brand-white/10 pt-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-brand-white">
                    {engagement.price}
                  </span>
                  {engagement.priceNote && (
                    <span className="text-sm text-brand-white/40">
                      {engagement.priceNote}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div variants={fadeInUp} className="flex justify-center">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 text-sm font-semibold text-brand-white/60 transition-colors hover:text-brand-pink"
        >
          Discuss which engagement is right for you
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </Section>
  )
}
