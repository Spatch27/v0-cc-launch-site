"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { textRollUp, textRollDown } from "@/lib/animations"
import { Section } from "@/components/section"
import RocketIllustration from "@/components/home/rocket-illustration"

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const textChild = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function MomentumSection() {
  const [isHovered, setIsHovered] = useState(false)
  const ref1 = useRef(null)
  const inView1 = useInView(ref1, { once: true, margin: "-80px" })

  return (
    <Section background="light" compact className="pt-12 md:pt-0">
      <div className="space-y-20">

        {/* How we work — Text Left, Image Right */}
        <div ref={ref1} className="grid items-center gap-4 lg:gap-12 lg:grid-cols-2 grid-cols-1">
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
              How we work.
            </motion.h2>
            <motion.p variants={textChild} className="max-w-3xl text-lg leading-relaxed text-brand-dark">
              Alongside your people, in focused six-week cycles – addressing how work actually flows across team, process, data and technology. Each cycle targets one problem area and creates a change you can both measure and feel.
            </motion.p>
            <motion.div variants={textChild}>
              <Link
                href="/approach"
                className="group inline-flex w-fit items-center gap-3 border-2 border-brand-dark bg-brand-light px-8 py-4 text-base font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-white"
                style={{ borderRadius: "4px" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative inline-block overflow-hidden">
                  <motion.span
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                    variants={textRollUp}
                    className="block"
                  >
                    Our Approach
                  </motion.span>
                  <motion.span
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                    variants={textRollDown}
                    className="absolute inset-0 block"
                  >
                    Our Approach
                  </motion.span>
                </span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center w-full h-auto overflow-hidden rounded-lg order-last lg:order-first min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={inView1 ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.97 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <RocketIllustration />
          </motion.div>
        </div>

      </div>
    </Section>
  )
}
