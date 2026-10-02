export const HERO_FOCUS_OPTIONS = [
  {title: "Top", value: "top"},
  {title: "Upper", value: "upper"},
  {title: "Centre", value: "centre"},
  {title: "Lower", value: "lower"},
  {title: "Bottom", value: "bottom"},
] as const

export type HeroFocus = (typeof HERO_FOCUS_OPTIONS)[number]["value"]

/** Vertical object-position for each dropdown value. Horizontal position stays centred. */
const HERO_FOCUS_OBJECT_POSITION: Record<HeroFocus, string> = {
  top: "center 0%",
  upper: "center 25%",
  centre: "center 50%",
  lower: "center 75%",
  bottom: "center 100%",
}

export function isHeroFocus(value: string | null | undefined): value is HeroFocus {
  return HERO_FOCUS_OPTIONS.some((option) => option.value === value)
}

/**
 * CSS object-position for a crop-focus choice.
 * Undefined when the field is empty or not one of the dropdown values, so callers can keep their existing crop.
 */
export function objectPositionFromHeroFocus(
  focus: string | null | undefined,
): string | undefined {
  if (!isHeroFocus(focus)) {
    return undefined
  }

  return HERO_FOCUS_OBJECT_POSITION[focus]
}
