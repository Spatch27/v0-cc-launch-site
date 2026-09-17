"use client"

import { useRef, useState, useEffect } from "react"

const CARD_HEADER_H = 56
const CARD_HEADER_H_MOBILE = 40
// Scroll distance (px) allocated for each card to animate in
const SCROLL_PER_CARD = 500
// Extra scroll buffer after card 5 lands before the module starts scrolling away
const TAIL_BUFFER = 50

const problems = [
  {
    icon: "/icons/icon-team.svg",
    eyebrow: "TEAM",
    heading: "Clear ownership. Room to think.",
    then: "Talented people in a structure built for how marketing used to work. AI takes on the tasks, but the decisions still pile up with the same few people.",
    now: "People know what they own and what they can decide without asking.",
  },
  {
    icon: "/icons/icon-process.svg",
    eyebrow: "PROCESS",
    heading: "Work that flows end to end.",
    then: "A task that takes minutes sits in approval for days. Every fix adds another step. The doing speeds up and the queue stays put.",
    now: "Fewer handovers, clear decision rights, and AI built into the workflow, not bolted on.",
  },
  {
    icon: "/icons/icon-data.svg",
    eyebrow: "DATA",
    heading: "Trusted numbers & decision making.",
    then: "Marketing's dashboard says one thing, finance says another. AI can analyse anything, but nobody trusts what goes in.",
    now: "Numbers people agree on, early enough to shape a campaign before launch, not explain it after.",
  },
  {
    icon: "/icons/icon-technology.svg",
    eyebrow: "TECH",
    heading: "Tech that earns its place.",
    then: "Licences renew for platforms nobody opens. Every new AI tool promises the answer. The stack gets blamed for problems it didn't cause.",
    now: "A leaner stack where every tool and agent is there for a reason, and someone owns it.",
  },
]

export function WhatLooksLikeSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [navHeight, setNavHeight] = useState(80)
  const [outerHeight, setOuterHeight] = useState(2800)
  const [cardTranslates, setCardTranslates] = useState<number[]>(problems.map(() => 0))
  const [isMobile, setIsMobile] = useState(false)

  const effectiveHeaderH = isMobile ? CARD_HEADER_H_MOBILE : CARD_HEADER_H

  useEffect(() => {
    const nav = document.querySelector("header")
    const navH = nav ? nav.offsetHeight : 80
    setNavHeight(navH)

    // Detect if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    checkMobile()

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
    window.addEventListener("resize", checkMobile)
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
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
        {/* Title — compact on mobile so stacked cards keep enough viewport */}
        <div className="bg-white px-6 pb-3 pt-2 lg:px-12 lg:pb-6 lg:pt-4">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="font-display text-3xl font-bold leading-snug text-brand-dark md:text-5xl">
              Four areas. And the gaps in between.
            </h2>
            <p className="mt-2 max-w-3xl text-base leading-snug text-brand-dark md:mt-4 md:text-lg md:leading-relaxed">
              Most of what holds marketing back sits between them: a decision waiting on data, a tool nobody owns, a process built for a team that&apos;s since changed.
            </p>
          </div>
        </div>

        {/* Card stack — cards translate in from below, stacking on top of each other */}
        <div className="relative" style={{ height: `${400 + problems.length * effectiveHeaderH}px` }}>
          {problems.map((item, i) => {
            // Each card's final resting top = i * effectiveHeaderH (stacked headers)
            const finalTop = i * effectiveHeaderH
            const translateY = cardTranslates[i] ?? 0
            // Alternate header colors: pink for indices 0,2,4 (CUSTOMER, DATA, TECHNOLOGY)
            // text-brand-dark for indices 1,3 (TEAM, PROCESS)
            const isOrange = i % 2 === 0
            const headerBgColor = isOrange ? "bg-[#FFEB3E]" : "bg-[#FFD100]"
            const headerTextColor = isOrange ? "text-brand-dark" : "text-brand-dark"
            const iconFilter = isOrange ? "brightness(0) saturate(100%) invert(0.1) sepia(0) hue-rotate(0deg)" : "brightness(0) saturate(100%) invert(0.1) sepia(0) hue-rotate(0deg)"

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
                    style={{ height: `${effectiveHeaderH}px` }}
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
                        <div className="mb-3 text-xs font-bold tracking-widest text-brand-dark">BUILT FOR THEN</div>
                        <p className="text-base leading-relaxed" style={{ color: "#181716" }}>{item.then}</p>
                      </div>
                      <div>
                        <div className="mb-3 text-xs font-bold tracking-widest text-[#FF8600]">BUILT FOR NOW</div>
                        <p className="text-base leading-relaxed" style={{ color: "#181716" }}>{item.now}</p>
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
