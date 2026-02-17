"use client"

import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import { cn } from "@/lib/utils"

type BackgroundStyle =
  | "light"
  | "dark"
  | "white"
  | "pink"
  | "orange"
  | "yellow-light"
  | "yellow-deep"

const bgClasses: Record<BackgroundStyle, string> = {
  light: "bg-brand-light text-brand-dark",
  dark: "bg-brand-dark text-brand-white",
  white: "bg-brand-white text-brand-dark",
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
  narrow?: boolean
}

export function Section({
  children,
  background = "light",
  className,
  id,
  noPadding = false,
  narrow = false,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className={cn(
        bgClasses[background],
        !noPadding && "px-6 py-24 lg:px-12 lg:py-32",
        className
      )}
    >
      <div className={cn("mx-auto", narrow ? "max-w-4xl" : "max-w-[1400px]")}>
        {children}
      </div>
    </motion.section>
  )
}
