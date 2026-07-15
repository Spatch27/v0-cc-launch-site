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

        .cc-home-paired-modules > :not([hidden]) ~ :not([hidden]) {
          margin-top: 3rem;
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
      <Section background="light" compact className="pt-12 md:pt-0">
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
                Each six-week cycle tackles one pressing problem across Team, Process, Data and Tech - starting with the one that's costing you most right now. Every cycle ends with results you can put in front of the board: greater effectiveness, driven by greater efficiency, that your team can feel day to day.
              </p>
              <Link
                href="/approach"
                className="cc-cta-button group inline-flex w-fit items-center gap-3 rounded-lg border-2 border-brand-dark px-8 py-4 text-base font-semibold text-brand-dark transition-all duration-300"
                style={{ borderRadius: "4px" }}
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

        {/* People-first operating model — Text Right, Image Left */}
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
              People are the difference.
            </motion.h2>
            <motion.div variants={textChild} className="max-w-3xl space-y-4 text-lg leading-relaxed text-brand-dark">
              <p>
                Transformation doesn&apos;t fail because the tech is wrong. It fails because teams reject it. Implementation isn&apos;t the endgame, adoption is.
              </p>
              <p>
                We start with a belief that tech solutions don&apos;t lead decision-making - people own the thinking. We strip away layers of tech that result in more workaround than work.
              </p>
              <p>
                Similarly, AI raises the stakes but judgement still sits with people. What to stop, what to change and what to defend.
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
