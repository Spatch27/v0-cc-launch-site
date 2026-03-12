import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, role, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const results = { resend: null, attio: null }

    // Try Resend - send to tim@committedcitizens.co.uk (verified domain owner)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)
        const result = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "tim@committedcitizens.co.uk",
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "N/A"}</p>
            <p><strong>Role:</strong> ${role || "N/A"}</p>
            <p><strong>Message:</strong></p>
            <p>${message || "N/A"}</p>
          `,
        })
        results.resend = result
      } catch (e) {
        results.resend = { error: e instanceof Error ? e.message : String(e) }
      }
    }

    // Try Attio
    if (process.env.ATTIO_API_KEY) {
      try {
        const url = new URL("https://api.attio.com/v2/objects/people/records")
        url.searchParams.set("matching_attribute", "email_addresses")
        url.searchParams.set("matching_value", email)
        
        const res = await fetch(url.toString(), {
          method: "POST",
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
