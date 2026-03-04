"use client"

import { useRef, useState, useEffect } from "react"
import { 
  Link as LinkIcon,
  Eye, 
  Clock, 
  CreditCard, 
} from "lucide-react"

const CARD_HEADER_H = 56

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
  const titleRef = useRef<HTMLDivElement>(null)
  const [navHeight, setNavHeight] = useState(80)
  const [titleHeight, setTitleHeight] = useState(96)

  useEffect(() => {
    // Measure actual nav and title heights
    const nav = document.querySelector("header")
    if (nav) setNavHeight(nav.offsetHeight)
    if (titleRef.current) setTitleHeight(titleRef.current.offsetHeight)
  }, [])

  return (
    <section className="bg-brand-white">
      {/* Section title: sticky, pins right under the nav */}
      <div
        ref={titleRef}
        className="sticky z-[100] bg-brand-white px-6 py-10 lg:px-12"
        style={{ top: `${navHeight}px` }}
      >
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            What it looks like.
          </h2>
        </div>
      </div>

      {/*
        Each card is wrapped in a div whose height provides scroll runway.
        The card itself is position:sticky and sticks at the correct top offset.
        z-index increases with each card so later cards paint over earlier ones.
        
        Card 0 sticks at: navHeight + titleHeight  (right under the title)
        Card 1 sticks at: navHeight + titleHeight + CARD_HEADER_H  (under card 0's header)
        Card 2 sticks at: navHeight + titleHeight + CARD_HEADER_H * 2
        etc.
      */}
      {/*
        All cards live inside ONE tall container.
        Each card is position:sticky inside this single scroll context.
        This way earlier cards never lose their sticking context.
      */}
      <div
        style={{
          // 4 transitions × 120vh each to scroll each card in, plus ~60vh to view the final stacked state
          height: `${(problems.length - 1) * 120 + 60}vh`,
        }}
      >
        {problems.map((item, i) => {
          const Icon = item.icon
          // Card 0 sticks right under the title
          // Card 1 sticks one header-height lower, etc.
          const stickyTop = navHeight + titleHeight + i * CARD_HEADER_H

          return (
            <div
              key={item.eyebrow}
              className="sticky"
              style={{
                top: `${stickyTop}px`,
                zIndex: i + 1,
              }}
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

                {/* Card body */}
                <div className="border-2 border-t-0 border-brand-dark bg-brand-white p-8 lg:p-12">
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
          )
        })}
      </div>
    </section>
  )
}
