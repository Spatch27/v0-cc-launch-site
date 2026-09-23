export const GAP_AREAS = [
  { key: "funding", label: "Winning belief, budget and board confidence" },
  { key: "howitruns", label: "How the work gets planned, decided and shipped" },
  { key: "measurement", label: "Knowing what’s working, and proving it" },
  { key: "ai", label: "Getting useful work out of the tools you already have" },
  { key: "stack", label: "The stack, and data people trust" },
  { key: "speed", label: "Speed, and how the team feels" },
  { key: "agencies", label: "Agencies and partners" },
] as const

export type GapAreaKey = (typeof GAP_AREAS)[number]["key"]

export const GAP_AREA_KEYS: GapAreaKey[] = GAP_AREAS.map((area) => area.key)

export const GAP_AREA_COUNT = GAP_AREAS.length

export const IMPORTANCE_LETTERS = ["A", "B", "C", "D", "E", "F", "G"] as const

export type ImportanceLetter = (typeof IMPORTANCE_LETTERS)[number]

export function importanceLetterFromRank(rank: number): ImportanceLetter {
  return IMPORTANCE_LETTERS[rank - 1] ?? "A"
}

export const GAP_VERDICTS: Record<number, string> = {
  1: "Already there",
  2: "Nearly there",
  3: "Close",
  4: "Some distance",
  5: "A fair way",
  6: "A long way",
  7: "Nowhere near",
}

export type GapScan = Record<GapAreaKey, number>

export type GapImportance = Record<GapAreaKey, number>

export type GapAreaPayload = {
  key: GapAreaKey
  label: string
  gap_size: number
  gap_size_label: string
  importance: number
  importance_letter: ImportanceLetter
}

export function defaultImportanceOrder(): GapAreaKey[] {
  return GAP_AREAS.map((area) => area.key)
}

export function importanceRanksFromOrder(order: readonly GapAreaKey[]): GapImportance {
  return Object.fromEntries(order.map((key, index) => [key, index + 1])) as GapImportance
}

export function moveItemInOrder<T>(order: readonly T[], index: number, direction: -1 | 1): T[] {
  const nextIndex = index + direction
  if (nextIndex < 0 || nextIndex >= order.length) return [...order]
  const next = [...order]
  const [item] = next.splice(index, 1)
  next.splice(nextIndex, 0, item)
  return next
}

export function isValidScan(scan: unknown): scan is GapScan {
  if (!scan || typeof scan !== "object" || Array.isArray(scan)) return false
  const record = scan as Record<string, unknown>
  if (Object.keys(record).length !== GAP_AREA_COUNT) return false
  return GAP_AREAS.every((area) => {
    const value = record[area.key]
    return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 7
  })
}

export function isValidImportancePermutation(importance: unknown): importance is GapImportance {
  if (!importance || typeof importance !== "object" || Array.isArray(importance)) return false
  const record = importance as Record<string, unknown>
  if (Object.keys(record).length !== GAP_AREA_COUNT) return false
  const ranks = GAP_AREAS.map((area) => record[area.key])
  if (ranks.some((rank) => typeof rank !== "number" || !Number.isInteger(rank) || rank < 1 || rank > GAP_AREA_COUNT)) {
    return false
  }
  return new Set(ranks).size === GAP_AREA_COUNT
}

export function isValidImportanceOrder(order: unknown): order is GapAreaKey[] {
  if (!Array.isArray(order) || order.length !== GAP_AREA_COUNT) return false
  const allowed = new Set<string>(GAP_AREA_KEYS)
  if (order.some((key) => typeof key !== "string" || !allowed.has(key))) return false
  return new Set(order).size === GAP_AREA_COUNT
}

export function buildGapAreasPayload(scan: GapScan, order: readonly GapAreaKey[]): GapAreaPayload[] {
  const importance = importanceRanksFromOrder(order)
  return GAP_AREAS.map((area) => ({
    key: area.key,
    label: area.label,
    gap_size: scan[area.key],
    gap_size_label: GAP_VERDICTS[scan[area.key]] ?? String(scan[area.key]),
    importance: importance[area.key],
    importance_letter: importanceLetterFromRank(importance[area.key]),
  }))
}

export function orderFromImportanceRanks(importance: GapImportance): GapAreaKey[] {
  return [...GAP_AREA_KEYS].sort((a, b) => importance[a] - importance[b])
}

export function resolveImportanceOrder(importance: unknown, importanceOrder: unknown): GapAreaKey[] | null {
  if (importance != null && !isValidImportancePermutation(importance)) return null

  let order: GapAreaKey[]
  if (isValidImportanceOrder(importanceOrder)) {
    order = importanceOrder
  } else if (isValidImportancePermutation(importance)) {
    order = orderFromImportanceRanks(importance)
  } else {
    return null
  }

  if (isValidImportancePermutation(importance)) {
    const ranks = importanceRanksFromOrder(order)
    if (GAP_AREA_KEYS.some((key) => importance[key] !== ranks[key])) return null
  }

  return order
}

function areasByImportance(areas: GapAreaPayload[]): GapAreaPayload[] {
  return [...areas].sort((a, b) => a.importance - b.importance)
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

export function optionalText(value: unknown): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

export function formatGapScanEmailHtml(input: {
  person: {
    name: string
    email: string
    company: string
    role?: string | null
    marketing_headcount?: string | null
  }
  must_achieve?: string | null
  would_protect?: string | null
  shows_the_gap?: string | null
  scan: GapScan
  widest_gaps: GapAreaKey[]
  closest: GapAreaKey | undefined
  areas: GapAreaPayload[]
  importance_touched: boolean
}): string {
  const ranked = areasByImportance(input.areas)
  const rows = ranked
    .map(
      (area) => `
        <tr>
          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${escapeHtml(area.importance_letter)}</td>
          <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(area.label)}</td>
          <td style="padding:8px;border:1px solid #ddd;">${area.gap_size} — ${escapeHtml(area.gap_size_label)}</td>
        </tr>`
    )
    .join("")
  const priorityOrder = ranked
    .map((area) => `${area.importance_letter}: ${area.label} (gap size ${area.gap_size})`)
    .join(" → ")
  const areasDump = ranked.map((area) => ({
    key: area.key,
    gap_size: area.gap_size,
    gap_size_label: area.gap_size_label,
    importance: area.importance,
    importance_letter: area.importance_letter,
  }))

  const person = input.person
  const widest = input.widest_gaps
    .map((key) => GAP_AREAS.find((area) => area.key === key)?.label ?? key)
    .join("; ")
  const closestLabel = GAP_AREAS.find((area) => area.key === input.closest)?.label ?? input.closest ?? "N/A"

  return `
    <h2>New Gap Scan</h2>
    <p>Name: ${escapeHtml(String(person.name))}</p>
    <p>Email: ${escapeHtml(String(person.email))}</p>
    <p>Company: ${escapeHtml(String(person.company))}</p>
    <p>Role: ${escapeHtml(String(person.role || "N/A"))}</p>
    <p>Marketing headcount: ${escapeHtml(String(person.marketing_headcount || "N/A"))}</p>
    <p>What must marketing achieve that it cannot reliably do today? ${escapeHtml(String(input.must_achieve || "N/A"))}</p>
    <h3>Gap size and importance</h3>
    <p>Gap size: 1 = already there, 7 = nowhere near.<br/>Importance: A = most important, G = least important.</p>
    <table style="border-collapse:collapse;margin:12px 0;">
      <thead>
        <tr>
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">Importance</th>
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">Area</th>
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">Gap size</th>
        </tr>
      </thead>
      <tbody>${rows}
      </tbody>
    </table>
    <p>Priority order (A = most important → G = least): ${escapeHtml(priorityOrder)}</p>
    <p>Importance ranked by respondent: ${input.importance_touched ? "yes" : "no (submitted in default listed order)"}</p>
    <p>Widest gaps: ${escapeHtml(widest || "N/A")}</p>
    <p>Closest: ${escapeHtml(String(closestLabel))}</p>
    <p>Scan (gap size by key): ${escapeHtml(JSON.stringify(input.scan))}</p>
    <p>Areas (gap size + importance): ${escapeHtml(JSON.stringify(areasDump))}</p>
    <p>Would protect: ${escapeHtml(String(input.would_protect || "N/A"))}</p>
    <p>Campaign or piece of work that shows the gap: ${escapeHtml(String(input.shows_the_gap || "N/A"))}</p>
  `
}
