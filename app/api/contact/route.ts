import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, company, role, message } = body

  if (!name || !email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "info@committedcitizens.co.uk",
      subject: `New Contact Form: ${name}`,
      html: `<h2>New Contact</h2><p>Name: ${name}</p><p>Email: ${email}</p><p>Company: ${company || "N/A"}</p><p>Role: ${role || "N/A"}</p><p>Message: ${message || "N/A"}</p>`,
    })
  }

  return NextResponse.json({ success: true })
}
