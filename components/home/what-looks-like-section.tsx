"use client"

import { useRef, useState, useEffect } from "react"
import { 
  Link as LinkIcon,
  Eye, 
  Clock, 
  CreditCard, 
  AlertCircle 
} from "lucide-react"

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

const HEADER_HEIGHT = 64
const CARD_HEIGHT_ESTIMATE = 500 // Approximate full card height
const CARD_START_GAP = 50 // Small gap between cards at start

export function WhatLooksLikeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight
      const windowHeight = window.innerHeight
      const scrollTop = window.scrollY

      // Calculate how far into the section we are
      const sectionScrollStart = sectionTop
      const sectionScrollEnd = sectionTop + sectionHeight
      const currentScroll = scrollTop + windowHeight / 2

      // Progress from 0 to 1 as we scroll through the section
      const progress = Math.max(0, Math.min(1, (currentScroll - sectionScrollStart) / (sectionScrollEnd - sectionScrollStart)))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-brand-white py-24">
      {/* Header */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <h2 className="mb-16 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
          What it looks like.
        </h2>
      </div>

      {/* Stacking cards container - Use overflow hidden to clip cards */}
      <div className="relative">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          {/* Card stack wrapper */}
          <div className="relative" style={{ height: `${problems.length * (CARD_HEIGHT_ESTIMATE + CARD_START_GAP) + 600}px` }}>
            {problems.map((item, i) => {
              const Icon = item.icon
              
              // Initial position: cards stacked with small gaps
              const initialTopPosition = i * (CARD_HEIGHT_ESTIMATE + CARD_START_GAP)
              
              // Final stacked position: headers stacked on top of each other with HEADER_HEIGHT + gap spacing
              const finalTopPosition = i * (HEADER_HEIGHT + CARD_START_GAP)
              
              // Each card animates independently over its scroll range
              const cardStartProgress = (i / problems.length) * 0.75
              const cardEndProgress = ((i + 1) / problems.length) * 0.95
              
              // Clamp progress to this card's scroll range
              let cardProgress = 0
              if (scrollProgress >= cardStartProgress && scrollProgress <= cardEndProgress) {
                cardProgress = (scrollProgress - cardStartProgress) / (cardEndProgress - cardStartProgress)
              } else if (scrollProgress > cardEndProgress) {
                cardProgress = 1
              }
              
              // Smooth easing for the animation
              const easeProgress = cardProgress < 0.5 
                ? 2 * cardProgress * cardProgress 
                : -1 + (4 - 2 * cardProgress) * cardProgress
              
              // Interpolate position from initial to final
              const currentTop = initialTopPosition + (finalTopPosition - initialTopPosition) * easeProgress
              
              return (
                <div
                  key={item.heading}
                  className="absolute w-full"
                  style={{
                    top: `${currentTop}px`,
                    zIndex: problems.length - i,
                  }}
                >
                  {/* Header Bar */}
                  <div className="flex items-center gap-3 bg-brand-pink px-8 py-4 text-brand-white lg:px-12">
                    <Icon size={20} className="shrink-0" />
                    <span className="text-sm font-bold tracking-widest">
                      {item.eyebrow}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="w-full border-2 border-t-0 border-brand-dark bg-brand-white p-8 lg:p-12">
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
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
