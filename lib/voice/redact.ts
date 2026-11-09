import { base64Bytes } from "@/lib/voice/audio"

const AUDIO_TYPES = new Set(["response.output_audio.delta", "response.audio.delta", "input_audio_buffer.append"])

const SECRET_KEYS = new Set([
  "authorization",
  "token",
  "api_key",
  "apikey",
  "secret",
  "client_secret",
  "clientsecret",
  "xai_api_key",
])

export function redactValue(value: unknown, depth = 0): unknown {
  if (value == null || typeof value === "number" || typeof value === "boolean") return value
  if (typeof value === "string") {
    return value.length > 400 ? `${value.slice(0, 400)}…[${value.length} chars]` : value
  }
  if (depth > 4) return "[depth]"
  if (Array.isArray(value)) {
    const items = value.slice(0, 50).map((item) => redactValue(item, depth + 1))
    if (value.length > 50) items.push(`…[${value.length} items]`)
    return items
  }
  if (typeof value === "object") {
    const out: Record<string, unknown> = {}
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      if (SECRET_KEYS.has(key.toLowerCase())) continue
      out[key] = redactValue(entry, depth + 1)
    }
    return out
  }
  return String(value)
}

export function redactEvent(event: Record<string, unknown>): Record<string, unknown> {
  const type = typeof event.type === "string" ? event.type : ""
  const copy: Record<string, unknown> = { ...event }
  if (AUDIO_TYPES.has(type)) {
    if (typeof copy.delta === "string") {
      copy.bytes = base64Bytes(copy.delta)
      delete copy.delta
    }
    if (typeof copy.audio === "string") {
      copy.bytes = base64Bytes(copy.audio)
      delete copy.audio
    }
  }
  const redacted = redactValue(copy)
  return redacted && typeof redacted === "object" && !Array.isArray(redacted) ? (redacted as Record<string, unknown>) : {}
}
