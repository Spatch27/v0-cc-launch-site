"use client"


import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"
import { ArrowRight } from "lucide-react"

const articles = [
  {
    id: "weve-seen-enough",
    title: "We'd seen enough.",
    excerpt:
      "Great marketers shouldn't be ground down by the system that was built to serve them. Committed Citizens are here to help.",
    category: "Getting started",
    date: "March 2026",
    readTime: "2 min read",
    image: "/images/insights/weve-seen-enough.jpg",
  },
  {
    id: "indispensable-and-yet-unheard",
    title: "Indispensable and yet unheard.",
    excerpt:
      "MOps sit in the uncomfortable gap between strategy and execution - they can see it widening and they know what to fix. So why is nobody listening?",
    category: "Marketing Operations",
    date: "April 2026",
    readTime: "3 min read",
    image: "/images/insights/indispensable-and-yet-unheard.jpg",
  },
  {
    id: "the-problem-no-agency-can-solve",
    title: "The problem no agency can solve.",
    excerpt:
      "Too much marketing effort is being lost in the gap between strategy and execution. Committed Citizens make marketing work, work.",
    category: "Operational drag",
    date: "April 2026",
    readTime: "3 min read",
    image: "/images/insights/the-problem-no-agency-can-solve.jpg",
  },
  {
    id: "from-systems-thinking-to-systems-doing",
    title: "From systems thinking to systems doing.",
    excerpt:
      "The role of the CMO is changing. What's required isn't more strategic leadership - it's the ability to orchestrate the system.",
    category: "The orchestration gap",
    date: "April 2026",
    readTime: "2 min read",
    image: "/images/insights/from-systems-thinking-to-systems-doing.jpg",
  },
  {
    id: "shadow-ai-not-it-problem",
    title: "Shadow AI isn't an IT problem. It's yours.",
    excerpt:
      "Shadow AI is a threat to growth and a technical or regulatory solution isn't the answer. Enter the CMO.",
    category: "Marketing Leadership",
    date: "April 2026",
    readTime: "2 min read",
    image: "/images/insights/shadow-ai-not-it-problem.jpg",
  },
  {
    id: "when-more-ai-means-less-progress",
    title: "When more AI means less progress.",
    excerpt:
      "'AI brain fry' is real but not inevitable. The key to stopping it lies in better understanding your operating model.",
    category: "Marketing orchestration",
    date: "April 2026",
    readTime: "3 min read",
    image: "/images/insights/when-more-ai-means-less-progress.jpg",
  },
  {
    id: "the-great-agency-reset-is-a-sideshow",
    title: "The great agency reset is a sideshow.",
    excerpt:
      "The real challenge for CMOs isn't finding better agency partners. It's orchestrating the system they sit inside.",
    category: "Marketing orchestration",
    date: "March 2026",
    readTime: "2 min read",
    image: "/images/insights/agency-reset-sideshow.jpg",
  },
  {
    id: "small-data-wins-the-race",
    title: "Small data wins the race.",
    excerpt:
      "Marketing decisions are being slowed by an overabundance of data. We can learn a lesson from Formula 1.",
    category: "Data",
    date: "March 2026",
    readTime: "2 min read",
    image: "/images/insights/small-data-wins.jpg",
  },
  {
    id: "marketings-moneyball-moment",
    title: "Marketing's Moneyball moment.",
    excerpt:
      "The marketing leaders who win in the boardroom run a function that others in the C-Suite instantly recognise: a reliable, accountable machine.",
    category: "Marketing leadership",
    date: "March 2026",
    readTime: "2 min read",
    image: "/images/insights/moneyball-moment.jpg",
  },
]

export function InsightsListing() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Featured article is the most recent one
  const featured = articles[0]

  const remainingArticles = articles.slice(1)

  return (
    <>
      {/* Hero */}
      <motion.section
        ref={sectionRef}
        style={{ scale, opacity }}
        className="relative min-h-svh lg:h-screen bg-brand-light px-6 lg:px-12"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col pt-20 lg:pt-28 pb-24 lg:pb-16 gap-52 lg:gap-32 lg:h-full lg:justify-between">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-brand-dark"
          >
            Thinking that drives <i>action</i>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl self-end text-right text-lg text-brand-dark"
          >
            We've spent years inside marketing functions watching the same gaps appear between what transformation promises and what it actually delivers. Here we share what we've learned - short pieces on dumping drag, mobilising momentum, transforming teams, and the future of how marketing works. <strong>Written by practitioners, not theorists.</strong>
          </motion.p>
        </div>
      </motion.section>

      {/* Featured article */}
      {featured && (
        <Section background="white">
          <Link href={`/insights/${featured.id}`}>
            <motion.article
              variants={fadeInUp}
              className="group grid gap-12 md:grid-cols-2 md:items-center"
            >
              {/* Left: image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-dark">
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex flex-col items-center gap-4 text-brand-white/20">
                      <div className="h-16 w-16 rounded-full bg-brand-pink/20" />
                      <span className="text-xs tracking-[0.2em] uppercase">Featured</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: content */}
              <div>
                <span className="mb-4 inline-block text-xs font-semibold tracking-[0.15em] uppercase text-brand-orange">
                  Featured
                </span>
                <h2 className="mb-6 font-display text-3xl font-bold leading-snug text-brand-dark lg:text-4xl">
                  {featured.title}
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-brand-dark">
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
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {remainingArticles.slice(0, 8).map((article) => (
            <Link key={article.id} href={`/insights/${article.id}`}>
              <motion.article
                variants={fadeInUp}
                className="group flex h-full flex-col bg-brand-white transition-colors duration-300 hover:bg-brand-dark overflow-hidden"
              >
                {/* Image or placeholder */}
                <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-brand-pink/20 to-brand-orange/20">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={600}
                      height={337}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex flex-col items-center gap-2 text-brand-dark/20 transition-colors duration-300 group-hover:text-brand-white/20">
                        <div className="h-12 w-12 rounded-full bg-brand-pink/10" />
                        <span className="text-xs">Article Image</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col p-8 lg:p-10 pb-8 lg:pb-10">
                  <span className="mb-4 text-xs font-semibold tracking-[0.15em] uppercase text-brand-orange transition-colors duration-300 group-hover:text-brand-orange">
                    {article.category}
                  </span>
                  <h3 className="mb-4 font-display text-xl font-bold leading-snug text-brand-dark transition-colors duration-300 group-hover:text-brand-white lg:text-2xl">
                    {article.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-brand-dark transition-colors duration-300 group-hover:text-brand-white/50">
                    {article.excerpt}
                  </p>
                </div>

                {/* Footer - sticky to bottom */}
                <div className="mt-auto flex items-center justify-between px-8 pb-8 lg:px-10 lg:pb-10 text-sm">
                  <span className="text-brand-dark transition-colors duration-300 group-hover:text-brand-white/60">
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
    </>
  )
}
