"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

const frameworks = [
  {
    name: "3A Framework",
    tagline: "Align, Articulate, Advance",
    description:
      "Every engagement starts with \u2018Align, Articulate, Advance\u2019. We clarify objectives, define ROI hypotheses, and ensure all stakeholders are pointing in the same direction.",
    color: "#ffd100",
  },
  {
    name: "Cadence Loop",
    tagline: "We generate value every six weeks",
    description:
      "Six-weekly rhythm, three governance gates. Structured check-ins, learning loops, and accountability reviews ensure teams never lose momentum.",
    color: "#ff8600",
  },
  {
    name: "Telemetry Stack",
    tagline: "We prove results in real-time",
    description:
      "Live visibility of progress. Real-time dashboards track human and agent performance, workflow health, team adoption and project ROI.",
    color: "#fc66a7",
  },
]

export function FrameworkDiagram() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {frameworks.map((fw, i) => (
        <motion.div
          key={fw.name}
          variants={fadeInUp}
          custom={i}
          className="group relative overflow-hidden rounded-2xl bg-brand-white p-10 transition-colors duration-500 hover:bg-brand-dark"
        >
          {/* Accent bar */}
          <div
            className="mb-8 h-1 w-12 rounded-full"
            style={{ backgroundColor: fw.color }}
          />

          <h3 className="mb-2 font-display text-xl font-bold text-brand-dark transition-colors duration-500 group-hover:text-brand-white">
            {fw.name}
          </h3>
          <p
            className="mb-6 text-sm font-medium transition-colors duration-500"
            style={{ color: fw.color }}
          >
            {fw.tagline}
          </p>
          <p className="text-sm leading-relaxed text-brand-dark/60 transition-colors duration-500 group-hover:text-brand-white/60">
            {fw.description}
          </p>

          {/* Large decorative circle on hover */}
          <div
            className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-10"
            style={{ backgroundColor: fw.color }}
          />
        </motion.div>
      ))}
    </div>
  )
}
