"use client"

import { 
  Link as LinkIcon,
  Eye, 
  Clock, 
  CreditCard, 
} from "lucide-react"

const NAV_HEIGHT = 80      // height of fixed navigation
const SECTION_HEADER = 120 // approx height of "What it looks like." heading area
const HEADER_H = 64        // height of each pink header bar

const problems = [
  {
    icon: LinkIcon,
    eyebrow: "CUSTOMER",
    heading: "Falling through the gaps",
    drag: "Your brand promise and the experience people actually get are drifting apart. Gaps open at the handoffs. Channels contradict each other.",
    flow: "One orchestrated experience, end-to-end.",
  },
  {
    icon: LinkIcon,
    eyebrow: "TEAM",
    heading: "Talented people, underperforming teams",
    drag: "Great marketers joined to build bold work. They're stuck in approval loops and broken systems. The workaround has become the culture.",
    flow: "Clear decision rights, protected focus, genuine ownership.",
  },
  {
    icon: Eye,
    eyebrow: "DATA",
    heading: "Flying blind on what's working",
    drag: "Marketing's dashboard says one thing, finance says another. Every decision becomes a debate about numbers instead of what to do next.",
    flow: "A single, agreed view of what's happening, why, and what matters next.",
  },
  {
    icon: Clock,
    eyebrow: "PROCESS",
    heading: "Everything takes too long",
    drag: "Briefs that should take hours take days. Approvals loop around six people when two would do. Each \"fix\" adds another step.",
    flow: "Lean pathways, clean handoffs, fewer loops.",
  },
  {
    icon: CreditCard,
    eyebrow: "TECHNOLOGY",
    heading: "Paying for tech nobody's using",
    drag: "Licences auto-renew for platforms nobody opens. Half the team still lives in spreadsheets. \"Tool work\" steals time from customer work.",
    flow: "A leaner, better-loved stack built around how people actually work.",
  },
]

export function WhatLooksLikeSection() {
  return (
    <section className="relative bg-brand-white">
      {/* Section header — sticky so it stays visible during the card animation */}
      <div
        className="sticky z-50 bg-brand-white py-12"
        style={{ top: `${NAV_HEIGHT}px` }}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            What it looks like.
          </h2>
        </div>
      </div>

      {/* Each card wrapper provides the scroll distance needed to trigger sticking */}
      {problems.map((item, i) => {
        const Icon = item.icon
        // Each card sticks just below the nav + section header + all previously stacked headers
        const stickyTop = NAV_HEIGHT + SECTION_HEADER + i * HEADER_H

        return (
          // The wrapper needs enough height so the sticky card has room to scroll into and out of view.
          // Extra 50px = the visible gap between this card and the one above.
          <div key={item.eyebrow} className="relative" style={{ zIndex: i + 1 }}>
            <div
              className="sticky mx-auto max-w-[1400px] px-6 lg:px-12"
              style={{ top: `${stickyTop}px`, zIndex: i + 1 }}
            >
              {/* Pink header bar */}
              <div
                className="flex items-center gap-3 bg-brand-pink px-8 py-4 text-brand-white"
                style={{ height: `${HEADER_H}px` }}
              >
                <Icon size={20} className="shrink-0" />
                <span className="text-sm font-bold tracking-widest">{item.eyebrow}</span>
              </div>

              {/* Card body */}
              <div className="w-full border-2 border-t-0 border-brand-dark bg-brand-white p-8 lg:p-12">
                <h3 className="mb-8 font-display text-3xl font-bold leading-tight text-brand-dark lg:text-4xl">
                  {item.heading}
                </h3>
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-widest text-brand-dark">DRAG</div>
                    <p className="text-base leading-relaxed text-brand-dark/70">{item.drag}</p>
                  </div>
                  <div>
                    <div className="mb-3 text-xs font-bold tracking-widest text-brand-orange">FLOW</div>
                    <p className="text-base leading-relaxed text-brand-dark/70">{item.flow}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll spacer: card body height + 50px gap before the next card appears */}
            <div className="h-[550px]" />
          </div>
        )
      })}

      {/* Bottom padding so the last card fully unsticks before the next section */}
      <div className="h-24" />
    </section>
  )
}
