"use client"

import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import { cn } from "@/lib/utils"

type BackgroundStyle = "white" | "dark" | "light" | "pink" | "orange" | "yellow-light" | "yellow-deep"

const bgClasses: Record<BackgroundStyle, string> = {
  white: "bg-brand-white text-brand-dark",
  dark: "bg-brand-dark text-brand-white",
  light: "bg-brand-light text-brand-dark",
  pink: "bg-brand-pink text-brand-dark",
  orange: "bg-brand-orange text-brand-dark",
  "yellow-light": "bg-brand-yellow-light text-brand-dark",
  "yellow-deep": "bg-brand-yellow-deep text-brand-dark",
}

interface SectionProps {
  children: React.ReactNode
  background?: BackgroundStyle
  className?: string
  id?: string
  noPadding?: boolean
}

export function Section({
  children,
  background = "white",
  className,
  id,
  noPadding = false,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className={cn(
        bgClasses[background],
        !noPadding && "px-6 py-20 lg:px-8 lg:py-28",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </motion.section>
  )
}
