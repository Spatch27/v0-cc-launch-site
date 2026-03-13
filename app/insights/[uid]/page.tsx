import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Section } from "@/components/section"
import { ArticleSidebar } from "@/components/insights/article-sidebar"
import { BackToInsights } from "@/components/insights/back-to-insights"
import { BackToInsightsCta } from "@/components/insights/back-to-insights-cta"

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
    title: "The great agency reset is a sideshow.",
    excerpt:
      "The real challenge for CMOs isn't finding better agency partners. It's orchestrating the system they sit inside.",
    category: "Marketing orchestration",
    date: "March 2026",
    readTime: "2 min read",
    author: "Ben Scoggins",
    authorRole: "Co-founder",
    heroImage: "/images/insights/agency-reset-sideshow.jpg",
    body: [
      {
        type: "paragraph",
        text: "The agency model is collapsing. The good news for CMOs is that it isn't their problem.",
      },
      {
        type: "paragraph",
        text: "The bad news is that they have something much bigger to worry about: the system those agencies sit inside.",
      },
      {
        type: "paragraph",
        text: "A recent industry report laid bare what many marketing leaders have been feeling for some time. AI is compressing the cost of production work, 82% of brands now run in-house teams, and procurement is shifting from buying hours to buying outcomes. Agencies are caught in a difficult middle ground - unable to charge what they once did, unable to adapt fast enough.",
      },
      {
        type: "paragraph",
        text: "Piscari's Agency Reset 2026 report is worth reading even if you're not an agency leader, because it describes one half of a much bigger shift.",
      },
      {
        type: "paragraph",
        text: "The real change isn't happening inside agencies. It's happening inside marketing operations.",
      },
      {
        type: "paragraph",
        text: "Most CMOs now manage a patchwork of in-house teams, agencies, freelancers, platforms and AI tools. Each part of the marketing machine is optimising for its own specific role and objective.",
      },
      {
        type: "paragraph",
        text: "But nobody is orchestrating the whole thing.",
      },
      {
        type: "paragraph",
        text: "And that's where work gets stuck. Handoffs break. Cycle times bloat. Smart people spend half their energy navigating workarounds instead of doing the work that matters. And every time a partner changes shape - or disappears entirely - the cracks widen.",
      },
      {
        type: "paragraph",
        text: "This isn't fixed by switching agencies, bringing more work in-house, or buying another platform. It's fixed by redesigning how work actually flows across people, process and technology.",
      },
      {
        type: "paragraph",
        text: "If your marketing operation is feeling bogged down, you can't afford to wait for the agencies to sort themselves out. Redesigning the operating model now creates cleaner handoffs, shorter cycles and a system that works regardless of who's plugged into it.",
      },
      {
        type: "paragraph",
        text: "If that sounds sensible but you're unsure where to start, speak to us about the Drag Diagnostic - a free, 60-minute conversation about where friction is costing you the most and what to tackle first.",
      },
    ],
  },
  "marketing-operations-competitive-advantage": {
    title: "Small data wins the race",
    excerpt:
      "Marketing decisions are being slowed by an overabundance of data. We can learn a lesson from Formula 1.",
    category: "Data",
    date: "March 2026",
    readTime: "2 min read",
    author: "Ben Scoggins",
    authorRole: "Co-founder",
    heroImage: "/images/insights/small-data-wins.jpg",
    body: [
      {
        type: "paragraph",
        text: "During the race season, a Formula 1 car is a product permanently in Beta.",
      },
      {
        type: "paragraph",
        text: "Every surface and component is covered in sensors. Terabytes of data stream back to technicians and engineers during every Grand Prix. In theory, it's a goldmine - every data point a potential refinement, every refinement a potential hundredth of a second.",
      },
      {
        type: "paragraph",
        text: "But McLaren Racing hit a wall.",
      },
      {
        type: "paragraph",
        text: "Even with AI processing the telemetry, the sheer volume of data took too long to analyse - and longer still to turn into meaningful change. The engineers had more information than they could act on, and the clock was always ticking.",
      },
      {
        type: "paragraph",
        text: "Their solution wasn't more computing power or better dashboards. It was better discipline. They stripped back to what a senior engineer called \"small data\" - cherry-picking the handful of measures that genuinely moved performance. Everything else was noise.",
      },
      {
        type: "paragraph",
        text: "Marketing has the same problem. Only we handle it worse.",
      },
      {
        type: "paragraph",
        text: "There's no shortage of data in most modern marketing functions. More dashboards than anyone opens. More reporting cycles than anyone needs. More time spent measuring and less time spent deciding. For most teams, data isn't the asset it's supposed to be. It's a drag - adding weight to every decision, slowing the very thing it was meant to accelerate.",
      },
      {
        type: "paragraph",
        text: "The instinct is to fix this with better analytics, a new platform, or another layer of visualisation. But McLaren didn't solve their problem with better tools. They solved it by asking sharper questions. By deciding what mattered before they started measuring, not after.",
      },
      {
        type: "paragraph",
        text: "Most marketing teams do it backwards. We measure because we can and we report because we feel we should. And then we wonder why nothing feels actionable. The data itself becomes the bottleneck: contested numbers, competing dashboards, meeting time spent debating methodology instead of making calls.",
      },
      {
        type: "paragraph",
        text: "F1 teams obsess over reducing drag so they can go faster. Marketing teams should do the same. The answer isn't more data. It's less - chosen well, trusted fully, and acted on fast.",
      },
      {
        type: "paragraph",
        text: "If you want to swim in data rather than drown in it, speak to us about the Drag Diagnostic - a free, 60-minute conversation about where friction is costing you the most and what to tackle first.",
      },
    ],
  },
  "embedded-consultancy-model": {
    title: "Marketing's Moneyball moment",
    excerpt:
      "The marketing leaders who win in the boardroom run a function that others in the C-Suite instantly recognise: a reliable, accountable machine.",
    category: "Marketing leadership",
    date: "March 2026",
    readTime: "2 min read",
    author: "Ben Scoggins",
    authorRole: "Co-founder",
    heroImage: "/images/insights/moneyball-moment.jpg",
    body: [
      {
        type: "paragraph",
        text: "There's a hard reality for CMOs: few are seen as enterprise leaders.",
      },
      {
        type: "paragraph",
        text: "Only 10% of CEOs come from marketing backgrounds. Not because marketers lack judgement or ambition, but because marketing rarely looks like the kind of growth engine boards know how to back.",
      },
      {
        type: "paragraph",
        text: "Recent research from McKinsey highlights the disconnect. More than 70% of CEOs assess marketing on revenue growth and margin. Yet only around a third of CMOs prioritise those same metrics, and barely half are deeply involved in strategic planning.",
      },
      {
        type: "paragraph",
        text: "The ambition is there. The operating system isn't.",
      },
      {
        type: "paragraph",
        text: "This matters because boards don't promote vision. They promote predictability. Finance manages risk through models. Operations monitors throughput via dashboards. Both run systems that are legible, repeatable and defensible.",
      },
      {
        type: "paragraph",
        text: "Marketing, by contrast, tends to run on campaigns, launches and big moments. Sometimes they deliver extraordinary commercial results. But they're hard to forecast, harder to repeat, and almost impossible for a non-marketer to evaluate.",
      },
      {
        type: "paragraph",
        text: "That's the gap.",
      },
      {
        type: "heading2",
        text: "It isn't about talent or creativity",
      },
      {
        type: "paragraph",
        text: "It's about how marketing presents itself as a function.",
      },
      {
        type: "paragraph",
        text: "The CMOs who break through don't do it by being louder or more strategic. They do it by changing how marketing operates. They introduce cadence, measurement and accountability that the rest of the C-suite already takes for granted. Creative excellence matters more than ever - but it sits on top of consistent performance, rather than compensating for its absence.",
      },
      {
        type: "heading2",
        text: "This is marketing's moneyball moment",
      },
      {
        type: "paragraph",
        text: "The original Moneyball insight wasn't that data beat intuition. It was that a system built on evidence could outperform one built on gut feel - even with fewer resources.",
      },
      {
        type: "paragraph",
        text: "The same logic applies here. CMOs who can show what's working, what it costs, and what it returns build something far more powerful than campaign success. They build operational credibility, which is what turns marketing influence into enterprise authority.",
      },
      {
        type: "paragraph",
        text: "If you want a marketing engine the board can believe in, you need to start by understanding where you're experiencing operational drag. We can help. Get in touch to schedule a Drag Diagnostic - a free, 60-minute conversation about where friction is costing you the most and what to tackle first.",
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
      "Speed isn't always better. How to find the right balance between moving fast and maintaining quality in your marketing execution.",
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
        text: "There's a difference between moving fast and making progress. Many teams optimise for speed and end up shipping mediocre work at high volume. True marketing velocity is about the rate of meaningful output — work that actually shifts metrics and builds brand equity.",
      },
    ],
  },
  "weve-seen-enough": {
    title: "We'd seen enough.",
    excerpt:
      "Great marketers shouldn't be ground down by the system that was built to serve them. Committed Citizens are here to help.",
    category: "Getting started",
    date: "March 2026",
    readTime: "2 min read",
    author: "Ben Scoggins",
    authorRole: "Co-founder",
    heroImage: "/images/insights/weve-seen-enough.jpg",
    body: [
      {
        type: "paragraph",
        text: "We can't remember when we first saw it. It crept up on us but then we started seeing it everywhere. Marketing teams slowed down - the machinery around them began to seize up.",
      },
      {
        type: "paragraph",
        text: "Briefs that should have taken days, taking weeks. Approvals running through seven people when two would do. Six-figure martech platforms sitting half-used or barely touched. The best marketers - the ones with the sharpest instincts and the most to give - getting ground down by systems that should have been serving them.",
      },
      {
        type: "paragraph",
        text: "Then AI arrived. And instead of simplifying things, it added another layer. New tools landing faster than teams could absorb them. Pilots grounded by stubborn processes. Vendors promising efficiency they couldn't deliver. The machinery didn't get lighter - it started weighing teams down.",
      },
      {
        type: "paragraph",
        text: "That was the tipping point. This problem wasn't going to fix itself. It was accelerating.",
      },
      {
        type: "paragraph",
        text: "We know what good looks like"
      },
      {
        type: "paragraph",
        text: "Because we've spent 25 years watching what happens without it. We've seen friction take hold from every angle - the missed deadlines, the bloated platforms, the talented people slowly losing faith in the system around them. But we've also seen marketing teams that unlock flow. The energy comes back. The talent you hired starts doing the work you hired them for. Results stop being a fight and start building a rhythm.",
      },
      {
        type: "paragraph",
        text: "So we built Committed Citizens.",
      },
      {
        type: "paragraph",
        text: "We don't produce the marketing. We fix the machine that does. We embed inside marketing teams and redesign how work actually flows - across people, process, data, and technology. Six-week cycles. Measurable progress. Change that sticks because it's built around how your team actually works, not how they theoretically should.",
      },
      {
        type: "paragraph",
        text: "We didn't start this because we fell out of love with agencies. We started it because we've watched too many good teams held back by fixable problems. And we decided to go and help them.",
      },
      {
        type: "paragraph",
        text: "Let's start with a conversation"
      },
      {
        type: "paragraph",
        text: "If you're a marketing leader who's tired of watching good people fight bad systems, start with a conversation. Our Drag Diagnostic is free, takes an hour, and gives you something useful whether we work together or not.",
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
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              className="object-cover"
              style={{ objectPosition: "center 35%" }}
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
          <BackToInsightsCta />
        </div>
      </Section>
    </>
  )
}
