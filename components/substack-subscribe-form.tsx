"use client"

import { useState } from "react"
import { SUBSTACK_SUBSCRIBE_URL } from "@/lib/substack"

type Status = "idle" | "loading" | "success" | "error"

export function SubstackSubscribeForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")
  const [showFallback, setShowFallback] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = String(new FormData(form).get("email") || "").trim()
    setStatus("loading")
    setMessage("")
    setShowFallback(false)

    try {
      const response = await fetch("/api/substack/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_url: window.location.href,
          first_referrer: document.referrer,
          current_url: window.location.href,
          current_referrer: document.referrer,
          referral_code: "",
        }),
      })
      const data = (await response.json()) as {
        ok?: boolean
        requiresConfirmation?: boolean
        error?: string
        fallback?: boolean
      }

      if (response.ok && data.ok) {
        setStatus("success")
        setMessage(
          data.requiresConfirmation
            ? "Check your inbox to confirm."
            : "You're subscribed.",
        )
        form.reset()
        return
      }

      setStatus("error")
      setMessage(data.error || "We couldn't complete that here.")
      setShowFallback(Boolean(data.fallback))
    } catch {
      setStatus("error")
      setMessage("We couldn't complete that here.")
      setShowFallback(true)
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm font-medium text-brand-dark" role="status">
        {message}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-end gap-2">
        <label htmlFor="substack-email" className="sr-only">
          Email
        </label>
        <input
          id="substack-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="Email address"
          disabled={status === "loading"}
          className="min-w-0 flex-1 border-0 border-b-2 border-brand-dark/20 bg-transparent px-0 py-2 text-sm text-brand-dark outline-none transition-colors placeholder:text-brand-dark/40 focus:border-brand-pink disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 bg-brand-dark px-3 py-2 text-sm font-medium text-brand-white transition-opacity disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {status === "error" ? (
        <div className="mt-3 space-y-2" role="alert">
          <p className="text-sm text-brand-dark">{message}</p>
          {showFallback ? (
            <a
              href={SUBSTACK_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block text-sm font-medium text-brand-dark after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-dark after:transition-all after:duration-300 hover:after:w-full"
            >
              Subscribe on Substack
            </a>
          ) : null}
        </div>
      ) : null}
    </form>
  )
}
