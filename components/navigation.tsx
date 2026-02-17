"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
  const [scrolled, setScrolled] = useState(false)

  const colors = heroColorMap[pathname] ?? heroColorMap["/"]

  /* Dark logo on all backgrounds except dark grey; white when scrolled (dark bg) */
  const logoVariant = scrolled ? "white" : colors.isDark ? "white" : "dark"

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* ─── Top bar: logo only on mobile, logo + nav lozenge on desktop ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-brand-dark/95 backdrop-blur-md" : colors.bg
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-12 lg:py-5">
          {/* Logo */}
          <Link
            href="/"
            className="group relative z-50 flex items-center"
            aria-label="Committed Citizens home"
          >
            <Logo variant={logoVariant} className="h-10 w-auto lg:h-12" />
          </Link>

          {/* Desktop nav lozenge -- hidden below lg */}
          <nav className="hidden lg:block" aria-label="Main navigation">
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
          </nav>
        </div>
      </header>

      {/* ─── Bottom bar: mobile / tablet only (below lg) ─── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-5 pt-2 lg:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex w-full max-w-md items-center justify-between rounded-full bg-brand-dark px-2 py-2 shadow-lg shadow-brand-dark/25">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-3 py-2 sm:px-4"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill-mobile"
                    className="absolute inset-0 rounded-full bg-brand-white/15"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span
                  className={`relative z-10 text-xs font-medium tracking-wide transition-colors duration-300 sm:text-sm ${
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
      </nav>
    </>
  )
}
