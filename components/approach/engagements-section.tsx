"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function EngagementsSection() {
  return (
    <Section background="dark">
      <motion.div
        variants={fadeInUp}
        className="max-w-3xl overflow-hidden bg-brand-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-brand-white/10 hover:shadow-xl"
      >
        <div className="h-1 w-full bg-brand-orange" />
        <div className="flex flex-col p-8">
          <span className="mb-4 text-xs font-semibold tracking-[0.15em] text-brand-white/40">
            Where we start
          </span>
          <h2 className="mb-6 font-display text-4xl font-bold leading-snug text-brand-white md:text-5xl">
            Get back the hours your team loses every week.
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-base leading-relaxed text-brand-white/70">
              Tell us where your team loses the most hours every week. We fix that one thing in six weeks: the workflow, the tools and the team using them. Then we show you the hours you’ve saved, and help you put them to better use.
            </p>
            <p className="text-base leading-relaxed text-brand-white/70">
              You get the fix running in live work, your team using it every week, the hours measured before and after, and our view of what’s worth fixing next.
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
