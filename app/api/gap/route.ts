import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { person, biggest_difference, scan, widest_gaps, closest, would_protect, tried_and_didnt_stick } = body

  if (!person?.name || !person?.email || !person?.company) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  if (!scan || Object.keys(scan).length !== 7) {
    return NextResponse.json({ error: "Missing scan answers" }, { status: 400 })
  }

  // TODO: persist submission and trigger the two-day video follow-up workflow.
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "webform@committedcitizens.co.uk",
      to: "info@committedcitizens.co.uk",
      subject: `New Gap Scan: ${person.name} (${person.company})`,
      html: `
        <h2>New Gap Scan</h2>
        <p>Name: ${person.name}</p>
        <p>Email: ${person.email}</p>
        <p>Company: ${person.company}</p>
        <p>Role: ${person.role || "N/A"}</p>
        <p>Marketing headcount: ${person.marketing_headcount || "N/A"}</p>
        <p>Biggest difference: ${biggest_difference || "N/A"}</p>
        <p>Scan: ${JSON.stringify(scan)}</p>
        <p>Widest gaps: ${JSON.stringify(widest_gaps)}</p>
        <p>Closest: ${closest}</p>
        <p>Would protect: ${would_protect || "N/A"}</p>
        <p>Fix that keeps coming back: ${tried_and_didnt_stick || "N/A"}</p>
      `,
    })
  }

  return NextResponse.json({ success: true })
}
