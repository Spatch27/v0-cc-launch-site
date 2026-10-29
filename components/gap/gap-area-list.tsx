"use client"

import { GAP_AREAS, type GapAreaKey, type GapScan } from "@/lib/gap"
import { GapSlider } from "./gap-slider"

interface GapAreaListProps {
  scanValues: GapScan
  onScanChange: (key: GapAreaKey, value: number) => void
  touched: Set<GapAreaKey>
  onSliderTouch: (key: GapAreaKey) => void
}

export function GapAreaList({ scanValues, onScanChange, touched, onSliderTouch }: GapAreaListProps) {
  return (
    <ul className="flex flex-col [&>li:first-child>div]:pt-0" aria-label="How big is the gap in each area?">
      {GAP_AREAS.map((area) => (
        <li key={area.key} className="list-none border-b border-brand-dark/10 last:border-b-0">
          <GapSlider
            label={area.label}
            value={scanValues[area.key]}
            touched={touched.has(area.key)}
            onChange={(value) => onScanChange(area.key, value)}
            onTouch={() => onSliderTouch(area.key)}
          />
        </li>
      ))}
    </ul>
  )
}
