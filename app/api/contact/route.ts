import { NextResponse } from "next/server"
import { Resend } from "resend"

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

    // Debug: Check if env vars are set
    console.log("[v0] RESEND_API_KEY set:", !!process.env.RESEND_API_KEY)
    console.log("[v0] ATTIO_API_KEY set:", !!process.env.ATTIO_API_KEY)

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: "Contact Form <onboarding@resend.dev>",
          to: "info@committedcitizens.co.uk",
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
            ${role ? `<p><strong>Role:</strong> ${role}</p>` : ""}
            ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>` : ""}
          `,
        })
      } catch (err) {
        console.error("[v0] Resend error:", err)
      }
    }

    // Push to Attio if configured
    if (process.env.ATTIO_API_KEY) {
      try {
        await fetch("https://api.attio.com/v2/objects/people/records", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${process.env.ATTIO_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              values: {
                name: [
                  {
                    first_name: name.split(" ")[0],
                    last_name: name.split(" ").slice(1).join(" ") || "",
                  },
                ],
                email_addresses: [{ email_address: email }],
              },
            },
          }),
        })
      } catch (err) {
        console.error("[v0] Attio error:", err)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json({ error: "Failed to process submission." }, { status: 500 })
  }
}
