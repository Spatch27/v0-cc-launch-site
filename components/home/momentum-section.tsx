"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/section"
import PaperPlaneIllustration from "@/components/approach/paper-plane-illustration"
import AnimatedGrowthArrow from "@/components/illustrations/animated-growth-arrow"

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const textChild = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" } },
}

export function MomentumSection() {
  const ref1 = useRef(null)
  const inView1 = useInView(ref1, { once: true, margin: "-80px" })

  const ref2 = useRef(null)
  const inView2 = useInView(ref2, { once: true, margin: "-80px" })

  return (
    <>
      <style>{`
        .cc-cta-button {
          background-color: var(--brand-light);
          border: 2px solid var(--brand-dark);
          border-color: var(--brand-dark);
        }

        .cc-cta-label-track {
          display: flex;
          flex-direction: column;
          transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .cc-cta-label-copy {
          display: flex;
          height: 1.5rem;
          align-items: center;
          white-space: nowrap;
        }

        .cc-cta-button:hover {
          background-color: var(--brand-white);
        }

        .cc-cta-button:hover .cc-cta-label-track {
          transform: translateY(-1.5rem);
        }

        .cc-home-paired-modules {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        @media (prefers-reduced-motion: reduce) {
          .cc-cta-label-track {
            transition: none;
          }

          .cc-cta-button:hover .cc-cta-label-track {
            transform: none;
          }
        }
      `}</style>
      <Section background="light">
      <div className="cc-home-paired-modules">

        {/* Measurable cycles — Text Left, Image Right */}
        <div ref={ref2} className="grid items-center gap-4 lg:gap-12 lg:grid-cols-2">
          <motion.div
            className="space-y-6"
            variants={textContainer}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
          >
            <motion.h3
              variants={textChild}
              className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl"
            >
              How we work.
            </motion.h3>
            <motion.div variants={textChild} className="flex flex-col items-start gap-8">
              <p className="max-w-3xl text-lg leading-relaxed text-brand-dark">
                We start with one campaign, usually one you already know is harder than it should be. We look at how it runs today across Team, Process, Data and Tech. Then we rebuild it with your team, using AI where it makes the result better, running it live against the old version. Six weeks later you have a better campaign that runs faster, with the numbers to prove it.
              </p>
              <Link
                href="/approach"
                className="cc-cta-button group inline-flex w-fit items-center gap-3 rounded-lg px-8 py-4 text-base font-semibold text-brand-dark transition-all duration-300"
                style={{ borderRadius: "4px", border: "2px solid var(--brand-dark)" }}
              >
                <span className="h-6 overflow-hidden">
                  <span className="cc-cta-label-track">
                    <span className="cc-cta-label-copy">Our approach</span>
                    <span className="cc-cta-label-copy" aria-hidden="true">Our approach</span>
                  </span>
                </span>
                <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center w-full h-auto overflow-hidden rounded-lg min-h-[300px] md:min-h-[400px] lg:min-h-[600px]"
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={inView2 ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.97 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <PaperPlaneIllustration />
          </motion.div>
        </div>

        {/* Function-first — Text Right, Image Left */}
        <div ref={ref1} className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-12">
          <motion.div
            className="space-y-6"
            variants={textContainer}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
          >
            <motion.h2
              variants={textChild}
              className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl"
            >
              Not tech-first. Not people-first. <em>Function-first</em>.
            </motion.h2>
            <motion.div variants={textChild} className="max-w-3xl space-y-4 text-lg leading-relaxed text-brand-dark">
              <p>
                We start with what marketing needs to deliver for the business. Then we examine the work, the decisions, and the connections. Get that right and the roles and the tech follow.
              </p>
              <p>
                Give the time you save a purpose. Understand customers better. Improve work that&apos;s currently rushed. Add more opportunity or eliminate cost. Decide what matters, then build around it.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-last flex h-auto min-h-[300px] w-full items-center justify-center overflow-hidden rounded-lg md:min-h-[400px] lg:order-first lg:min-h-[500px]"
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={inView1 ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.97 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <AnimatedGrowthArrow />
          </motion.div>
        </div>

      </div>
    </Section>
    </>
  )
}
