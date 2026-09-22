import type { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"
import { canonicalAlternates } from "@/lib/seo"

export const metadata: Metadata = {
  title: {
    absolute: "Contact | Book a Waypoint with Committed Citizens",
  },
  description:
    "Book a free 60-minute Waypoint with the founders. No pitch — we do the homework first. If you're a marketing leader who wants AI to make your function more effective, we'd love to hear from you.",
  alternates: canonicalAlternates("/contact"),
  openGraph: {
    title: "Contact | Committed Citizens",
    description: "Let's talk. Book a free Waypoint with the founders and get a two-page Marker within 48 hours — where to start, and where AI can make it better.",
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
    description: "Let's talk. Book a free Waypoint with the founders and get a two-page Marker within 48 hours — where to start, and where AI can make it better.",
    images: ["/og-image.jpg"],
  },
}

export default function ContactPage() {
  return <ContactForm />
}
