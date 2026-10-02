"use client"

import type {CSSProperties, MouseEvent, PointerEvent} from "react"
import {set, unset, type StringInputProps} from "sanity"
import {
  HERO_FOCUS_OPTIONS,
  isHeroFocus,
  nextHeroFocus,
  type HeroFocus,
} from "../../lib/sanity/heroFocus"

/**
 * Sanity copies a boolean onto elementProps.readOnly for every string input.
 * That DOM flag is not a document lock. The document form passes readOnly: true
 * only when the open document cannot be edited.
 */
function isDocumentReadOnly(readOnly: unknown): boolean {
  return readOnly === true
}

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
  fontWeight: selected ? 600 : 400,
  lineHeight: 1.2,
  outline: "2px solid transparent",
  outlineOffset: 2,
})

export function HeroFocusInput(props: StringInputProps) {
  const {elementProps, onChange, readOnly, value} = props
  const current = typeof value === "string" && isHeroFocus(value) ? value : undefined
  const locked = isDocumentReadOnly(readOnly)
  const currentLabel = HERO_FOCUS_OPTIONS.find((option) => option.value === current)?.title

  const choose = (choice: HeroFocus) => {
    if (locked) return
    const next = nextHeroFocus(current, choice)
    onChange(next ? set(next) : unset())
  }

  const chooseFromPointer = (choice: HeroFocus, event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return
    choose(choice)
  }

  const chooseFromKeyboard = (choice: HeroFocus, event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail !== 0) return
    choose(choice)
  }

  return (
    <div>
      <style>
        {".hero-focus-choice:focus-visible{outline:2px solid #101112 !important}"}
      </style>
      <div
        ref={elementProps.ref}
        id={elementProps.id}
        aria-describedby={elementProps["aria-describedby"]}
        aria-label="Crop focus"
        role="group"
        onBlur={elementProps.onBlur}
        onFocus={elementProps.onFocus}
        style={{
          ...elementProps.style,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          position: "relative",
          outline: "none",
        }}
      >
        {HERO_FOCUS_OPTIONS.map((option) => {
          const selected = current === option.value
          return (
            <button
              key={option.value}
              type="button"
              className="hero-focus-choice"
              aria-pressed={selected}
              aria-disabled={locked || undefined}
              onPointerDown={(event) => chooseFromPointer(option.value, event)}
              onClick={(event) => chooseFromKeyboard(option.value, event)}
              style={choiceStyle(selected, locked)}
            >
              {option.title}
            </button>
          )
        })}
      </div>
      <p style={{margin: "8px 0 0", fontSize: 13, lineHeight: 1.4, color: "#515164"}}>
        {currentLabel ? `Selected: ${currentLabel}` : "Not set (current crop)"}
      </p>
    </div>
  )
}
