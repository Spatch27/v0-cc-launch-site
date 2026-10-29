import { NextResponse } from "next/server"
import {
  buildGapAreasPayload,
  formatGapScanEmailHtml,
  isGapAreaKey,
  isValidScan,
  optionalText,
} from "@/lib/gap"

export async function POST(request: Request) {
  const body = await request.json()
  const { person, must_achieve, scan, most_important, widest_gaps, closest, shows_the_gap } = body

  if (!person?.name || !person?.email || !person?.company) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  if (!isValidScan(scan)) {
    return NextResponse.json({ error: "Missing scan answers" }, { status: 400 })
  }

  if (!isGapAreaKey(most_important)) {
    return NextResponse.json({ error: "Choose the most important area of focus." }, { status: 400 })
  }

  const areas = buildGapAreasPayload(scan)

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
        shows_the_gap: optionalText(shows_the_gap),
        scan,
        widest_gaps: Array.isArray(widest_gaps) ? widest_gaps : [],
        closest: isGapAreaKey(closest) ? closest : undefined,
        areas,
        most_important,
      }),
    })
  }

  return NextResponse.json({ success: true })
}
