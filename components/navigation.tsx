"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Approach", href: "/approach" },
  { label: "Outputs", href: "/outputs" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo - Desktop lockup / Mobile icon */}
        <Link href="/" className="flex items-center gap-2" aria-label="Committed Citizens home">
          <LogoIcon className="h-8 w-8" />
          <LogoWordmark className="hidden h-6 sm:block" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-pink ${
                pathname === link.href
                  ? "text-brand-pink"
                  : "text-brand-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-brand-pink px-5 py-2 text-sm font-semibold text-brand-dark transition-opacity hover:opacity-90"
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-brand-white md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-brand-dark md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 pb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-brand-pink ${
                    pathname === link.href
                      ? "text-brand-pink"
                      : "text-brand-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-block rounded-full bg-brand-pink px-6 py-3 text-center text-sm font-semibold text-brand-dark"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 0C8.954 0 0 8.954 0 20h20V0z"
        fill="#fc66a7"
      />
      <path
        d="M20 0v20h20C40 8.954 31.046 0 20 0z"
        fill="#ffffff"
      />
      <path
        d="M0 20c0 11.046 8.954 20 20 20V20H0z"
        fill="#ffffff"
        opacity="0.6"
      />
      <path
        d="M20 20v20c11.046 0 20-8.954 20-20H20z"
        fill="#ff8600"
      />
    </svg>
  )
}

function LogoWordmark({ className }: { className?: string }) {
  return (
    <span className={`font-display text-lg font-bold leading-tight tracking-tight text-brand-white ${className || ""}`}>
      <span className="block text-[0.85em] font-bold">Committed</span>
      <span className="block text-[0.7em] font-medium tracking-widest uppercase">Citizens</span>
    </span>
  )
}
