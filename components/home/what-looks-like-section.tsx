"use client"

import { useRef, useState, useEffect } from "react"

const CARD_HEADER_H = 56
// Scroll distance (px) allocated for each card to animate in
const SCROLL_PER_CARD = 500
// Extra scroll buffer after card 5 lands before the module starts scrolling away
const TAIL_BUFFER = 50

const problems = [
  {
    icon: "/icons/icon-customer.svg",
    eyebrow: "CUSTOMER",
    heading: "Falling through the gaps",
    drag: "Your brand promise and the experience people actually get are drifting apart. Gaps open at the handoffs. Channels contradict each other.",
    flow: "One orchestrated experience, end-to-end.",
  },
  {
    icon: "/icons/icon-team.svg",
    eyebrow: "TEAM",
    heading: "Talented people, underperforming teams",
    drag: "Great marketers joined to build bold work. They're stuck in approval loops and broken systems. The workaround has become the culture.",
    flow: "Clear decision rights, protected focus, genuine ownership.",
  },
  {
    icon: "/icons/icon-data.svg",
    eyebrow: "DATA",
    heading: "Flying blind on what's working",
    drag: "Marketing's dashboard says one thing, finance says another. Every decision becomes a debate about numbers instead of what to do next.",
    flow: "A single, agreed view of what's happening, why, and what matters next.",
  },
  {
    icon: "/icons/icon-process.svg",
    eyebrow: "PROCESS",
    heading: "Everything takes too long",
    drag: "Briefs that should take hours take days. Approvals loop around six people when two would do. Each \"fix\" adds another step.",
    flow: "Lean pathways, clean handoffs, fewer loops.",
  },
  {
    icon: "/icons/icon-technology.svg",
    eyebrow: "TECHNOLOGY",
    heading: "Paying for tech nobody's using",
    drag: "Licences auto-renew for platforms nobody opens. Half the team still lives in spreadsheets. \"Tool work\" steals time from customer work.",
    flow: "A leaner, better-loved stack built around how people actually work.",
  },
]

export function WhatLooksLikeSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [navHeight, setNavHeight] = useState(80)
  const [outerHeight, setOuterHeight] = useState(2800)
  const [cardTranslates, setCardTranslates] = useState<number[]>(problems.map(() => 0))

  useEffect(() => {
    const nav = document.querySelector("header")
    const navH = nav ? nav.offsetHeight : 80
    setNavHeight(navH)

    // Total height = scroll runway for all card transitions + buffer after last card + viewport
    // The sticky element unsticks when: scrolled >= outerHeight - viewportHeight
    // We want that to happen after all cards have landed + TAIL_BUFFER
    // All cards land at: (problems.length - 1) * SCROLL_PER_CARD
    // So: outerHeight - viewportHeight = (n-1)*SCROLL_PER_CARD + TAIL_BUFFER
    // outerHeight = (n-1)*SCROLL_PER_CARD + TAIL_BUFFER + viewportHeight
    setOuterHeight((problems.length - 1) * SCROLL_PER_CARD + TAIL_BUFFER + window.innerHeight)

    const handleScroll = () => {
      if (!outerRef.current) return
      const rect = outerRef.current.getBoundingClientRect()
      // scrolled = how many px we've scrolled past the top of the outer section
      const scrolled = Math.max(0, -rect.top)

      const translates = problems.map((_, i) => {
        if (i === 0) return 0 // Card 1 is already in place
        const start = (i - 1) * SCROLL_PER_CARD
        const end = i * SCROLL_PER_CARD
        const progress = Math.max(0, Math.min(1, (scrolled - start) / (end - start)))
        // Starts 600px below its final position, slides up to 0
        return (1 - progress) * 600
      })
      setCardTranslates(translates)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    // Outer section — provides scroll runway. Once exhausted, the sticky block unsticks
    // and the whole module (title + all headers + card 5) scrolls away as one.
    <div
      ref={outerRef}
      className="relative bg-white pt-16 lg:pt-24"
      style={{ height: `${outerHeight}px` }}
    >
      {/* Single sticky block — sits flush under nav when stuck, padded at rest via outer pt */}
      <div
        className="sticky overflow-hidden bg-white"
        style={{ top: `${navHeight}px` }}
      >
        {/* Title */}
        <div className="bg-white px-6 pb-4 pt-4 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
              What it looks like.
            </h2>
          </div>
        </div>

        {/* Card stack — cards translate in from below, stacking on top of each other */}
        <div className="relative" style={{ height: `${400 + problems.length * CARD_HEADER_H}px` }}>
          {problems.map((item, i) => {
            // Each card's final resting top = i * CARD_HEADER_H (stacked headers)
            const finalTop = i * CARD_HEADER_H
            const translateY = cardTranslates[i] ?? 0
            // Alternate header colors: pink for indices 0,2,4 (CUSTOMER, DATA, TECHNOLOGY)
            // text-brand-dark for indices 1,3 (TEAM, PROCESS)
            const isOrange = i % 2 === 0
            const headerBgColor = isOrange ? "bg-[#FF8600]" : "bg-[#FFEB3E]"
            const headerTextColor = isOrange ? "text-brand-white" : "text-brand-dark"
            const iconFilter = isOrange ? "" : "brightness(0) saturate(100%) invert(0.1) sepia(0) hue-rotate(0deg)"

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
                    className={`flex items-center gap-3 ${headerBgColor} px-8 ${headerTextColor}`}
                    style={{ height: `${CARD_HEADER_H}px` }}
                  >
                    <img src={item.icon} alt={item.eyebrow} className="h-10 w-10 shrink-0" style={{ filter: iconFilter }} />
                    <span className="text-sm font-bold tracking-widest">{item.eyebrow}</span>
                  </div>
                  <div className="bg-gray-100 p-8 lg:p-12">
                    <h3 className="mb-8 font-display text-3xl font-bold leading-tight text-brand-dark lg:text-4xl">
                      {item.heading}
                    </h3>
                    <div className="grid gap-8 lg:grid-cols-2">
                      <div>
                        <div className="mb-3 text-xs font-bold tracking-widest text-brand-dark">DRAG</div>
                        <p className="text-base leading-relaxed" style={{ color: "#181716" }}>{item.drag}</p>
                      </div>
                      <div>
                        <div className="mb-3 text-xs font-bold tracking-widest text-[#FF8600]">FLOW</div>
                        <p className="text-base leading-relaxed" style={{ color: "#181716" }}>{item.flow}</p>
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
