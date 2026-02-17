import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/prismicio"
import { PrismicRichText } from "@prismicio/react"
import { asText } from "@prismicio/client"
import { Section } from "@/components/section"
import { ArrowLeft } from "lucide-react"

interface ArticlePageProps {
  params: Promise<{ uid: string }>
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { uid } = await params
  const client = createClient()

  try {
    const article = await client.getByUID("insight_article", uid)
    
    return {
      title: article.data.seo_title || article.data.title,
      description: article.data.seo_description || asText(article.data.excerpt),
    }
  } catch {
    return {
      title: "Article Not Found",
    }
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { uid } = await params
  const client = createClient()

  let article
  try {
    article = await client.getByUID("insight_article", uid)
  } catch {
    notFound()
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", { 
      day: "numeric",
      month: "long", 
      year: "numeric" 
    })
  }

  return (
    <>
      {/* Article Header */}
      <section className="relative bg-brand-light px-6 pt-40 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-[900px]">
          <Link
            href="/insights"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-dark/60 transition-colors hover:text-brand-dark"
          >
            <ArrowLeft size={16} />
            Back to Insights
          </Link>
          
          <span className="mb-6 inline-block text-xs font-semibold tracking-[0.15em] uppercase text-brand-orange">
            {article.data.category}
          </span>
          
          <h1 className="mb-8 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight text-brand-dark">
            {article.data.title}
          </h1>
          
          <p className="mb-8 text-xl leading-relaxed text-brand-dark/60">
            {asText(article.data.excerpt)}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-brand-dark/40">
            <span>{formatDate(article.data.publication_date)}</span>
            <span className="h-1 w-1 rounded-full bg-brand-dark/20" />
            <span>{article.data.read_time}</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <Section background="white" narrow>
        <article className="prose prose-lg prose-slate mx-auto max-w-none">
          <PrismicRichText
            field={article.data.body}
            components={{
              heading1: ({ children }) => (
                <h1 className="mb-8 font-display text-4xl font-bold leading-tight text-brand-dark">
                  {children}
                </h1>
              ),
              heading2: ({ children }) => (
                <h2 className="mb-6 mt-12 font-display text-3xl font-bold leading-tight text-brand-dark">
                  {children}
                </h2>
              ),
              heading3: ({ children }) => (
                <h3 className="mb-4 mt-8 font-display text-2xl font-bold leading-tight text-brand-dark">
                  {children}
                </h3>
              ),
              paragraph: ({ children }) => (
                <p className="mb-6 text-lg leading-relaxed text-brand-dark/80">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-brand-dark">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic">{children}</em>
              ),
              hyperlink: ({ node, children }) => (
                <a
                  href={node.data.url}
                  target={node.data.target}
                  rel="noopener noreferrer"
                  className="font-medium text-brand-pink underline decoration-brand-pink/30 underline-offset-4 transition-colors hover:text-brand-orange hover:decoration-brand-orange/50"
                >
                  {children}
                </a>
              ),
              list: ({ children }) => (
                <ul className="mb-6 ml-6 list-disc space-y-2 text-lg text-brand-dark/80">
                  {children}
                </ul>
              ),
              oList: ({ children }) => (
                <ol className="mb-6 ml-6 list-decimal space-y-2 text-lg text-brand-dark/80">
                  {children}
                </ol>
              ),
              listItem: ({ children }) => <li>{children}</li>,
              oListItem: ({ children }) => <li>{children}</li>,
            }}
          />
        </article>
      </Section>

      {/* Back to Insights */}
      <Section background="light">
        <div className="flex justify-center">
          <Link
            href="/insights"
            className="group inline-flex items-center gap-3 bg-brand-dark px-8 py-4 text-base font-semibold text-brand-white transition-all duration-300 hover:bg-brand-dark/90"
          >
            <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to all insights
          </Link>
        </div>
      </Section>
    </>
  )
}
