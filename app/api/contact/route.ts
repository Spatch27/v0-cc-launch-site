import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    console.log("[v0] API route called")
    const body = await request.json()
    const { name, email, company, role, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    console.log("[v0] Received form data:", { name, email })
    console.log("[v0] RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)
    console.log("[v0] ATTIO_API_KEY exists:", !!process.env.ATTIO_API_KEY)

    // Try Resend
    if (process.env.RESEND_API_KEY) {
      try {
        console.log("[v0] Attempting Resend import...")
        const { Resend } = await import("resend")
        console.log("[v0] Resend imported, creating client...")
        const resend = new Resend(process.env.RESEND_API_KEY)
        console.log("[v0] Sending email...")
        const result = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "info@committedcitizens.co.uk",
          subject: `Contact: ${name}`,
          html: `<p>${name} (${email})</p><p>${message}</p>`,
        })
        console.log("[v0] Resend result:", result)
      } catch (e) {
        console.error("[v0] Resend failed:", e instanceof Error ? e.message : e)
      }
    }

    // Try Attio
    if (process.env.ATTIO_API_KEY) {
      try {
        console.log("[v0] Attempting Attio...")
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
        console.log("[v0] Attio status:", res.status)
        const data = await res.json()
        console.log("[v0] Attio response:", data)
      } catch (e) {
        console.error("[v0] Attio failed:", e instanceof Error ? e.message : e)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] API error:", error instanceof Error ? error.message : error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
