import type { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Committed Citizens. Let\u2019s talk about removing operational drag from your marketing team.",
}

export default function ContactPage() {
  return <ContactForm />
}
