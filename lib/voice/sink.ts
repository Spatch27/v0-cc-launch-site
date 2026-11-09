import { appendFile, mkdir } from "fs/promises"
import path from "path"

export const VOICE_LOG_DIR = path.join(process.cwd(), ".voice-logs")

export const VOICE_SESSION_ID = /^[a-z0-9]{4,64}$/

export function voiceLogEnabled(): boolean {
  return process.env.NODE_ENV !== "production" || process.env.VOICE_LOG === "1"
}

export async function appendVoiceEntries(sessionId: string, entries: unknown[]): Promise<void> {
  if (!VOICE_SESSION_ID.test(sessionId)) return
  await mkdir(VOICE_LOG_DIR, { recursive: true })
  const root = path.resolve(VOICE_LOG_DIR)
  const file = path.resolve(root, `${sessionId}.ndjson`)
  if (file !== path.join(root, `${sessionId}.ndjson`)) return
  const lines: string[] = []
  for (const entry of entries.slice(0, 500)) {
    const line = JSON.stringify(entry)
    if (!line || line.length > 16_000) continue
    lines.push(line)
  }
  if (!lines.length) return
  await appendFile(file, `${lines.join("\n")}\n`, "utf8")
}
