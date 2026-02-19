"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { ArrowRight } from "lucide-react"

const sampleInsights = [
  {
    title: "Removing operational drag from marketing teams",
    category: "What we\u2019re creating",
    readTime: "8 min read",
    slug: "removing-operational-drag",
  },
  {
    title: "Why marketing operations is the new competitive advantage",
    category: "What we\u2019re creating",
    readTime: "6 min read",
    slug: "marketing-operations-competitive-advantage",
  },
  {
    title: "The embedded consultancy model explained",
    category: "What we\u2019re creating",
    readTime: "10 min read",
    slug: "embedded-consultancy-model",
  },
]

export function InsightsPreviewSection() {
  return (
    <Section background="white">
      <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
          <div className="lg:w-auto">
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
              Insights
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            Latest thinking.
          </h2>
        </div>
        <Link
          href="/insights"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-pink"
        >
          View all
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-px overflow-hidden bg-brand-dark/10 md:grid-cols-3">
        {sampleInsights.map((insight, i) => (
          <Link key={insight.slug} href={`/insights/${insight.slug}`}>
          <motion.article
            variants={fadeInUp}
            custom={i}
            className="group flex flex-col bg-brand-light p-8 transition-colors duration-300 hover:bg-brand-dark lg:p-10"
          >
            <span className="mb-4 text-xs font-semibold tracking-[0.15em] uppercase text-brand-orange transition-colors duration-300 group-hover:text-brand-orange">
              {insight.category}
            </span>
            <h3 className="mb-6 flex-1 font-display text-xl font-bold leading-snug text-brand-dark transition-colors duration-300 group-hover:text-brand-white lg:text-2xl">
              {insight.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-dark/40 transition-colors duration-300 group-hover:text-brand-white/40">
                {insight.readTime}
              </span>
              <ArrowRight
                size={16}
                className="text-brand-dark/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-pink"
              />
            </div>
          </motion.article>
          </Link>
        ))}
      </div>
    </Section>
  )
}
