import type { Metadata } from "next"
import { AskCc } from "@/components/chatbot/ask-cc"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Ask CC",
  description: "A private trial. Answers come only from the Committed Citizens website.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function ChatbotPage() {
  return <AskCc available={Boolean(process.env.XAI_API_KEY)} />
}
