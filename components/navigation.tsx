"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"

const navLinks = [
  { label: "Approach", href: "/approach" },
  { label: "Outputs", href: "/outputs" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

/* Map each route to its hero background color and whether the bg is dark */
const heroColorMap: Record<string, { bg: string; isDark: boolean }> = {
  "/":         { bg: "bg-brand-orange",       isDark: false },
  "/approach": { bg: "bg-brand-pink",         isDark: false },
  "/outputs":  { bg: "bg-brand-dark",         isDark: true },
  "/insights": { bg: "bg-brand-light",        isDark: false },
  "/about":    { bg: "bg-brand-yellow-deep",  isDark: false },
  "/contact":  { bg: "bg-brand-yellow-light", isDark: false },
  "/privacy":  { bg: "bg-brand-dark",         isDark: true },
}

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const colors = heroColorMap[pathname] ?? heroColorMap["/"]

  /* Dark logo on all backgrounds except dark grey, where white is used */
  const logoVariant = scrolled || mobileOpen ? "white" : colors.isDark ? "white" : "dark"

  /* Hamburger bar color: dark bars on light hero, white bars on dark hero / scrolled / menu open */
  const barColor =
    mobileOpen || scrolled || colors.isDark
      ? "bg-brand-white"
      : "bg-brand-dark"

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-brand-dark/95 backdrop-blur-md" : colors.bg
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-12 lg:py-5">
        {/* Logo */}
        <Link
          href="/"
          className="group relative z-50 flex items-center"
          aria-label="Committed Citizens home"
        >
          <Logo variant={logoVariant} className="h-10 w-auto lg:h-12" />
        </Link>

        {/* Desktop nav - dark grey lozenge */}
        <div className="hidden md:block">
          <div className="flex items-center gap-1 rounded-full bg-brand-dark px-2 py-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative px-5 py-2"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-brand-white/15"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span
                    className={`relative z-10 text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-brand-white"
                        : "text-brand-white/50 group-hover:text-brand-white"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex w-6 flex-col gap-1.5">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`block h-px w-full origin-center ${barColor}`}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block h-px w-full ${barColor}`}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`block h-px w-full origin-center ${barColor}`}
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-brand-dark md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display text-4xl font-bold transition-colors ${
                      pathname === link.href
                        ? "text-brand-pink"
                        : "text-brand-white hover:text-brand-pink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
