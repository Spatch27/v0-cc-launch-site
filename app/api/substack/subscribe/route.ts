import { NextResponse } from "next/server"
import { SUBSTACK_FREE_SIGNUP_URL } from "@/lib/substack"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function asShortString(value: unknown, max: number) {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

function messageFromBody(data: unknown) {
  if (!data || typeof data !== "object") return null
  const record = data as Record<string, unknown>
  if (typeof record.error === "string") {
    const message = record.error.trim()
    if (message && message.length <= 180 && !message.includes("<")) return message
  }
  if (Array.isArray(record.errors)) {
    const first = record.errors[0]
    if (first && typeof first === "object" && "msg" in first && typeof first.msg === "string") {
      const message = first.msg.trim()
      if (message && message.length <= 180 && !message.includes("<")) return message
    }
  }
  return null
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const email = asShortString(
    body && typeof body === "object" && "email" in body ? (body as { email: unknown }).email : "",
    320,
  )
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
  }

  const fields =
    body && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {}
  const pageUrl = asShortString(fields.current_url, 2000) || asShortString(fields.first_url, 2000)

  let upstream: Response
  try {
    upstream = await fetch(SUBSTACK_FREE_SIGNUP_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_url: pageUrl,
        first_referrer: asShortString(fields.first_referrer, 2000),
        current_url: pageUrl,
        current_referrer: asShortString(fields.current_referrer, 2000),
        referral_code: asShortString(fields.referral_code, 200),
        source: "subscribe-page",
      }),
      cache: "no-store",
    })
  } catch {
    return NextResponse.json(
      { error: "We couldn't complete that here.", fallback: true },
      { status: 502 },
    )
  }

  const raw = await upstream.text()
  const contentType = upstream.headers.get("content-type") || ""
  let data: unknown = null
  if (contentType.includes("json")) {
    try {
      data = JSON.parse(raw)
    } catch {
      data = null
    }
  }

  if (upstream.ok && data && typeof data === "object") {
    const record = data as Record<string, unknown>
    return NextResponse.json({
      ok: true,
      requiresConfirmation: record.requires_confirmation !== false,
    })
  }

  const captcha =
    upstream.status === 403 ||
    upstream.status === 429 ||
    !contentType.includes("application/json") ||
    /captcha/i.test(raw.slice(0, 500))

  return NextResponse.json(
    {
      error: messageFromBody(data) || "We couldn't complete that here.",
      fallback: true,
      captcha,
    },
    { status: upstream.status === 400 ? 400 : 502 },
  )
}
