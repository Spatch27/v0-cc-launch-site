import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, role, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const results = { resend: null, attio: null }

    // Try Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)
        const result = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "info@committedcitizens.co.uk",
          subject: `Contact: ${name}`,
          html: `<p>${name} (${email})</p><p>${message}</p>`,
        })
        results.resend = result
      } catch (e) {
        results.resend = { error: e instanceof Error ? e.message : String(e) }
      }
    }

    // Try Attio
    if (process.env.ATTIO_API_KEY) {
      try {
        const res = await fetch("https://api.attio.com/v2/objects/people/records", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${process.env.ATTIO_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              values: {
                name: [{ first_name: name.split(" ")[0], last_name: name.split(" ").slice(1).join(" ") || "" }],
                email_addresses: [{ email_address: email }],
              },
            },
          }),
        })
        const data = await res.json()
        results.attio = { status: res.status, success: res.ok, data }
      } catch (e) {
        results.attio = { error: e instanceof Error ? e.message : String(e) }
      }
    }

    return NextResponse.json({ success: true, debug: results })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
