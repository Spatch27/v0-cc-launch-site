"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Logo } from "@/components/logo"
import { textRollUp, textRollDown } from "@/lib/animations"

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

  /* Match exact routes first, then fall back to prefix match for sub-routes */
  const colors =
    heroColorMap[pathname] ??
    Object.entries(heroColorMap).find(([key]) => pathname.startsWith(key + "/"))?.[1] ??
    heroColorMap["/"]

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
        className={`fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 transition-all duration-500 lg:px-12 lg:py-5 ${
          scrolled ? "backdrop-blur-2xl bg-brand-light/20" : colors.bg
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
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
            <div
              className="flex items-center gap-1 rounded-full bg-brand-dark px-2 py-2"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                const linkColors = heroColorMap[link.href] ?? heroColorMap["/"]
                
                // Special case: Outcomes uses white lozenge instead of dark
                const activeBg = link.href === "/outcomes" ? "bg-brand-white" : linkColors.bg
                const activeText = link.href === "/outcomes" ? "text-brand-dark" : (linkColors.isDark ? "text-brand-white" : "text-brand-dark")
                
                const isHovered = !isActive && hoveredLink === link.href

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative flex items-center px-5 py-2"
                    onMouseEnter={() => setHoveredLink(link.href)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-full ${activeBg}`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    {isHovered && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 rounded-full bg-brand-white"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10 inline-block overflow-hidden">
                      <motion.span
                        initial="initial"
                        animate={isHovered ? "hover" : "initial"}
                        variants={textRollUp}
                        className={`block text-sm font-medium tracking-wide transition-colors duration-200 ${
                          isActive
                            ? activeText
                            : isHovered
                              ? "text-brand-dark"
                              : "text-brand-white"
                        }`}
                      >
                        {link.label}
                      </motion.span>
                      <motion.span
                        initial="initial"
                        animate={isHovered ? "hover" : "initial"}
                        variants={textRollDown}
                        className={`absolute inset-0 block text-sm font-medium tracking-wide transition-colors duration-200 ${
                          isActive
                            ? activeText
                            : isHovered
                              ? "text-brand-dark"
                              : "text-brand-white"
                        }`}
                      >
                        {link.label}
                      </motion.span>
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
        <div
          className="flex items-center gap-0.5 rounded-full bg-brand-dark px-1.5 py-1.5 shadow-lg shadow-brand-dark/25 sm:gap-1 sm:px-2 sm:py-2"
          onMouseLeave={() => setHoveredMobileLink(null)}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            const linkColors = heroColorMap[link.href] ?? heroColorMap["/"]
            
            // Special case: Outcomes uses white lozenge instead of dark
            const activeBg = link.href === "/outcomes" ? "bg-brand-white" : linkColors.bg
            const activeText = link.href === "/outcomes" ? "text-brand-dark" : (linkColors.isDark ? "text-brand-white" : "text-brand-dark")
            
            const isHovered = !isActive && hoveredMobileLink === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex flex-shrink-0 items-center px-2.5 py-1.5 sm:px-3.5 sm:py-2"
                onMouseEnter={() => setHoveredMobileLink(link.href)}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill-mobile"
                    className={`absolute inset-0 rounded-full ${activeBg}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {isHovered && (
                  <motion.span
                    layoutId="nav-hover-mobile"
                    className="absolute inset-0 rounded-full bg-brand-white"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 inline-block overflow-hidden">
                  <motion.span
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                    variants={textRollUp}
                    className={`block whitespace-nowrap text-[11px] font-medium tracking-wide transition-colors duration-200 sm:text-xs ${
                      isActive
                        ? activeText
                        : isHovered
                          ? "text-brand-dark"
                          : "text-brand-white"
                    }`}
                  >
                    {link.label}
                  </motion.span>
                  <motion.span
                    initial="initial"
                    animate={isHovered ? "hover" : "initial"}
                    variants={textRollDown}
                    className={`absolute inset-0 block whitespace-nowrap text-[11px] font-medium tracking-wide transition-colors duration-200 sm:text-xs ${
                      isActive
                        ? activeText
                        : isHovered
                          ? "text-brand-dark"
                          : "text-brand-white"
                    }`}
                  >
                    {link.label}
                  </motion.span>
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
