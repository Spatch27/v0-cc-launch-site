import {
  GAP_AREAS,
  GAP_VERDICTS,
  type GapAreaKey,
  type GapScan,
  isGapAreaKey,
  isValidEmail,
  isValidScan,
  optionalText,
} from "@/lib/gap"

export type IdentityKey = "name" | "email" | "role" | "company"

export type IdentityFields = Record<IdentityKey, string>

export const EMPTY_IDENTITY: IdentityFields = {
  name: "",
  email: "",
  role: "",
  company: "",
}

export type AreaNote = {
  success: string
  opportunity: string
}

export type PressingProject = {
  what: string
  difference: string
  success: string
  progress_by: string
}

export type WaypointResearch = {
  tenure: string
  function_now_and_next: string
  scan: GapScan
  area_notes: Record<GapAreaKey, AreaNote>
  pressing_project: PressingProject
  anything_else: string | null
}

export type WaypointArea = {
  key: GapAreaKey
  label: string
  gap_size: number
  gap_size_label: string
  success: string
  opportunity: string
}

export type WaypointBody = {
  submitted: string
  source: "waypoint"
  consent_to_record: true
  person: IdentityFields
  tenure: string
  function_now_and_next: string
  scan: GapScan
  areas: WaypointArea[]
  pressing_project: PressingProject
  anything_else: string | null
  transcript: string
}

export type FieldIssue = {
  ok: false
  field: string
  error: string
  speak: string
}

const IDENTITY_KEYS: IdentityKey[] = ["name", "email", "role", "company"]

const LABEL_TO_KEY = new Map<string, GapAreaKey>()
for (const area of GAP_AREAS) {
  LABEL_TO_KEY.set(area.key, area.key)
  LABEL_TO_KEY.set(area.label.toLowerCase(), area.key)
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

export function coerceAreaKey(value: unknown): GapAreaKey | null {
  if (isGapAreaKey(value)) return value
  if (typeof value !== "string") return null
  return LABEL_TO_KEY.get(value.trim().toLowerCase()) ?? null
}

function readScore(value: unknown): number | null {
  const number = typeof value === "string" && value.trim() !== "" ? Number(value) : value
  if (typeof number !== "number" || !Number.isInteger(number) || number < 1 || number > 7) return null
  return number
}

function scanFromAreas(value: unknown): GapScan | null {
  if (!Array.isArray(value)) return null
  const scan = {} as GapScan
  for (const area of GAP_AREAS) {
    const item = value
      .map((entry) => asRecord(entry))
      .find((entry) => entry && coerceAreaKey(entry.key) === area.key)
    const score = item ? readScore(item.gap_size) : null
    if (score === null) return null
    scan[area.key] = score
  }
  return isValidScan(scan) ? scan : null
}

export function readScan(value: unknown): GapScan | null {
  const record = asRecord(value)
  if (!record) return null
  const scan = {} as GapScan
  for (const area of GAP_AREAS) {
    const score = readScore(record[area.key] ?? record[area.label])
    if (score === null) return null
    scan[area.key] = score
  }
  return isValidScan(scan) ? scan : null
}

function readNote(value: unknown): AreaNote | null {
  const record = asRecord(value)
  if (!record) return null
  const success = optionalText(record.success ?? record.feels ?? record.feeling)
  const opportunity = optionalText(record.opportunity ?? record.opportunities ?? record.improve)
  if (!success || !opportunity) return null
  return { success, opportunity }
}

export function readAreaNotes(value: unknown): Record<GapAreaKey, AreaNote> | null {
  const notes = {} as Record<GapAreaKey, AreaNote>
  if (Array.isArray(value)) {
    for (const item of value) {
      const record = asRecord(item)
      if (!record) continue
      const key = coerceAreaKey(record.key ?? record.area ?? record.label)
      const note = readNote(record)
      if (key && note) notes[key] = note
    }
  } else {
    const record = asRecord(value)
    if (!record) return null
    for (const [rawKey, rawValue] of Object.entries(record)) {
      const key = coerceAreaKey(rawKey)
      const note = readNote(rawValue)
      if (key && note) notes[key] = note
    }
  }
  if (!GAP_AREAS.every((area) => notes[area.key])) return null
  return notes
}

function firstMissingScore(value: unknown): string {
  const record = asRecord(value)
  for (const area of GAP_AREAS) {
    const score = record ? readScore(record[area.key] ?? record[area.label]) : null
    if (score === null) {
      return `Ask how big the gap is for ${area.label}, from 1 (already there) to 7 (nowhere near).`
    }
  }
  return "Ask for a gap score from 1 to 7 for each area."
}

function firstMissingNote(value: unknown): string {
  const record = asRecord(value)
  const list = Array.isArray(value) ? value : null
  for (const area of GAP_AREAS) {
    const fromRecord = record ? readNote(record[area.key] ?? record[area.label]) : null
    const fromList = list
      ?.map((item) => asRecord(item))
      .find((item) => item && coerceAreaKey(item.key ?? item.area ?? item.label) === area.key)
    const note = fromRecord ?? (fromList ? readNote(fromList) : null)
    if (!note) {
      return `Ask how ${area.label} feels, and where the opportunity is. You still need both.`
    }
  }
  return "Ask how each area feels, and where the opportunity is."
}

function readProject(value: unknown): { ok: true; value: PressingProject } | { ok: false; error: string } {
  const record = asRecord(value)
  const what = optionalText(record?.what)
  const difference = optionalText(record?.difference)
  const success = optionalText(record?.success)
  const progress = optionalText(record?.progress_by ?? record?.when)
  if (!what) return { ok: false, error: "Ask what the most pressing project is." }
  if (!difference) return { ok: false, error: "Ask what difference that project would make." }
  if (!success) return { ok: false, error: "Ask what success looks like for that project." }
  if (!progress) return { ok: false, error: "Ask when they need to show progress on that project." }
  return { ok: true, value: { what, difference, success, progress_by: progress } }
}

export function parseResearch(input: unknown): { ok: true; value: WaypointResearch } | { ok: false; error: string } {
  const record = asRecord(input)
  if (!record) return { ok: false, error: "The research notes were empty. Keep going." }

  const tenure = optionalText(record.tenure)
  if (!tenure) return { ok: false, error: "Ask how long they have been in this role." }

  const functionNow = optionalText(record.function_now_and_next)
  if (!functionNow) {
    return { ok: false, error: "Ask about the marketing function they have, and the one they will need next." }
  }

  const scan = readScan(record.scan) ?? scanFromAreas(record.areas)
  if (!scan) return { ok: false, error: firstMissingScore(record.scan ?? record.areas) }

  const areaNotes = readAreaNotes(record.area_notes ?? record.areas)
  if (!areaNotes) return { ok: false, error: firstMissingNote(record.area_notes ?? record.areas) }

  const project = readProject(record.pressing_project)
  if (!project.ok) return project

  return {
    ok: true,
    value: {
      tenure,
      function_now_and_next: functionNow,
      scan,
      area_notes: areaNotes,
      pressing_project: project.value,
      anything_else: optionalText(record.anything_else),
    },
  }
}

/**
 * Spoken corrections update the fields the visitor is looking at.
 * A field they are actively typing in is left alone so the caret is not pulled away.
 */
export function applySpokenIdentity(
  current: IdentityFields,
  spoken: Partial<Record<IdentityKey, unknown>>,
  focused: IdentityKey | null,
): IdentityFields {
  const next = { ...current }
  for (const key of IDENTITY_KEYS) {
    if (focused === key || !(key in spoken)) continue
    const value = optionalText(spoken[key])
    if (value) next[key] = value
  }
  return next
}

export function validateIdentity(identity: IdentityFields, consent: boolean): { ok: true } | FieldIssue {
  if (!optionalText(identity.name)) {
    return {
      ok: false,
      field: "name",
      error: "We still need your name. Say it, and spell it if it isn’t right.",
      speak: "The name on the page is empty. Ask them to say it, then spell it if needed.",
    }
  }
  if (!optionalText(identity.email)) {
    return {
      ok: false,
      field: "email",
      error: "We still need your email. Say it, and spell anything that might be wrong.",
      speak: "The email on the page is empty. Ask them to say it and spell it.",
    }
  }
  if (!isValidEmail(identity.email.trim())) {
    return {
      ok: false,
      field: "email",
      error: "That email doesn’t look right yet. Say it again and spell it, or edit the field.",
      speak: "The email on the page is not a valid email. Ask them to spell it. Do not ask them to type.",
    }
  }
  if (!optionalText(identity.role)) {
    return {
      ok: false,
      field: "role",
      error: "We still need your role. Say it, and spell it if it isn’t right.",
      speak: "The role on the page is empty. Ask them to say it, and to spell it if needed.",
    }
  }
  if (!optionalText(identity.company)) {
    return {
      ok: false,
      field: "company",
      error: "We still need your company. Say it, and spell it if it isn’t right.",
      speak: "The company on the page is empty. Ask them to say it, and to spell it if needed.",
    }
  }
  if (!consent) {
    return {
      ok: false,
      field: "consent",
      error: "We need a yes before we record the conversation and send the video.",
      speak: "Recording is not agreed yet. Ask for a clear yes. If they decline, thank them and stop.",
    }
  }
  return { ok: true }
}

function areasFromResearch(research: WaypointResearch): WaypointArea[] {
  return GAP_AREAS.map((area) => ({
    key: area.key,
    label: area.label,
    gap_size: research.scan[area.key],
    gap_size_label: GAP_VERDICTS[research.scan[area.key]] ?? String(research.scan[area.key]),
    success: research.area_notes[area.key].success,
    opportunity: research.area_notes[area.key].opportunity,
  }))
}

export function parseWaypointBody(input: unknown): { ok: true; body: WaypointBody } | FieldIssue {
  const record = asRecord(input)
  if (!record) {
    return { ok: false, field: "body", error: "The interview could not be read.", speak: "The interview could not be read." }
  }

  const person = asRecord(record.person)
  const identity: IdentityFields = {
    name: optionalText(person?.name) ?? "",
    email: optionalText(person?.email) ?? "",
    role: optionalText(person?.role) ?? "",
    company: optionalText(person?.company) ?? "",
  }
  const identityCheck = validateIdentity(identity, record.consent_to_record === true)
  if (!identityCheck.ok) return identityCheck

  const research = parseResearch(record)
  if (!research.ok) return { ok: false, field: "research", error: research.error, speak: research.error }

  const transcriptRaw = optionalText(record.transcript)
  if (!transcriptRaw) {
    return {
      ok: false,
      field: "transcript",
      error: "There’s nothing from the conversation to send yet.",
      speak: "The transcript is empty. Finish the conversation before saving.",
    }
  }

  const transcript = transcriptRaw.length > 100_000 ? `${transcriptRaw.slice(0, 100_000)}…[truncated]` : transcriptRaw

  return {
    ok: true,
    body: {
      submitted: optionalText(record.submitted) ?? new Date().toISOString(),
      source: "waypoint",
      consent_to_record: true,
      person: {
        name: identity.name.trim(),
        email: identity.email.trim(),
        role: identity.role.trim(),
        company: identity.company.trim(),
      },
      tenure: research.value.tenure,
      function_now_and_next: research.value.function_now_and_next,
      scan: research.value.scan,
      areas: areasFromResearch(research.value),
      pressing_project: research.value.pressing_project,
      anything_else: research.value.anything_else,
      transcript,
    },
  }
}

/** The page fields are the only identity that can be saved. Transcript guesses are not a second copy. */
export function buildWaypointBody(input: {
  identity: IdentityFields
  consent: boolean
  research: WaypointResearch
  transcript: string
  submitted?: string
}): { ok: true; body: WaypointBody } | FieldIssue {
  return parseWaypointBody({
    submitted: input.submitted ?? new Date().toISOString(),
    source: "waypoint",
    consent_to_record: input.consent,
    person: input.identity,
    tenure: input.research.tenure,
    function_now_and_next: input.research.function_now_and_next,
    scan: input.research.scan,
    area_notes: input.research.area_notes,
    pressing_project: input.research.pressing_project,
    anything_else: input.research.anything_else,
    transcript: input.transcript,
  })
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

export function formatWaypointEmailHtml(body: WaypointBody): string {
  const person = body.person
  const rows = body.areas
    .map(
      (area) => `
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(area.label)}</td>
          <td style="padding:8px;border:1px solid #ddd;">${area.gap_size} — ${escapeHtml(area.gap_size_label)}</td>
          <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(area.success)}</td>
          <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(area.opportunity)}</td>
        </tr>`,
    )
    .join("")
  const project = body.pressing_project
  const transcript = escapeHtml(body.transcript).replaceAll("\n", "<br>")
  const anything = body.anything_else ? escapeHtml(body.anything_else).replaceAll("\n", "<br>") : "N/A"

  return `
    <h2>Spoken marketing-gap interview</h2>
    <p>Use these checked details for the personal video. If the transcript spells a name or email differently, these fields win.</p>
    <p>Name: ${escapeHtml(person.name)}</p>
    <p>Email: ${escapeHtml(person.email)}</p>
    <p>Role: ${escapeHtml(person.role)}</p>
    <p>Company: ${escapeHtml(person.company)}</p>
    <p>Consent to record and transcribe: yes</p>
    <p>How long in the role: ${escapeHtml(body.tenure)}</p>
    <p>The function they have, and the one they will need: ${escapeHtml(body.function_now_and_next)}</p>
    <h3>Seven areas</h3>
    <p>1 = already there, 7 = nowhere near.</p>
    <table style="border-collapse:collapse;margin:12px 0;">
      <thead>
        <tr>
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">Area</th>
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">Gap</th>
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">How it feels</th>
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">Opportunity</th>
        </tr>
      </thead>
      <tbody>${rows}
      </tbody>
    </table>
    <h3>Most pressing project</h3>
    <p>What: ${escapeHtml(project.what)}</p>
    <p>Difference: ${escapeHtml(project.difference)}</p>
    <p>Success: ${escapeHtml(project.success)}</p>
    <p>Progress by: ${escapeHtml(project.progress_by)}</p>
    <p>Anything else: ${anything}</p>
    <h3>Transcript</h3>
    <p>${transcript}</p>
  `
}
