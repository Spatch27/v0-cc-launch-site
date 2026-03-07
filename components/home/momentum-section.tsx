"use client"

import Image from "next/image"
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { Section } from "@/components/section"

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const textChild = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Track scroll progress of this specific element against the viewport
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  })

  // Smooth spring on top of the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  // Map 0→1 progress to -60px→60px — wrapper is 20% taller so edges never show
  const y = useTransform(smoothProgress, [0, 1], [-60, 60])

  return (
    // Outer clip — fixed height, hides overflow from the parallax shift
    <div ref={wrapperRef} className="relative h-96 overflow-hidden rounded-lg">
      {/* Inner wrapper: 20% taller, centred, shifts on scroll */}
      <motion.div
        style={{ y }}
        className="absolute left-0 right-0"
        // Start 10% above and extend 10% below so there's always room to shift
        initial={{ top: "-10%", bottom: "-10%" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </motion.div>
    </div>
  )
}

export function MomentumSection() {
  const ref1 = useRef(null)
  const inView1 = useInView(ref1, { once: true, margin: "-80px" })

  const ref2 = useRef(null)
  const inView2 = useInView(ref2, { once: true, margin: "-80px" })

  return (
    <Section background="light">
      <div className="space-y-20">

        {/* How we work — Text Left, Image Right */}
        <div ref={ref1} className="grid items-center gap-12 lg:grid-cols-2">
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
            <motion.p variants={textChild} className="max-w-3xl text-lg leading-relaxed text-brand-dark/70">
              We redesign workflows, simplify stacks, and get AI agents working inside your team. We embed inside the marketing function, working alongside your team in focused six-week cycles - redesigning how work actually flows across people, process and technology. Measurable progress, not slideware.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ParallaxImage src="/images/how-we-work.jpg" alt="How we work - team collaboration" />
          </motion.div>
        </div>

        {/* Systems launch agents — Image Left, Text Right */}
        <div ref={ref2} className="grid items-center gap-12 border-t border-brand-dark/10 pt-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ParallaxImage src="/images/systems-launch-agents.jpg" alt="Systems launch agents - AI integration" />
          </motion.div>

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
              Systems launch agents.
            </motion.h3>
            <motion.div variants={textChild} className="space-y-4">
              <p className="max-w-3xl text-lg leading-relaxed text-brand-dark/70">
                AI hasn&apos;t simplified things - it&apos;s added a new layer of complexity to systems that were already struggling. New tools arrive faster than teams can absorb them. Vendors promise efficiency - but the reality is more platforms, more decisions, more noise.
              </p>
              <p className="max-w-3xl text-lg font-semibold leading-relaxed text-brand-dark">
                AI only rewards the teams that are ready for it.
              </p>
              <p className="max-w-3xl text-lg leading-relaxed text-brand-dark/70">
                Workflows, data, and governance need to be redesigned. That&apos;s the gap we help you close. We get your system ready for AI - and then we help you deploy agents as working tools, not demo-day theatre.
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </Section>
  )
}
