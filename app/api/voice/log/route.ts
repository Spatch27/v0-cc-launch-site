import { NextResponse } from "next/server"
import { appendVoiceEntries, VOICE_SESSION_ID, voiceLogEnabled } from "@/lib/voice/sink"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  if (!voiceLogEnabled()) {
    return new NextResponse(null, { status: 404 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid log payload." }, { status: 400 })
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid log payload." }, { status: 400 })
  }

  const record = body as Record<string, unknown>
  if (typeof record.sessionId !== "string" || !VOICE_SESSION_ID.test(record.sessionId) || !Array.isArray(record.entries)) {
    return NextResponse.json({ error: "Invalid log payload." }, { status: 400 })
  }

  await appendVoiceEntries(record.sessionId, record.entries)
  return new NextResponse(null, { status: 204 })
}
