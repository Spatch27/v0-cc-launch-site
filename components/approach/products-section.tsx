"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

const products = [
  {
    name: "Ignition6\u2122",
    description:
      "We define your transformation story, map the blockers, identify your first 6 wins, secure your board-ready mandate.",
    duration: "6 weeks",
    price: "\u00a340K",
    priceNote: null,
    color: "border-brand-pink",
    accent: "bg-brand-pink",
  },
  {
    name: "Fly6\u2122",
    description:
      "We deliver 6 pilots, implement live ROI dashboards, embed governance routines, apply our \u2018Make It Fly\u2019 framework.",
    duration: "6 weeks",
    price: "\u00a360K",
    priceNote: "+ outcome bonus",
    color: "border-brand-orange",
    accent: "bg-brand-orange",
  },
  {
    name: "Flow6\u2122",
    description:
      "We build rhythm, deliver adoption across teams, embed governance, manage cadence and adaptation.",
    duration: "6-week rolling subscription",
    price: "\u00a310K/week",
    priceNote: null,
    color: "border-brand-yellow-deep",
    accent: "bg-brand-yellow-deep",
  },
]

export function ProductsSection() {
  return (
    <Section background="dark">
      <div className="mb-12 text-center">
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-pink"
        >
          Our products
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-balance font-display text-3xl font-bold text-brand-white md:text-5xl"
        >
          Three engagements, one goal
        </motion.h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {products.map((product, i) => (
          <motion.div
            key={product.name}
            variants={fadeInUp}
            custom={i}
            className={`flex flex-col rounded-xl border-t-4 bg-brand-white p-8 ${product.color}`}
          >
            <div className={`mb-4 inline-flex self-start rounded-full px-3 py-1 text-xs font-bold text-brand-dark ${product.accent}`}>
              {product.duration}
            </div>
            <h3 className="mb-4 font-display text-2xl font-bold text-brand-dark">
              {product.name}
            </h3>
            <p className="mb-8 flex-1 leading-relaxed text-brand-dark/70">
              {product.description}
            </p>
            <div className="mt-auto border-t border-brand-light pt-4">
              <span className="font-display text-3xl font-bold text-brand-dark">
                {product.price}
              </span>
              {product.priceNote && (
                <span className="ml-2 text-sm text-brand-dark/60">
                  {product.priceNote}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
