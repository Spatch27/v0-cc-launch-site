const stats = [
  { value: "5", label: "areas we talk through" },
  { value: "1", label: "project that can’t wait" },
  { value: "1", label: "personal video in reply" },
] as const

export function WaypointHero() {
  return (
    <section className="bg-brand-pink px-6 pt-[calc(4.5rem+2rem)] pb-8 text-brand-dark lg:px-12 lg:pt-[calc(5.5rem+3.5rem)] lg:pb-14">
      <style>{`
        .waypoint-hero-rule { border-color: #181716; }
      `}</style>
      <div className="mx-auto grid max-w-[1400px] items-start gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-center lg:gap-x-16">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] uppercase">The marketing gap</p>
          <h1 className="mt-3 text-balance font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-tight">
            Where’s the gap in your marketing?
          </h1>
          <p className="mt-5 max-w-[60ch] text-balance text-lg leading-relaxed lg:text-xl">
            Tell us about the function you have, the one you’ll need next, and the project that can’t wait. We’ll read your details back once, near the start. Tell us how to spell anything we’ve got wrong. Then a short personal video, with our initial read and where we’d begin.
          </p>
          <ul className="waypoint-hero-rule mt-7 grid grid-cols-3 gap-x-3 border-y border-brand-dark py-3 lg:hidden" aria-label="What this takes">
            {stats.map((stat) => (
              <li key={stat.label} className="min-w-0">
                <span className="block font-display text-[2rem] font-bold leading-none tabular-nums">{stat.value}</span>
                <span className="mt-1 block text-balance text-xs leading-tight">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="hidden w-full lg:block" aria-label="What this takes">
          {stats.map((stat) => (
            <li key={stat.label} className="waypoint-hero-rule flex items-center gap-6 border-b border-brand-dark py-4 first:border-t">
              <span className="w-[1.4ch] shrink-0 font-display text-[clamp(3.5rem,5vw,5.25rem)] font-bold leading-none tabular-nums">
                {stat.value}
              </span>
              <span className="text-balance text-lg leading-snug">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
