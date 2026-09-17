"use client"

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"

const HERO_COPY = "Bolder work in the world. Less work to put it there."

/** Scroll progress (section start→end vs viewport start) at which the morph is fully settled. */
const MORPH_PROGRESS_END = 0.4

function MorphSlot({
  from,
  to,
  y,
  align = "start",
}: {
  from: string
  to: string
  y: MotionValue<string>
  align?: "start" | "end"
}) {
  return (
    <span className={`cc-hero-slot${align === "end" ? " cc-hero-slot-end" : ""}`}>
      <motion.span className="cc-hero-slot-inner" style={{ y }}>
        <span className="cc-hero-phrase">{from}</span>
        <span className="cc-hero-phrase">{to}</span>
      </motion.span>
    </span>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Slot inner is one line tall; -100% brings the replacement phrase into view.
  // Keep in sync with data-cc-morph-end — Home nav stays on the hero colour until this progress.
  const morphY = useTransform(scrollYProgress, [0, MORPH_PROGRESS_END], ["0%", "-100%"])

  return (
    <>
      <style>{`
        .cc-hero-pin {
          min-height: 100vh;
          min-height: 100svh;
        }

        .cc-hero-scroll-room {
          height: 100vh;
          height: 100svh;
          pointer-events: none;
        }

        .cc-hero-heading {
          flex-shrink: 0;
          font-size: 2.25rem;
          font-size: clamp(1.75rem, 11vw, 3.75rem);
          font-size: clamp(1.75rem, calc((100vw - 3.5rem) / 6.4), 3.75rem);
        }

        .cc-hero-sr {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .cc-hero-lockup {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: max-content;
        }

        .cc-hero-line {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        }

        .cc-hero-slot {
          display: block;
          height: 1.12em;
          overflow: hidden;
        }

        .cc-hero-slot-inner {
          display: block;
          height: 100%;
          will-change: transform;
        }

        .cc-hero-phrase,
        .cc-hero-work {
          display: flex;
          align-items: flex-end;
          height: 1.12em;
          white-space: nowrap;
        }

        .cc-hero-slot-end .cc-hero-phrase {
          justify-content: flex-end;
        }

        .cc-hero-work {
          flex: none;
        }

        .cc-hero-line + .cc-hero-line {
          margin-top: 0.12em;
        }

        .cc-hero-static-line + .cc-hero-static-line {
          margin-top: 0.4em;
        }

        .cc-hero-subtitle {
          animation: cc-hero-subtitle-in 700ms 200ms both cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes cc-hero-subtitle-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 768px) {
          .cc-hero-heading {
            font-size: clamp(3.5rem, 10vw, 8rem);
            font-size: clamp(3.5rem, calc((100vw - 4rem) / 6.4), 8rem);
          }

          .cc-hero-static-line + .cc-hero-static-line {
            margin-top: 0.28em;
          }
        }

        @media (min-width: 1024px) {
          .cc-hero-heading {
            font-size: clamp(3.5rem, calc((100vw - 7rem) / 6.4), 8rem);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cc-hero-subtitle {
            animation: none;
          }

          .cc-hero-slot-inner {
            transform: none !important;
          }
        }
      `}</style>
      <section
        ref={sectionRef}
        className="cc-home-hero relative bg-brand-orange"
        data-cc-morph-end={prefersReducedMotion ? undefined : String(MORPH_PROGRESS_END)}
      >
        <div className="cc-hero-pin sticky top-0 px-6 lg:px-12">
          <div className="mx-auto flex min-h-svh max-w-[1400px] flex-col justify-between gap-8 pt-28 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] md:gap-24 md:pt-40 md:pb-20 lg:min-h-svh lg:gap-32 lg:pt-44 lg:pb-20">
            <h1 className="cc-hero-heading font-display font-bold leading-[0.95] tracking-tight text-brand-dark">
              {prefersReducedMotion ? (
                <>
                  <span className="cc-hero-static-line block">Bolder work in the world.</span>
                  <span className="cc-hero-static-line block">Less work to put it there.</span>
                </>
              ) : (
                <>
                  <span className="cc-hero-sr">{HERO_COPY}</span>
                  <span className="cc-hero-lockup" aria-hidden="true">
                    <span className="cc-hero-line">
                      <MorphSlot from="Bolder" to="Less" y={morphY} align="end" />
                      <span className="cc-hero-work">&nbsp;work</span>
                    </span>
                    <span className="cc-hero-line">
                      <MorphSlot from="in the world" to="to put it there" y={morphY} />
                    </span>
                  </span>
                </>
              )}
            </h1>

            <div className="cc-hero-subtitle flex min-h-0 justify-end">
              <p className="max-w-2xl text-right text-xl leading-relaxed text-brand-dark">
                We help CMOs build a stronger marketing function with AI. Starting with one live campaign, we redesign how work happens — and leave your team better equipped to own and improve it.
              </p>
            </div>
          </div>
        </div>
        {prefersReducedMotion ? null : <div className="cc-hero-scroll-room" aria-hidden="true" />}
      </section>
    </>
  )
}
