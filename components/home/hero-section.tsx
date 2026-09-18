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
  italic = false,
}: {
  from: string
  to: string
  y: MotionValue<string>
  align?: "start" | "end"
  italic?: boolean
}) {
  const Phrase = italic ? "em" : "span"
  return (
    <span className={`cc-hero-slot${align === "end" ? " cc-hero-slot-end" : ""}`}>
      <motion.span className="cc-hero-slot-inner" style={{ y }}>
        <Phrase className="cc-hero-phrase">{from}</Phrase>
        <Phrase className="cc-hero-phrase">{to}</Phrase>
      </motion.span>
    </span>
  )
}

/** Second-line morph whose left edge tracks Bolder → Less, not the full first-line unit. */
function SubMorphSlot({
  from,
  to,
  fromGhost,
  toGhost,
  y,
}: {
  from: string
  to: string
  fromGhost: string
  toGhost: string
  y: MotionValue<string>
}) {
  return (
    <span className="cc-hero-sub-slot">
      <motion.span className="cc-hero-slot-inner" style={{ y }}>
        <span className="cc-hero-sub-row">
          <span className="cc-hero-ghost-wrap">
            <em className="cc-hero-ghost">{fromGhost}</em>
            <span className="cc-hero-phrase">{from}</span>
          </span>
        </span>
        <span className="cc-hero-sub-row">
          <span className="cc-hero-ghost-wrap">
            <em className="cc-hero-ghost">{toGhost}</em>
            <span className="cc-hero-phrase">{to}</span>
          </span>
        </span>
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
  const subtitleOpacity = useTransform(scrollYProgress, [0, MORPH_PROGRESS_END], [0, 1])
  const subtitleY = useTransform(scrollYProgress, [0, MORPH_PROGRESS_END], [20, 0])

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
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif;
          font-size: 2.25rem;
          font-size: clamp(1.75rem, 11vw, 3.75rem);
          font-size: clamp(1.75rem, calc((100vw - 3.5rem) / 6.4), 3.75rem);
        }

        .cc-hero-heading em,
        .cc-hero-heading .cc-hero-phrase,
        .cc-hero-heading .cc-hero-work,
        .cc-hero-heading .cc-hero-ghost,
        .cc-hero-heading .cc-hero-static-lead,
        .cc-hero-heading .cc-hero-static-sub {
          font-family: inherit;
        }

        .cc-hero-line-lead,
        .cc-hero-line-lead em,
        .cc-hero-work,
        .cc-hero-ghost {
          font-style: italic;
          font-weight: 800;
        }

        .cc-hero-slot em,
        .cc-hero-ghost {
          padding-inline-end: 0.26em;
        }

        .cc-hero-line-sub,
        .cc-hero-sub-slot .cc-hero-phrase {
          font-style: normal;
          font-weight: 500;
        }

        .cc-hero-static-lead {
          font-style: italic;
          font-weight: 800;
        }

        .cc-hero-static-sub {
          font-style: normal;
          font-weight: 500;
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
          display: grid;
          grid-template-columns: max-content max-content;
          grid-template-rows: auto auto;
          width: max-content;
          column-gap: 0;
        }

        .cc-hero-line-lead {
          display: contents;
        }

        .cc-hero-slot {
          grid-column: 1;
          grid-row: 1;
          display: block;
          height: 1.12em;
          min-height: 0;
          overflow-x: visible;
          overflow-y: clip;
        }

        .cc-hero-work {
          grid-column: 2;
          grid-row: 1;
          align-self: end;
          flex: none;
        }

        .cc-hero-sub-slot {
          grid-column: 1;
          grid-row: 2;
          display: block;
          height: 1.12em;
          min-height: 0;
          margin-top: 0.12em;
          overflow: visible;
          clip-path: inset(0 -100vw 0 0);
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

        .cc-hero-sub-row {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          height: 1.12em;
          width: 100%;
        }

        .cc-hero-ghost-wrap {
          position: relative;
          display: block;
          width: max-content;
          height: 1.12em;
        }

        .cc-hero-ghost {
          display: block;
          visibility: hidden;
          white-space: nowrap;
          height: 1.12em;
        }

        .cc-hero-ghost-wrap .cc-hero-phrase {
          position: absolute;
          left: 0;
          top: 0;
          visibility: visible;
        }

        .cc-hero-static-pair {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: max-content;
        }

        .cc-hero-static-pair + .cc-hero-static-pair {
          margin-top: 0.4em;
        }

        .cc-hero-static-line {
          display: block;
          text-align: left;
          white-space: nowrap;
        }

        @media (min-width: 768px) {
          .cc-hero-heading {
            font-size: clamp(3.5rem, 10vw, 8rem);
            font-size: clamp(3.5rem, calc((100vw - 4rem) / 6.4), 8rem);
          }

          .cc-hero-static-pair + .cc-hero-static-pair {
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
            opacity: 1 !important;
            transform: none !important;
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
            <h1 className="cc-hero-heading font-display leading-[0.95] tracking-tight text-brand-dark">
              {prefersReducedMotion ? (
                <>
                  <span className="cc-hero-static-pair">
                    <span className="cc-hero-static-line">
                      <em className="cc-hero-static-lead">Bolder work</em>
                    </span>
                    <span className="cc-hero-static-line cc-hero-static-sub">in the world.</span>
                  </span>
                  <span className="cc-hero-static-pair">
                    <span className="cc-hero-static-line">
                      <em className="cc-hero-static-lead">Less work</em>
                    </span>
                    <span className="cc-hero-static-line cc-hero-static-sub">to put it there.</span>
                  </span>
                </>
              ) : (
                <>
                  <span className="cc-hero-sr">{HERO_COPY}</span>
                  <span className="cc-hero-lockup" aria-hidden="true">
                    <span className="cc-hero-line cc-hero-line-lead">
                      <MorphSlot from="Bolder" to="Less" y={morphY} align="end" italic />
                      <em className="cc-hero-work">&nbsp;work</em>
                    </span>
                    <SubMorphSlot
                      from="in the world."
                      to="to put it there."
                      fromGhost="Bolder"
                      toGhost="Less"
                      y={morphY}
                    />
                  </span>
                </>
              )}
            </h1>

            <motion.div
              className="cc-hero-subtitle flex min-h-0 justify-end"
              style={
                prefersReducedMotion
                  ? undefined
                  : { opacity: subtitleOpacity, y: subtitleY }
              }
            >
              <p className="max-w-2xl text-right text-xl leading-relaxed text-brand-dark">
                We help CMOs build a stronger marketing function with AI. Starting with one live campaign, we redesign how work happens — and leave your team better equipped to own and improve it.
              </p>
            </motion.div>
          </div>
        </div>
        {prefersReducedMotion ? null : <div className="cc-hero-scroll-room" aria-hidden="true" />}
      </section>
    </>
  )
}
