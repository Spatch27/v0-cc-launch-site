import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { ArticleSidebar } from "@/components/insights/article-sidebar"
import { Section } from "@/components/section"

/**
 * Static article data used until Prismic is fully configured.
 * Keys match the slugs used in the insights listing.
 */
const articles: Record<
  string,
  {
    title: string
    excerpt: string
    category: string
    date: string
    readTime: string
    author: string
    authorRole: string
    heroImage: string
    body: { type: "heading2" | "paragraph"; text: string }[]
    seoTitle?: string
    seoDescription?: string
  }
> = {
  "removing-operational-drag": {
    title: "Removing operational drag from marketing teams",
    excerpt:
      "How CMOs can identify and eliminate the hidden inefficiencies that slow down their teams and reduce marketing effectiveness.",
    category: "What we're creating",
    date: "November 2024",
    readTime: "8 min read",
    author: "Committed Citizens",
    authorRole: "Editorial",
    heroImage: "/images/insights/hero-default.jpg",
    body: [
      {
        type: "heading2",
        text: "The Hidden Cost of Operational Drag",
      },
      {
        type: "paragraph",
        text: "Most marketing teams spend more time managing work than doing work. The constant context switching, tool sprawl, and approval bottlenecks create an invisible tax on productivity that compounds over time.",
      },
      {
        type: "paragraph",
        text: "We call this operational drag \u2014 the accumulated friction that slows down marketing velocity and prevents teams from reaching their full potential.",
      },
      {
        type: "heading2",
        text: "What Changes When You Remove the Drag",
      },
      {
        type: "paragraph",
        text: "When operational friction disappears, marketing teams transform. Decision-making accelerates. Creative energy flows to where it matters. Teams start shipping work that moves the needle instead of fighting their own processes.",
      },
    ],
  },
  "marketing-operations-competitive-advantage": {
    title: "Why marketing operations is the new competitive advantage",
    excerpt:
      "In a world where every brand has access to the same tools, operational excellence is what separates the leaders from the followers.",
    category: "What we're creating",
    date: "October 2024",
    readTime: "6 min read",
    author: "Committed Citizens",
    authorRole: "Editorial",
    heroImage: "/images/insights/hero-default.jpg",
    body: [
      {
        type: "heading2",
        text: "Beyond the Tool Stack",
      },
      {
        type: "paragraph",
        text: "Every marketing team has access to essentially the same platforms, data sources, and AI tools. The differentiator isn\u2019t what you buy \u2014 it\u2019s how you orchestrate it.",
      },
      {
        type: "paragraph",
        text: "Operational excellence in marketing means faster decisions, cleaner handoffs, and teams that spend their energy on creative and strategic work rather than admin and workarounds.",
      },
    ],
  },
  "embedded-consultancy-model": {
    title: "The embedded consultancy model explained",
    excerpt:
      "What makes embedded consultancy different from traditional consulting, and why it\u2019s more effective for modern marketing teams.",
    category: "What we're creating",
    date: "September 2024",
    readTime: "10 min read",
    author: "Committed Citizens",
    authorRole: "Editorial",
    heroImage: "/images/insights/hero-default.jpg",
    body: [
      {
        type: "heading2",
        text: "Why Traditional Consulting Falls Short",
      },
      {
        type: "paragraph",
        text: "Traditional consultancies parachute in, produce a deck, and leave. The recommendations are often sound, but the implementation stalls because the team wasn\u2019t part of building the solution.",
      },
      {
        type: "heading2",
        text: "The Embedded Difference",
      },
      {
        type: "paragraph",
        text: "Embedded consultancy means working inside your team, not alongside it. We sit in your workflows, attend your stand-ups, and build solutions with the people who\u2019ll run them long after we leave.",
      },
    ],
  },
  "building-resilient-marketing-systems": {
    title: "Building resilient marketing systems",
    excerpt:
      "How to create marketing workflows that scale with your business and adapt to changing market conditions without breaking.",
    category: "What we're creating",
    date: "August 2024",
    readTime: "7 min read",
    author: "Committed Citizens",
    authorRole: "Editorial",
    heroImage: "/images/insights/hero-default.jpg",
    body: [
      {
        type: "heading2",
        text: "Resilience Over Rigidity",
      },
      {
        type: "paragraph",
        text: "The best marketing systems aren\u2019t the most complex \u2014 they\u2019re the ones that bend without breaking. Resilient systems absorb change, scale smoothly, and keep teams productive through uncertainty.",
      },
    ],
  },
  "case-for-marketing-product-teams": {
    title: "The case for marketing product teams",
    excerpt:
      "Why the most effective marketing organisations are structured like product teams, with clear ownership and continuous improvement.",
    category: "What we're creating",
    date: "July 2024",
    readTime: "9 min read",
    author: "Committed Citizens",
    authorRole: "Editorial",
    heroImage: "/images/insights/hero-default.jpg",
    body: [
      {
        type: "heading2",
        text: "From Campaigns to Continuous Delivery",
      },
      {
        type: "paragraph",
        text: "Traditional marketing organises around campaigns \u2014 discrete projects with clear start and end dates. But modern marketing demands continuous iteration, experimentation, and optimisation. Product teams have solved this problem. They ship value continuously and maintain momentum without the stop-start nature of campaigns.",
      },
    ],
  },
  "rethinking-marketing-velocity": {
    title: "Rethinking marketing velocity",
    excerpt:
      "Speed isn\u2019t always better. How to find the right balance between moving fast and maintaining quality in your marketing execution.",
    category: "What we're consuming",
    date: "June 2024",
    readTime: "5 min read",
    author: "Committed Citizens",
    authorRole: "Editorial",
    heroImage: "/images/insights/hero-default.jpg",
    body: [
      {
        type: "heading2",
        text: "The Velocity Trap",
      },
      {
        type: "paragraph",
        text: "There\u2019s a difference between moving fast and making progress. Many teams optimise for speed and end up shipping mediocre work at high volume. True marketing velocity is about the rate of meaningful output \u2014 work that actually shifts metrics and builds brand equity.",
      },
    ],
  },
}

interface ArticlePageProps {
  params: Promise<{ uid: string }>
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { uid } = await params
  const article = articles[uid]

  if (!article) {
    return { title: "Article Not Found" }
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { uid } = await params
  const article = articles[uid]

  if (!article) {
    notFound()
  }

  return (
    <>
      {/* Article Header */}
      <section className="bg-brand-light px-6 pt-40 pb-12 lg:px-12 lg:pt-48 lg:pb-16">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-dark/60 transition-colors hover:text-brand-dark"
          >
            <ArrowLeft size={16} />
            Back to Insights
          </Link>

          <div className="mt-10">
            <span className="mb-6 inline-block text-xs font-semibold tracking-[0.15em] uppercase text-brand-orange">
              {article.category}
            </span>

            <h1 className="max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-brand-dark text-balance">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Full-width Hero Image */}
      <section className="bg-brand-light px-6 pb-0 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
          </div>
        </div>
      </section>

      {/* Two-column: Sidebar + Article Body */}
      <section className="bg-brand-white px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
          {/* Left narrow column: metadata sidebar */}
          <ArticleSidebar
            author={article.author}
            authorRole={article.authorRole}
            date={article.date}
            readTime={article.readTime}
            title={article.title}
          />

          {/* Right wide column: article content */}
          <article className="max-w-[720px]">
            <p className="mb-10 text-xl leading-relaxed text-brand-dark/70">
              {article.excerpt}
            </p>

            <hr className="mb-10 border-brand-dark/10" />

            {article.body.map((block, i) => {
              if (block.type === "heading2") {
                return (
                  <h2
                    key={i}
                    className="mb-6 mt-12 first:mt-0 font-display text-3xl font-bold leading-tight text-brand-dark"
                  >
                    {block.text}
                  </h2>
                )
              }
              return (
                <p
                  key={i}
                  className="mb-6 text-lg leading-relaxed text-brand-dark/80"
                >
                  {block.text}
                </p>
              )
            })}
          </article>
        </div>
      </section>

      {/* Back to Insights */}
      <Section background="light">
        <div className="flex justify-center">
          <Link
            href="/insights"
            className="group inline-flex items-center gap-3 bg-brand-dark px-8 py-4 text-base font-semibold text-brand-white transition-all duration-300 hover:bg-brand-dark/90"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to all insights
          </Link>
        </div>
      </Section>
    </>
  )
}
