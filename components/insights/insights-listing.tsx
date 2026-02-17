"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = ["All", "What we\u2019re creating", "What we\u2019re consuming"]

const articles = [
  {
    title: "Your operating model is your biggest competitor",
    excerpt:
      "Most marketing teams don\u2019t have a strategy problem. They have an execution problem \u2014 and the root cause is almost always the operating model.",
    category: "What we\u2019re creating",
    readTime: "6 min read",
    date: "February 2026",
    slug: "operating-model-competitor",
    featured: true,
  },
  {
    title: "Stop transforming. Start clearing.",
    excerpt:
      "Transformation has become a dirty word. Teams are exhausted by it. Here\u2019s why clearing operational drag delivers faster, more durable results.",
    category: "What we\u2019re creating",
    readTime: "4 min read",
    date: "February 2026",
    slug: "stop-transforming-start-clearing",
    featured: false,
  },
  {
    title: "Half your marketing budget is fighting your own operating model",
    excerpt:
      "We\u2019ve audited dozens of marketing teams. The finding is always the same: the biggest source of waste is internal, not external.",
    category: "What we\u2019re creating",
    readTime: "5 min read",
    date: "January 2026",
    slug: "marketing-budget-operating-model",
    featured: false,
  },
  {
    title: "The case for marketing metabolic rate",
    excerpt:
      "Speed isn\u2019t about doing more. It\u2019s about the rate at which your marketing system can learn, adapt, and deliver.",
    category: "What we\u2019re creating",
    readTime: "7 min read",
    date: "January 2026",
    slug: "marketing-metabolic-rate",
    featured: false,
  },
]

export function InsightsListing() {
  const [activeCategory, setActiveCategory] = useState("All")
  const featured = articles.find((a) => a.featured)
  const filtered =
    activeCategory === "All"
      ? articles.filter((a) => !a.featured)
      : articles.filter(
          (a) => a.category === activeCategory && !a.featured
        )

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark px-6 pt-32 pb-20 lg:px-8 lg:pt-40 lg:pb-28">
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-pink"
          >
            Insights
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl font-bold text-brand-white md:text-6xl"
          >
            Thinking that drives action
          </motion.h1>
        </motion.div>
      </section>

      {/* Featured article */}
      {featured && (
        <Section background="white">
          <motion.article
            variants={fadeInUp}
            className="group flex flex-col gap-6 rounded-2xl bg-brand-light p-8 md:flex-row md:items-center md:p-12"
          >
            {/* Placeholder illustration area */}
            <div className="flex h-48 w-full items-center justify-center rounded-xl bg-brand-dark md:h-auto md:w-1/3 md:self-stretch">
              <svg viewBox="0 0 120 120" className="h-20 w-20 opacity-30" aria-hidden="true">
                <circle cx="60" cy="60" r="50" fill="#fc66a7" />
                <path d="M60 20L90 80H30Z" fill="#ff8600" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-brand-orange">
                Featured
              </span>
              <h2 className="mb-4 font-display text-2xl font-bold text-brand-dark md:text-3xl">
                {featured.title}
              </h2>
              <p className="mb-6 leading-relaxed text-brand-dark/70">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{featured.date}</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </motion.article>
        </Section>
      )}

      {/* Article grid */}
      <Section background="light">
        {/* Category filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-brand-dark text-brand-white"
                  : "bg-brand-white text-brand-dark hover:bg-brand-dark/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((article) => (
            <motion.article
              key={article.slug}
              variants={fadeInUp}
              className="group flex flex-col rounded-xl bg-brand-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-orange">
                {article.category}
              </span>
              <h3 className="mb-3 font-display text-xl font-bold text-brand-dark group-hover:text-brand-pink transition-colors">
                {article.title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-brand-dark/70">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {article.date} &middot; {article.readTime}
                </span>
                <ArrowRight
                  size={16}
                  className="text-brand-pink opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      {/* Newsletter signup */}
      <section className="bg-brand-dark px-6 py-20 lg:px-8 lg:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-brand-white md:text-4xl">
            Sign up for our occasional newsletter
          </h2>
          <p className="text-brand-light/70">
            Original thinking on marketing operations, transformation, and
            removing operational drag. No spam, ever.
          </p>
          <Link
            href="https://substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-pink px-8 py-4 text-base font-semibold text-brand-dark transition-opacity hover:opacity-90"
          >
            Subscribe on Substack
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
