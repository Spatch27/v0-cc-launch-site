export type InsightListingArticle = {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
}

const MONTHS: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
}

/** Parse listing dates like "August 2026" into a stable UTC lastmod. */
export function insightLastModified(date: string): Date {
  const [monthName, yearStr] = date.trim().split(/\s+/)
  const month = MONTHS[monthName?.toLowerCase() ?? ""]
  const year = Number(yearStr)

  if (month === undefined || !Number.isFinite(year)) {
    return new Date(Date.UTC(2026, 0, 1))
  }

  return new Date(Date.UTC(year, month, 1))
}

/** Display Sanity `publishedAt` as "Month YYYY" in UTC, matching the live listing. */
export function formatInsightMonthYear(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }

  return date.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}

/**
 * Listing snapshot used by `scripts/import-insights-to-sanity.ts` only.
 * Public `/insights`, `/insights/[uid]`, and the sitemap read from Sanity.
 */
export const insightArticles: InsightListingArticle[] = [
  {
    id: "your-ai-tools-are-not-your-team",
    title: "Your AI tools are not a team.",
    excerpt:
      "Some people reckon you can revolutionise your business by dropping AI tools into your existing workflow and calling them a team. That's crazy talk.",
    category: "Agentic reality check",
    date: "August 2026",
    readTime: "3 min read",
    image: "/images/insights/your-ai-tools-are-not-your-team.png",
  },
  {
    id: "the-problem-might-be-your-fabric",
    title: "The problem might be your fabric.",
    excerpt:
      "Lurking between your people and your processes is an invisible layer that might well determine how your team actually operates.",
    category: "Fabric layer",
    date: "July 2026",
    readTime: "3 min read",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Problem%20Might%20Be%20Your%20Fabric%20120626-dnyGOrJhYut3T8VXuorVZqL25l1IPk.jpg",
  },
  {
    id: "youre-not-mckinsey",
    title: "You're not McKinsey.",
    excerpt:
      "Agents are going to become an important part of evolving workflows. But they're not a quick fix. There are foundations that need to be laid first.",
    category: "AI Agents",
    date: "July 2026",
    readTime: "3 min read",
    image: "/images/insights/youre-not-mckinsey.jpg",
  },
  {
    id: "the-plane-in-flight-problem",
    title: "The plane-in-flight problem.",
    excerpt:
      "Most marketing leaders are trapped between this quarter's deadlines and the deeper fixes the function actually needs. The deadlines always win - they don't have to.",
    category: "Marketing Leadership",
    date: "June 2026",
    readTime: "4 min read",
    image: "/images/insights/plane-in-flight-problem.png",
  },
  {
    id: "i-cant-code",
    title: "I can't code. I built a professional website anyway.",
    excerpt:
      "Knowing which job belongs to a human and which belongs to the machine is the key skill. Here's how we built this site for £120 by getting that right.",
    category: "TECHNOLOGY & TOOLS",
    date: "April 2026",
    readTime: "7 min read",
    image: "/images/insights/i-cant-code.svg",
  },
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
