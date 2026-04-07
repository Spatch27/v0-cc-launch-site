import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
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
  "indispensable-and-yet-unheard": {
    title: "Indispensable and yet unheard.",
    excerpt:
      "MOps sit in the uncomfortable gap between strategy and execution - they can see it widening and they know what to fix. So why is nobody listening?",
    category: "Marketing Operations",
    date: "April 2026",
    readTime: "3 min read",
    author: "Ben Scoggins",
    authorRole: "Co-founder",
    heroImage: "/images/insights/indispensable-and-yet-unheard.jpg",
    body: [
      {
        type: "paragraph",
        text: "The most informed person in your marketing team probably isn't in your strategy meetings.",
      },
      {
        type: "paragraph",
        text: "Marketing Operations leaders know where the bodies are buried. They know which platform no one opens. Which approval loop adds four days to every campaign. Which data source the dashboards quietly ignore. They can trace a broken customer journey back to the exact handoff where it falls apart.",
      },
      {
        type: "paragraph",
        text: "They know all of this. And yet their opinion is rarely sought when strategic decisions are being made.",
      },
      {
        type: "paragraph",
        text: "That's not a personality problem. It's a structural one. Marketing Operations MOps was built to implement, not to lead. To configure, not to advise. The function absorbed responsibility for the infrastructure that everything else depends on - and then got positioned a bit like an IT helpdesk: the people you call when something stops working, not the people you listen to before something breaks.",
      },
      {
        type: "paragraph",
        text: "The result is a peculiar kind of invisibility. Indispensable, but largely unheard.",
      },
      {
        type: "paragraph",
        text: "Something's getting missed. The friction an ops leader can see isn't just operational detail. It's commercial intelligence.",
      },
      {
        type: "paragraph",
        text: "When a campaign cycle takes three weeks instead of three days, that's a competitive exposure. When attribution is contested by finance, that's a budget credibility problem. When AI implementation fails because no one redesigned the workflow, that's a growth story that won't be told this quarter.",
      },
      {
        type: "paragraph",
        text: "The MOps leader sees all of this. But the language used to describe it - bottlenecks, workflow redesign, tech stack rationalisation - rarely translates into the language CMOs use to make cases upward. And so the insight stays inside the MOps function, while the decisions that should follow from it get made on instinct elsewhere.",
      },
      {
        type: "paragraph",
        text: "This isn't about MOps leaders failing to communicate. It's about organisations failing to build the bridge between operational intelligence and strategic decision-making.",
      },
      {
        type: "paragraph",
        text: "The arrival of agentic AI is quickly changing the terms of this conversation because AI doesn't just automate tasks - it exposes the inefficiency of legacy workflows. The teams seeing real returns from AI are the ones where someone had already mapped how work actually flows - and redesigned it before the tools arrived. But bolt an agent onto a broken process, and the process breaks faster.",
      },
      {
        type: "paragraph",
        text: "That work lives in MOps. Which means the function that was treated as infrastructure is now a prerequisite for the thing every CMO is being asked about in every board meeting. And in many organisations, the structural distance is growing - as MOps migrates into RevOps or data teams, the gap between operational intelligence and marketing leadership widens further.",
      },
      {
        type: "paragraph",
        text: "Organisations that recognise this early will move faster. The MOps leader who gets to make that case - with the language, the framing, and the access to do it - has an unusual opportunity. Not just to be useful, but to be heard.",
      },
      {
        type: "paragraph",
        text: "The case isn't hard. The path to making it is.",
      },
      {
        type: "paragraph",
        text: "The insight is there. The operational evidence is there. The skills are there. What's missing is the translation layer - the bridge between what MOps leaders know and the commercial framing that gets it acted on.",
      },
      {
        type: "paragraph",
        text: "That gap is closeable. But there is rarely enough leverage on the inside of the business. Often it takes an outside perspective to validate what's already known, frame it in terms the C-suite will respond to, and give the MOps lead the ability to lead the conversation rather than just support it.",
      },
      {
        type: "paragraph",
        text: "The most strategic person in your marketing team is probably already telling you what needs to change. The question is whether they have the mandate to be heard.",
      },
      {
        type: "paragraph",
        text: "If you're a CMO or an experienced Marketing Ops leader and this sounds familiar but you're unsure where to start, contact us to book a free Drag Diagnostic - a 60-minute conversation about where friction is costing you the most and what to tackle first.",
      },
    ],
  },
  "the-problem-no-agency-can-solve": {
    title: "The problem no agency can solve.",
    excerpt:
      "Too much marketing effort is being lost in the gap between strategy and execution. Committed Citizens make marketing work, work.",
    category: "Operational drag",
    date: "April 2026",
    readTime: "3 min read",
    author: "Ben Scoggins",
    authorRole: "Co-founder",
    heroImage: "/images/insights/the-problem-no-agency-can-solve.jpg",
    body: [
      {
        type: "paragraph",
        text: "We ran an agency for years. The biggest problem our clients had was one no agency is built to solve.",
      },
      {
        type: "paragraph",
        text: "There's a question we kept running into as digital agency leaders that nobody seemed interested in answering: why does so much good marketing strategy die somewhere between a PowerPoint slide and the customer?",
      },
      {
        type: "paragraph",
        text: "It wasn't the strategy, the creative, or media plan. In fact, it wasn't 'the work' at all. It was the stuff around the work - the processes, the hand-offs, the sign-off bottlenecks, the technology stack that promised transformation but mostly delivered complexity. The invisible machinery of marketing.",
      },
      {
        type: "paragraph",
        text: "We call this operational drag. It rarely presents as catastrophic failure. It's usually something quieter and more corrosive: the slow accumulation of friction that means campaigns take twice as long as they should, data becomes untrustworthy, technology becomes a bind, and teams run on heroics instead of rhythm.",
      },
      {
        type: "paragraph",
        text: "And the uncomfortable position on the agency side was that it was blindingly obvious. We could see it. We just weren't set up to fix it.",
      },
      {
        type: "paragraph",
        text: "Agencies are structured to produce marketing artifacts - creative, media, content - not to improve how work gets produced. Suggesting to a client that their internal operating model needs redesigning is commercial suicide. It's unwarranted advice, and out of scope. Plus it's clearly out of the agency wheelhouse. Surely there are other outfits better able to help the CMO?",
      },
      {
        type: "paragraph",
        text: "In theory, yes.",
      },
      {
        type: "paragraph",
        text: "Consultancies will diagnose the problem rigorously. But they're not incentivised to ensure adoption. Systems Integrators are great at building out platforms but they're not incentivised to deliver ROI. And other internal stakeholders have a range of incentives, but rarely do they completely align with Marketing.",
      },
      {
        type: "paragraph",
        text: "The result is a gap.",
      },
      {
        type: "paragraph",
        text: "And this matters more now than ever, because AI is entering our systems - and it's amplifying whatever it finds. Feed an agent into a well-designed workflow with clean data, clear governance and trained people, and you'll see the return. But feed it into a mess, and it accelerates the turmoil. As Bernbach said about advertising - 'a great campaign will make a bad product fail faster'. The same can be said of the impact of AI on a marketing function.",
      },
      {
        type: "paragraph",
        text: "The problem is not technology.",
      },
      {
        type: "paragraph",
        text: "Gartner's own data tells the story: only about a third of available martech capability is ever properly used. That's not a technology failure. It's an adoption and operating model failure. And bolting AI on top of underused technology doesn't fix - it compounds.",
      },
      {
        type: "paragraph",
        text: "So what should CMOs be demanding?",
      },
      {
        type: "paragraph",
        text: "First, speed to evidence. The transformation industry has normalised asking clients to buy belief before they've seen results. Months of discovery. Year-long roadmaps. Partners must be able to show measurable progress in six weeks, not six months.",
      },
      {
        type: "paragraph",
        text: "Second, embedded delivery. The hard part of transformation is adoption - getting real people to change real habits in real workflows. That requires being in the room, not advising from the sidelines or letting agents loose.",
      },
      {
        type: "paragraph",
        text: "Third, honesty about AI. Any partner selling AI as a transformation shortcut is selling a fantasy. AI is a propellant, not a destination. It only works when the system it's entering works first.",
      },
      {
        type: "paragraph",
        text: "We left the agency world because we got tired of watching the same pattern repeat. Good strategy, broken execution, and a room full of partners pointing at each other. The operating model - the bit that actually determines whether marketing works - was nobody's job.",
      },
      {
        type: "paragraph",
        text: "Now it's ours.",
      },
    ],
  },
  "from-systems-thinking-to-systems-doing": {
    title: "From systems thinking to systems doing.",
    excerpt:
      "The role of the CMO is changing. What's required isn't more strategic leadership - it's the ability to orchestrate the system.",
    category: "The orchestration gap",
    date: "April 2026",
    readTime: "2 min read",
    author: "Ben Scoggins",
    authorRole: "Co-founder",
    heroImage: "/images/insights/from-systems-thinking-to-systems-doing.jpg",
    body: [
      {
        type: "paragraph",
        text: "Since late 2025, recruitment briefs for senior marketing roles have shifted noticeably. One experienced recruiter described it as a marked change - something echoed across the industry.",
      },
      {
        type: "paragraph",
        text: "Boards are hunting for CMOs with evidence of orchestration experience, systems thinking, and broader commercial judgement. Performance depth alone no longer cuts it.",
      },
      {
        type: "paragraph",
        text: "The honest reality is that systems thinking has been part of senior marketing leadership for years. Most marketers approaching board-level already understand how the pieces connect. The fresh challenge isn't comprehension. It's execution.",
      },
      {
        type: "paragraph",
        text: "What's required goes beyond systems thinking - it's 'systems doing'.",
      },
      {
        type: "paragraph",
        text: "McKinsey estimates that even high-performing companies lose around 30% of potential value between strategy origination and its execution. PwC found that 63% of CMOs are missing opportunities because they can't make decisions fast enough. Gartner says marketers use less than half of their tech stack's capability. And IBM's latest CMO study concludes that most marketing organisations are structurally incapable of delivering what boards now demand.",
      },
      {
        type: "paragraph",
        text: "There's a consistent pattern: marketing leaders know what needs to happen but they can't make the machine do it. That's not a thinking problem. It's a doing problem.",
      },
      {
        type: "paragraph",
        text: "What I call 'systems doing' involves actively rewiring how the parts work together. Redesigning workflows. Simplifying bloated stacks. Fixing the handoffs where work gets stuck between teams. Making adoption stick rather than letting it slip.",
      },
      {
        type: "paragraph",
        text: "AI has sharpened the urgency. Every new capability layered onto a system that wasn't built for it creates more complexity, not less. Interventions and products framed as solutions become part of the clutter.",
      },
      {
        type: "paragraph",
        text: "The CMO's role is becoming one of orchestrator - but orchestration only works when the operating model underneath can keep pace. And that's a tall order when the marketing team also has campaigns to run, a sales team to feed, and quarterly numbers to hit. It's asking for the plane to be rebuilt while in flight.",
      },
      {
        type: "paragraph",
        text: "So, the job spec is changing but the infrastructure needs to change with it. As has always been the case, the CMOs who thrive won't just be the best strategists - they'll be the ones who can make the system move.",
      },
      {
        type: "paragraph",
        text: "If all that sounds sensible but daunting, contact us to book a free Drag Diagnostic - a 60-minute conversation about where friction is costing you the most and what to tackle first.",
      },
    ],
  },
  "shadow-ai-not-it-problem": {
    title: "Shadow AI isn't an IT problem. It's yours.",
    excerpt:
      "Shadow AI is a threat to growth and a technical or regulatory solution isn't the answer. Enter the CMO.",
    category: "Marketing Leadership",
    date: "April 2026",
    readTime: "2 min read",
    author: "Ben Scoggins",
    authorRole: "Co-founder",
    heroImage: "/images/insights/shadow-ai-not-it-problem.jpg",
    body: [
      {
        type: "paragraph",
        text: "Most CMOs have far less control over their operating model than they think.",
      },
      {
        type: "paragraph",
        text: "Microsoft research published in October 2025 found that 71% of UK employees have used AI tools that aren't approved by their employer. In marketing departments, the number is almost certainly higher. Not because marketers are reckless, but because they're resourceful. Marketing teams move faster than most functions, they struggle to get what they need from bloated martech stacks, and they quietly find workarounds. Always have.",
      },
      {
        type: "paragraph",
        text: "The difference now is that the workarounds have become intelligent. They learn. They connect to data. And they tend to operate outside any governance framework the organisation has in place.",
      },
      {
        type: "paragraph",
        text: "The industry has started calling it Shadow AI. It sounds dramatic - a tad 'Smiley's People' - but the risk is real enough. Gartner estimates that 40% of enterprises will suffer an AI-related security or compliance breach by 2030. When that happens, the initial instinct will be to look at IT. But the rise of Shadow AI isn't an IT failure. It's an operating-model failure. Unclear guardrails, inefficient workflows and slow decisions have widened the gap between how risk is managed and how commercial work actually gets done.",
      },
      {
        type: "paragraph",
        text: "IT's natural response will be to restrict access. That's their modus operandi - act quick and lock things down. But you can't ban your way out of Shadow AI any more than you could ban your way out of BYOD - Bring Your Own Device - a decade or so ago. Restriction doesn't remove demand. It just pushes it further underground.",
      },
      {
        type: "paragraph",
        text: "This is where the opportunity sits for CMOs willing to step in - and it is an opportunity. Because the only way to close the gap between growth objectives and risk management is to redesign the workflows where the gaps are opening. That means building AI into sanctioned processes, creating guardrails that are embedded in how teams actually work rather than bolted on as policy, and giving people tools that are better than the ones they're finding for themselves.",
      },
      {
        type: "paragraph",
        text: "Shadow AI is a symptom. The operating model is the cause. And for CMOs prepared to lead the response rather than wait for IT to own it, it's also a route to a bigger seat at the boardroom table.",
      },
      {
        type: "paragraph",
        text: "If this all sounds sensible but you're unsure where to start in reviewing your own marketing operating model, speak to us about the Drag Diagnostic - a free, 60-minute conversation about where friction is costing you the most and what to tackle first.",
      },
    ],
  },
  "when-more-ai-means-less-progress": {
    title: "When more AI means less progress.",
    excerpt:
      "'AI brain fry' is real but not inevitable. The key to stopping it lies in better understanding your operating model.",
    category: "Marketing orchestration",
    date: "April 2026",
    readTime: "3 min read",
    author: "Ben Scoggins",
    authorRole: "Co-founder",
    heroImage: "/images/insights/when-more-ai-means-less-progress.jpg",
    body: [
      {
        type: "paragraph",
        text: "There's a story CMOs are being fed right now, and it goes like this: adopt more AI into your systems, and your team will move faster. It sounds right. It feels right. But the evidence says otherwise.",
      },
      {
        type: "paragraph",
        text: "An extensive University of California Berkeley study found that AI intensified work rather than freeing up time. Goldman Sachs found no meaningful relationship between AI adoption and productivity at an economy-wide level. And a recent BCG study of nearly 1,500 workers found that the act of overseeing AI - orchestrating outputs, switching between tools, validating decisions - led to a 12% increase in mental fatigue and 19% greater information overload.",
      },
      {
        type: "paragraph",
        text: "The pattern is consistent. But what's happening?",
      },
      {
        type: "paragraph",
        text: "The issue is that most organisations are adding AI faster than their teams can absorb it. This means that AI tools are being bolted to existing ways of working without redesigning those workflows. The result isn't efficiency. It's an extra layer of cognitive load on teams that were already stretched.",
      },
      {
        type: "paragraph",
        text: "And that load is real.",
      },
      {
        type: "paragraph",
        text: "Every AI output rightly requires human judgement - the need for interpretation, validation, and decision-making to determine what to do next. This isn't a systemic flaw, it's where humans add the most value. But when you multiply those touchpoints across a dozen tools without rethinking how decisions flow through a team, you don't get more leverage. You just get more noise. People spend their time, and mental capacity, orchestrating AI rather than doing the work that the AI were supposed to free them from.",
      },
      {
        type: "paragraph",
        text: "This matters acutely in marketing, which is one of the most decision-rich environments in any organisation. Every campaign, every customer journey, every piece of content involves calls that can't be automated away, nor should they be. The value humans bring is vital to a company's competitive advantage and their growth - it's in interpretation, context-setting, and the ability to act when the data doesn't give a clean answer. AI should be sharpening those decisions, not multiplying them.",
      },
      {
        type: "paragraph",
        text: "The AI maximalists will argue these are teething problems - and that agents will eventually strip out the noise and the need for so many human decisions. And for some narrow, repeatable tasks, they're probably right. But most marketing decisions exist precisely because they require human judgement. And the results are better for it.",
      },
      {
        type: "paragraph",
        text: "The answer isn't to pull back from AI, or even to slow down. But there is a need to stop layering AI on top of roles and processes that weren't designed for it. Workflows need rethinking. Decision rights need clarifying. The relationship between human judgement and machine output needs to be remodelled with intention, not bolted on as an afterthought. Until that happens, more AI will keep meaning less progress.",
      },
      {
        type: "paragraph",
        text: "That's not a technology problem. It's an operating model problem. And the organisations that treat it as one will be far quicker to realise the benefits of the AI promise.",
      },
      {
        type: "paragraph",
        text: "If all this sounds sensible enough but you're unsure where to start, book a Drag Diagnostic - a free, 60-minute conversation about where friction is costing you the most and what to tackle first.",
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
              
              // Check if this paragraph contains the Drag Diagnostic link
              if (block.text.includes("Get in touch to schedule a Drag Diagnostic")) {
                return (
                  <p
                    key={i}
                    className="mb-6 text-lg leading-relaxed text-brand-dark/80"
                  >
                    {block.text.split("Get in touch to schedule a Drag Diagnostic").map((part, idx, arr) => (
                      <span key={idx}>
                        {part}
                        {idx < arr.length - 1 && (
                          <Link
                            href="/contact#book"
                            className="font-semibold text-brand-dark underline hover:text-brand-pink transition-colors"
                          >
                            Get in touch to schedule a Drag Diagnostic
                          </Link>
                        )}
                      </span>
                    ))}
                  </p>
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
