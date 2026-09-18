"use client"

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useLayoutEffect, useRef, useState } from "react"

const HERO_COPY = "Bolder work in the world. Less work to put it there."

/** Scroll progress (section start→end vs viewport start) at which the morph is fully settled. */
const MORPH_PROGRESS_END = 0.35

function MorphSlot({
  from,
  to,
  y,
  italic = false,
  width,
}: {
  from: string
  to: string
  y: MotionValue<string>
  italic?: boolean
  width?: MotionValue<number>
}) {
  const Phrase = italic ? "em" : "span"
  return (
    <motion.span className="cc-hero-slot" style={width ? { width } : undefined}>
      <motion.span className="cc-hero-slot-inner" style={{ y }}>
        <Phrase className="cc-hero-phrase">{from}</Phrase>
        <Phrase className="cc-hero-phrase">{to}</Phrase>
      </motion.span>
    </motion.span>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bolderSizerRef = useRef<HTMLElement>(null)
  const lessSizerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [wordWidths, setWordWidths] = useState({ bolder: 0, less: 0 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Slot inner is one line tall; -100% brings the replacement phrase into view.
  // Home nav overlay is tied to pin release (scroll-room), not this morph threshold.
  const morphY = useTransform(scrollYProgress, [0, MORPH_PROGRESS_END], ["0%", "-100%"])
  const subtitleOpacity = useTransform(scrollYProgress, [0, MORPH_PROGRESS_END], [0, 1])
  const subtitleY = useTransform(scrollYProgress, [0, MORPH_PROGRESS_END], [20, 0])
  const leadSlotWidth = useTransform(
    scrollYProgress,
    [0, MORPH_PROGRESS_END],
    [wordWidths.bolder, wordWidths.less]
  )

  useLayoutEffect(() => {
    if (prefersReducedMotion) return

    const measure = () => {
      const bolder = bolderSizerRef.current?.getBoundingClientRect().width ?? 0
      const less = lessSizerRef.current?.getBoundingClientRect().width ?? 0
      if (bolder <= 0 || less <= 0) return
      setWordWidths((prev) =>
        Math.abs(prev.bolder - bolder) < 0.25 && Math.abs(prev.less - less) < 0.25
          ? prev
          : { bolder, less }
      )
    }

    let cancelled = false
    const run = () => {
      if (cancelled) return
      measure()
    }

    void document.fonts.ready.then(run)
    run()

    const ro = new ResizeObserver(run)
    if (bolderSizerRef.current) ro.observe(bolderSizerRef.current)
    if (lessSizerRef.current) ro.observe(lessSizerRef.current)
    window.addEventListener("resize", run)

    return () => {
      cancelled = true
      ro.disconnect()
      window.removeEventListener("resize", run)
    }
  }, [prefersReducedMotion])

  return (
    <>
      <style>{`
        .cc-hero-pin {
          min-height: 100vh;
          min-height: 100svh;
        }

        .cc-hero-scroll-room {
          height: 140vh;
          height: 140svh;
          pointer-events: none;
        }

        .cc-hero-heading {
          flex-shrink: 0;
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif;
          font-size: 2.25rem;
          font-size: clamp(1.75rem, 11vw, 3.75rem);
          font-size: clamp(1.75rem, calc((100vw - 3.5rem) / 6.5), 3.75rem);
          font-weight: 600;
        }

        .cc-hero-heading em,
        .cc-hero-heading .cc-hero-phrase,
        .cc-hero-heading .cc-hero-work,
        .cc-hero-heading .cc-hero-sizer,
        .cc-hero-heading .cc-hero-static-lead,
        .cc-hero-heading .cc-hero-static-sub {
          font-family: inherit;
          font-weight: 600;
        }

        .cc-hero-line-lead,
        .cc-hero-line-lead em,
        .cc-hero-work,
        .cc-hero-sizer,
        .cc-hero-static-lead {
          font-style: italic;
        }

        .cc-hero-line-sub,
        .cc-hero-line-sub .cc-hero-phrase,
        .cc-hero-static-sub {
          font-style: normal;
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

        .cc-hero-sizers {
          position: absolute;
          left: 0;
          top: 0;
          display: flex;
          visibility: hidden;
          pointer-events: none;
          white-space: nowrap;
          font-style: italic;
          font-weight: 600;
        }

        .cc-hero-sizer {
          display: inline-block;
        }

        .cc-hero-lockup {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: max-content;
          text-align: left;
        }

        .cc-hero-line {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: flex-start;
          width: max-content;
          text-align: left;
        }

        .cc-hero-slot {
          display: block;
          flex: none;
          height: 1.05em;
          min-width: 0;
          min-height: 0;
          overflow-x: visible;
          overflow-y: clip;
          text-align: left;
        }

        .cc-hero-slot-inner {
          display: block;
          height: 100%;
          will-change: transform;
        }

        .cc-hero-phrase,
        .cc-hero-work {
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          height: 1.05em;
          white-space: nowrap;
          text-align: left;
        }

        .cc-hero-work {
          flex: none;
          padding-inline-start: 0.22em;
        }

        .cc-hero-line-sub {
          margin-top: 0;
        }

        .cc-hero-static-pair {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: max-content;
          line-height: 0.9;
        }

        .cc-hero-static-pair + .cc-hero-static-pair {
          margin-top: 0.28em;
        }

        .cc-hero-static-line {
          display: block;
          text-align: left;
          white-space: nowrap;
          line-height: 0.9;
        }

        @media (min-width: 768px) {
          .cc-hero-heading {
            font-size: clamp(3.5rem, 10vw, 8rem);
            font-size: clamp(3.5rem, calc((100vw - 4rem) / 6.5), 8rem);
          }

          .cc-hero-static-pair + .cc-hero-static-pair {
            margin-top: 0.2em;
          }
        }

        @media (min-width: 1024px) {
          .cc-hero-heading {
            font-size: clamp(3.5rem, calc((100vw - 7rem) / 6.5), 8rem);
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
            <h1 className="cc-hero-heading font-display leading-[0.9] tracking-tight text-brand-dark">
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
                  <span className="cc-hero-sizers" aria-hidden="true">
                    <em ref={bolderSizerRef} className="cc-hero-sizer">
                      Bolder
                    </em>
                    <em ref={lessSizerRef} className="cc-hero-sizer">
                      Less
                    </em>
                  </span>
                  <span className="cc-hero-lockup" aria-hidden="true">
                    <span className="cc-hero-line cc-hero-line-lead">
                      <MorphSlot
                        from="Bolder"
                        to="Less"
                        y={morphY}
                        italic
                        width={wordWidths.bolder > 0 ? leadSlotWidth : undefined}
                      />
                      <em className="cc-hero-work">work</em>
                    </span>
                    <span className="cc-hero-line cc-hero-line-sub">
                      <MorphSlot from="in the world." to="to put it there." y={morphY} />
                    </span>
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
