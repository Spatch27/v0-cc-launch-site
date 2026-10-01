"use client"

import { substackSubscribeUrl } from "@/lib/substack"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function SubstackSubscribeForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const input = form.elements.namedItem("email")
    if (!(input instanceof HTMLInputElement)) return

    const email = input.value.trim()
    input.value = email
    if (!EMAIL_PATTERN.test(email)) {
      input.setCustomValidity("Enter a valid email address.")
      input.reportValidity()
      return
    }

    input.setCustomValidity("")
    const url = substackSubscribeUrl(email)
    const opened = window.open(url, "_blank", "noopener,noreferrer")
    if (!opened) window.location.assign(url)
  }

  const controlFont =
    "[font-family:system-ui,-apple-system,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]"

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className="flex h-12 w-full items-stretch overflow-hidden rounded-[4px] border-2"
        style={{ borderColor: "#181716" }}
      >
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
          placeholder="Enter your email"
          onInput={(event) => event.currentTarget.setCustomValidity("")}
          className={`min-w-0 flex-1 border-0 bg-brand-light py-2.5 pl-4 pr-3 text-base leading-6 text-brand-dark outline-none placeholder:text-brand-dark/80 disabled:opacity-60 ${controlFont}`}
        />
        <button
          type="submit"
          className={`inline-flex shrink-0 items-center bg-brand-dark px-4 py-2.5 text-sm font-semibold leading-5 text-brand-light disabled:opacity-60 ${controlFont}`}
        >
          Subscribe
        </button>
      </div>
    </form>
  )
}
