"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"

export function HeroPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <>
      <style>{`
        .cc-approach-support {
          max-width: 42rem;
          text-wrap: balance;
        }

        .cc-approach-support-lead::after {
          content: " ";
        }

        @media (min-width: 1024px) {
          .cc-approach-support {
            width: max-content;
            max-width: 100%;
          }

          .cc-approach-support-lead {
            display: block;
          }

          .cc-approach-support-lead::after {
            content: none;
          }

          .cc-approach-support-rest {
            display: block;
            max-width: 51ch;
            margin-left: auto;
            text-wrap: wrap;
          }
        }
      `}</style>
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="relative min-h-svh lg:h-screen bg-brand-pink px-6 lg:px-12"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col pt-20 lg:pt-28 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] lg:pb-16 gap-12 md:gap-24 lg:gap-32 lg:h-full lg:justify-between">
        {/* Main headline */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-10 lg:mt-20"
        >
          <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-brand-dark text-balance">
            Pick one thing. <br />
            Start there.
          </h1>
        </motion.div>

        {/* Supporting copy */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="self-end"
        >
          <div className="space-y-4 text-right text-lg leading-relaxed text-brand-dark md:text-xl">
            <p className="cc-approach-support">
              <span className="cc-approach-support-lead">We work with CMOs and their teams to redesign how marketing works.</span>
              <span className="cc-approach-support-rest">Every six-week cycle rebuilds one thing, proves the impact, and provides the confidence to go further.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
    </>
  )
}
