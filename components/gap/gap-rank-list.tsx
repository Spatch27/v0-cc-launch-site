"use client"

import { useState } from "react"
import { Reorder } from "framer-motion"
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

  function commit(next: GapAreaKey[]) {
    if (next.every((key, index) => key === order[index])) return
    onTouch()
    onReorder(next)
    setLiveMessage(next.map((key, index) => `${index + 1}, ${AREA_LABEL[key]}`).join(". "))
  }

  function move(index: number, direction: -1 | 1) {
    commit(moveItemInOrder(order, index, direction))
  }

  return (
    <div className="mt-8">
      <div className="flex items-baseline justify-between gap-4 border-b border-brand-dark/10 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>1 — most important</span>
        <span className={cn("normal-case tracking-normal", touched ? "font-semibold text-brand-dark" : "italic")}>
          {touched ? "ranked" : "drag or use arrows"}
        </span>
      </div>

      <Reorder.Group
        axis="y"
        values={order}
        onReorder={commit}
        as="ul"
        className="flex flex-col"
        aria-label="Importance ranking, 1 is most important"
      >
        {order.map((key, index) => (
          <RankRow
            key={key}
            areaKey={key}
            label={AREA_LABEL[key]}
            rank={index + 1}
            isFirst={index === 0}
            isLast={index === order.length - 1}
            onMoveUp={() => move(index, -1)}
            onMoveDown={() => move(index, 1)}
          />
        ))}
      </Reorder.Group>

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
  onMoveUp,
  onMoveDown,
}: {
  areaKey: GapAreaKey
  label: string
  rank: number
  isFirst: boolean
  isLast: boolean
  onMoveUp: () => void
  onMoveDown: () => void
}) {
  return (
    <Reorder.Item
      value={areaKey}
      as="li"
      layout="position"
      whileDrag={{
        scale: 1.01,
        zIndex: 20,
        boxShadow: "0 10px 28px rgba(28, 25, 23, 0.12)",
        cursor: "grabbing",
      }}
      className="relative cursor-grab list-none select-none bg-brand-white"
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b border-brand-dark/10 py-3 sm:gap-3",
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
            onClick={onMoveDown}
            className="flex size-11 items-center justify-center text-brand-dark transition-colors hover:text-brand-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink disabled:text-brand-dark/20"
          >
            <ChevronDown size={20} />
          </button>
          <span
            aria-hidden="true"
            className="flex size-11 items-center justify-center text-brand-dark/50"
          >
            <GripVertical size={20} />
          </span>
        </div>
      </div>
    </Reorder.Item>
  )
}
