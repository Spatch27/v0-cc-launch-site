import { NextResponse } from "next/server"
import {
  buildGapAreasPayload,
  formatGapScanEmailHtml,
  isValidScan,
  optionalText,
  resolveImportanceOrder,
} from "@/lib/gap"

export async function POST(request: Request) {
  const body = await request.json()
  const {
    person,
    must_achieve,
    scan,
    importance,
    importance_order,
    importance_touched,
    widest_gaps,
    closest,
    would_protect,
    shows_the_gap,
  } = body

  if (!person?.name || !person?.email || !person?.company) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  if (!isValidScan(scan)) {
    return NextResponse.json({ error: "Missing scan answers" }, { status: 400 })
  }

  const order = resolveImportanceOrder(importance, importance_order)
  if (!order) {
    return NextResponse.json({ error: "Missing importance ranking" }, { status: 400 })
  }

  const areas = buildGapAreasPayload(scan, order)

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
        would_protect: optionalText(would_protect),
        shows_the_gap: optionalText(shows_the_gap),
        scan,
        widest_gaps: Array.isArray(widest_gaps) ? widest_gaps : [],
        closest,
        areas,
        importance_touched: Boolean(importance_touched),
      }),
    })
  }

  return NextResponse.json({ success: true })
}
