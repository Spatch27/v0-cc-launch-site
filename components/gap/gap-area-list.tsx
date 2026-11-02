"use client"

import { GAP_AREAS, type GapAreaKey, type GapScan } from "@/lib/gap"
import { cn } from "@/lib/utils"
import { GapSlider } from "./gap-slider"

interface GapAreaListProps {
  scanValues: GapScan
  onScanChange: (key: GapAreaKey, value: number) => void
  touched: Set<GapAreaKey>
  onSliderTouch: (key: GapAreaKey) => void
  invalidArea: GapAreaKey | null
  errorMessage: string | null
}

export function GapAreaList({
  scanValues,
  onScanChange,
  touched,
  onSliderTouch,
  invalidArea,
  errorMessage,
}: GapAreaListProps) {
  return (
    <ul className="flex flex-col [&>li:first-child>div]:pt-0" aria-label="How big is the gap in each area?">
      {GAP_AREAS.map((area) => {
        const invalid = invalidArea === area.key
        return (
          <li
            key={area.key}
            id={`gap-area-${area.key}`}
            className={cn("gap-scroll-target list-none border-b border-brand-dark/10 last:border-b-0", invalid && "pb-4")}
          >
            {invalid && errorMessage && (
              <p id="gap-scan-error" role="alert" aria-live="assertive" className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMessage}
              </p>
            )}
            <GapSlider
              label={area.label}
              inputId={`gap-slider-${area.key}`}
              value={scanValues[area.key]}
              touched={touched.has(area.key)}
              invalid={invalid}
              describedBy="gap-scan-error"
              onChange={(value) => onScanChange(area.key, value)}
              onTouch={() => onSliderTouch(area.key)}
            />
          </li>
        )
      })}
    </ul>
  )
}
