"use client"

import { 
  Link as LinkIcon,
  Eye, 
  Clock, 
  CreditCard, 
} from "lucide-react"

// Height of the fixed navigation bar
const NAV_HEIGHT = 80
// Height of the sticky "What it looks like." section header
const SECTION_HEADER_H = 120
// Height of each pink card header bar
const CARD_HEADER_H = 64

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
    <section className="bg-brand-white">

      {/* ── Section title: sticky, sits just below the nav ── */}
      <div
        className="sticky z-[100] bg-brand-white py-12"
        style={{ top: `${NAV_HEIGHT}px` }}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            What it looks like.
          </h2>
        </div>
      </div>

      {/*
        ── Card wrappers ──
        Each wrapper is tall enough that its sticky child has scroll distance
        to travel before it sticks. z-index increases with each card so later
        cards visually cover earlier ones.

        Card i sticks at:  NAV + SECTION_HEADER + (i × CARD_HEADER_H)
        so each stacked header is exactly CARD_HEADER_H below the previous.

        The wrapper height = card body height (≈500px) + some scroll runway
        so the user scrolls the card into its stuck position before seeing
        the next card arrive.
      */}
      {problems.map((item, i) => {
        const Icon = item.icon
        const stickyTop = NAV_HEIGHT + SECTION_HEADER_H + i * CARD_HEADER_H

        return (
          <div
            key={item.eyebrow}
            // Tall enough for the sticky card to have scroll runway + card body visible
            className="relative"
            style={{
              height: `calc(500px + ${CARD_HEADER_H * (problems.length - i)}px)`,
              // Later cards sit on top of earlier ones
              zIndex: 10 + i,
            }}
          >
            <div
              className="sticky w-full"
              style={{ top: `${stickyTop}px`, zIndex: 10 + i }}
            >
              <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                {/* Pink header bar */}
                <div
                  className="flex items-center gap-3 bg-brand-pink px-8 text-brand-white"
                  style={{ height: `${CARD_HEADER_H}px` }}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="text-sm font-bold tracking-widest">{item.eyebrow}</span>
                </div>

                {/* Card body — white so it covers the card below */}
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
            </div>
          </div>
        )
      })}

      {/* Breathing room after final card before next section */}
      <div className="h-32" />
    </section>
  )
}
