"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"

const operatingModelItems = {
  primary: [
    {
      name: "Transformation Lead",
      description:
        "Sharpens the problem. Aligns your C-Suite around a clear value case. Makes sure progress is visible from week one.",
      position: "top",
    },
    {
      name: "Process & Ops Model Lead",
      description:
        "Maps how work actually flows today. Redesigns the system, removes the handshake moments, installs governance that sticks.",
      position: "left",
    },
    {
      name: "People & Culture Lead",
      description:
        "New systems only stick if people believe in them. Builds capability, runs adoption programmes, embeds new habits at pace.",
      position: "right",
    },
  ],
  supporting: [
    {
      name: "MarTech & Automation",
      description:
        "Brought in for your stack, not ours. Simplifies what you have, fits automation and agents where they'll actually shorten cycles.",
    },
    {
      name: "Data & Analytics",
      description:
        "Gets data clean, connected and trustworthy. Builds reporting that proves progress is real - so dashboards become something people rely on.",
    },
  ],
}

export function OperatingModelDiagram() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="w-full"
    >
      <div className="relative w-full">
        {/* SVG Diagram for desktop */}
        <svg
          viewBox="0 0 1000 600"
          className="hidden lg:block w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Primary Circles */}
          <circle
            cx="500"
            cy="200"
            r="90"
            fill="none"
            stroke="#fc66a7"
            strokeWidth="6"
          />
          <circle cx="300" cy="400" r="90" fill="none" stroke="#fc66a7" strokeWidth="6" />
          <circle cx="700" cy="400" r="90" fill="none" stroke="#fc66a7" strokeWidth="6" />

          {/* Supporting Circles (dashed) */}
          <circle
            cx="500"
            cy="480"
            r="70"
            fill="none"
            stroke="#fc66a7"
            strokeWidth="3"
            strokeDasharray="8,8"
          />
          <circle
            cx="350"
            cy="300"
            r="70"
            fill="none"
            stroke="#fc66a7"
            strokeWidth="3"
            strokeDasharray="8,8"
          />
          <circle
            cx="650"
            cy="300"
            r="70"
            fill="none"
            stroke="#fc66a7"
            strokeWidth="3"
            strokeDasharray="8,8"
          />

          {/* Center label */}
          <text
            x="500"
            y="500"
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill="#181716"
            className="font-display"
          >
            CLIENT
          </text>
          <text
            x="500"
            y="525"
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill="#181716"
            className="font-display"
          >
            OUTCOME
          </text>
        </svg>

        {/* Primary Items - Positioned Absolutely */}
        <div className="relative pt-8 lg:pt-0 lg:absolute lg:inset-0 lg:pointer-events-none">
          {/* Top */}
          <motion.div
            variants={fadeInUp}
            className="lg:pointer-events-auto lg:absolute lg:top-12 lg:left-1/2 lg:-translate-x-1/2 mb-8 lg:mb-0"
          >
            <div className="text-center">
              <h4 className="font-display font-bold text-brand-dark text-lg mb-2">
                {operatingModelItems.primary[0].name}
              </h4>
              <p className="text-sm text-brand-pink font-medium max-w-xs hidden lg:block">
                {operatingModelItems.primary[0].description}
              </p>
            </div>
          </motion.div>

          {/* Left */}
          <motion.div
            variants={fadeInUp}
            className="lg:pointer-events-auto lg:absolute lg:top-1/2 lg:left-8 lg:-translate-y-1/2 mb-8 lg:mb-0"
          >
            <div className="text-center lg:text-right">
              <h4 className="font-display font-bold text-brand-dark text-lg mb-2">
                {operatingModelItems.primary[1].name}
              </h4>
              <p className="text-sm text-brand-pink font-medium max-w-xs hidden lg:block lg:ml-auto">
                {operatingModelItems.primary[1].description}
              </p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            variants={fadeInUp}
            className="lg:pointer-events-auto lg:absolute lg:top-1/2 lg:right-8 lg:-translate-y-1/2 mb-8 lg:mb-0"
          >
            <div className="text-center lg:text-left">
              <h4 className="font-display font-bold text-brand-dark text-lg mb-2">
                {operatingModelItems.primary[2].name}
              </h4>
              <p className="text-sm text-brand-pink font-medium max-w-xs hidden lg:block">
                {operatingModelItems.primary[2].description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Supporting Systems - Below */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 lg:mt-24"
      >
        {operatingModelItems.supporting.map((item, idx) => (
          <motion.div
            key={item.name}
            variants={fadeInUp}
            custom={idx}
            className="p-6 border border-brand-dark/10 rounded-lg hover:border-brand-pink/30 transition-colors"
          >
            <h4 className="font-display font-bold text-brand-dark text-lg mb-3">
              {item.name}
            </h4>
            <p className="text-sm text-brand-dark/70 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-6 mt-12">
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
    </motion.div>
  )
}
