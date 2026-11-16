/** Limits for the private Ask CC trial. */

export const MAX_USER_CHARS = 800
export const MAX_USER_TURNS = 8
export const MAX_MESSAGES = 16
export const MAX_ASSISTANT_CHARS = 6000

const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 12

export type ChatTurn = {
  role: "user" | "assistant"
  text: string
}

export type ChatReadResult =
  | { ok: true; messages: ChatTurn[] }
  | { ok: false; status: number; error: string }

type Bucket = { timestamps: number[] }

const buckets = new Map<string, Bucket>()

export function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
  return ip.slice(0, 80)
}

export function takeRateLimit(key: string, now = Date.now()): { ok: true } | { ok: false } {
  const bucket = buckets.get(key) ?? { timestamps: [] }
  const fresh = bucket.timestamps.filter((timestamp) => now - timestamp < RATE_WINDOW_MS)

  if (fresh.length >= RATE_MAX) {
    buckets.set(key, { timestamps: fresh })
    return { ok: false }
  }

  fresh.push(now)
  buckets.set(key, { timestamps: fresh })

  if (buckets.size > 5000) {
    for (const [storedKey, stored] of buckets) {
      if (stored.timestamps.every((timestamp) => now - timestamp >= RATE_WINDOW_MS)) {
        buckets.delete(storedKey)
      }
    }
  }

  return { ok: true }
}

function textFromUnknownMessage(message: object): string {
  const parts = "parts" in message ? message.parts : undefined
  if (Array.isArray(parts)) {
    return parts
      .filter(
        (part): part is { type: string; text: string } =>
          Boolean(part) &&
          typeof part === "object" &&
          "type" in part &&
          (part as { type?: unknown }).type === "text" &&
          "text" in part &&
          typeof (part as { text?: unknown }).text === "string",
      )
      .map((part) => part.text)
      .join("")
  }

  if ("content" in message && typeof message.content === "string") {
    return message.content
  }

  return ""
}

export function readChatMessages(body: unknown): ChatReadResult {
  if (!body || typeof body !== "object" || !("messages" in body) || !Array.isArray(body.messages)) {
    return { ok: false, status: 400, error: "Type a question to start." }
  }

  if (body.messages.length === 0) {
    return { ok: false, status: 400, error: "Type a question to start." }
  }

  if (body.messages.length > MAX_MESSAGES) {
    return {
      ok: false,
      status: 400,
      error: "This trial conversation has reached its limit. Start again, or take the gap diagnostic.",
    }
  }

  const messages: ChatTurn[] = []
  let userTurns = 0

  for (const message of body.messages) {
    if (!message || typeof message !== "object" || !("role" in message)) {
      return { ok: false, status: 400, error: "That message could not be read." }
    }

    const role = message.role
    if (role !== "user" && role !== "assistant") {
      return { ok: false, status: 400, error: "That message could not be read." }
    }

    const raw = textFromUnknownMessage(message).trim()
    if (!raw) continue

    if (role === "user") {
      const text = raw.replace(/\s+/g, " ").trim()
      if (text.length > MAX_USER_CHARS) {
        return {
          ok: false,
          status: 400,
          error: `Please keep each question under ${MAX_USER_CHARS} characters.`,
        }
      }
      userTurns += 1
      messages.push({ role, text })
      continue
    }

    messages.push({
      role,
      text: raw.length > MAX_ASSISTANT_CHARS ? raw.slice(0, MAX_ASSISTANT_CHARS) : raw,
    })
  }

  if (userTurns > MAX_USER_TURNS) {
    return {
      ok: false,
      status: 400,
      error: "This trial conversation has reached its limit. Start again, or book a Waypoint.",
    }
  }

  const latest = messages[messages.length - 1]
  if (!latest || latest.role !== "user") {
    return { ok: false, status: 400, error: "Type a question to start." }
  }

  return { ok: true, messages }
}
