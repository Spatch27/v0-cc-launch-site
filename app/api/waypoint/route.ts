import { NextResponse } from "next/server"
import { formatWaypointEmailHtml, parseWaypointBody } from "@/lib/waypoint"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "The interview could not be read.", field: "body" }, { status: 400 })
  }

  const parsed = parseWaypointBody(payload)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error, speak: parsed.speak, field: parsed.field }, { status: 400 })
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend")
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: "webform@committedcitizens.co.uk",
        to: "info@committedcitizens.co.uk",
        subject: `New marketing gap conversation: ${parsed.body.person.name}`,
        html: formatWaypointEmailHtml(parsed.body),
      })
    } catch (err) {
      console.error("[waypoint] email failed", err instanceof Error ? err.name : "Error")
      return NextResponse.json(
        { error: "We couldn’t send this just now. Please try again.", field: "send" },
        { status: 502 },
      )
    }
  }

  return NextResponse.json({ success: true })
}
