"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

// Pentagon formation with moderate overlaps
// Center point: (500, 300), radius from center: 160px for better spacing
// Pentagon angles: -90°, -18°, 54°, 126°, 198° (starting from top)
const operatingModelItems = {
  primary: [
    {
      name: "Transformation Lead",
      lines: ["Transformation", "Lead"],
      description:
        "Sharpens the problem. Aligns your C-Suite around a clear value case. Makes sure progress is visible from week one.",
      position: "top",
      cx: 500,
      cy: 140, // Top position
    },
    {
      name: "Process & Ops Model Lead",
      lines: ["Process &", "Ops Model", "Lead"],
      description:
        "Maps how work actually flows today. Redesigns the system, removes the handshake moments, installs governance that sticks.",
      position: "left",
      cx: 348, // Upper left
      cy: 251,
    },
    {
      name: "People & Culture Lead",
      lines: ["People &", "Culture", "Lead"],
      description:
        "New systems only stick if people believe in them. Builds capability, runs adoption programmes, embeds new habits at pace.",
      position: "right",
      cx: 652, // Upper right
      cy: 251,
    },
  ],
  supporting: [
    {
      name: "MarTech & Automation",
      lines: ["MarTech &", "Automation"],
      description:
        "Brought in for your stack, not ours. Simplifies what you have, fits automation and agents where they'll actually shorten cycles.",
      cx: 403, // Lower left
      cy: 429,
    },
    {
      name: "Data & Analytics",
      lines: ["Data &", "Analytics"],
      description:
        "Gets data clean, connected and trustworthy. Builds reporting that proves progress is real - so dashboards become something people rely on.",
      cx: 597, // Lower right
      cy: 429,
    },
  ],
}

function CircleButton({
  item,
  isSupporting,
  hoveredId,
  setHoveredId,
  id,
}: {
  item: (typeof operatingModelItems.primary[0]) | (typeof operatingModelItems.supporting[0])
  isSupporting: boolean
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  id: string
}) {
  const isHovered = hoveredId === id
  const radius = 110 // Larger circles for overlapping

  const lineHeight = 18
  const totalHeight = (item.lines.length - 1) * lineHeight
  const startY = item.cy - totalHeight / 2

  return (
    <g
      key={id}
      onMouseEnter={() => {
        console.log("[v0] Hovering on:", id)
        setHoveredId(id)
      }}
      onMouseLeave={() => {
        console.log("[v0] Leaving:", id)
        setHoveredId(null)
      }}
      style={{ cursor: "pointer" }}
    >
      {/* Invisible larger circle for better hover detection */}
      <circle
        cx={item.cx}
        cy={item.cy}
        r={radius + 10}
        fill="transparent"
        style={{ pointerEvents: "all" }}
      />
      {/* Visible Circle */}
      <motion.circle
        cx={item.cx}
        cy={item.cy}
        r={radius}
        fill="none"
        stroke="#fc66a7"
        strokeWidth={isHovered ? 6 : 4}
        strokeDasharray={isSupporting ? "8,8" : "0"}
        animate={{
          strokeWidth: isHovered ? 6 : isSupporting ? 3 : 4,
        }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: "none" }}
      />
      {/* Multi-line text - always visible */}
      <text
        x={item.cx}
        y={startY}
        textAnchor="middle"
        fontSize={isHovered ? 16 : 15}
        fontWeight="bold"
        fill="#181716"
        className="font-display select-none"
        style={{ pointerEvents: "none" }}
      >
        {item.lines.map((line, idx) => (
          <tspan key={idx} x={item.cx} dy={idx === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  )
}

export function OperatingModelDiagram() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const getHoveredItem = () => {
    if (!hoveredId) return null
    const [type, idx] = hoveredId.split("-")
    if (type === "primary") {
      return operatingModelItems.primary[parseInt(idx)]
    } else {
      return operatingModelItems.supporting[parseInt(idx)]
    }
  }

  const hoveredItem = getHoveredItem()

  console.log("[v0] Hovered ID:", hoveredId)
  console.log("[v0] Hovered Item:", hoveredItem)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="w-full"
    >
      <div className="relative w-full min-h-[600px]">
        {/* Desktop SVG Diagram */}
        <div className="hidden lg:block mb-12 relative">
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Center label */}
            <text
              x="500"
              y="290"
              textAnchor="middle"
              fontSize="13"
              fontWeight="bold"
              fill="#181716"
              className="font-display select-none"
              style={{ pointerEvents: "none" }}
            >
              CLIENT
            </text>
            <text
              x="500"
              y="310"
              textAnchor="middle"
              fontSize="13"
              fontWeight="bold"
              fill="#181716"
              className="font-display select-none"
              style={{ pointerEvents: "none" }}
            >
              OUTCOME
            </text>

            {/* Interactive circles */}
            {operatingModelItems.primary.map((item, idx) => (
              <CircleButton
                key={`primary-${idx}`}
                item={item}
                isSupporting={false}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                id={`primary-${idx}`}
              />
            ))}

            {operatingModelItems.supporting.map((item, idx) => (
              <CircleButton
                key={`supporting-${idx}`}
                item={item}
                isSupporting={true}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                id={`supporting-${idx}`}
              />
            ))}
          </svg>

          {/* Floating tooltip panel - positioned absolutely over the diagram */}
          {hoveredItem && (
            <motion.div
              key={hoveredId}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-10"
            >
              <div className="bg-[#FFD700] px-6 py-4 rounded-lg shadow-xl border-2 border-brand-dark/10">
                <p className="text-sm text-brand-dark font-medium leading-relaxed max-w-sm">
                  {hoveredItem.description}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden space-y-6">
          {/* Primary items */}
          {operatingModelItems.primary.map((item, idx) => (
            <motion.div
              key={item.name}
              variants={fadeInUp}
              custom={idx}
              className="p-6 border-l-4 border-brand-pink bg-brand-pink/5 rounded"
            >
              <h4 className="font-display font-bold text-brand-dark mb-2">{item.name}</h4>
              <p className="text-sm text-brand-dark/70">{item.description}</p>
            </motion.div>
          ))}
          {/* Supporting items */}
          {operatingModelItems.supporting.map((item, idx) => (
            <motion.div
              key={item.name}
              variants={fadeInUp}
              custom={operatingModelItems.primary.length + idx}
              className="p-6 border border-dashed border-brand-dark/20 rounded"
            >
              <h4 className="font-display font-bold text-brand-dark mb-2">{item.name}</h4>
              <p className="text-sm text-brand-dark/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
