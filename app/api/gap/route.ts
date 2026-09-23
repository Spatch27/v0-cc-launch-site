import { NextResponse } from "next/server"
import { buildFocusAreas, formatGapScanEmailHtml, isValidFocusAreas, optionalText } from "@/lib/gap"

export async function POST(request: Request) {
  const body = await request.json()
  const { person, must_achieve, focus_areas, would_protect, shows_the_gap } = body

  if (!person?.name || !person?.email || !person?.company) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  if (!isValidFocusAreas(focus_areas)) {
    return NextResponse.json({ error: "Pick one or two areas" }, { status: 400 })
  }

  const areas = buildFocusAreas(focus_areas)

  // TODO: persist submission and trigger the two-day video follow-up workflow.
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "webform@committedcitizens.co.uk",
      to: "info@committedcitizens.co.uk",
      subject: `New Gap Scan: ${person.name} (${person.company})`,
      html: formatGapScanEmailHtml({
        person,
        must_achieve: optionalText(must_achieve),
        focus_areas: areas,
        would_protect: optionalText(would_protect),
        shows_the_gap: optionalText(shows_the_gap),
      }),
    })
  }

  return NextResponse.json({ success: true })
}
