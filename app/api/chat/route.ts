import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream, type UIMessage } from "ai"
import { createXai } from "@ai-sdk/xai"
import { askCcInstructions, askCcKnowledge } from "@/lib/chat/knowledge"
import { clientAddress, readChatMessages, takeRateLimit } from "@/lib/chat/guard"

export const maxDuration = 60

const MODEL_ID = "grok-4.3"

function plain(message: string, status: number) {
  return new Response(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}

export async function POST(request: Request) {
  const apiKey = process.env.XAI_API_KEY
  if (!apiKey) {
    return plain("This chat is unavailable just now. You can still take the gap diagnostic or book a Waypoint.", 503)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return plain("Type a question to start.", 400)
  }

  const read = readChatMessages(body)
  if (!read.ok) {
    return plain(read.error, read.status)
  }

  if (!takeRateLimit(clientAddress(request)).ok) {
    return plain("Ask CC is busy from this connection. Please wait a few minutes and try again.", 429)
  }

  const messages: UIMessage[] = read.messages.map((message, index) => ({
    id: `turn-${index}`,
    role: message.role,
    parts: [{ type: "text", text: message.text }],
  }))

  try {
    const knowledge = await askCcKnowledge()
    const xai = createXai({ apiKey })
    const result = streamText({
      model: xai(MODEL_ID),
      instructions: askCcInstructions(knowledge.text),
      messages: await convertToModelMessages(messages),
      temperature: 0.3,
      providerOptions: {
        xai: { reasoningEffort: "none" },
      },
    })

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError: () => "Ask CC could not answer just now. Please try again in a moment.",
      }),
    })
  } catch (error) {
    console.error("Ask CC: reply failed")
    if (error instanceof Error) {
      console.error(error.name)
    }
    return plain("Ask CC could not answer just now. Please try again in a moment.", 500)
  }
}
