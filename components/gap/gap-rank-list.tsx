"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react"
import { GAP_AREAS, type GapAreaKey, moveItemInOrder } from "@/lib/gap"
import { cn } from "@/lib/utils"

const AREA_LABEL: Record<GapAreaKey, string> = Object.fromEntries(
  GAP_AREAS.map((area) => [area.key, area.label])
) as Record<GapAreaKey, string>

interface GapRankListProps {
  order: GapAreaKey[]
  onReorder: (order: GapAreaKey[]) => void
  touched: boolean
  onTouch: () => void
}

export function GapRankList({ order, onReorder, touched, onTouch }: GapRankListProps) {
  const [liveMessage, setLiveMessage] = useState("")
  const [draggingKey, setDraggingKey] = useState<GapAreaKey | null>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const orderRef = useRef(order)
  const draggingKeyRef = useRef<GapAreaKey | null>(null)
  const onReorderRef = useRef(onReorder)
  const onTouchRef = useRef(onTouch)

  useEffect(() => {
    orderRef.current = order
  }, [order])

  useEffect(() => {
    onReorderRef.current = onReorder
    onTouchRef.current = onTouch
  }, [onReorder, onTouch])

  function commit(next: GapAreaKey[]) {
    if (next.every((key, index) => key === orderRef.current[index])) return
    onTouchRef.current()
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
      <div className="flex items-baseline justify-between gap-4 border-b border-brand-dark/10 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>1 — most important</span>
        <span className={cn("normal-case tracking-normal", touched ? "font-semibold text-brand-dark" : "italic")}>
          {touched ? "ranked" : "drag or use arrows"}
        </span>
      </div>

      <ul ref={listRef} className="flex flex-col" aria-label="Importance ranking, 1 is most important">
        {order.map((key, index) => (
          <RankRow
            key={key}
            areaKey={key}
            label={AREA_LABEL[key]}
            rank={index + 1}
            isFirst={index === 0}
            isLast={index === order.length - 1}
            isDragging={draggingKey === key}
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

function RankRow({
  areaKey,
  label,
  rank,
  isFirst,
  isLast,
  isDragging,
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
  onMoveUp: () => void
  onMoveDown: () => void
  onDragStart: () => void
}) {
  return (
    <motion.li
      layout
      data-rank-key={areaKey}
      className={cn(
        "relative list-none select-none bg-brand-white",
        isDragging ? "z-20 cursor-grabbing shadow-[0_10px_28px_rgba(28,25,23,0.12)]" : "cursor-grab"
      )}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest("button")) return
        event.preventDefault()
        onDragStart()
      }}
      onMouseDown={(event) => {
        if ((event.target as HTMLElement).closest("button")) return
        event.preventDefault()
        onDragStart()
      }}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b border-brand-dark/10 py-3 touch-none sm:gap-3",
          rank === 1 && "border-l-2 border-l-brand-pink pl-[calc(0.5rem-2px)] sm:pl-[calc(0.75rem-2px)]",
          rank !== 1 && "pl-2 sm:pl-3"
        )}
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold",
            rank === 1 ? "bg-brand-pink text-brand-dark" : "bg-brand-light text-brand-dark"
          )}
          aria-hidden="true"
        >
          {rank}
        </span>

        <p className="min-w-0 flex-1 text-base font-medium text-brand-dark">{label}</p>

        <div className="flex shrink-0 items-center">
          <button
            type="button"
            aria-label={`Move ${label} up`}
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
            aria-label={`Move ${label} down`}
            disabled={isLast}
            onPointerDown={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onMoveDown}
            className="flex size-11 items-center justify-center text-brand-dark transition-colors hover:text-brand-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink disabled:text-brand-dark/20"
          >
            <ChevronDown size={20} />
          </button>
          <span aria-hidden="true" className="flex size-11 items-center justify-center text-brand-dark/50">
            <GripVertical size={20} />
          </span>
        </div>
      </div>
    </motion.li>
  )
}
