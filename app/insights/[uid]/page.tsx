import type { Metadata } from "next"
import Script from "next/script"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Section } from "@/components/section"
import { ArticleSidebar } from "@/components/insights/article-sidebar"
import { BackToInsights } from "@/components/insights/back-to-insights"
import { BackToInsightsCta } from "@/components/insights/back-to-insights-cta"
import { InsightArticleBody } from "@/components/insights/article-body"
import { formatInsightMonthYear } from "@/lib/insight-articles"
import { getInsightBySlug, getInsightSlugs } from "@/lib/sanity/insights"
import { absoluteInsightUrl, insightPageUrl } from "@/lib/sanity/urls"

export const revalidate = 60

interface ArticlePageProps {
  params: Promise<{ uid: string }>
}

export async function generateStaticParams() {
  const slugs = await getInsightSlugs()
  return slugs.map((uid) => ({ uid }))
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { uid } = await params
  const article = await getInsightBySlug(uid)
  const preview = (await draftMode()).isEnabled
  const robots = preview ? { index: false as const, follow: false as const } : undefined

  if (!article) {
    return {
      title: "Article Not Found",
      ...(robots ? { robots } : {}),
    }
  }

  const title = article.seoTitle || article.title
  const description = article.seoDescription || article.excerpt
  const url = insightPageUrl(uid)

  return {
    title: title,
    description: description,
    ...(robots ? { robots } : {}),
    openGraph: {
      title: `${title} | Committed Citizens`,
      description: description,
      url: url,
      type: "article",
      locale: "en_GB",
      siteName: "Committed Citizens",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Committed Citizens`,
      description: description,
      images: ["/og-image.jpg"],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { uid } = await params
  const article = await getInsightBySlug(uid)

  if (!article) {
    notFound()
  }

  const articleUrl = insightPageUrl(uid)
  const publishedAt = article.publishedAt
  const displayDate = formatInsightMonthYear(publishedAt)
  const isSvgHero = article.heroImage.endsWith(".svg")
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    image: absoluteInsightUrl(article.heroImage),
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Committed Citizens",
      logo: {
        "@type": "ImageObject",
        url: "https://www.committedcitizens.co.uk/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  }

  return (
    <>
      {/* Article Schema */}
      <Script
        id={`article-schema-${uid}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      {/* Article Header */}
      <section className="bg-brand-light px-6 pt-40 pb-12 lg:px-12 lg:pt-48 lg:pb-16">
        <div className="mx-auto max-w-[1400px]">
          <BackToInsights />

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
          <div className={`relative w-full overflow-hidden ${isSvgHero ? "aspect-[4/3] md:aspect-[21/9] bg-[#e3dcdc]" : "aspect-[21/9]"}`}>
            <Image
              src={article.heroImage}
              alt={article.heroAlt || article.title}
              fill
              className={isSvgHero ? "object-contain" : "object-cover"}
              style={isSvgHero ? undefined : { objectPosition: "center 35%" }}
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
          </div>
        </div>
      </section>

      {/* Two-column: Sidebar + Article Body */}
      <section className="bg-brand-white px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[280px_1fr] lg:gap-20 relative">
          {/* Left narrow column: metadata sidebar */}
          <ArticleSidebar
            author={article.author}
            authorRole={article.authorRole}
            date={displayDate}
            readTime={article.readTime}
            title={article.title}
          />

          {/* Right wide column: article content */}
          <article className="max-w-[720px]">
            <InsightArticleBody body={article.body ?? []} />
          </article>
        </div>
      </section>

      {/* Back to Insights */}
      <Section background="light">
        <div className="flex justify-center">
          <BackToInsightsCta />
        </div>
      </Section>
    </>
  )
}
