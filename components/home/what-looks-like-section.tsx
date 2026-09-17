"use client"

import { useRef, useState, useEffect } from "react"

const CARD_HEADER_H = 56
const SCROLL_PER_CARD = 500
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
] as const

type Area = (typeof problems)[number]

function headerBg(index: number) {
  return index % 2 === 0 ? "bg-[#FFEB3E]" : "bg-[#FFD100]"
}

function AreaCardBody({ item, headerHeight }: { item: Area; headerHeight?: number }) {
  return (
    <>
      <div
        className="flex items-center gap-3 px-6 text-brand-dark md:px-8"
        style={headerHeight ? { height: `${headerHeight}px` } : { minHeight: "2.75rem" }}
      >
        <img
          src={item.icon}
          alt=""
          className="h-8 w-8 shrink-0 md:h-10 md:w-10"
          style={{ filter: "brightness(0) saturate(100%) invert(0.1) sepia(0) hue-rotate(0deg)" }}
        />
        <span className="text-sm font-bold tracking-widest">{item.eyebrow}</span>
      </div>
      <div className="bg-gray-100 p-6 md:p-8 lg:p-12">
        <h3 className="mb-6 font-display text-2xl font-bold leading-tight text-brand-dark md:mb-8 md:text-3xl lg:text-4xl">
          {item.heading}
        </h3>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-3 text-xs font-bold tracking-widest text-brand-dark">BUILT FOR THEN</div>
            <p className="text-base leading-relaxed text-brand-dark">{item.then}</p>
          </div>
          <div className="border-l-4 border-[#FF8600] pl-4">
            <div className="mb-3 text-xs font-bold tracking-widest text-brand-dark">BUILT FOR NOW</div>
            <p className="text-base leading-relaxed text-brand-dark">{item.now}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export function WhatLooksLikeSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [navHeight, setNavHeight] = useState(80)
  const [outerHeight, setOuterHeight] = useState(2800)
  const [cardTranslates, setCardTranslates] = useState<number[]>(problems.map(() => 0))

  useEffect(() => {
    const nav = document.querySelector("header")
    const navH = nav ? nav.offsetHeight : 80
    setNavHeight(navH)

    const updateDesktopStack = () => {
      if (window.innerWidth < 768) return
      if (!outerRef.current) return

      setOuterHeight((problems.length - 1) * SCROLL_PER_CARD + TAIL_BUFFER + window.innerHeight)

      const rect = outerRef.current.getBoundingClientRect()
      const scrolled = Math.max(0, -rect.top)
      const translates = problems.map((_, i) => {
        if (i === 0) return 0
        const start = (i - 1) * SCROLL_PER_CARD
        const end = i * SCROLL_PER_CARD
        const progress = Math.max(0, Math.min(1, (scrolled - start) / (end - start)))
        return (1 - progress) * 600
      })
      setCardTranslates(translates)
    }

    updateDesktopStack()
    window.addEventListener("scroll", updateDesktopStack, { passive: true })
    window.addEventListener("resize", updateDesktopStack)
    return () => {
      window.removeEventListener("scroll", updateDesktopStack)
      window.removeEventListener("resize", updateDesktopStack)
    }
  }, [])

  const stackHeight = 400 + problems.length * CARD_HEADER_H

  return (
    <>
      <style>{`
        .cc-areas {
          background: #fff;
          padding-top: 4rem;
          padding-bottom: var(--cc-mobile-nav-offset, 6.5rem);
          height: auto !important;
        }

        .cc-areas-sticky {
          position: static;
          overflow: visible;
          background: #fff;
        }

        .cc-areas-title {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0.5rem 1.5rem 1.5rem;
        }

        .cc-areas-stack {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          height: auto !important;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .cc-areas-card {
          position: relative !important;
          top: auto !important;
          transform: none !important;
          width: 100%;
        }

        .cc-areas-card-frame {
          max-width: none;
          margin: 0;
          padding: 0;
        }

        @media (min-width: 768px) {
          .cc-areas {
            position: relative;
            padding-top: 4rem;
            padding-bottom: 0;
            height: var(--cc-areas-runway, 2800px) !important;
          }

          .cc-areas-sticky {
            position: sticky;
            top: var(--cc-areas-nav, 80px);
            overflow: hidden;
          }

          .cc-areas-title {
            padding: 1rem 3rem 1.5rem;
          }

          .cc-areas-stack {
            display: block;
            position: relative;
            gap: 0;
            height: var(--cc-areas-stack-h, 624px) !important;
            max-width: none;
            padding: 0;
          }

          .cc-areas-card {
            position: absolute !important;
            top: var(--cc-areas-card-top, 0px) !important;
            transform: translateY(var(--cc-areas-card-y, 0px)) !important;
            will-change: transform;
          }

          .cc-areas-card-frame {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .cc-areas {
            padding-top: 6rem;
          }

          .cc-areas-card-frame {
            padding: 0 3rem;
          }
        }
      `}</style>
      <div
        ref={outerRef}
        className="cc-areas"
        style={{
          ["--cc-areas-runway" as string]: `${outerHeight}px`,
          ["--cc-areas-stack-h" as string]: `${stackHeight}px`,
          ["--cc-areas-nav" as string]: `${navHeight}px`,
        }}
      >
        <div className="cc-areas-sticky">
          <div className="cc-areas-title">
            <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
              Four areas. And the gaps in between.
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-brand-dark">
              Most of what holds marketing back sits between them: a decision waiting on data, a tool nobody owns, a process built for a team that&apos;s since changed.
            </p>
          </div>
          <div className="cc-areas-stack">
            {problems.map((item, i) => (
              <div
                key={item.eyebrow}
                className="cc-areas-card"
                style={{
                  ["--cc-areas-card-top" as string]: `${i * CARD_HEADER_H}px`,
                  ["--cc-areas-card-y" as string]: `${cardTranslates[i] ?? 0}px`,
                  zIndex: i + 1,
                }}
              >
                <div className="cc-areas-card-frame">
                  <div className={headerBg(i)}>
                    <AreaCardBody item={item} headerHeight={CARD_HEADER_H} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
