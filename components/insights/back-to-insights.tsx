"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { textRollUp, textRollDown } from "@/lib/animations"

const label = "Back to Insights"

export function BackToInsights() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href="/insights"
      className="group inline-flex items-center gap-3 text-sm font-medium text-brand-dark/60 transition-colors hover:text-brand-dark"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ArrowLeft
        size={16}
        className="transition-transform duration-300 group-hover:-translate-x-1"
      />
      <span className="relative inline-block overflow-hidden">
        <motion.span
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          variants={textRollUp}
          className="block"
        >
          {label}
        </motion.span>
        <motion.span
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          variants={textRollDown}
          className="absolute inset-0 block"
        >
          {label}
        </motion.span>
      </span>
    </Link>
  )
}
