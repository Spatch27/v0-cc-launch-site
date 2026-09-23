"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import { GAP_AREAS, GAP_VERDICTS, importanceLetterFromRank, type GapAreaKey, type GapScan, moveItemInOrder } from "@/lib/gap"
import { cn } from "@/lib/utils"
import { GapSlider } from "./gap-slider"

const AREA_LABEL: Record<GapAreaKey, string> = Object.fromEntries(
  GAP_AREAS.map((area) => [area.key, area.label])
) as Record<GapAreaKey, string>

const DRAG_THRESHOLD = 8

interface GapAreaListProps {
  order: GapAreaKey[]
  onReorder: (order: GapAreaKey[]) => void
  onRank: () => void
  scanValues: GapScan
  onScanChange: (key: GapAreaKey, value: number) => void
  touched: Set<GapAreaKey>
  onSliderTouch: (key: GapAreaKey) => void
}

type ActiveDrag = {
  key: GapAreaKey
  pointerId: number
  startClientY: number
  originTop: number
  originLeft: number
  width: number
  height: number
  dy: number
}

function isReorderHandle(target: EventTarget | null): boolean {
  return Boolean((target as HTMLElement | null)?.closest("[data-reorder-handle]"))
}

function isSliderTarget(target: EventTarget | null): boolean {
  return Boolean((target as HTMLElement | null)?.closest("[data-slider-target], input[type='range']"))
}

function insertionIndex(centerY: number, draggingKey: GapAreaKey, list: HTMLElement): number {
  const rows = list.querySelectorAll<HTMLElement>("[data-rank-key]")
  let index = 0
  for (const row of rows) {
    if (row.dataset.rankKey === draggingKey) continue
    const rect = row.getBoundingClientRect()
    if (centerY > rect.top + rect.height / 2) index += 1
  }
  return index
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
  const [dragKey, setDragKey] = useState<GapAreaKey | null>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const orderRef = useRef(order)
  const dragRef = useRef<ActiveDrag | null>(null)
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
    setLiveMessage(next.map((key, index) => `${importanceLetterFromRank(index + 1)}, ${AREA_LABEL[key]}`).join(". "))
  }

  const commitRef = useRef(commit)
  commitRef.current = commit

  function move(index: number, direction: -1 | 1) {
    commit(moveItemInOrder(orderRef.current, index, direction))
  }

  function beginDrag(key: GapAreaKey, event: React.PointerEvent) {
    const row = (event.currentTarget as HTMLElement).closest<HTMLElement>("[data-rank-key]")
    if (event.button !== 0 || dragRef.current) return
    if (!row) return
    const rect = row.getBoundingClientRect()
    dragRef.current = {
      key,
      pointerId: event.pointerId,
      startClientY: event.clientY,
      originTop: rect.top,
      originLeft: rect.left,
      width: rect.width,
      height: rect.height,
      dy: 0,
    }
    setDragKey(key)
  }

  function endDrag(pointerId?: number) {
    const drag = dragRef.current
    if (!drag || (pointerId !== undefined && drag.pointerId !== pointerId)) return
    dragRef.current = null
    setDragKey(null)
  }

  useEffect(() => {
    function onMove(event: PointerEvent) {
      const drag = dragRef.current
      if (!drag || event.pointerId !== drag.pointerId) return
      event.preventDefault()
      drag.dy = event.clientY - drag.startClientY
      if (overlayRef.current) {
        overlayRef.current.style.transform = `translate3d(0, ${drag.dy}px, 0)`
      }
      if (Math.abs(drag.dy) < DRAG_THRESHOLD) return
      const list = listRef.current
      if (!list) return
      const centerY = drag.originTop + drag.dy + drag.height / 2
      const insertAt = insertionIndex(centerY, drag.key, list)
      if (insertAt === orderRef.current.indexOf(drag.key)) return
      const next = orderRef.current.filter((key) => key !== drag.key)
      next.splice(insertAt, 0, drag.key)
      commitRef.current(next)
    }

    function onUp(event: PointerEvent) {
      endDrag(event.pointerId)
    }

    window.addEventListener("pointermove", onMove, { passive: false })
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
    }
  }, [])

  useEffect(() => {
    if (!dragKey) return
    const previousCursor = document.body.style.cursor
    const previousUserSelect = document.body.style.userSelect
    document.body.style.cursor = "grabbing"
    document.body.style.userSelect = "none"
    return () => {
      document.body.style.cursor = previousCursor
      document.body.style.userSelect = previousUserSelect
    }
  }, [dragKey])

  const activeDrag = dragKey ? dragRef.current : null

  return (
    <div className="mt-8">
      <div className="flex justify-between text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>Already there</span>
        <span>Nowhere near</span>
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">A — most important</p>

      <ul
        ref={listRef}
        className="mt-3 flex flex-col gap-3"
        aria-label="Gap size and importance. A at the top is most important, G at the bottom is least important."
      >
        {order.map((key, index) => (
          <AreaRow
            key={key}
            areaKey={key}
            label={AREA_LABEL[key]}
            rank={index + 1}
            isFirst={index === 0}
            isLast={index === order.length - 1}
            drag={activeDrag?.key === key ? activeDrag : null}
            overlayRef={activeDrag?.key === key ? overlayRef : undefined}
            value={scanValues[key]}
            sliderTouched={touched.has(key)}
            onScanChange={(value) => onScanChange(key, value)}
            onSliderTouch={() => onSliderTouch(key)}
            onMoveUp={() => move(index, -1)}
            onMoveDown={() => move(index, 1)}
            onDragStart={(event) => beginDrag(key, event)}
          />
        ))}
      </ul>

      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">G — least important</p>
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
  drag,
  overlayRef,
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
  drag: ActiveDrag | null
  overlayRef?: React.RefObject<HTMLDivElement | null>
  value: number
  sliderTouched: boolean
  onScanChange: (value: number) => void
  onSliderTouch: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  onDragStart: (event: React.PointerEvent) => void
}) {
  const verdict = GAP_VERDICTS[value]
  const letter = importanceLetterFromRank(rank)

  function handleReorderPointer(event: React.PointerEvent) {
    if (isSliderTarget(event.target) || (event.target as HTMLElement).closest("button:not([data-reorder-handle])")) {
      return
    }
    if (!isReorderHandle(event.target)) return
    event.preventDefault()
    onDragStart(event)
  }

  const card = (
    <div className="flex h-full items-stretch overflow-hidden rounded-lg border border-brand-dark/20 bg-brand-white">
      <div className="min-w-0 flex-1 px-3 py-3 sm:px-4">
        <div className="flex items-start gap-3">
          <span
            data-reorder-handle="true"
            aria-hidden="true"
            className={cn(
              "mt-0.5 flex size-8 shrink-0 cursor-grab items-center justify-center rounded-full font-display text-sm font-semibold touch-none active:cursor-grabbing",
              rank === 1 ? "bg-brand-pink text-brand-dark" : "bg-brand-light text-brand-dark"
            )}
          >
            {letter}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
              <p className="text-base font-medium text-brand-dark">
                <span className="sr-only">Importance {letter}. </span>
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
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-center justify-center border-l border-brand-dark/10 bg-brand-light/70">
        <button
          type="button"
          aria-label={`Move ${label} up in importance, currently ${letter}`}
          disabled={isFirst}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onMoveUp}
          className="flex size-11 items-center justify-center text-brand-dark transition-colors hover:text-brand-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink disabled:text-brand-dark/20"
        >
          <ChevronUp size={20} />
        </button>
        <button
          type="button"
          aria-label={`Move ${label} down in importance, currently ${letter}`}
          disabled={isLast}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onMoveDown}
          className="flex size-11 items-center justify-center text-brand-dark transition-colors hover:text-brand-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink disabled:text-brand-dark/20"
        >
          <ChevronDown size={20} />
        </button>
        <button
          type="button"
          data-reorder-handle="true"
          aria-label={`Drag to change importance of ${label}, currently ${letter}`}
          onPointerDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onDragStart(event)
          }}
          className="flex size-11 cursor-grab items-center justify-center text-brand-dark/50 touch-none active:cursor-grabbing hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
        >
          <GripVertical size={20} />
        </button>
      </div>
    </div>
  )

  if (drag) {
    return (
      <>
        <li
          data-rank-key={areaKey}
          style={{ height: drag.height }}
          className="box-border list-none rounded-lg border border-dashed border-brand-dark/25 bg-brand-light/40"
          aria-hidden="true"
        />
        {createPortal(
          <div
            ref={overlayRef}
            className="pointer-events-none fixed z-50 rounded-lg shadow-[0_12px_28px_rgba(24,23,22,0.16)]"
            style={{
              top: drag.originTop,
              left: drag.originLeft,
              width: drag.width,
              height: drag.height,
              transform: `translate3d(0, ${drag.dy}px, 0)`,
            }}
          >
            {card}
          </div>,
          document.body
        )}
      </>
    )
  }

  return (
    <li data-rank-key={areaKey} className="list-none" onPointerDown={handleReorderPointer}>
      {card}
    </li>
  )
}
