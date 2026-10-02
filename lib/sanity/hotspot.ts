import type {SanityHeroHotspot} from "./types"

/**
 * CSS object-position for a Sanity hotspot.
 * Returns the fallback when no focal point is stored.
 */
export function objectPositionFromHotspot(
  hotspot: SanityHeroHotspot | null | undefined,
  fallback?: string,
): string | undefined {
  if (
    hotspot &&
    typeof hotspot.x === "number" &&
    typeof hotspot.y === "number" &&
    Number.isFinite(hotspot.x) &&
    Number.isFinite(hotspot.y)
  ) {
    return `${hotspot.x * 100}% ${hotspot.y * 100}%`
  }

  return fallback
}
