"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import { GAP_AREAS, GAP_VERDICTS, type GapAreaKey, type GapScan, moveItemInOrder } from "@/lib/gap"
import { cn } from "@/lib/utils"
import { GapSlider } from "./gap-slider"

const AREA_LABEL: Record<GapAreaKey, string> = Object.fromEntries(
  GAP_AREAS.map((area) => [area.key, area.label])
) as Record<GapAreaKey, string>

interface GapAreaListProps {
  order: GapAreaKey[]
  onReorder: (order: GapAreaKey[]) => void
  onRank: () => void
  scanValues: GapScan
  onScanChange: (key: GapAreaKey, value: number) => void
  touched: Set<GapAreaKey>
  onSliderTouch: (key: GapAreaKey) => void
}

function isReorderHandle(target: EventTarget | null): boolean {
  return Boolean((target as HTMLElement | null)?.closest("[data-reorder-handle]"))
}

function isSliderTarget(target: EventTarget | null): boolean {
  return Boolean((target as HTMLElement | null)?.closest("[data-slider-target], input[type='range']"))
}

export function GapAreaList({
  order,
  onReorder,
  onRank,
  scanValues,
  onScanChange,
  touched,
  onSliderTouch,
}: GapAreaListProps) {
  const [liveMessage, setLiveMessage] = useState("")
  const [draggingKey, setDraggingKey] = useState<GapAreaKey | null>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const orderRef = useRef(order)
  const draggingKeyRef = useRef<GapAreaKey | null>(null)
  const onReorderRef = useRef(onReorder)
  const onRankRef = useRef(onRank)

  useEffect(() => {
    orderRef.current = order
  }, [order])

  useEffect(() => {
    onReorderRef.current = onReorder
    onRankRef.current = onRank
  }, [onReorder, onRank])

  function commit(next: GapAreaKey[]) {
    if (next.every((key, index) => key === orderRef.current[index])) return
    onRankRef.current()
    onReorderRef.current(next)
    setLiveMessage(next.map((key, index) => `${index + 1}, ${AREA_LABEL[key]}`).join(". "))
  }

  function move(index: number, direction: -1 | 1) {
    commit(moveItemInOrder(orderRef.current, index, direction))
  }

  function reorderFromPoint(clientY: number) {
    const key = draggingKeyRef.current
    const list = listRef.current
    if (!key || !list) return

    const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-rank-key]"))
    const over = rows.find((row) => {
      const rect = row.getBoundingClientRect()
      return clientY >= rect.top && clientY <= rect.bottom
    })
    const overKey = over?.dataset.rankKey as GapAreaKey | undefined
    if (!overKey || overKey === key) return

    const current = orderRef.current
    const from = current.indexOf(key)
    const to = current.indexOf(overKey)
    if (from < 0 || to < 0) return
    const next = [...current]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    commit(next)
  }

  function startDrag(key: GapAreaKey) {
    draggingKeyRef.current = key
    setDraggingKey(key)
  }

  function stopDrag() {
    draggingKeyRef.current = null
    setDraggingKey(null)
  }

  useEffect(() => {
    function onMove(event: PointerEvent | MouseEvent) {
      if (!draggingKeyRef.current) return
      event.preventDefault()
      reorderFromPoint(event.clientY)
    }
    function onUp() {
      if (!draggingKeyRef.current) return
      stopDrag()
    }
    window.addEventListener("pointermove", onMove, { passive: false })
    window.addEventListener("pointerup", onUp)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
  }, [])

  return (
    <div className="mt-8">
      <div className="flex justify-between border-b border-brand-dark/10 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>Already there</span>
        <span>Nowhere near</span>
      </div>
      <div className="flex items-baseline justify-between gap-4 border-b border-brand-dark/10 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>1 — most important</span>
      </div>

      <ul ref={listRef} className="flex flex-col" aria-label="Gap size and importance. 1 at the top is most important.">
        {order.map((key, index) => (
          <AreaRow
            key={key}
            areaKey={key}
            label={AREA_LABEL[key]}
            rank={index + 1}
            isFirst={index === 0}
            isLast={index === order.length - 1}
            isDragging={draggingKey === key}
            value={scanValues[key]}
            sliderTouched={touched.has(key)}
            onScanChange={(value) => onScanChange(key, value)}
            onSliderTouch={() => onSliderTouch(key)}
            onMoveUp={() => move(index, -1)}
            onMoveDown={() => move(index, 1)}
            onDragStart={() => startDrag(key)}
          />
        ))}
      </ul>

      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">7 — least important</p>
      <p className="sr-only" aria-live="polite">
        {liveMessage}
      </p>
    </div>
  )
}

function AreaRow({
  areaKey,
  label,
  rank,
  isFirst,
  isLast,
  isDragging,
  value,
  sliderTouched,
  onScanChange,
  onSliderTouch,
  onMoveUp,
  onMoveDown,
  onDragStart,
}: {
  areaKey: GapAreaKey
  label: string
  rank: number
  isFirst: boolean
  isLast: boolean
  isDragging: boolean
  value: number
  sliderTouched: boolean
  onScanChange: (value: number) => void
  onSliderTouch: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDragStart: () => void
}) {
  const verdict = GAP_VERDICTS[value]

  function handleReorderPointer(event: React.PointerEvent | React.MouseEvent) {
    if (isSliderTarget(event.target) || (event.target as HTMLElement).closest("button:not([data-reorder-handle])")) {
      return
    }
    if (!isReorderHandle(event.target)) return
    event.preventDefault()
    onDragStart()
  }

  return (
    <motion.li
      layout
      data-rank-key={areaKey}
      className={cn(
        "relative list-none select-none bg-brand-white",
        isDragging && "z-20 shadow-[0_10px_28px_rgba(28,25,23,0.12)]"
      )}
      onPointerDown={handleReorderPointer}
      onMouseDown={handleReorderPointer}
    >
      <div
        className={cn(
          "flex items-start gap-2 border-b border-brand-dark/10 py-4 pl-2 sm:gap-3 sm:pl-3"
        )}
      >
        <span
          data-reorder-handle="true"
          aria-hidden="true"
          className={cn(
            "mt-0.5 flex size-8 shrink-0 cursor-grab items-center justify-center rounded-full font-display text-sm font-semibold touch-none active:cursor-grabbing",
            rank === 1 ? "bg-brand-pink text-brand-dark" : "bg-brand-light text-brand-dark"
          )}
        >
          {rank}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
            <p className="text-base font-medium text-brand-dark">
              <span className="sr-only">Importance rank {rank}. </span>
              {label}
            </p>
            <span
              className={cn(
                "text-sm sm:shrink-0 sm:text-right",
                sliderTouched ? "font-semibold text-brand-dark" : "italic text-muted-foreground"
              )}
            >
              {sliderTouched ? `${verdict} (${value})` : "click 1–7"}
            </span>
          </div>
          <GapSlider
            label={`${label}, gap size`}
            value={value}
            touched={sliderTouched}
            showHeader={false}
            onChange={onScanChange}
            onTouch={onSliderTouch}
          />
        </div>

        <div className="flex shrink-0 flex-col items-center sm:flex-row">
          <button
            type="button"
            aria-label={`Move ${label} up in importance`}
            disabled={isFirst}
            onPointerDown={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMoveUp}
            className="flex size-11 items-center justify-center text-brand-dark transition-colors hover:text-brand-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink disabled:text-brand-dark/20"
          >
            <ChevronUp size={20} />
          </button>
          <button
            type="button"
            aria-label={`Move ${label} down in importance`}
            disabled={isLast}
            onPointerDown={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMoveDown}
            className="flex size-11 items-center justify-center text-brand-dark transition-colors hover:text-brand-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink disabled:text-brand-dark/20"
          >
            <ChevronDown size={20} />
          </button>
          <button
            type="button"
            data-reorder-handle="true"
            aria-label={`Drag to change importance of ${label}`}
            onPointerDown={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onDragStart()
            }}
            onMouseDown={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onDragStart()
            }}
            className="flex size-11 cursor-grab items-center justify-center text-brand-dark/50 touch-none active:cursor-grabbing hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
          >
            <GripVertical size={20} />
          </button>
        </div>
      </div>
    </motion.li>
  )
}
