"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const pillars = [
  {
    id: "people",
    title: "People",
    icon: "/icons/icon-team.svg",
    shortDescription: "Talented individuals aligned around shared purpose.",
    expandedDescription:
      "Clear decision rights, protected focus, genuine ownership. Great marketers joined to build bold work — we help them do exactly that instead of drowning in approval loops and broken systems.",
    bgColor: "bg-brand-pink",
  },
  {
    id: "process",
    title: "Process",
    icon: "/icons/icon-process.svg",
    shortDescription: "Lean pathways that accelerate rather than impede.",
    expandedDescription:
      "Briefs that should take hours no longer take days. Approvals involve the right people, not everyone. Each improvement removes a step rather than adding one. Lean pathways, clean handoffs, fewer loops.",
    bgColor: "bg-brand-orange",
  },
  {
    id: "data",
    title: "Data",
    icon: "/icons/icon-data.svg",
    shortDescription: "A single view of what matters and why.",
    expandedDescription:
      "Marketing and finance speak the same language. Decisions are made on what to do next, not debates about which numbers are right. A single, agreed view of what's happening, why, and what matters next.",
    bgColor: "bg-brand-yellow-deep",
  },
  {
    id: "tech",
    title: "Tech",
    icon: "/icons/icon-technology.svg",
    shortDescription: "A stack built around how people actually work.",
    expandedDescription:
      "Licences that earn their keep. Platforms people love to use. Tool work gives way to customer work. A leaner, better-loved stack that serves the team rather than the other way around.",
    bgColor: "bg-brand-yellow-light",
  },
]

export function FourPillarsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [openMobile, setOpenMobile] = useState<string | null>(null)

  return (
    <section className="bg-brand-light">
      {/* Header */}
      <div className="px-6 py-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Where we focus.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-dark">
            Every cycle targets one of four areas — the dimensions that shape how marketing actually operates.
          </p>
        </div>
      </div>

      {/* Desktop: 4 columns with hover expansion */}
      <div className="hidden md:block">
        <div
          className="flex w-full"
          style={{ height: "calc(100vh - 280px)", minHeight: "480px", maxHeight: "640px" }}
        >
          {pillars.map((pillar, index) => {
            const isHovered = hoveredIndex === index
            const widthPercent =
              hoveredIndex === null ? 25 : isHovered ? 40 : 20

            return (
              <motion.div
                key={pillar.id}
                className={`${pillar.bgColor} relative flex cursor-pointer flex-col justify-between overflow-hidden px-8 py-10`}
                animate={{ width: `${widthPercent}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icon */}
                <div className="h-10 w-10">
                  <Image
                    src={pillar.icon}
                    alt={pillar.title}
                    width={40}
                    height={40}
                    style={{ filter: "brightness(0)" }}
                  />
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-display text-3xl font-bold text-brand-dark">
                    {pillar.title}
                  </h3>

                  {/* Short desc — always visible */}
                  <p className="mt-2 text-sm font-medium text-brand-dark opacity-70">
                    {pillar.shortDescription}
                  </p>

                  {/* Expanded desc — fades in on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.p
                        key="expanded"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mt-4 text-base leading-relaxed text-brand-dark"
                      >
                        {pillar.expandedDescription}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile: accordion */}
      <div className="md:hidden divide-y divide-brand-dark/20">
        {pillars.map((pillar) => {
          const isOpen = openMobile === pillar.id
          return (
            <div key={pillar.id} className={pillar.bgColor}>
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenMobile(isOpen ? null : pillar.id)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <Image src={pillar.icon} alt={pillar.title} width={28} height={28} style={{ filter: "brightness(0)" }} />
                  <span className="font-display text-xl font-bold text-brand-dark">
                    {pillar.title}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-brand-dark text-brand-dark"
                  style={{ fontSize: "1.2rem", lineHeight: 1 }}
                  aria-hidden
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1">
                      <p className="text-sm font-medium text-brand-dark opacity-70">
                        {pillar.shortDescription}
                      </p>
                      <p className="mt-3 text-base leading-relaxed text-brand-dark">
                        {pillar.expandedDescription}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
