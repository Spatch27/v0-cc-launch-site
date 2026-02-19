import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, role, message } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      )
    }

    // If ATTIO_API_KEY is configured, send to Attio CRM
    const attioKey = process.env.ATTIO_API_KEY
    if (attioKey) {
      // Create person record in Attio
      await fetch("https://api.attio.com/v2/objects/people/records", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${attioKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            values: {
              name: [{ first_name: name.split(" ")[0], last_name: name.split(" ").slice(1).join(" ") }],
              email_addresses: [{ email_address: email }],
              company: [{ value: company }],
              job_title: role ? [{ value: role }] : [],
            },
          },
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to process submission." },
      { status: 500 }
    )
  }
}
