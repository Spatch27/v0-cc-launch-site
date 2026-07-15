export function HeroSection() {
  return (
    <>
      <style>{`
        .cc-hero-heading {
          font-size: 3.75rem;
        }

        .cc-hero-subtitle {
          animation: cc-hero-subtitle-in 700ms 200ms both cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes cc-hero-subtitle-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 768px) {
          .cc-hero-heading {
            font-size: 8rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cc-hero-subtitle {
            animation: none;
          }
        }
      `}</style>
      <section className="relative min-h-svh bg-brand-orange px-6 lg:h-screen lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-52 pt-40 pb-24 lg:h-full lg:justify-between lg:gap-32 lg:pt-48 lg:pb-16">
          <h1 className="cc-hero-heading max-w-5xl font-display font-bold leading-[0.95] tracking-tight text-brand-dark">
            Freedom
            <br />
            from <em>drag</em>.
          </h1>

          <div className="cc-hero-subtitle flex justify-end">
            <p className="max-w-[28rem] text-right text-xl font-normal leading-relaxed text-brand-dark lg:font-bold">
              We are the consultancy for CMOs who want their marketing to move <em>faster</em>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
