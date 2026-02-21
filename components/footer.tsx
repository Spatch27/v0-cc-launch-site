"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Logo } from "@/components/logo"

const navigateLinks = [
  { label: "Approach", href: "/approach" },
  { label: "Outcomes", href: "/outcomes" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const connectLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
  { label: "Email", href: "mailto:hello@committedcitizens.co.uk", external: false },
  { label: "Substack", href: "https://substack.com", external: true },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden text-brand-dark">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CC%20blend%20background-VpfgyiS6MyAjc7Ce2dMvMIdbEjmz3U.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'rotate(180deg)',
        }}
      />
      
      {/* Large CTA area */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 mx-auto max-w-[1400px] px-6 pt-24 pb-16 lg:px-12 lg:pt-32 lg:pb-20"
      >
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
          {/* Left: big footer headline */}
          <motion.div variants={fadeInUp} className="max-w-lg">
            <Link href="/" className="group mb-8 inline-block" aria-label="Committed Citizens home">
              <Logo variant="dark" className="h-12 w-auto" />
            </Link>
            <p className="mt-6 font-display text-3xl font-bold leading-snug text-brand-dark lg:text-4xl">
              Freedom from drag.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-brand-dark/70">
              We redesign how marketing work flows. Embedded consultancy that helps CMOs remove operational drag.
            </p>
          </motion.div>

          {/* Right: link columns */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark/60">
                Navigate
              </h3>
              <ul className="flex flex-col gap-4">
                {navigateLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="relative inline-block text-sm text-brand-dark/70 font-medium transition-all duration-300 hover:text-brand-dark hover:font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-dark after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark/60">
                Connect
              </h3>
              <ul className="flex flex-col gap-4">
                {connectLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="relative inline-block text-sm text-brand-dark/70 font-medium transition-all duration-300 hover:text-brand-dark hover:font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-dark after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Copyright bar */}
      <div className="relative z-10 border-t border-brand-dark/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 pb-24 lg:px-12 lg:pb-6">
          <p className="text-xs text-brand-dark/70">
            &copy; {new Date().getFullYear()} Committed Citizens Ltd. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="relative inline-block text-xs text-brand-dark/70 font-medium transition-all duration-300 hover:text-brand-dark hover:font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-dark after:w-0 after:transition-all after:duration-300 hover:after:w-full"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
