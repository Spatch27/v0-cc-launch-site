"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

const disciplines = [
  {
    name: "Transformation",
    description:
      "Sharpens the problem/desired outcomes. Aligns the C-Suite around value case. Demonstrates progress against KPIs.",
    color: "#fc66a7",
    angle: -72,
  },
  {
    name: "People & Culture",
    description:
      "Runs adoption programmes. Builds capability and confidence. Embeds new habits at pace.",
    color: "#ff8600",
    angle: 0,
  },
  {
    name: "Process & Ops Model",
    description:
      "Maps how work flows today. Redesigns the end-to-end system. Installs governance that sticks.",
    color: "#ffd100",
    angle: 72,
  },
  {
    name: "MarTech & Automation",
    description:
      "Audits and simplifies the stack. Builds quick-win automations. Fits agents into real workflows.",
    color: "#ffeb3e",
    angle: 144,
  },
  {
    name: "Data & Analytics",
    description:
      "Gets data clean and connected. Builds trustworthy reporting. Oversees agent/data integrity.",
    color: "#e3dcdc",
    angle: 216,
  },
]

export function ProductTeamDiagram() {
  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
      {/* Visual diagram */}
      <div className="mx-auto w-full max-w-sm flex-shrink-0 lg:mx-0">
        <svg viewBox="0 0 400 400" className="w-full" aria-hidden="true">
          {/* Centre circle */}
          <motion.circle
            cx={200}
            cy={200}
            r={50}
            fill="#181716"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: "200px 200px" }}
          />
          <text
            x={200}
            y={196}
            textAnchor="middle"
            className="fill-brand-white font-display text-[10px] font-bold"
          >
            MKTG
          </text>
          <text
            x={200}
            y={210}
            textAnchor="middle"
            className="fill-brand-white font-display text-[10px] font-bold"
          >
            OUTCOME
          </text>

          {/* Orbiting discipline circles */}
          {disciplines.map((d, i) => {
            const rad = (d.angle * Math.PI) / 180
            const cx = 200 + Math.cos(rad) * 130
            const cy = 200 + Math.sin(rad) * 130
            return (
              <g key={d.name}>
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={55}
                  fill={d.color}
                  opacity={0.3}
                  stroke={d.color}
                  strokeWidth={2}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  className="fill-brand-dark font-display text-[9px] font-bold"
                >
                  {d.name.length > 14
                    ? d.name.split(" & ").map((part, j) => (
                        <tspan key={j} x={cx} dy={j === 0 ? -5 : 12}>
                          {j === 1 ? `& ${part}` : part}
                        </tspan>
                      ))
                    : d.name}
                </text>
                {/* Connection line to centre */}
                <motion.line
                  x1={200}
                  y1={200}
                  x2={cx}
                  y2={cy}
                  stroke={d.color}
                  strokeWidth={1}
                  opacity={0.3}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                />
              </g>
            )
          })}
        </svg>
      </div>

      {/* Discipline descriptions */}
      <div className="flex flex-1 flex-col gap-6">
        {disciplines.map((d, i) => (
          <motion.div
            key={d.name}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            className="flex gap-4"
          >
            <div
              className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full"
              style={{ backgroundColor: d.color }}
            />
            <div>
              <h4 className="font-display text-lg font-bold text-brand-dark">
                {d.name}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-brand-dark/70">
                {d.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
