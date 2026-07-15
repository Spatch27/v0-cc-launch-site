"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Logo } from "@/components/logo"

const navLinks = [
  { label: "Approach", href: "/approach" },
  { label: "Outcomes", href: "/outcomes" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const heroColorMap: Record<string, { bg: string; isDark: boolean }> = {
  "/": { bg: "bg-brand-orange", isDark: false },
  "/approach": { bg: "bg-brand-pink", isDark: false },
  "/outcomes": { bg: "bg-brand-dark", isDark: true },
  "/insights": { bg: "bg-brand-light", isDark: false },
  "/about": { bg: "bg-brand-yellow-deep", isDark: false },
  "/contact": { bg: "bg-brand-yellow-light", isDark: false },
  "/privacy": { bg: "bg-brand-dark", isDark: true },
}

function NavLabel({ label, mobile = false }: { label: string; mobile?: boolean }) {
  return (
    <span className="relative z-10 block h-5 overflow-hidden">
      <span className="cc-nav-label-track">
        <span className={`cc-nav-label-copy ${mobile ? "text-[11px] sm:text-xs" : "text-sm"}`}>{label}</span>
        <span className={`cc-nav-label-copy ${mobile ? "text-[11px] sm:text-xs" : "text-sm"}`} aria-hidden="true">
          {label}
        </span>
      </span>
    </span>
  )
}

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const colors =
    heroColorMap[pathname] ??
    Object.entries(heroColorMap).find(([key]) => pathname.startsWith(`${key}/`))?.[1] ??
    heroColorMap["/"]
  const logoVariant = colors.isDark ? "white" : "dark"

  const onScroll = useCallback(() => setScrolled(window.scrollY > 20), [])

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [onScroll])

  const linkClass = (href: string, mobile = false) => {
    const isActive = pathname === href
    const linkColors = heroColorMap[href] ?? heroColorMap["/"]
    const activeBg = href === "/outcomes" ? "bg-brand-white" : linkColors.bg
    const activeText = href === "/outcomes" || !linkColors.isDark ? "text-brand-dark" : "text-brand-white"
    return `cc-nav-link ${isActive ? `cc-nav-active ${activeBg} ${activeText}` : "text-brand-white"} group relative flex flex-shrink-0 items-center font-medium tracking-wide ${mobile ? "px-2.5 py-1.5 sm:px-3.5 sm:py-2" : "px-5 py-2"}`
  }

  return (
    <>
      <style>{`
        .cc-desktop-navigation { display: none; }
        .cc-mobile-navigation { display: flex; }
        .cc-navigation-lozenge { width: max-content; max-width: 100%; overflow: hidden; border-radius: 9999px; }
        .cc-nav-link { border-radius: 9999px; transition: background-color 250ms ease, color 250ms ease; }
        .cc-nav-label-track { display: flex; flex-direction: column; transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1); }
        .cc-nav-label-copy { display: flex; height: 1.25rem; align-items: center; white-space: nowrap; }
        .cc-nav-link:not(.cc-nav-active):hover { background-color: var(--brand-white); color: var(--brand-dark); }
        .cc-nav-link:not(.cc-nav-active):hover .cc-nav-label-track { transform: translateY(-1.25rem); }
        @media (prefers-reduced-motion: reduce) {
          .cc-nav-label-track { transition: none; }
          .cc-nav-link:not(.cc-nav-active):hover .cc-nav-label-track { transform: none; }
        }
        @media (min-width: 768px) {
          .cc-desktop-navigation { display: block; }
          .cc-mobile-navigation { display: none; }
        }
      `}</style>

      <header className={`fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 transition-all duration-500 lg:px-12 lg:py-5 ${scrolled ? "bg-brand-light/20 backdrop-blur-2xl" : colors.bg}`}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <Link href="/" className="group relative z-50 flex items-center" aria-label="Committed Citizens home">
            <Logo variant={logoVariant} className="h-10 w-auto lg:h-12" />
          </Link>
          <nav className="cc-desktop-navigation" aria-label="Main navigation">
            <div className="cc-navigation-lozenge relative flex items-center gap-1 bg-brand-dark px-2 py-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                  <NavLabel label={link.label} />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <nav className="cc-mobile-navigation fixed bottom-0 left-0 right-0 z-50 justify-center px-4 pt-2 pb-5" aria-label="Mobile navigation">
        <div className="cc-navigation-lozenge relative flex items-center gap-0.5 bg-brand-dark px-1.5 py-1.5 shadow-lg shadow-brand-dark/25 sm:gap-1 sm:px-2 sm:py-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href, true)}>
              <NavLabel label={link.label} mobile />
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
