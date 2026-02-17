"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

export interface CaseStudy {
  client: string
  project: string
  metrics: { value: string; label: string }[]
  testimonial: string
  accentColor: string
}

const accentBorder: Record<string, string> = {
  pink: "border-t-brand-pink",
  orange: "border-t-brand-orange",
  "yellow-light": "border-t-brand-yellow-light",
  "yellow-deep": "border-t-brand-yellow-deep",
}

interface CaseStudyCardsProps {
  studies: CaseStudy[]
  limit?: number
}

export function CaseStudyCards({ studies, limit }: CaseStudyCardsProps) {
  const items = limit ? studies.slice(0, limit) : studies
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {items.map((study, i) => (
        <motion.div
          key={i}
          variants={fadeInUp}
          className={`flex flex-col rounded-xl border-t-4 bg-brand-white p-8 shadow-sm ${accentBorder[study.accentColor] || "border-t-brand-pink"}`}
        >
          <span className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {study.client}
          </span>
          <h3 className="mb-6 font-display text-xl font-bold text-brand-dark">
            {study.project}
          </h3>

          {/* Metrics */}
          <div className="mb-6 flex flex-wrap gap-6">
            {study.metrics.map((metric, j) => (
              <div key={j} className="flex flex-col">
                <span className="font-display text-2xl font-bold text-brand-dark">
                  {metric.value}
                </span>
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <blockquote className="mt-auto border-l-2 border-brand-pink pl-4 text-sm italic leading-relaxed text-brand-dark/70">
            &ldquo;{study.testimonial}&rdquo;
          </blockquote>
        </motion.div>
      ))}
    </div>
  )
}
