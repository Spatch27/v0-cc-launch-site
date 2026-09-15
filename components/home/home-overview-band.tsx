import Link from "next/link"

const products = [
  {
    name: "Flow6",
    duration: "Six weeks",
    description: "Drag diagnostic, Flow Map, and Progress Plan.",
    accent: "bg-brand-pink",
  },
  {
    name: "Fix6",
    duration: "Six weeks",
    description: "Build-and-prove the next fix with your team.",
    accent: "bg-brand-orange",
  },
  {
    name: "Momentum6",
    duration: "Six-week rolling",
    description: "Cycles toward a new marketing operating model.",
    accent: "bg-brand-yellow-deep",
  },
]

export function HomeOverviewBand() {
  return (
    <section
      aria-label="Products and Waypoint"
      className="bg-brand-dark px-6 py-10 text-brand-white lg:px-12 lg:py-12"
    >
      <div className="mx-auto max-w-[1400px] space-y-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-2xl font-bold leading-snug md:text-3xl">
            Flow6, Fix6, and Momentum6.
          </h2>
          <Link
            href="/approach"
            prefetch={false}
            className="text-sm font-semibold text-brand-white/80 underline-offset-4 hover:text-brand-white hover:underline"
          >
            How we work on Approach
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <article key={product.name}>
              <div className={`mb-4 h-1 w-10 ${product.accent}`} />
              <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-white/40">
                {product.duration}
              </p>
              <h3 className="mb-2 font-display text-xl font-bold">{product.name}</h3>
              <p className="text-sm leading-relaxed text-brand-white/70">{product.description}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-brand-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-brand-white/80 lg:text-base">
            Start with a Waypoint: a free 60-minute session. No pitch. No audit. A conversation
            about the drag getting in your team&apos;s way, then a Waypoint Marker within 48 hours.
          </p>
          <Link
            href="/contact#book"
            prefetch={false}
            className="inline-flex w-fit shrink-0 items-center border-2 border-brand-white bg-transparent px-6 py-3 text-sm font-semibold text-brand-white transition-colors hover:bg-brand-white hover:text-brand-dark"
          >
            Book your Waypoint
          </Link>
        </div>
      </div>
    </section>
  )
}
