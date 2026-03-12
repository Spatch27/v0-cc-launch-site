"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { fadeInUp, staggerContainer } from "@/lib/animations"

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
  useEffect(() => {
    // Load Supascribe script
    const script = document.createElement("script")
    script.src = "https://js.supascribe.com/v1/loader/Lh6325se05ekSo4cfYYlMSvZLs13.js"
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])
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
      
      {/* Main footer content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 pt-12 pb-8 lg:pt-16 lg:pb-10"
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 space-y-12">
          {/* Footer bottom row: Substack embed left, nav links right */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            {/* Substack embed - left */}
            <div className="w-full lg:w-auto">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
                Subscribe to our Substack
              </h3>
              <div data-supascribe-embed-id="351913576742" data-supascribe-subscribe />
              <p className="mt-4 max-w-xs text-sm text-brand-dark">
                Original thinking on marketing, transformation, and removing operational drag. No spam, ever.
              </p>
            </div>

            {/* Link columns - right */}
            <div className="grid grid-cols-2 gap-10 lg:gap-16">
              {/* Navigate column */}
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark">
                  Navigate
                </h3>
                <ul className="flex flex-col gap-3">
                  {navigateLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="relative inline-block text-sm text-brand-dark font-medium transition-all duration-300 hover:font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-dark after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect column */}
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
                        className="relative inline-block text-sm text-brand-dark font-medium transition-all duration-300 hover:font-bold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-dark after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Copyright bar */}
      <div className="relative z-10 border-t border-brand-dark/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 pb-24 lg:px-12 lg:pb-4">
          <p className="text-xs text-brand-dark">
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
