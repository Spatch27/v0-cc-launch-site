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
      color: "#FC66A7", // Pink
    },
    {
      name: "Process & Ops Model Lead",
      lines: ["Process &", "Ops Model", "Lead"],
      description:
        "Maps how work actually flows today. Redesigns the system, removes the handshake moments, installs governance that sticks.",
      position: "left",
      cx: 348, // Upper left
      cy: 251,
      color: "#FF8600", // Orange
    },
    {
      name: "People & Culture Lead",
      lines: ["People &", "Culture", "Lead"],
      description:
        "New systems only stick if people believe in them. Builds capability, runs adoption programmes, embeds new habits at pace.",
      position: "right",
      cx: 652, // Upper right
      cy: 251,
      color: "#FFD100", // Yellow
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
      color: "#181716", // Dark
    },
    {
      name: "Data & Analytics",
      lines: ["Data &", "Analytics"],
      description:
        "Gets data clean, connected and trustworthy. Builds reporting that proves progress is real - so dashboards become something people rely on.",
      cx: 597, // Lower right
      cy: 429,
      color: "#181716", // Dark
    },
  ],
}

function CircleButton({
  item,
  isSupporting,
  hoveredId,
  setHoveredId,
  id,
  color,
}: {
  item: (typeof operatingModelItems.primary[0]) | (typeof operatingModelItems.supporting[0])
  isSupporting: boolean
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  id: string
  color: string
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
        setHoveredId(id)
      }}
      onMouseLeave={() => {
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
        stroke={color}
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
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
                color={item.color}
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
                color={item.color}
              />
            ))}
          </svg>

          {/* Floating tooltip panel - positioned over each circle */}
          {hoveredItem && (
            <motion.div
              key={hoveredId}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute pointer-events-none z-10"
              style={{
                left: `${(hoveredItem.cx / 1000) * 100}%`,
                top: `${((hoveredItem.cy - 80) / 600) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="bg-[#FFEB3E] px-6 py-4 rounded-lg shadow-xl border-2 border-brand-dark/10">
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
