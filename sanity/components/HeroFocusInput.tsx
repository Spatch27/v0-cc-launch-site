"use client"

import type {CSSProperties, MouseEvent} from "react"
import {set, unset, type StringInputProps} from "sanity"
import {
  HERO_FOCUS_OPTIONS,
  isHeroFocus,
  nextHeroFocus,
  type HeroFocus,
} from "../../lib/sanity/heroFocus"

const choiceStyle = (selected: boolean, locked: boolean): CSSProperties => ({
  appearance: "button",
  WebkitAppearance: "button",
  cursor: locked ? "not-allowed" : "pointer",
  pointerEvents: "auto",
  position: "relative",
  zIndex: 1,
  minHeight: 36,
  padding: "6px 12px",
  borderRadius: 6,
  border: selected ? "2px solid #101112" : "1px solid #b5b5b8",
  background: selected ? "#101112" : "#ffffff",
  color: selected ? "#ffffff" : "#101112",
  font: "inherit",
  lineHeight: 1.2,
})

/**
 * Crop focus is a row of buttons, not Sanity's radio or select list.
 * Those widgets are an invisible native input. The site CSS around Studio
 * (overflow clipping and form-control resets) stops a click from changing them.
 * Mouse down is cancelled so a focus update cannot drop the click before it lands.
 */
export function HeroFocusInput(props: StringInputProps) {
  const {elementProps, onChange, readOnly, value} = props
  const current = typeof value === "string" && isHeroFocus(value) ? value : undefined
  const locked = Boolean(readOnly || elementProps.readOnly)

  const choose = (choice: HeroFocus) => {
    if (locked) return
    const next = nextHeroFocus(current, choice)
    onChange(next ? set(next) : unset())
  }

  const keepClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div
      ref={elementProps.ref}
      id={elementProps.id}
      aria-describedby={elementProps["aria-describedby"]}
      aria-label="Crop focus"
      role="group"
      tabIndex={-1}
      onBlur={elementProps.onBlur}
      onFocus={elementProps.onFocus}
      style={{...elementProps.style, display: "flex", flexWrap: "wrap", gap: 8, position: "relative"}}
    >
      {HERO_FOCUS_OPTIONS.map((option) => {
        const selected = current === option.value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            disabled={locked}
            onMouseDown={keepClick}
            onClick={() => choose(option.value)}
            style={choiceStyle(selected, locked)}
          >
            {option.title}
          </button>
        )
      })}
    </div>
  )
}
