"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const SR_COPY = "Function-first. People-led. AI-propelled."

export function AnimatedTypeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Three stacked full lines in a one-line slot: 0% / -100% / -200%.
  const morphY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.34, 0.44, 1],
    ["0%", "0%", "-100%", "-100%", "-200%", "-200%"],
  )
  const bgOpacity = useTransform(scrollYProgress, [0.78, 1], [1, 0])

  const lockup = prefersReducedMotion ? (
    <p className="whitespace-nowrap text-center font-display text-[clamp(2rem,7.2vw,8.5rem)] font-bold leading-[1.08] tracking-tight text-brand-orange">
      AI-propelled.
    </p>
  ) : (
    <>
      <span className="cc-type-sr">{SR_COPY}</span>
      <span className="cc-type-lockup" aria-hidden="true">
        <span className="cc-type-slot">
          <motion.span className="cc-type-slot-inner" style={{ y: morphY }}>
            <span className="cc-type-phrase text-brand-pink">Function-first.</span>
            <span className="cc-type-phrase text-yellow-300">People-led.</span>
            <span className="cc-type-phrase text-brand-orange">AI-propelled.</span>
          </motion.span>
        </span>
      </span>
    </>
  )

  return (
    <div className="relative -mt-1">
      <style>{`
        .cc-type-sr {
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

        .cc-type-lockup {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: center;
          width: max-content;
          max-width: 100%;
          font-family: var(--font-bricolage), sans-serif;
        }

        .cc-type-slot {
          display: block;
          flex: none;
          height: 1.12em;
          min-width: 0;
          min-height: 0;
          overflow-x: visible;
          overflow-y: clip;
        }

        .cc-type-slot-inner {
          display: block;
          height: 100%;
          will-change: transform;
        }

        .cc-type-phrase {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 1.12em;
          white-space: nowrap;
        }

        @media (prefers-reduced-motion: reduce) {
          .cc-type-slot-inner {
            transform: none !important;
          }
        }
      `}</style>
      <section
        ref={sectionRef}
        className={`relative w-full ${prefersReducedMotion ? "h-screen" : "h-[300vh]"}`}
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { opacity: bgOpacity }}
          className="sticky top-0 h-screen w-full overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/bridge-aerial-bw.jpg"
              alt=""
              fill
              className="object-cover grayscale brightness-[0.4]"
              loading="lazy"
              quality={75}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="font-display text-[clamp(1.75rem,7.2vw,8.5rem)] font-bold leading-[1.08] tracking-tight">
              {lockup}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
