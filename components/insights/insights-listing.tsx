"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"
import { ArrowRight } from "lucide-react"

const categories = ["All", "What we're creating", "What we're consuming"]

const articles = [
  {
    id: "removing-operational-drag",
    title: "Removing operational drag from marketing teams",
    excerpt:
      "How CMOs can identify and eliminate the hidden inefficiencies that slow down their teams and reduce marketing effectiveness.",
    category: "What we're creating",
    date: "November 2024",
    readTime: "8 min read",
  },
  {
    id: "marketing-operations-competitive-advantage",
    title: "Why marketing operations is the new competitive advantage",
    excerpt:
      "In a world where every brand has access to the same tools, operational excellence is what separates the leaders from the followers.",
    category: "What we're creating",
    date: "October 2024",
    readTime: "6 min read",
  },
  {
    id: "embedded-consultancy-model",
    title: "The embedded consultancy model explained",
    excerpt:
      "What makes embedded consultancy different from traditional consulting, and why it's more effective for modern marketing teams.",
    category: "What we're creating",
    date: "September 2024",
    readTime: "10 min read",
  },
  {
    id: "building-resilient-marketing-systems",
    title: "Building resilient marketing systems",
    excerpt:
      "How to create marketing workflows that scale with your business and adapt to changing market conditions without breaking.",
    category: "What we're creating",
    date: "August 2024",
    readTime: "7 min read",
  },
  {
    id: "case-for-marketing-product-teams",
    title: "The case for marketing product teams",
    excerpt:
      "Why the most effective marketing organisations are structured like product teams, with clear ownership and continuous improvement.",
    category: "What we're creating",
    date: "July 2024",
    readTime: "9 min read",
  },
  {
    id: "rethinking-marketing-velocity",
    title: "Rethinking marketing velocity",
    excerpt:
      "Speed isn't always better. How to find the right balance between moving fast and maintaining quality in your marketing execution.",
    category: "What we're consuming",
    date: "June 2024",
    readTime: "5 min read",
  },
]

export function InsightsListing() {
  const [activeCategory, setActiveCategory] = useState("All")

  // Featured article is the most recent one
  const featured = articles[0]

  // Filter remaining articles
  const remainingArticles = articles.slice(1)
  const filtered =
    activeCategory === "All"
      ? remainingArticles
      : remainingArticles.filter((article) => article.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-light px-6 pt-40 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-brand-dark"
          >
            Thinking that drives action.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-lg text-brand-dark/60"
          >
            Short pieces on dumping drag, mobilising momentum, transforming teams, and the future of how marketing works. Written by practitioners, not theorists.
          </motion.p>
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <Section background="white">
          <Link href={`/insights/${featured.id}`}>
            <motion.article
              variants={fadeInUp}
              className="group grid gap-12 md:grid-cols-2 md:items-center"
            >
              {/* Left: illustration area */}
              <div className="flex aspect-[4/3] items-center justify-center bg-brand-dark">
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
          </Link>
        </Section>
      )}

      {/* Article grid */}
      <Section background="light">
        {/* Category filters */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-brand-dark text-brand-white"
                  : "bg-brand-white text-brand-dark hover:bg-brand-dark hover:text-brand-white"
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
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((article) => (
            <Link key={article.id} href={`/insights/${article.id}`}>
              <motion.article
                variants={fadeInUp}
                className="group flex h-full flex-col bg-brand-white transition-colors duration-300 hover:bg-brand-dark overflow-hidden"
              >
                {/* Placeholder image */}
                <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-brand-pink/20 to-brand-orange/20">
                  <div className="flex h-full items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-brand-dark/20 transition-colors duration-300 group-hover:text-brand-white/20">
                      <div className="h-12 w-12 rounded-full bg-brand-pink/10" />
                      <span className="text-xs">Article Image</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col p-8 lg:p-10 pb-8 lg:pb-10">
                  <span className="mb-4 text-xs font-semibold tracking-[0.15em] uppercase text-brand-orange transition-colors duration-300 group-hover:text-brand-orange">
                    {article.category}
                  </span>
                  <h3 className="mb-4 font-display text-xl font-bold leading-snug text-brand-dark transition-colors duration-300 group-hover:text-brand-white lg:text-2xl">
                    {article.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-brand-dark/60 transition-colors duration-300 group-hover:text-brand-white/50">
                    {article.excerpt}
                  </p>
                </div>

                {/* Footer - sticky to bottom */}
                <div className="mt-auto flex items-center justify-between px-8 pb-8 lg:px-10 lg:pb-10 text-sm">
                  <span className="text-brand-dark/60 transition-colors duration-300 group-hover:text-brand-white/60">
                    {article.date} &middot; {article.readTime}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-brand-dark/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-pink"
                  />
                </div>
              </motion.article>
            </Link>
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
            className="group inline-flex w-fit items-center gap-3 self-start border-2 border-brand-dark bg-brand-light px-8 py-4 text-base font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-white lg:self-auto"
          >
            Subscribe on Substack
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
