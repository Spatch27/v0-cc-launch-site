"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { ArrowRight } from "lucide-react"

interface CtaBandProps {
  heading: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  background?: "pink" | "orange" | "yellow-deep" | "dark"
}

const bgMap = {
  pink: "bg-brand-pink",
  orange: "bg-brand-orange",
  "yellow-deep": "bg-brand-yellow-deep",
  dark: "bg-brand-dark",
}

const textMap = {
  pink: "text-brand-dark",
  orange: "text-brand-dark",
  "yellow-deep": "text-brand-dark",
  dark: "text-brand-white",
}

const btnMap = {
  pink: "bg-brand-light text-brand-dark hover:bg-brand-white",
  orange: "bg-brand-light text-brand-dark hover:bg-brand-white",
  "yellow-deep": "bg-brand-light text-brand-dark hover:bg-brand-white",
  dark: "bg-brand-light text-brand-dark hover:bg-brand-white",
}

export function CtaBand({
  heading,
  description,
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
  background = "pink",
}: CtaBandProps) {
  return (
    <section className={`${bgMap[background]} ${textMap[background]} px-6 py-24 lg:px-12 lg:py-32`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUp}
        className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-2xl">
          <h2 className="text-balance font-display text-4xl font-bold leading-snug md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          {description && (
            <p className="mt-4 max-w-lg text-lg leading-relaxed opacity-70">
              {description}
            </p>
          )}
        </div>
        <Link
          href={ctaHref}
          className={`group inline-flex items-center gap-3 px-8 py-4 text-base font-semibold transition-all duration-300 ${btnMap[background]}`}
        >
          {ctaLabel}
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </section>
  )
}
