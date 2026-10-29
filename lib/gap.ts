export const GAP_AREAS = [
  { key: "funding", label: "Winning belief, budget and board confidence" },
  { key: "howitruns", label: "How the work gets planned, decided and shipped" },
  { key: "measurement", label: "Knowing what’s working, and proving it" },
  { key: "ai", label: "Getting useful work out of AI and the tools you already have" },
  { key: "stack", label: "The stack, and data people trust" },
  { key: "speed", label: "Speed, and how the team feels" },
  { key: "agencies", label: "Agencies and partners" },
] as const

export type GapAreaKey = (typeof GAP_AREAS)[number]["key"]

export const GAP_AREA_KEYS: GapAreaKey[] = GAP_AREAS.map((area) => area.key)

export const GAP_AREA_COUNT = GAP_AREAS.length

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

export type GapAreaPayload = {
  key: GapAreaKey
  label: string
  gap_size: number
  gap_size_label: string
}

export function isGapAreaKey(value: unknown): value is GapAreaKey {
  return typeof value === "string" && (GAP_AREA_KEYS as readonly string[]).includes(value)
}

export function gapAreaLabel(key: GapAreaKey): string {
  return GAP_AREAS.find((area) => area.key === key)?.label ?? key
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

export function buildGapAreasPayload(scan: GapScan): GapAreaPayload[] {
  return GAP_AREAS.map((area) => ({
    key: area.key,
    label: area.label,
    gap_size: scan[area.key],
    gap_size_label: GAP_VERDICTS[scan[area.key]] ?? String(scan[area.key]),
  }))
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
  shows_the_gap?: string | null
  scan: GapScan
  widest_gaps: GapAreaKey[]
  closest: GapAreaKey | undefined
  areas: GapAreaPayload[]
  most_important: GapAreaKey
}): string {
  const rows = input.areas
    .map(
      (area) => `
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(area.label)}</td>
          <td style="padding:8px;border:1px solid #ddd;">${area.gap_size} — ${escapeHtml(area.gap_size_label)}</td>
        </tr>`
    )
    .join("")
  const areasDump = input.areas.map((area) => ({
    key: area.key,
    label: area.label,
    gap_size: area.gap_size,
    gap_size_label: area.gap_size_label,
  }))

  const person = input.person
  const widest = input.widest_gaps.map((key) => gapAreaLabel(key)).join("; ")
  const closestLabel = input.closest ? gapAreaLabel(input.closest) : "N/A"
  const focusLabel = gapAreaLabel(input.most_important)

  return `
    <h2>New Gap Scan</h2>
    <p>Name: ${escapeHtml(String(person.name))}</p>
    <p>Email: ${escapeHtml(String(person.email))}</p>
    <p>Company: ${escapeHtml(String(person.company))}</p>
    <p>Role: ${escapeHtml(String(person.role || "N/A"))}</p>
    <p>Marketing headcount: ${escapeHtml(String(person.marketing_headcount || "N/A"))}</p>
    <p>What must marketing achieve that it cannot reliably do today? ${escapeHtml(String(input.must_achieve || "N/A"))}</p>
    <h3>Gap size</h3>
    <p>1 = already there, 7 = nowhere near.</p>
    <table style="border-collapse:collapse;margin:12px 0;">
      <thead>
        <tr>
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">Area</th>
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">Gap size</th>
        </tr>
      </thead>
      <tbody>${rows}
      </tbody>
    </table>
    <p>Of the 7 areas above, which is the most important area of focus for you right now? ${escapeHtml(focusLabel)}</p>
    <p>most_important: ${escapeHtml(input.most_important)}</p>
    <p>Widest gaps: ${escapeHtml(widest || "N/A")}</p>
    <p>Closest: ${escapeHtml(String(closestLabel))}</p>
    <p>Scan (gap size by key): ${escapeHtml(JSON.stringify(input.scan))}</p>
    <p>Areas (gap size): ${escapeHtml(JSON.stringify(areasDump))}</p>
    <p>Campaign or piece of work that shows the gap: ${escapeHtml(String(input.shows_the_gap || "N/A"))}</p>
  `
}
