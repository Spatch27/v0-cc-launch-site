import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, role, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // Send email notification via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "tim@committedcitizens.co.uk",
          subject: `New Contact Form: ${name}`,
          html: `
            <h2>New Website Contact Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Role:</strong> ${role || "Not provided"}</p>
            <p><strong>Message:</strong></p>
            <p>${(message || "").replace(/\n/g, "<br>")}</p>
          `,
        })
      } catch (err) {
        console.error("[v0] Email send error:", err)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
