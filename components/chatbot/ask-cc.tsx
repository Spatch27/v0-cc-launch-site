"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { useState } from "react"
import { MAX_USER_CHARS } from "@/lib/chat/guard"
import { parseAnswer } from "@/lib/chat/answer"

const STARTERS = [
  "I'm a CMO and the work is stuck. Is this for me?",
  "What is Waypoint, in plain English?",
  "How do Initial6, Momentum6 and Pathfinder6 differ?",
  "What happens on a first call?",
]

const transport = new DefaultChatTransport({ api: "/api/chat" })

function messageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("")
}

function Answer({ text }: { text: string }) {
  const paragraphs = parseAnswer(text)
  if (paragraphs.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex} className="text-base leading-relaxed">
          {paragraph.map((segment, segmentIndex) => {
            if (segment.type === "link") {
              return (
                <a
                  key={segmentIndex}
                  href={segment.href}
                  className="font-semibold text-brand-dark underline decoration-2 underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
                >
                  {segment.text}
                </a>
              )
            }
            if (segment.type === "strong") {
              return (
                <strong key={segmentIndex} className="font-semibold">
                  {segment.text}
                </strong>
              )
            }
            return <span key={segmentIndex}>{segment.text}</span>
          })}
        </p>
      ))}
    </div>
  )
}

export function AskCc({ available }: { available: boolean }) {
  const { messages, sendMessage, status, error, stop, setMessages, clearError } = useChat({ transport })
  const [draft, setDraft] = useState("")
  const busy = status === "submitted" || status === "streaming"
  const tooLong = draft.trim().length > MAX_USER_CHARS

  function ask(text: string) {
    const question = text.trim()
    if (!available || busy || !question || question.length > MAX_USER_CHARS) return
    clearError()
    sendMessage({ text: question })
    setDraft("")
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    ask(draft)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      ask(draft)
    }
  }

  function startAgain() {
    stop()
    setMessages([])
    clearError()
    setDraft("")
  }

  const friendlyError = "Ask CC could not answer just now. Please try again in a moment."
  const rawError = error?.message ?? ""
  const errorText = !error
    ? null
    : rawError.length > 0 &&
        rawError.length < 280 &&
        !rawError.includes("<") &&
        !/api key|error occurred|xai|grok/i.test(rawError)
      ? rawError
      : friendlyError

  return (
    <section className="bg-brand-light px-6 pb-[calc(2rem+var(--cc-mobile-nav-offset))] pt-28 text-brand-dark lg:px-12 lg:pb-24 lg:pt-36">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">Private trial</p>
          <h1 className="font-display text-4xl font-bold leading-snug md:text-5xl">Ask CC.</h1>
          <p className="max-w-2xl text-lg leading-relaxed">
            Answers come only from this website, and each one ends with a next step.
          </p>
        </header>

        {available ? (
          <>
            {messages.length === 0 ? (
              <div role="group" aria-label="Suggested questions" className="flex flex-wrap gap-2">
                {STARTERS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => ask(question)}
                    className="border-2 border-brand-dark bg-brand-yellow-light px-4 py-2 text-left text-sm font-medium leading-snug text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
                  >
                    {question}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-4" role="log" aria-label="Conversation">
              {messages.map((message) => {
                const text = messageText(message)
                const mine = message.role === "user"
                return (
                  <article
                    key={message.id}
                    className={
                      mine
                        ? "ml-auto max-w-[85%] bg-brand-yellow-light px-4 py-3 text-brand-dark"
                        : "max-w-[85%] border-2 border-brand-dark/15 bg-brand-white px-4 py-3 text-brand-dark"
                    }
                  >
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em]">
                      {mine ? "You" : "Ask CC"}
                    </p>
                    {mine ? <p className="text-base leading-relaxed">{text}</p> : <Answer text={text} />}
                  </article>
                )
              })}
              {status === "submitted" ? (
                <p className="text-sm font-medium leading-relaxed" aria-live="polite">
                  Ask CC is thinking.
                </p>
              ) : null}
            </div>

            {errorText ? (
              <p role="alert" className="border-2 border-brand-dark bg-brand-white px-4 py-3 text-sm leading-relaxed">
                {errorText}
              </p>
            ) : null}

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <label htmlFor="ask-cc-question" className="text-sm font-medium">
                Your question
              </label>
              <textarea
                id="ask-cc-question"
                name="question"
                rows={3}
                maxLength={MAX_USER_CHARS}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={onKeyDown}
                aria-describedby="ask-cc-hint"
                placeholder="Describe your situation, or ask about a next step"
                className="w-full resize-y border-2 border-brand-dark bg-brand-white px-4 py-3 text-base leading-relaxed text-brand-dark placeholder:text-brand-dark/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p id="ask-cc-hint" className="text-sm leading-snug text-brand-dark/70">
                  Enter to send. Shift and Enter for a new line.
                  {draft.length > 600 ? ` ${draft.trim().length} of ${MAX_USER_CHARS} characters.` : ""}
                </p>
                <div className="flex gap-2">
                  {messages.length > 0 ? (
                    <button
                      type="button"
                      onClick={startAgain}
                      className="border-2 border-brand-dark bg-brand-white px-4 py-3 text-sm font-semibold text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
                    >
                      Start again
                    </button>
                  ) : null}
                  {busy ? (
                    <button
                      type="button"
                      onClick={() => stop()}
                      className="border-2 border-brand-dark bg-brand-orange px-5 py-3 text-sm font-semibold text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
                    >
                      Stop
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!draft.trim() || tooLong}
                      className="border-2 border-brand-dark bg-brand-dark px-5 py-3 text-sm font-semibold text-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink disabled:bg-brand-white disabled:text-brand-dark"
                    >
                      Send
                    </button>
                  )}
                </div>
              </div>
              {tooLong ? (
                <p role="alert" className="text-sm">
                  Please keep the question under {MAX_USER_CHARS} characters.
                </p>
              ) : null}
            </form>
          </>
        ) : (
          <div className="flex flex-col gap-4 border-2 border-brand-dark bg-brand-white px-5 py-5" role="status">
            <p className="text-lg leading-relaxed">This chat is unavailable just now.</p>
            <p className="leading-relaxed">
              You can still{" "}
              <a
                href="/gap"
                className="font-semibold underline decoration-2 underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
              >
                take the gap diagnostic
              </a>{" "}
              or{" "}
              <a
                href="/contact#book"
                className="font-semibold underline decoration-2 underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
              >
                book a Waypoint
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
