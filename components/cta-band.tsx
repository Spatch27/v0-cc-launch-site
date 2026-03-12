"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, textRollUp, textRollDown } from "@/lib/animations"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

interface CtaBandProps {
  heading: string
  description?: string
  body?: string[]
  ctaLabel?: string
  ctaHref?: string
  background?: "pink" | "orange" | "yellow-light" | "yellow-deep" | "dark"
}

const bgMap = {
  pink: "bg-brand-yellow-light",
  orange: "bg-brand-yellow-light",
  "yellow-light": "bg-brand-yellow-light",
  "yellow-deep": "bg-brand-yellow-light",
  dark: "bg-brand-yellow-light",
}

const textMap = {
  pink: "text-brand-dark",
  orange: "text-brand-dark",
  "yellow-light": "text-brand-dark",
  "yellow-deep": "text-brand-dark",
  dark: "text-brand-dark",
}

const btnMap = {
  pink: "border-2 border-brand-dark bg-brand-light text-brand-dark hover:bg-brand-white",
  orange: "border-2 border-brand-dark bg-brand-light text-brand-dark hover:bg-brand-white",
  "yellow-light": "border-2 border-brand-dark bg-brand-light text-brand-dark hover:bg-brand-white",
  "yellow-deep": "border-2 border-brand-dark bg-brand-light text-brand-dark hover:bg-brand-white",
  dark: "border-2 border-brand-dark bg-brand-light text-brand-dark hover:bg-brand-white",
}

export function CtaBand({
  heading,
  description,
  body,
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
  background = "yellow-light",
}: CtaBandProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className={`${bgMap[background]} ${textMap[background]} px-6 py-24 lg:px-12 lg:py-32`}>
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 lg:items-start lg:self-start">
          {/* Left column: heading + CTA anchored to top */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col items-start justify-start gap-8 lg:-mt-32"
          >
            <h2 className="text-balance font-display text-4xl font-bold leading-snug md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <Link
              href={ctaHref}
              className={`group inline-flex w-fit items-center gap-3 px-8 py-4 text-base font-semibold transition-all duration-300 ${btnMap[background]}`}
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
                  {ctaLabel}
                </motion.span>
                <motion.span
                  initial="initial"
                  animate={isHovered ? "hover" : "initial"}
                  variants={textRollDown}
                  className="absolute inset-0 block"
                >
                  {ctaLabel}
                </motion.span>
              </span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {/* Right column: supporting copy anchored to bottom */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col items-end justify-end text-right lg:pt-32"
          >
            {description && (
              <p className="text-lg leading-relaxed opacity-70">
                {description}
              </p>
            )}
            {body && body.length > 0 && (
              <div className="space-y-4">
                {body.map((para, i) => {
                  const isFinalLine = para.startsWith("Yours to keep");
                  return (
                    <p 
                      key={i} 
                      className={`text-lg leading-relaxed ${isFinalLine ? "font-bold opacity-100" : "opacity-70"}`}
                    >
                      {para}
                    </p>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
