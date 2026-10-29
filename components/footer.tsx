"use client"

import Link from "next/link"
import { SubstackSubscribeForm } from "@/components/substack-subscribe-form"

// Static stand-in for the Website Carbon badge. The live widget
// (#wcb.carbonbadge + https://unpkg.com/website-carbon-badges@1.1.3/b.min.js
// via next/script) calls api.websitecarbon.com/b, which 503s and shows
// "No Result", and that script caches the response in localStorage.
// To restore it, put that node and script back (see commit 40fd102).
function WebsiteCarbonBadge() {
  return (
    // Own row on small screens; beside the copyright from the md breakpoint.
    <div className="basis-full md:basis-auto">
      <a
        href="https://www.websitecarbon.com/website/committedcitizens-co-uk/"
        target="_blank"
        rel="noopener"
        className="inline-block max-w-full rounded-[2px] border border-solid bg-brand-yellow-light px-[0.9375rem] py-[0.625rem] text-left font-sans text-xs leading-snug text-brand-dark no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ borderColor: "color-mix(in srgb, var(--brand-dark) 28%, transparent)" }}
      >
        This page emitted just <b className="font-bold">0.05g of CO2</b> per visit, <b className="font-bold">rating A</b>
      </a>
    </div>
  )
}

declare global {
  interface Window {
    Cookiebot?: {
      show: () => void
    }
  }
}

const navigateLinks = [
  { label: "Approach", href: "/approach" },
  { label: "Outcomes", href: "/outcomes" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const connectLinks = [
  { label: "Email", href: "mailto:info@committedcitizens.co.uk", external: false },
  { label: "Substack", href: "https://substack.com/@committedcitizens", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/committedcitizens/", external: true },
]

export function Footer() {
  const handleCookieSettings = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (window.Cookiebot?.show) {
      window.Cookiebot.show()
    }
  }

  return (
    <footer data-site-footer className="relative overflow-hidden text-brand-dark">
      {/* Critical CSS sets unlayered .w-full, which would keep the copyright
          group full width and drop the legal links under it. From the md
          breakpoint the group shrinks so the links stay on the right. */}
      <style>{`
        @media (min-width: 48rem) {
          [data-site-footer] .footer-legal-meta {
            width: auto;
          }
        }
      `}</style>
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CC%20blend%20background-VpfgyiS6MyAjc7Ce2dMvMIdbEjmz3U.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 z-0 h-full w-full rotate-180 object-cover"
      />
      <div className="relative z-10 pt-12 pb-8 lg:pt-16 lg:pb-10 px-6 lg:px-12">
        <div className="mx-auto max-w-[1400px] space-y-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="w-full lg:max-w-xs lg:flex-shrink-0">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
                Subscribe to our Substack
              </h3>
              <SubstackSubscribeForm />
              <p className="mt-4 max-w-xs text-sm text-brand-dark">
                Original thinking on marketing, AI and how the work gets done. No spam, ever.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 lg:gap-16 flex-shrink-0 lg:mr-0">
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
                  Navigate
                </h3>
                <ul className="flex flex-col gap-3">
                  {navigateLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="relative inline-block text-sm text-brand-dark font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-dark after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
                  Connect
                </h3>
                <ul className="flex flex-col gap-3">
                  {connectLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="relative inline-block text-sm text-brand-dark font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-dark after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 border-t border-brand-dark/10 px-6 lg:px-12">
        {/* The yellow box is vertically centred with the copyright. Its padding
            makes a shared text baseline hang below the line. */}
        <div className="footer-legal-row mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
          <div className="footer-legal-meta flex w-full max-w-full flex-wrap items-center gap-x-6 gap-y-3 md:w-auto">
            <p className="text-xs text-brand-dark">
              &copy; {new Date().getFullYear()} Committed Citizens Ltd. All rights reserved.
            </p>
            <WebsiteCarbonBadge />
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="#"
              onClick={handleCookieSettings}
              className="relative inline-block text-xs text-brand-dark/70 font-medium transition-all duration-300 hover:text-brand-dark hover:font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-dark after:w-0 after:transition-all after:duration-300 hover:after:w-full"
            >
              Cookie Settings
            </a>
            <Link
              href="/privacy"
              prefetch={false}
              className="relative inline-block text-xs text-brand-dark/70 font-medium transition-all duration-300 hover:text-brand-dark hover:font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-dark after:w-0 after:transition-all after:duration-300 hover:after:w-full"
            >
              Privacy
            </Link>
            <Link
              href="/llms.txt"
              prefetch={false}
              className="relative inline-block text-xs text-brand-dark/70 font-medium transition-all duration-300 hover:text-brand-dark hover:font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-dark after:w-0 after:transition-all after:duration-300 hover:after:w-full"
            >
              For AI agents
            </Link>
          </div>
        </div>
      </div>
      <div
        className="relative z-10 h-[calc(6.5rem+env(safe-area-inset-bottom,0px))] md:hidden"
        aria-hidden
      />
    </footer>
  )
}
