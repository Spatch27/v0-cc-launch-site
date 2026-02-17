"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const products = [
  {
    name: "Ignition6\u2122",
    description:
      "We define your transformation story, map the blockers, identify your first 6 wins, secure your board-ready mandate.",
    duration: "6 weeks",
    price: "\u00a340K",
    priceNote: null,
    accentColor: "#fc66a7",
  },
  {
    name: "Fly6\u2122",
    description:
      "We deliver 6 pilots, implement live ROI dashboards, embed governance routines, apply our \u2018Make It Fly\u2019 framework.",
    duration: "6 weeks",
    price: "\u00a360K",
    priceNote: "+ outcome bonus",
    accentColor: "#ff8600",
  },
  {
    name: "Flow6\u2122",
    description:
      "We build rhythm, deliver adoption across teams, embed governance, manage cadence and adaptation.",
    duration: "6-week rolling",
    price: "\u00a310K/week",
    priceNote: null,
    accentColor: "#ffd100",
  },
]

export function ProductsSection() {
  return (
    <Section background="dark">
      <div className="mb-16 flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
        <motion.div variants={fadeInUp} className="lg:w-1/4">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
            Our products
          </span>
        </motion.div>
        <motion.div variants={fadeInUp} className="lg:w-3/4">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-white md:text-5xl">
            Three engagements, one goal.
          </h2>
        </motion.div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {products.map((product, i) => (
          <motion.div
            key={product.name}
            variants={fadeInUp}
            custom={i}
            className="group flex flex-col rounded-2xl bg-brand-white/5 p-10 backdrop-blur-sm transition-colors duration-500 hover:bg-brand-white/10"
          >
            {/* Accent bar */}
            <div
              className="mb-8 h-1 w-12 rounded-full"
              style={{ backgroundColor: product.accentColor }}
            />

            {/* Duration badge */}
            <span className="mb-4 text-xs font-semibold tracking-[0.15em] uppercase text-brand-white/40">
              {product.duration}
            </span>

            <h3 className="mb-4 font-display text-2xl font-bold text-brand-white">
              {product.name}
            </h3>
            <p className="mb-10 flex-1 leading-relaxed text-brand-white/50">
              {product.description}
            </p>

            {/* Price */}
            <div className="border-t border-brand-white/10 pt-6">
              <span className="font-display text-3xl font-bold text-brand-white">
                {product.price}
              </span>
              {product.priceNote && (
                <span className="ml-2 text-sm text-brand-white/40">
                  {product.priceNote}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div variants={fadeInUp} className="mt-16 flex justify-center">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 text-sm font-semibold text-brand-white/60 transition-colors hover:text-brand-pink"
        >
          Discuss which engagement is right for you
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </Section>
  )
}
