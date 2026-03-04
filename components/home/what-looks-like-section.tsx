"use client"

import { useRef } from "react"
import { 
  IconCustomer,
  IconTeam,
  IconData,
  IconProcess,
  IconTechnology,
} from "./icons"

const problems = [
  {
    icon: IconCustomer,
    eyebrow: "CUSTOMER",
    heading: "Falling through the gaps",
    drag: "Your brand promise and the experience people actually get are drifting apart. Gaps open at the handoffs. Channels contradict each other.",
    flow: "One orchestrated experience, end-to-end.",
  },
  {
    icon: IconTeam,
    eyebrow: "TEAM",
    heading: "Talented people, underperforming teams",
    drag: "Great marketers joined to build bold work. They're stuck in approval loops and broken systems. The workaround has become the culture.",
    flow: "Clear decision rights, protected focus, genuine ownership.",
  },
  {
    icon: IconData,
    eyebrow: "DATA",
    heading: "Flying blind on what's working",
    drag: "Marketing's dashboard says one thing, finance says another. Every decision becomes a debate about numbers instead of what to do next.",
    flow: "A single, agreed view of what's happening, why, and what matters next.",
  },
  {
    icon: IconProcess,
    eyebrow: "PROCESS",
    heading: "Everything takes too long",
    drag: "Briefs that should take hours take days. Approvals loop around six people when two would do. Each \"fix\" adds another step.",
    flow: "Lean pathways, clean handoffs, fewer loops.",
  },
  {
    icon: IconTechnology,
    eyebrow: "TECHNOLOGY",
    heading: "Paying for tech nobody's using",
    drag: "Licences auto-renew for platforms nobody opens. Half the team still lives in spreadsheets. \"Tool work\" steals time from customer work.",
    flow: "A leaner, better-loved stack built around how people actually work.",
  },
]

export function WhatLooksLikeSection() {
  return (
    <section className="relative bg-brand-white py-24">
      {/* Header */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <h2 className="mb-16 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
          What it looks like.
        </h2>
      </div>

      {/* Stacking cards container */}
      <div className="relative">
        {problems.map((item, i) => {
          const Icon = item.icon
          
          return (
            <div
              key={item.heading}
              className="sticky relative"
              style={{ 
                top: `${60 + i * 80}px`,
                zIndex: i + 1
              }}
            >
              <div className="mx-auto max-w-[1400px] px-6 pb-4 lg:px-12">
                <div className="w-full border-2 border-brand-dark bg-brand-white p-8 lg:p-12">
                  {/* Eyebrow with icon */}
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-brand-pink">
                      <Icon />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-brand-dark">
                      {item.eyebrow}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 className="mb-8 font-display text-3xl font-bold leading-tight text-brand-dark lg:text-4xl">
                    {item.heading}
                  </h3>

                  {/* Two-column body: DRAG and FLOW */}
                  <div className="grid gap-8 lg:grid-cols-2">
                    {/* DRAG section */}
                    <div>
                      <div className="mb-3 text-xs font-bold tracking-widest text-brand-dark">
                        DRAG
                      </div>
                      <p className="text-base leading-relaxed text-brand-dark/70">
                        {item.drag}
                      </p>
                    </div>

                    {/* FLOW section */}
                    <div>
                      <div className="mb-3 text-xs font-bold tracking-widest text-brand-orange">
                        FLOW
                      </div>
                      <p className="text-base leading-relaxed text-brand-dark/70">
                        {item.flow}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        
        {/* Spacer to allow last card to be fully visible */}
        <div className="h-[40vh]" />
      </div>
    </section>
  )
}
