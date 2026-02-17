"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { ArrowRight } from "lucide-react"

interface CtaBandProps {
  heading: string
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
  pink: "bg-brand-dark text-brand-white hover:bg-brand-dark/90",
  orange: "bg-brand-dark text-brand-white hover:bg-brand-dark/90",
  "yellow-deep": "bg-brand-dark text-brand-white hover:bg-brand-dark/90",
  dark: "bg-brand-pink text-brand-dark hover:bg-brand-pink/90",
}

export function CtaBand({
  heading,
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
  background = "pink",
}: CtaBandProps) {
  return (
    <section className={`${bgMap[background]} ${textMap[background]} px-6 py-20 lg:px-8 lg:py-24`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center"
      >
        <h2 className="text-balance font-display text-3xl font-bold md:text-5xl">
          {heading}
        </h2>
        <Link
          href={ctaHref}
          className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all ${btnMap[background]}`}
        >
          {ctaLabel}
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    </section>
  )
}
