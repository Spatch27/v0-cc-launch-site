import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, role, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // Send email via Resend to verified address
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
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
      } catch (e) {
        console.error("[v0] Resend failed:", e instanceof Error ? e.message : e)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
