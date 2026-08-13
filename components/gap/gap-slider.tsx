"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

export const GAP_VERDICTS: Record<number, string> = {
  1: "Already there",
  2: "Nearly there",
  3: "Close",
  4: "Some distance",
  5: "A fair way",
  6: "A long way",
  7: "Nowhere near",
}

const STOPS = [1, 2, 3, 4, 5, 6, 7]

interface GapSliderProps {
  label: string
  value: number
  touched: boolean
  onChange: (value: number) => void
  onTouch: () => void
}

const TOUCH_KEYS = new Set([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
  "PageUp",
  "PageDown",
])

export function GapSlider({ label, value, touched, onChange, onTouch }: GapSliderProps) {
  const id = useId()
  const percent = ((value - 1) / 6) * 100
  const verdict = GAP_VERDICTS[value]

  return (
    <div className="flex flex-col gap-3 py-5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-base font-medium text-brand-dark">
          {label}
        </label>
        <span
          className={cn(
            "shrink-0 text-right text-sm",
            touched ? "font-semibold text-brand-dark" : "italic text-muted-foreground"
          )}
        >
          {touched ? `${verdict} (${value})` : "drag to answer"}
        </span>
      </div>

      <div className="relative flex h-11 items-center touch-none">
        <div className="pointer-events-none absolute inset-x-0 h-1.5 rounded-full bg-brand-light" />
        {touched && (
          <div
            className="pointer-events-none absolute left-0 h-1.5 rounded-full bg-brand-pink"
            style={{ width: `${percent}%` }}
          />
        )}
        <input
          id={id}
          type="range"
          min={1}
          max={7}
          step={1}
          value={value}
          aria-label={label}
          aria-valuetext={verdict}
          onPointerDown={onTouch}
          onKeyDown={(e) => {
            if (TOUCH_KEYS.has(e.key)) onTouch()
          }}
          onChange={(e) => {
            onChange(Number(e.target.value))
            onTouch()
          }}
          className={cn(
            "relative z-10 h-11 w-full cursor-pointer touch-none appearance-none bg-transparent",
            "focus-visible:outline-none",
            "[&::-webkit-slider-runnable-track]:bg-transparent",
            "[&::-moz-range-track]:bg-transparent [&::-moz-range-progress]:bg-transparent",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-[26px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-colors",
            "[&::-moz-range-thumb]:size-[26px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-colors",
            touched
              ? "[&::-webkit-slider-thumb]:border-brand-pink [&::-webkit-slider-thumb]:bg-brand-pink [&::-moz-range-thumb]:border-brand-pink [&::-moz-range-thumb]:bg-brand-pink"
              : "[&::-webkit-slider-thumb]:border-brand-light [&::-webkit-slider-thumb]:bg-brand-white [&::-moz-range-thumb]:border-brand-light [&::-moz-range-thumb]:bg-brand-white",
            "[&:focus-visible::-webkit-slider-thumb]:shadow-[0_0_0_3px_var(--brand-pink)] [&:focus-visible::-moz-range-thumb]:shadow-[0_0_0_3px_var(--brand-pink)]"
          )}
        />
      </div>

      <div className="flex justify-between px-[2px] font-display text-xs text-muted-foreground">
        {STOPS.map((n) => (
          <span key={n} className={cn(touched && value === n && "font-semibold text-brand-dark")}>
            {n}
          </span>
        ))}
      </div>
    </div>
  )
}
