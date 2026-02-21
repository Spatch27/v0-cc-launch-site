"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

const operatingModelItems = {
  primary: [
    {
      name: "Transformation Lead",
      description:
        "Sharpens the problem. Aligns your C-Suite around a clear value case. Makes sure progress is visible from week one.",
      position: "top",
      cx: 500,
      cy: 150,
    },
    {
      name: "Process & Ops Model Lead",
      description:
        "Maps how work actually flows today. Redesigns the system, removes the handshake moments, installs governance that sticks.",
      position: "left",
      cx: 250,
      cy: 320,
    },
    {
      name: "People & Culture Lead",
      description:
        "New systems only stick if people believe in them. Builds capability, runs adoption programmes, embeds new habits at pace.",
      position: "right",
      cx: 750,
      cy: 320,
    },
  ],
  supporting: [
    {
      name: "MarTech & Automation",
      description:
        "Brought in for your stack, not ours. Simplifies what you have, fits automation and agents where they'll actually shorten cycles.",
      cx: 350,
      cy: 450,
    },
    {
      name: "Data & Analytics",
      description:
        "Gets data clean, connected and trustworthy. Builds reporting that proves progress is real - so dashboards become something people rely on.",
      cx: 650,
      cy: 450,
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
  const radius = isSupporting ? 50 : 70

  return (
    <motion.g
      key={id}
      onMouseEnter={() => setHoveredId(id)}
      onMouseLeave={() => setHoveredId(null)}
      style={{ cursor: "pointer" }}
    >
      {/* Circle */}
      <motion.circle
        cx={item.cx}
        cy={item.cy}
        r={radius}
        fill="none"
        stroke="#fc66a7"
        strokeWidth={isHovered ? 8 : 4}
        strokeDasharray={isSupporting ? "8,8" : "0"}
        animate={{
          strokeWidth: isHovered ? 8 : isSupporting ? 3 : 4,
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Center text - always visible */}
      <motion.text
        x={item.cx}
        y={item.cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fontWeight="bold"
        fill="#181716"
        className="font-display pointer-events-none"
        animate={{
          fontSize: isHovered ? 16 : 14,
        }}
        transition={{ duration: 0.2 }}
      >
        {item.name}
      </motion.text>
    </motion.g>
  )
}

export function OperatingModelDiagram() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="w-full"
    >
      <div className="relative w-full">
        {/* Desktop SVG Diagram */}
        <div className="hidden lg:block mb-12">
          <svg
            viewBox="0 0 1000 700"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Center label */}
            <motion.text
              x="500"
              y="320"
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
              fill="#181716"
              className="font-display pointer-events-none"
            >
              CLIENT
            </motion.text>
            <motion.text
              x="500"
              y="345"
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
              fill="#181716"
              className="font-display pointer-events-none"
            >
              OUTCOME
            </motion.text>

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

          {/* Hover descriptions positioned around the diagram */}
          <div className="relative -mt-32 h-64 pointer-events-none">
            {/* Top description */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 text-center pointer-events-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: hoveredId === "primary-0" ? 1 : 0,
                y: hoveredId === "primary-0" ? 0 : -10,
              }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-brand-pink font-medium max-w-xs">
                {operatingModelItems.primary[0].description}
              </p>
            </motion.div>

            {/* Left description */}
            <motion.div
              className="absolute top-1/2 left-0 -translate-y-1/2 text-right pointer-events-none"
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: hoveredId === "primary-1" ? 1 : 0,
                x: hoveredId === "primary-1" ? 0 : -10,
              }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-brand-pink font-medium max-w-xs">
                {operatingModelItems.primary[1].description}
              </p>
            </motion.div>

            {/* Right description */}
            <motion.div
              className="absolute top-1/2 right-0 -translate-y-1/2 text-left pointer-events-none"
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: hoveredId === "primary-2" ? 1 : 0,
                x: hoveredId === "primary-2" ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-brand-pink font-medium max-w-xs">
                {operatingModelItems.primary[2].description}
              </p>
            </motion.div>

            {/* Bottom left supporting description */}
            <motion.div
              className="absolute bottom-0 left-8 text-center pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: hoveredId === "supporting-0" ? 1 : 0,
                y: hoveredId === "supporting-0" ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-brand-pink font-medium max-w-xs">
                {operatingModelItems.supporting[0].description}
              </p>
            </motion.div>

            {/* Bottom right supporting description */}
            <motion.div
              className="absolute bottom-0 right-8 text-center pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: hoveredId === "supporting-1" ? 1 : 0,
                y: hoveredId === "supporting-1" ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-brand-pink font-medium max-w-xs">
                {operatingModelItems.supporting[1].description}
              </p>
            </motion.div>
          </div>
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
