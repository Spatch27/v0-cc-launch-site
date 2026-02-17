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
    <footer className="bg-brand-dark text-brand-white">
      {/* Large CTA area */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="mx-auto max-w-[1400px] px-6 pt-24 pb-16 lg:px-12 lg:pt-32 lg:pb-20"
      >
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
          {/* Left: big footer headline */}
          <motion.div variants={fadeInUp} className="max-w-lg">
            <Link href="/" className="group mb-8 inline-block" aria-label="Committed Citizens home">
              <Logo variant="white" className="h-12 w-auto" />
            </Link>
            <p className="mt-6 font-display text-3xl font-bold leading-snug text-brand-white lg:text-4xl">
              Freedom from drag.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-brand-white/50">
              We redesign how marketing work flows. Embedded consultancy that helps CMOs remove operational drag.
            </p>
          </motion.div>

          {/* Right: link columns */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-grey">
                Navigate
              </h3>
              <ul className="flex flex-col gap-4">
                {navigateLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-white/60 transition-colors duration-300 hover:text-brand-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-grey">
                Connect
              </h3>
              <ul className="flex flex-col gap-4">
                {connectLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-brand-white/60 transition-colors duration-300 hover:text-brand-white"
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
      <div className="border-t border-brand-white/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 lg:px-12">
          <p className="text-xs text-brand-white/30">
            &copy; {new Date().getFullYear()} Committed Citizens. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="text-xs text-brand-white/30 transition-colors hover:text-brand-white/60"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
