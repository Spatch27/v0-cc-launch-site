"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { ArrowRight } from "lucide-react"

const sampleInsights = [
  {
    title: "Your operating model is your biggest competitor",
    category: "What we\u2019re creating",
    readTime: "6 min read",
    slug: "operating-model-competitor",
  },
  {
    title: "Stop transforming. Start clearing.",
    category: "What we\u2019re creating",
    readTime: "4 min read",
    slug: "stop-transforming-start-clearing",
  },
  {
    title: "Half your marketing budget is fighting your own operating model",
    category: "What we\u2019re creating",
    readTime: "5 min read",
    slug: "marketing-budget-operating-model",
  },
]

export function InsightsPreviewSection() {
  return (
    <Section background="light">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <motion.p
            variants={fadeInUp}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-pink"
          >
            Insights
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-balance font-display text-3xl font-bold text-brand-dark md:text-4xl"
          >
            Latest thinking
          </motion.h2>
        </div>
        <motion.div variants={fadeInUp}>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-pink hover:underline"
          >
            View all insights
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sampleInsights.map((insight, i) => (
          <motion.article
            key={insight.slug}
            variants={fadeInUp}
            custom={i}
            className="group flex flex-col rounded-xl bg-brand-white p-6 transition-shadow hover:shadow-md"
          >
            <span className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-orange">
              {insight.category}
            </span>
            <h3 className="mb-4 font-display text-xl font-bold text-brand-dark group-hover:text-brand-pink transition-colors">
              {insight.title}
            </h3>
            <p className="mt-auto text-sm text-muted-foreground">
              {insight.readTime}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
