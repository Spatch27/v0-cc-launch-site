"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

const disciplines = [
  {
    name: "Transformation",
    description:
      "Sharpens the problem and desired outcomes. Aligns the C-Suite around value case. Demonstrates progress against KPIs.",
    color: "#fc66a7",
  },
  {
    name: "People & Culture",
    description:
      "Runs adoption programmes. Builds capability and confidence. Embeds new habits at pace.",
    color: "#ff8600",
  },
  {
    name: "Process & Ops Model",
    description:
      "Maps how work flows today. Redesigns the end-to-end system. Installs governance that sticks.",
    color: "#ffd100",
  },
  {
    name: "MarTech & Automation",
    description:
      "Audits and simplifies the stack. Builds quick-win automations. Fits agents into real workflows.",
    color: "#ffeb3e",
  },
  {
    name: "Data & Analytics",
    description:
      "Gets data clean and connected. Builds trustworthy reporting. Oversees agent and data integrity.",
    color: "#9a9490",
  },
]

export function ProductTeamDiagram() {
  return (
    <div className="grid gap-px overflow-hidden bg-brand-dark/10 md:grid-cols-5">
      {disciplines.map((d, i) => (
        <motion.div
          key={d.name}
          variants={fadeInUp}
          custom={i}
          className="flex flex-col bg-brand-light p-8"
        >
          <div
            className="mb-6 h-1 w-10 rounded-full"
            style={{ backgroundColor: d.color }}
          />
          <h4 className="mb-3 font-display text-lg font-bold text-brand-dark">
            {d.name}
          </h4>
          <p className="text-sm leading-relaxed text-brand-dark/60">
            {d.description}
          </p>
        </motion.div>
      ))}

      {/* Centre outcome label */}
      <motion.div
        variants={fadeInUp}
        className="col-span-full flex items-center justify-center bg-brand-dark py-8"
      >
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-brand-white/20" />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-brand-white/60">
            Oriented around a marketing outcome
          </span>
          <div className="h-px w-12 bg-brand-white/20" />
        </div>
      </motion.div>
    </div>
  )
}
