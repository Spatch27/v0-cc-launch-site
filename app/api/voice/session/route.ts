import { NextResponse } from "next/server"
import { appendVoiceEntries, VOICE_SESSION_ID, voiceLogEnabled } from "@/lib/voice/sink"

export const dynamic = "force-dynamic"

const UPSTREAM = "https://api.x.ai/v1/realtime/client_secrets"

/**
 * Mints a short-lived voice token for the browser.
 * XAI_API_KEY must be set in the deployment environment (for example Vercel).
 * The browser receives only the ephemeral token, never the long-lived key.
 */
async function logToken(sessionId: string | null, entry: { ok: boolean; status: number; ms: number; upstream: string }) {
  if (!voiceLogEnabled() || !sessionId || !VOICE_SESSION_ID.test(sessionId)) return
  await appendVoiceEntries(sessionId, [
    {
      ts: Date.now(),
      kind: "server.token",
      src: "server",
      ok: entry.ok,
      status: entry.status,
      ms: entry.ms,
      upstream: entry.upstream,
    },
  ])
}

function readSessionId(body: unknown): string | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null
  const sessionId = (body as Record<string, unknown>).sessionId
  return typeof sessionId === "string" && VOICE_SESSION_ID.test(sessionId) ? sessionId : null
}

function readToken(payload: unknown): { token: string; expiresAt?: number } | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null
  const record = payload as Record<string, unknown>
  if (typeof record.value !== "string" || !record.value.trim()) return null
  return {
    token: record.value.trim(),
    expiresAt: typeof record.expires_at === "number" ? record.expires_at : undefined,
  }
}

export async function POST(request: Request) {
  const started = Date.now()
  let sessionId: string | null = null
  try {
    sessionId = readSessionId(await request.json())
  } catch {
    sessionId = null
  }

  const apiKey = process.env.XAI_API_KEY?.trim()
  if (!apiKey) {
    await logToken(sessionId, { ok: false, status: 503, ms: Date.now() - started, upstream: "missing_env" })
    return NextResponse.json(
      {
        error:
          "Voice interviews are unavailable because XAI_API_KEY is not set. Add it in the deployment environment, for example Vercel, and redeploy.",
      },
      { status: 503 },
    )
  }

  try {
    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expires_after: { seconds: 300 } }),
      signal: AbortSignal.timeout(15_000),
    })
    const ms = Date.now() - started
    if (!upstream.ok) {
      await logToken(sessionId, { ok: false, status: upstream.status, ms, upstream: UPSTREAM })
      return NextResponse.json({ error: "The voice service did not start. Please try again." }, { status: 502 })
    }

    const token = readToken(await upstream.json())
    if (!token) {
      await logToken(sessionId, { ok: false, status: 502, ms, upstream: UPSTREAM })
      return NextResponse.json({ error: "The voice service did not start. Please try again." }, { status: 502 })
    }

    await logToken(sessionId, { ok: true, status: upstream.status, ms, upstream: UPSTREAM })
    return NextResponse.json({ token: token.token, expiresAt: token.expiresAt ?? null })
  } catch {
    await logToken(sessionId, { ok: false, status: 502, ms: Date.now() - started, upstream: UPSTREAM })
    return NextResponse.json({ error: "The voice service did not start. Please try again." }, { status: 502 })
  }
}
