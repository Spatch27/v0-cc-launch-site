"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <>
      <style>{`
        .cc-hero-heading-line + .cc-hero-heading-line {
          margin-top: 0.4em;
        }

        .cc-hero-break {
          display: block;
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
          .cc-hero-heading-line + .cc-hero-heading-line {
            margin-top: 0.28em;
          }

          .cc-hero-break {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cc-hero-subtitle {
            animation: none;
          }

          .cc-home-hero {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
      <motion.section
        ref={sectionRef}
        style={prefersReducedMotion ? undefined : { scale, opacity }}
        className="cc-home-hero relative min-h-svh bg-brand-orange px-6 lg:h-screen lg:px-12"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-20 pt-32 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] md:gap-24 md:pt-40 md:pb-20 lg:h-full lg:gap-32 lg:pt-44 lg:pb-20">
          <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-brand-dark">
            <span className="cc-hero-heading-line block">
              Bolder work<br className="cc-hero-break" /> in the world.
            </span>
            <span className="cc-hero-heading-line block">
              Less work<br className="cc-hero-break" /> to put it there.
            </span>
          </h1>

          <div className="cc-hero-subtitle flex justify-end">
            <p className="max-w-2xl text-right text-xl leading-relaxed text-brand-dark">
              We help CMOs build a stronger marketing function with AI. Starting with one live campaign, we redesign how work happens — and leave your team better equipped to own and improve it.
            </p>
          </div>
        </div>
      </motion.section>
    </>
  )
}
