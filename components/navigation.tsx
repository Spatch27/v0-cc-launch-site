"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Logo } from "@/components/logo"

const navLinks = [
  { label: "Approach", href: "/approach" },
  { label: "Outcomes", href: "/outcomes" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

/* Map each route to its hero background color and whether the bg is dark */
const heroColorMap: Record<string, { bg: string; isDark: boolean }> = {
  "/":         { bg: "bg-brand-orange",       isDark: false },
  "/approach": { bg: "bg-brand-pink",         isDark: false },
  "/outcomes": { bg: "bg-brand-dark",         isDark: true },
  "/insights": { bg: "bg-brand-light",        isDark: false },
  "/about":    { bg: "bg-brand-yellow-deep",  isDark: false },
  "/contact":  { bg: "bg-brand-yellow-light", isDark: false },
  "/privacy":  { bg: "bg-brand-dark",         isDark: true },
}

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [hoveredMobileLink, setHoveredMobileLink] = useState<string | null>(null)

  const colors = heroColorMap[pathname] ?? heroColorMap["/"]

  /* Dark logo on all backgrounds except dark grey hero; stays same on scroll */
  const logoVariant = colors.isDark ? "white" : "dark"

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
          scrolled ? "backdrop-blur-2xl bg-brand-light/20" : colors.bg
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
                const linkColors = heroColorMap[link.href] ?? heroColorMap["/"]
                
                // Special case: Outcomes uses white lozenge instead of dark
                const activeBg = link.href === "/outcomes" ? "bg-brand-white" : linkColors.bg
                const activeText = link.href === "/outcomes" ? "text-brand-dark" : (linkColors.isDark ? "text-brand-white" : "text-brand-dark")
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative px-5 py-2"
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-full ${activeBg}`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    {!isActive && hoveredLink === link.href && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 rounded-full bg-brand-white"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span
                      className={`relative z-10 text-sm font-medium tracking-wide transition-colors duration-300 ${
                        isActive
                          ? activeText
                          : hoveredLink === link.href
                            ? "text-brand-dark"
                            : "text-brand-white"
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
        <div className="flex items-center gap-0.5 rounded-full bg-brand-dark px-1.5 py-1.5 shadow-lg shadow-brand-dark/25 sm:gap-1 sm:px-2 sm:py-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            const linkColors = heroColorMap[link.href] ?? heroColorMap["/"]
            
            // Special case: Outcomes uses white lozenge instead of dark
            const activeBg = link.href === "/outcomes" ? "bg-brand-white" : linkColors.bg
            const activeText = link.href === "/outcomes" ? "text-brand-dark" : (linkColors.isDark ? "text-brand-white" : "text-brand-dark")
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex-shrink-0 px-2.5 py-1.5 sm:px-3.5 sm:py-2"
                onMouseEnter={() => setHoveredMobileLink(link.href)}
                onMouseLeave={() => setHoveredMobileLink(null)}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill-mobile"
                    className={`absolute inset-0 rounded-full ${activeBg}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {!isActive && hoveredMobileLink === link.href && (
                  <motion.span
                    layoutId="nav-hover-mobile"
                    className="absolute inset-0 rounded-full bg-brand-white"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span
                  className={`relative z-10 whitespace-nowrap text-[11px] font-medium tracking-wide transition-colors duration-300 sm:text-xs ${
                    isActive
                      ? activeText
                      : hoveredMobileLink === link.href
                        ? "text-brand-dark"
                        : "text-brand-white"
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
