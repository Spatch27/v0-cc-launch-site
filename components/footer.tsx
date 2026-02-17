import Link from "next/link"

const navigateLinks = [
  { label: "Approach", href: "/approach" },
  { label: "Outputs", href: "/outputs" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const connectLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
  { label: "Email", href: "mailto:hello@committedcitizens.co.uk", external: false },
  { label: "Substack", href: "https://substack.com", external: true },
]

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
]

export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Logo and tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2" aria-label="Committed Citizens home">
              <FooterLogo />
            </Link>
            <p className="text-lg font-display text-brand-light/80 italic">
              Freedom from drag.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-3 gap-8 lg:gap-16">
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-pink">
                Navigate
              </h3>
              <ul className="flex flex-col gap-3">
                {navigateLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-light/70 transition-colors hover:text-brand-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-pink">
                Connect
              </h3>
              <ul className="flex flex-col gap-3">
                {connectLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-brand-light/70 transition-colors hover:text-brand-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-pink">
                Legal
              </h3>
              <ul className="flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-light/70 transition-colors hover:text-brand-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-brand-white/10 pt-8">
          <p className="text-sm text-brand-light/50">
            &copy; {new Date().getFullYear()} Committed Citizens
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLogo() {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M20 0C8.954 0 0 8.954 0 20h20V0z" fill="#fc66a7" />
        <path d="M20 0v20h20C40 8.954 31.046 0 20 0z" fill="#ffffff" />
        <path d="M0 20c0 11.046 8.954 20 20 20V20H0z" fill="#ffffff" opacity="0.6" />
        <path d="M20 20v20c11.046 0 20-8.954 20-20H20z" fill="#ff8600" />
      </svg>
      <span className="font-display text-lg font-bold leading-tight tracking-tight text-brand-white">
        <span className="block text-[0.85em] font-bold">Committed</span>
        <span className="block text-[0.7em] font-medium tracking-widest uppercase">Citizens</span>
      </span>
    </div>
  )
}
