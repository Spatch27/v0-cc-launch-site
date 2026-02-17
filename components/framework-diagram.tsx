"use client"

import { motion } from "framer-motion"

const frameworks = [
  {
    name: "3A Framework\u2122",
    tagline: "We build traction: Align, Articulate, Advance",
    description:
      "Every engagement starts with \u2018Align, Articulate, Advance\u2019. We clarify objectives, define ROI hypotheses, and ensure all stakeholders are pointing in the same direction.",
    color: "#ffd100",
    cx: 200,
    cy: 200,
  },
  {
    name: "Cadence Loop\u2122",
    tagline: "We generate value every six weeks",
    description:
      "Six-weekly rhythm, three governance gates. Structured check-ins, learning loops, and accountability reviews ensure teams never lose momentum.",
    color: "#ff8600",
    cx: 350,
    cy: 200,
  },
  {
    name: "Telemetry Stack\u2122",
    tagline: "We prove results in real-time",
    description:
      "Live visibility of progress. Real-time dashboards track human and agent performance, workflow health, team adoption and project ROI.",
    color: "#fc66a7",
    cx: 275,
    cy: 340,
  },
]

export function FrameworkDiagram() {
  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
      {/* Diagram - three interlocking circles */}
      <div className="mx-auto w-full max-w-sm flex-shrink-0 lg:mx-0">
        <svg viewBox="0 0 500 450" className="w-full" aria-hidden="true">
          {frameworks.map((fw, i) => (
            <motion.circle
              key={fw.name}
              cx={fw.cx}
              cy={fw.cy}
              r={130}
              fill={fw.color}
              opacity={0.25}
              stroke={fw.color}
              strokeWidth={2}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${fw.cx}px ${fw.cy}px` }}
            />
          ))}
          {frameworks.map((fw) => (
            <text
              key={`label-${fw.name}`}
              x={fw.cx}
              y={fw.name === "Telemetry Stack\u2122" ? fw.cy + 10 : fw.cy - 5}
              textAnchor="middle"
              className="fill-brand-dark font-display text-[13px] font-bold"
            >
              {fw.name}
            </text>
          ))}
        </svg>
      </div>

      {/* Framework descriptions */}
      <div className="flex flex-1 flex-col gap-8">
        {frameworks.map((fw, i) => (
          <motion.div
            key={fw.name}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex gap-4"
          >
            <div
              className="mt-1 h-4 w-4 flex-shrink-0 rounded-full"
              style={{ backgroundColor: fw.color }}
            />
            <div>
              <h3 className="font-display text-xl font-bold text-brand-dark">
                {fw.tagline}
              </h3>
              <p className="mt-2 leading-relaxed text-brand-dark/70">
                {fw.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
