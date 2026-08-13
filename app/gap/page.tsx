import type { Metadata } from "next"
import { GapForm } from "@/components/gap/gap-form"

export const metadata: Metadata = {
  title: "Where's the gap in your marketing? | Committed Citizens",
  description:
    "Three lines and seven sliders, about two minutes. We send back a three-minute video: how big we think the gap is and three things holding it there.",
  openGraph: {
    title: "Where's the gap in your marketing? | Committed Citizens",
    description:
      "Three lines and seven sliders, about two minutes. We send back a three-minute video: how big we think the gap is and three things holding it there.",
    type: "website",
    images: [
      {
        url: "/gap-og-card.png",
        width: 1200,
        height: 630,
        alt: "Where's the gap in your marketing? | Committed Citizens",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Where's the gap in your marketing? | Committed Citizens",
    description:
      "Three lines and seven sliders, about two minutes. We send back a three-minute video: how big we think the gap is and three things holding it there.",
    images: ["/gap-og-card.png"],
  },
}

export default function GapPage() {
  return <GapForm />
}
