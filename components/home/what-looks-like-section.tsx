"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Plus, X } from "lucide-react"
import { Section } from "@/components/section"
import { textContainer, textChild } from "@/lib/animations"

const items = [
  {
    heading: "Board-level confidence",
    body: "Commercial belief, investment and support.",
  },
  {
    heading: "Your team at their best",
    body: "Capacity and energy going into the work, not holding things together.",
  },
  {
    heading: "Work that moves",
    body: "Faster cycles, fewer bottlenecks, less reliance on heroics.",
  },
  {
    heading: "Data-backed decisions",
    body: "The ability to see what's working and prove results.",
  },
  {
    heading: "AI that delivers",
    body: "From scattered use to governed, working capability.",
  },
  {
    heading: "A tech stack that earns its keep",
    body: "Paying for what you actually use and need.",
  },
  {
    heading: "Partners who add value",
    body: "Better alignment with agencies, vendors and specialists.",
  },
]

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  inView,
}: {
  item: (typeof items)[0]
  index: number
  isOpen: boolean
  onToggle: () => void
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      className="border-b border-brand-dark/20 last:border-b-0"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-brand-pink focus-visible:outline-none"
      >
        <span className="font-display text-xl font-bold leading-snug text-brand-dark transition-colors duration-200 group-hover:text-brand-pink md:text-2xl">
          {item.heading}
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-brand-dark transition-all duration-200 group-hover:border-brand-pink group-hover:text-brand-pink">
          {isOpen ? <X size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 text-base leading-relaxed text-brand-dark/80 md:text-lg">
              {item.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function WhatLooksLikeSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <Section background="white">
      <div ref={ref} className="mx-auto max-w-3xl">
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-10"
        >
          <motion.h2
            variants={textChild}
            className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl"
          >
            What it looks like.
          </motion.h2>
        </motion.div>

        <div>
          {items.map((item, i) => (
            <AccordionItem
              key={item.heading}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
