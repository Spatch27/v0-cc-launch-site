"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { textRollUp, textRollDown } from "@/lib/animations"

export function BackToInsightsCta() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href="/insights"
      className="group inline-flex items-center gap-3 border-2 border-brand-dark/30 bg-brand-light px-8 py-4 text-base font-semibold text-brand-dark transition-all duration-300 hover:border-brand-dark hover:bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ArrowLeft
        size={18}
        className="transition-transform duration-300 group-hover:-translate-x-1"
      />
      <span className="relative inline-block overflow-hidden">
        <motion.span
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          variants={textRollUp}
          className="block"
        >
          Back to all insights
        </motion.span>
        <motion.span
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          variants={textRollDown}
          className="absolute inset-0 block"
        >
          Back to all insights
        </motion.span>
      </span>
    </Link>
  )
}
