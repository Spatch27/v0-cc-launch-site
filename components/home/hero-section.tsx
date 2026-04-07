"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  // Defer scroll-based animations until after initial paint
  useEffect(() => {
    // Use requestIdleCallback to defer non-critical work
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(() => setMounted(true))
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => setMounted(true), 100)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <motion.section
      ref={sectionRef}
      style={mounted ? { scale, opacity } : undefined}
      className="relative min-h-svh lg:h-screen bg-brand-orange px-6 lg:px-12"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col pt-20 lg:pt-28 pb-24 lg:pb-16 gap-52 lg:gap-32 lg:h-full lg:justify-between">
        {/* Main headline - CSS animation for initial load, no Framer delay */}
        <h1
          className="mt-20 max-w-5xl font-display text-6xl md:text-7xl lg:text-9xl font-bold leading-[0.95] tracking-tight text-brand-dark animate-fade-in-up"
        >
          Freedom
          <br />
          from <em>drag</em>.
        </h1>

        {/* Subtitle - CSS animation with staggered delay */}
        <div
          className="flex justify-end animate-fade-in-up animation-delay-200"
        >
          <p className="max-w-[28rem] text-xl font-normal lg:font-bold leading-relaxed text-brand-dark text-right">
            We are the consultancy for CMOs who want their marketing to move <em>faster</em>.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
