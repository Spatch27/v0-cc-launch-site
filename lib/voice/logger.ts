import { redactEvent, redactValue } from "@/lib/voice/redact"

type Entry = Record<string, unknown>

export function createVoiceSessionId(): string {
  const bytes = new Uint8Array(4)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

export function createVoiceLogger(sessionId: string) {
  const started = typeof performance === "undefined" ? Date.now() : performance.now()
  let buffer: Entry[] = []
  let timer: ReturnType<typeof setTimeout> | null = null
  let closed = false

  function schedule() {
    if (timer != null || closed) return
    timer = setTimeout(() => {
      timer = null
      flush(false)
    }, 1000)
  }

  function flush(final: boolean) {
    if (timer != null) {
      clearTimeout(timer)
      timer = null
    }
    const entries = buffer
    buffer = []
    if (!entries.length || typeof fetch === "undefined") return
    try {
      void fetch("/api/voice/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, entries }),
        keepalive: final,
      }).catch(() => undefined)
    } catch {
      // Logging must never throw into the voice path.
    }
  }

  function log(kind: string, data: Record<string, unknown> = {}) {
    try {
      const now = typeof performance === "undefined" ? Date.now() : performance.now()
      const redacted = redactValue(data)
      const extra = redacted && typeof redacted === "object" && !Array.isArray(redacted) ? (redacted as Entry) : {}
      const entry: Entry = { ...extra, t: Math.round(now - started), ts: Date.now(), kind }
      if (process.env.NODE_ENV !== "production" && typeof console !== "undefined") {
        console.debug("[voice]", entry)
      }
      buffer.push(entry)
      if (buffer.length >= 200) flush(false)
      else schedule()
    } catch {
      // Logging must never throw into the voice path.
    }
  }

  return {
    log,
    server(event: Record<string, unknown>, extra: Record<string, unknown> = {}) {
      log("server", { ...redactEvent(event), ...extra })
    },
    client(event: Record<string, unknown>) {
      log("client", redactEvent(event))
    },
    error(where: string, err: unknown, extra: Record<string, unknown> = {}) {
      const name = err instanceof Error ? err.name : "Error"
      const message = err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error"
      log("error", { where, name, message, ...extra })
    },
    close() {
      if (closed) return
      closed = true
      flush(true)
    },
  }
}

export type VoiceLogger = ReturnType<typeof createVoiceLogger>
