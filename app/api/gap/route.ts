import { NextResponse } from "next/server"
import {
  buildGapAreasPayload,
  formatGapScanEmailHtml,
  isGapAreaKey,
  isValidScan,
  optionalText,
  readGapPerson,
} from "@/lib/gap"

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    const parsed = await request.json()
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 })
    }
    body = parsed as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 })
  }

  const { must_achieve, scan, most_important, widest_gaps, closest, shows_the_gap, anything_else } = body
  const achieved = optionalText(must_achieve)
  if (!achieved) {
    return NextResponse.json({ error: "Tell us what marketing must achieve." }, { status: 400 })
  }

  if (!isValidScan(scan)) {
    return NextResponse.json({ error: "Missing scan answers" }, { status: 400 })
  }

  if (!isGapAreaKey(most_important)) {
    return NextResponse.json({ error: "Choose the most important area of focus." }, { status: 400 })
  }

  const showsGap = optionalText(shows_the_gap)
  if (!showsGap) {
    return NextResponse.json({ error: "Name a campaign or piece of work that shows the gap." }, { status: 400 })
  }

  const person = readGapPerson(body.person)
  if (!person) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 })
  }

  const areas = buildGapAreasPayload(scan)

  // TODO: persist submission and trigger the two-day video follow-up workflow.
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "webform@committedcitizens.co.uk",
      to: "info@committedcitizens.co.uk",
      subject: `New Gap Scan: ${person.name}`,
      html: formatGapScanEmailHtml({
        person,
        anything_else: optionalText(anything_else),
        must_achieve: achieved,
        shows_the_gap: showsGap,
        scan,
        widest_gaps: Array.isArray(widest_gaps) ? widest_gaps.filter(isGapAreaKey) : [],
        closest: isGapAreaKey(closest) ? closest : undefined,
        areas,
        most_important,
      }),
    })
  }

  return NextResponse.json({ success: true })
}
