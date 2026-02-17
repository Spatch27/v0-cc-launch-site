"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"
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
      <section className="relative bg-brand-dark px-6 pt-40 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-sm font-medium tracking-[0.2em] uppercase text-brand-pink"
          >
            Insights
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-brand-white"
          >
            Thinking that drives action.
          </motion.h1>
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <Section background="light">
          <motion.article
            variants={fadeInUp}
            className="group grid gap-12 md:grid-cols-2 md:items-center"
          >
            {/* Left: illustration area */}
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-brand-dark">
              <div className="flex flex-col items-center gap-4 text-brand-white/20">
                <div className="h-16 w-16 rounded-full bg-brand-pink/20" />
                <span className="text-xs tracking-[0.2em] uppercase">Featured</span>
              </div>
            </div>

            {/* Right: content */}
            <div>
              <span className="mb-4 inline-block text-xs font-semibold tracking-[0.15em] uppercase text-brand-orange">
                Featured
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold leading-snug text-brand-dark lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-brand-dark/60">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-brand-dark/40">
                <span>{featured.date}</span>
                <span className="h-1 w-1 rounded-full bg-brand-dark/20" />
                <span>{featured.readTime}</span>
              </div>
            </div>
          </motion.article>
        </Section>
      )}

      {/* Article grid */}
      <Section background="white">
        {/* Category filters */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-brand-dark text-brand-white"
                  : "bg-brand-light text-brand-dark hover:bg-brand-dark hover:text-brand-white"
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
          className="grid gap-px overflow-hidden rounded-2xl bg-brand-dark/10 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((article) => (
            <motion.article
              key={article.slug}
              variants={fadeInUp}
              className="group flex flex-col bg-brand-light p-8 transition-colors duration-300 hover:bg-brand-dark lg:p-10"
            >
              <span className="mb-4 text-xs font-semibold tracking-[0.15em] uppercase text-brand-orange transition-colors duration-300 group-hover:text-brand-orange">
                {article.category}
              </span>
              <h3 className="mb-4 font-display text-xl font-bold leading-snug text-brand-dark transition-colors duration-300 group-hover:text-brand-white lg:text-2xl">
                {article.title}
              </h3>
              <p className="mb-8 flex-1 text-sm leading-relaxed text-brand-dark/60 transition-colors duration-300 group-hover:text-brand-white/50">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-dark/40 transition-colors duration-300 group-hover:text-brand-white/40">
                  {article.date} &middot; {article.readTime}
                </span>
                <ArrowRight
                  size={16}
                  className="text-brand-dark/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-pink"
                />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      {/* Newsletter */}
      <section className="bg-brand-dark px-6 py-24 lg:px-12 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-bold leading-snug text-brand-white md:text-5xl">
              Stay sharp.
            </h2>
            <p className="mt-4 text-lg text-brand-white/50">
              Original thinking on marketing operations, transformation, and
              removing operational drag. No spam, ever.
            </p>
          </div>
          <Link
            href="https://substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-pink px-8 py-4 text-base font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-pink/90"
          >
            Subscribe on Substack
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
