import type { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact a Marketing Operations Consultant | Committed Citizens",
  description:
    "Schedule a free Waypoint consultation with our marketing transformation experts. Discover how we can help your CMO's team streamline operations and eliminate workflow drag.",
  openGraph: {
    title: "Contact | Committed Citizens",
    description: "Get in touch with Committed Citizens. Let's talk about removing operational drag from your marketing team.",
    url: "https://www.committedcitizens.co.uk/contact",
    type: "website",
    locale: "en_GB",
    siteName: "Committed Citizens",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Committed Citizens - Contact",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Committed Citizens",
    description: "Get in touch with Committed Citizens. Let's talk about removing operational drag from your marketing team.",
    images: ["/og-image.jpg"],
  },
}

export default function ContactPage() {
  return <ContactForm />
}
