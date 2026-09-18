"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"

const SR_COPY = "Not tech-first. Not people-first. Function-first."

export function AnimatedTypeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  useEffect(() => {
    const handleScroll = () => {
      setImageLoaded(true)
    }

    window.addEventListener("scroll", handleScroll, { passive: true, once: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Three stacked prefixes in a one-line slot: 0% / -100% / -200%.
  const morphY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.34, 0.44, 1],
    ["0%", "0%", "-100%", "-100%", "-200%", "-200%"],
  )
  const suffixPinkOpacity = useTransform(scrollYProgress, [0.34, 0.44], [1, 0])
  const suffixYellowOpacity = useTransform(scrollYProgress, [0.34, 0.44], [0, 1])
  const bgOpacity = useTransform(scrollYProgress, [0.78, 1], [1, 0])

  const lockup = prefersReducedMotion ? (
    <p className="whitespace-nowrap text-center font-display text-[clamp(2rem,7.2vw,8.5rem)] font-bold leading-[1.08] tracking-tight text-yellow-300">
      Function-first.
    </p>
  ) : (
    <>
      <span className="cc-type-sr">{SR_COPY}</span>
      <span className="cc-type-lockup" aria-hidden="true">
        <span className="cc-type-slot">
          <motion.span className="cc-type-slot-inner" style={{ y: morphY }}>
            <span className="cc-type-phrase text-brand-pink">Not tech</span>
            <span className="cc-type-phrase text-brand-pink">Not people</span>
            <span className="cc-type-phrase text-yellow-300">Function</span>
          </motion.span>
        </span>
        <span className="cc-type-suffix">
          <motion.span className="text-brand-pink" style={{ opacity: suffixPinkOpacity }}>
            -first.
          </motion.span>
          <motion.span className="text-yellow-300" style={{ opacity: suffixYellowOpacity }}>
            -first.
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
          align-items: baseline;
          width: max-content;
          max-width: 100%;
          font-family: var(--font-bricolage), var(--font-display), sans-serif;
        }

        .cc-type-slot {
          display: block;
          height: 1.12em;
          overflow: hidden;
          overflow: clip;
        }

        .cc-type-slot-inner {
          display: block;
          height: 100%;
          will-change: transform;
        }

        .cc-type-phrase {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          height: 1.12em;
          white-space: nowrap;
        }

        .cc-type-suffix {
          display: grid;
          flex: none;
        }

        .cc-type-suffix > * {
          grid-area: 1 / 1;
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
        className={`relative w-full ${prefersReducedMotion ? "h-screen" : "h-[280vh]"}`}
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { opacity: bgOpacity }}
          className="sticky top-0 h-screen w-full overflow-hidden"
        >
          <div className="absolute inset-0">
            {imageLoaded && (
              <Image
                src="/images/bridge-aerial-bw.jpg"
                alt=""
                fill
                className="object-cover grayscale brightness-[0.4]"
                loading="lazy"
                quality={75}
                sizes="100vw"
              />
            )}
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
