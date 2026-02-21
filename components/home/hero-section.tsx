"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { textRollUp, textRollDown } from "@/lib/animations"

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative min-h-screen bg-brand-orange px-6 lg:px-12">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center pb-16 pt-24 lg:pt-28">
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl font-display text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.95] tracking-tight text-brand-dark"
        >
          Freedom
          <br />
          from <em>drag</em>.
        </motion.h1>

        {/* Subtitle copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 space-y-6"
        >
          <p className="max-w-3xl text-lg leading-relaxed text-brand-dark/70">
            You hired brilliant marketers. And then they got buried. The workflows don&apos;t match how people actually work. The platforms generate data nobody trusts. The processes implemented last year are routinely worked around. It&apos;s the story of many marketing teams. Frustrated. Stretched. Moving, but not fast enough.
          </p>
          <p className="max-w-3xl text-lg leading-relaxed text-brand-dark/70">
            That&apos;s operational drag. And it&apos;s quietly killing your momentum.{" "}
            <span className="font-semibold text-brand-dark">
              We are the consultancy for CMOs who want their marketing to move faster.
            </span>
          </p>
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12"
        >
          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-3 border-2 border-brand-dark bg-brand-light px-8 py-4 text-base font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-white"
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
                Talk to us
              </motion.span>
              <motion.span
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                variants={textRollDown}
                className="absolute inset-0 block"
              >
                Talk to us
              </motion.span>
            </span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
