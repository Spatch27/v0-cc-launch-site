"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Quote } from "lucide-react"

export interface CaseStudy {
  client: string
  project: string
  metrics: { value: string; label: string }[]
  testimonial: string
  accentColor: "pink" | "orange" | "yellow-deep"
}

const accentMap: Record<string, string> = {
  pink: "border-brand-pink",
  orange: "border-brand-orange",
  "yellow-deep": "border-brand-yellow-deep",
}

const accentBgMap: Record<string, string> = {
  pink: "bg-brand-pink",
  orange: "bg-brand-orange",
  "yellow-deep": "bg-brand-yellow-deep",
}

interface Props {
  studies: CaseStudy[]
  limit?: number
}

export function CaseStudyCards({ studies, limit }: Props) {
  const items = limit ? studies.slice(0, limit) : studies

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((study, i) => (
        <motion.div
          key={study.client}
          variants={fadeInUp}
          custom={i}
          className={`flex flex-col rounded-2xl border-l-4 bg-brand-white/5 p-8 backdrop-blur-sm ${accentMap[study.accentColor] || "border-brand-pink"}`}
        >
          {/* Client */}
          <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-white/40">
            {study.client}
          </p>
          <p className="mb-8 text-sm leading-relaxed text-brand-white/70">
            {study.project}
          </p>

          {/* Metrics */}
          <div className="mb-8 flex flex-wrap gap-6">
            {study.metrics.map((m) => (
              <div key={m.label}>
                <span className="font-display text-3xl font-bold text-brand-white">
                  {m.value}
                </span>
                <p className="mt-1 text-xs text-brand-white/50">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-auto border-t border-brand-white/10 pt-6">
            <Quote size={16} className="mb-3 text-brand-white/20" />
            <p className="text-sm italic leading-relaxed text-brand-white/60">
              {study.testimonial}
            </p>
          </div>

          {/* Accent dot */}
          <div className={`mt-6 h-2 w-2 rounded-full ${accentBgMap[study.accentColor] || "bg-brand-pink"}`} />
        </motion.div>
      ))}
    </div>
  )
}
