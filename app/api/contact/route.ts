import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, role, message } = body

    console.log("[v0] Contact form submission received:", { name, email, company, role })

    // Validate required fields
    if (!name || !email) {
      console.log("[v0] Validation failed - missing name or email")
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      )
    }

    // Send email notification via Resend
    const resendKey = process.env.RESEND_API_KEY
    console.log("[v0] RESEND_API_KEY present:", !!resendKey)
    
    if (resendKey) {
      try {
        const resend = new Resend(resendKey)
        const emailResult = await resend.emails.send({
          from: "Committed Citizens <onboarding@resend.dev>",
          to: "info@committedcitizens.co.uk",
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
            ${role ? `<p><strong>Role:</strong> ${role}</p>` : ""}
            ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>` : ""}
          `,
        })
        console.log("[v0] Resend email result:", emailResult)
      } catch (resendError) {
        console.error("[v0] Resend error:", resendError)
      }
    }

    // If ATTIO_API_KEY is configured, send to Attio CRM
    const attioKey = process.env.ATTIO_API_KEY
    console.log("[v0] ATTIO_API_KEY present:", !!attioKey)
    
    if (attioKey) {
      try {
        const attioPayload = {
          data: {
            values: {
              name: [{ first_name: name.split(" ")[0], last_name: name.split(" ").slice(1).join(" ") || "" }],
              email_addresses: [{ email_address: email }],
            },
          },
        }
        console.log("[v0] Attio payload:", JSON.stringify(attioPayload, null, 2))
        
        const attioResponse = await fetch("https://api.attio.com/v2/objects/people/records", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${attioKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attioPayload),
        })
        
        const attioResult = await attioResponse.json()
        console.log("[v0] Attio response status:", attioResponse.status)
        console.log("[v0] Attio response body:", JSON.stringify(attioResult, null, 2))
        
        if (!attioResponse.ok) {
          console.error("[v0] Attio API error:", attioResult)
        }
      } catch (attioError) {
        console.error("[v0] Attio error:", attioError)
      }
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
