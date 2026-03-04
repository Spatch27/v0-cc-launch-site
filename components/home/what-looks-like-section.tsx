"use client"

import { useRef, useState, useEffect } from "react"
import { 
  Link as LinkIcon,
  Eye, 
  Clock, 
  CreditCard, 
} from "lucide-react"

const CARD_HEADER_H = 56
// How much scroll distance each card transition takes (px)
const SCROLL_PER_CARD = 500

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
  const outerRef = useRef<HTMLDivElement>(null)
  const [navHeight, setNavHeight] = useState(80)
  const [titleHeight, setTitleHeight] = useState(100)
  // cardOffsets[i] = how many px from the top of the sticky block each card should sit
  // when fully stacked. Card 0 = 0, card 1 = CARD_HEADER_H, etc.
  const [cardTranslates, setCardTranslates] = useState<number[]>(problems.map(() => 0))

  useEffect(() => {
    const nav = document.querySelector("header")
    const navH = nav ? nav.offsetHeight : 80
    setNavHeight(navH)

    const handleScroll = () => {
      if (!outerRef.current) return
      const rect = outerRef.current.getBoundingClientRect()
      // How far we've scrolled into the section (0 = section top just hit viewport top)
      const scrolled = -rect.top

      const translates = problems.map((_, i) => {
        if (i === 0) return 0 // Card 1 never moves — it sticks immediately
        // Card i starts moving once (i-1) * SCROLL_PER_CARD px have been scrolled
        const start = (i - 1) * SCROLL_PER_CARD
        const end = i * SCROLL_PER_CARD
        const raw = (scrolled - start) / (end - start)
        const progress = Math.max(0, Math.min(1, raw))
        // Card i slides UP to sit CARD_HEADER_H * i from the top of block
        // It starts below the viewport (off screen) and ends at its stacked position
        // We express this as a translateY: starts at a large positive value, ends at 0
        const totalTravel = 600 // px the card travels upward
        return (1 - progress) * totalTravel
      })
      setCardTranslates(translates)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Total outer height: first card loads immediately, then 4 more transitions
  const outerHeight = (problems.length - 1) * SCROLL_PER_CARD + window.innerHeight

  return (
    // Outer section — provides scroll runway. Once exhausted, the sticky block unsticks
    // and the whole module (title + all headers + card 5) scrolls away as one.
    <div
      ref={outerRef}
      className="relative bg-white"
      style={{ height: `${outerHeight}px` }}
    >
      {/* Single sticky block — everything inside moves together when section ends */}
      <div
        className="sticky overflow-hidden bg-white"
        style={{ top: `${navHeight}px` }}
      >
        {/* Title — always visible at the top of the sticky block */}
        <div className="bg-white px-6 py-10 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
              What it looks like.
            </h2>
          </div>
        </div>

        {/* Card stack — cards translate in from below, stacking on top of each other */}
        <div className="relative" style={{ height: `${600 + titleHeight + problems.length * CARD_HEADER_H}px` }}>
          {problems.map((item, i) => {
            const Icon = item.icon
            // Each card's final resting top = i * CARD_HEADER_H (stacked headers)
            const finalTop = i * CARD_HEADER_H
            const translateY = cardTranslates[i] ?? 0

            return (
              <div
                key={item.eyebrow}
                className="absolute w-full"
                style={{
                  top: `${finalTop}px`,
                  transform: `translateY(${translateY}px)`,
                  zIndex: i + 1,
                  willChange: "transform",
                }}
              >
                <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                  <div
                    className="flex items-center gap-3 bg-brand-pink px-8 text-brand-white"
                    style={{ height: `${CARD_HEADER_H}px` }}
                  >
                    <Icon size={20} className="shrink-0" />
                    <span className="text-sm font-bold tracking-widest">{item.eyebrow}</span>
                  </div>
                  <div className="border-2 border-t-0 border-brand-dark bg-white p-8 lg:p-12">
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
      </div>
    </div>
  )
}
