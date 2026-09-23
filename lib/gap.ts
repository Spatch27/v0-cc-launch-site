export const GAP_AREAS = [
  { key: "funding", label: "Winning belief, budget and board confidence" },
  { key: "howitruns", label: "How the work gets planned, decided and shipped" },
  { key: "measurement", label: "Knowing what’s working, and proving it" },
  { key: "tools", label: "Getting useful work out of the tools you already have" },
  { key: "stack", label: "The stack, and data people trust" },
  { key: "speed", label: "Speed, and how the team feels" },
  { key: "agencies", label: "Agencies and partners" },
] as const

export type GapAreaKey = (typeof GAP_AREAS)[number]["key"]

export const GAP_AREA_KEYS: GapAreaKey[] = GAP_AREAS.map((area) => area.key)

export const AREA_LETTERS = ["A", "B", "C", "D", "E", "F", "G"] as const

export type AreaLetter = (typeof AREA_LETTERS)[number]

export const FOCUS_AREA_MIN = 1
export const FOCUS_AREA_MAX = 2

export type FocusArea = {
  key: GapAreaKey
  letter: AreaLetter
  label: string
}

const GAP_AREA_KEY_SET = new Set<string>(GAP_AREA_KEYS)

export function letterForArea(key: GapAreaKey): AreaLetter {
  const index = GAP_AREA_KEYS.indexOf(key)
  return AREA_LETTERS[index] ?? "A"
}

export function isGapAreaKey(value: unknown): value is GapAreaKey {
  return typeof value === "string" && GAP_AREA_KEY_SET.has(value)
}

/** One or two area keys. Letters stay fixed to the list; there is no rank or severity. */
export function isValidFocusAreas(value: unknown): value is GapAreaKey[] {
  if (!Array.isArray(value)) return false
  if (value.length < FOCUS_AREA_MIN || value.length > FOCUS_AREA_MAX) return false
  const seen = new Set<string>()
  for (const key of value) {
    if (!isGapAreaKey(key) || seen.has(key)) return false
    seen.add(key)
  }
  return true
}

export function buildFocusAreas(keys: readonly GapAreaKey[]): FocusArea[] {
  return [...keys]
    .sort((a, b) => GAP_AREA_KEYS.indexOf(a) - GAP_AREA_KEYS.indexOf(b))
    .map((key) => {
      const area = GAP_AREAS.find((item) => item.key === key)
      if (!area) throw new Error(`Unknown gap area: ${key}`)
      return {
        key: area.key,
        letter: letterForArea(area.key),
        label: area.label,
      }
    })
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
  focus_areas: FocusArea[]
  would_protect?: string | null
  shows_the_gap?: string | null
}): string {
  const person = input.person
  const rows = input.focus_areas
    .map(
      (area) => `
        <tr>
          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${escapeHtml(area.letter)}</td>
          <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(area.label)}</td>
        </tr>`
    )
    .join("")
  const selected = input.focus_areas.map((area) => `${area.letter}. ${area.label}`).join("; ")

  return `
    <h2>New Gap Scan</h2>
    <p>Name: ${escapeHtml(String(person.name))}</p>
    <p>Email: ${escapeHtml(String(person.email))}</p>
    <p>Company: ${escapeHtml(String(person.company))}</p>
    <p>Role: ${escapeHtml(String(person.role || "N/A"))}</p>
    <p>Marketing headcount: ${escapeHtml(String(person.marketing_headcount || "N/A"))}</p>
    <h3>What must marketing achieve that it cannot reliably do today?</h3>
    <p>${escapeHtml(String(input.must_achieve || "N/A"))}</p>
    <h3>Which one or two areas matter most right now?</h3>
    <p>Fixed labels A–G. No severity score, and the other areas were not ranked.</p>
    <table style="border-collapse:collapse;margin:12px 0;">
      <thead>
        <tr>
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">Letter</th>
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">Area</th>
        </tr>
      </thead>
      <tbody>${rows}
      </tbody>
    </table>
    <p>Selected: ${escapeHtml(selected || "N/A")}</p>
    <p>Focus areas: ${escapeHtml(JSON.stringify(input.focus_areas))}</p>
    <h3>What’s the one part you’d protect if you had to cut everything else?</h3>
    <p>${escapeHtml(String(input.would_protect || "N/A"))}</p>
    <h3>Campaign or piece of work that shows the gap</h3>
    <p>${escapeHtml(String(input.shows_the_gap || "N/A"))}</p>
  `
}
