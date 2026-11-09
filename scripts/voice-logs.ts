import { readdir, readFile } from "fs/promises"
import path from "path"
import { VOICE_LOG_DIR } from "../lib/voice/sink"

type Entry = {
  t?: number
  ts?: number
  kind?: string
  type?: string
  message?: string
  phase?: string
  response_id?: string
  since_speech_stopped_ms?: number | null
  since_response_created_ms?: number | null
  underruns?: number
  max_gap_ms?: number
  chunks?: number
  bytes?: number
}

async function main() {
  const requested = process.argv[2]
  const names = requested ? [requested.endsWith(".ndjson") ? requested : `${requested}.ndjson`] : await readdir(VOICE_LOG_DIR).catch(() => [])
  const files = names.filter((name) => name.endsWith(".ndjson")).sort()
  if (!files.length) {
    console.log(`No voice logs in ${VOICE_LOG_DIR}`)
    return
  }
  const file = path.join(VOICE_LOG_DIR, files[files.length - 1] ?? "")
  const entries = (await readFile(file, "utf8"))
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as Entry)

  console.log(file)
  for (const entry of entries) {
    if (!entry.kind || !["start", "token.ok", "mic.ok", "env", "ws.open", "ws.close", "server.token", "stop", "error"].includes(entry.kind)) {
      continue
    }
    console.log(`${entry.t ?? entry.ts ?? ""}ms ${entry.kind} ${entry.type ?? ""} ${entry.message ?? ""}`.trim())
  }

  const counts = new Map<string, number>()
  for (const entry of entries) {
    if (entry.kind === "server" && entry.type) counts.set(entry.type, (counts.get(entry.type) ?? 0) + 1)
  }
  for (const [type, count] of [...counts.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`${count} ${type}`)
  }

  for (const entry of entries) {
    if (entry.kind === "audio.out.first" || entry.kind === "audio.out") {
      console.log(
        [
          entry.kind,
          entry.response_id ?? "",
          entry.since_speech_stopped_ms != null ? `speech ${entry.since_speech_stopped_ms}ms` : "",
          entry.since_response_created_ms != null ? `created ${entry.since_response_created_ms}ms` : "",
          entry.underruns != null ? `underruns ${entry.underruns}` : "",
          entry.max_gap_ms != null ? `gap ${entry.max_gap_ms}ms` : "",
        ]
          .filter(Boolean)
          .join(" "),
      )
    }
  }

  let chunks = 0
  let bytes = 0
  for (const entry of entries) {
    if (entry.kind !== "audio.in") continue
    chunks += entry.chunks ?? 0
    bytes += entry.bytes ?? 0
  }
  console.log(`mic ${chunks} chunks, ${bytes} bytes`)

  for (const entry of entries.slice(-25)) {
    console.log(JSON.stringify(entry))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
