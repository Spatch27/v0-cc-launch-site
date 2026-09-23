"use client"

import { AREA_LETTERS, GAP_AREAS, type GapAreaKey } from "@/lib/gap"
import { cn } from "@/lib/utils"

interface GapAreaListProps {
  selected: readonly GapAreaKey[]
  atLimit: boolean
  onToggle: (key: GapAreaKey) => void
}

export function GapAreaList({ selected, atLimit, onToggle }: GapAreaListProps) {
  return (
    <ul className="mt-6 flex flex-col border-t border-brand-dark/10">
      {GAP_AREAS.map((area, index) => {
        const letter = AREA_LETTERS[index]
        const isSelected = selected.includes(area.key)
        const isLocked = atLimit && !isSelected

        return (
          <li key={area.key}>
            <button
              type="button"
              aria-pressed={isSelected}
              aria-disabled={isLocked}
              onClick={() => onToggle(area.key)}
              className={cn(
                "flex w-full items-start gap-3 border-b border-brand-dark/10 px-1 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink",
                isSelected ? "bg-[#FFE8F2]" : "hover:bg-brand-light/40",
                isLocked && "cursor-not-allowed opacity-45 hover:bg-transparent"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold",
                  isSelected ? "bg-brand-pink text-brand-dark" : "bg-brand-light text-brand-dark"
                )}
              >
                {letter}
              </span>
              <span className="pt-1 text-base font-medium leading-snug text-brand-dark">
                <span className="sr-only">{letter}. </span>
                {area.label}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
