"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface LazySectionProps {
  children: ReactNode
  /** Root margin for intersection observer - default "200px" loads content 200px before it enters viewport */
  rootMargin?: string
  /** Minimum height to prevent layout shift while loading */
  minHeight?: string
  /** Optional className for the wrapper */
  className?: string
}

/**
 * Defers rendering of below-the-fold sections until they're about to enter the viewport.
 * This improves LCP by reducing initial JavaScript execution and DOM size.
 * 
 * When JavaScript is disabled, the noscript-visible class in globals.css ensures
 * content is still visible to users.
 */
export function LazySection({
  children,
  rootMargin = "200px",
  minHeight = "100px",
  className = "",
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Use IntersectionObserver to detect when section is approaching viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div 
      ref={ref} 
      className={`${className} noscript-visible`} 
      style={{ minHeight: shouldRender ? undefined : minHeight }}
    >
      {/* Always render children in DOM but hide visually until JS triggers */}
      {/* noscript-visible class ensures content shows when JS is disabled */}
      <div className={shouldRender ? undefined : "js-lazy-hidden"}>
        {children}
      </div>
    </div>
  )
}
