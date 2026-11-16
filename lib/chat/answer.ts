/** Safe rendering helpers for Ask CC replies. Links stay on this website. */

export type AnswerSegment =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "link"; text: string; href: string }

const BLOCKED_PERSON = /\brosemary\b|\brosie\s+kelley\b|\brosemary\s+kelley\b/i

const PRICE_SENTENCE =
  /(?:£|\$|€)\s?\d|\b\d[\d,]*(?:\.\d+)?\s?(?:pounds?|gbp|usd|dollars?|euros?)\b/i

export function omitBlockedPerson(text: string): string {
  if (!BLOCKED_PERSON.test(text)) return text

  return text
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !BLOCKED_PERSON.test(sentence))
    .join(" ")
    .replace(new RegExp(BLOCKED_PERSON.source, "gi"), "")
    .replace(/[ ]{2,}/g, " ")
    .trim()
}

export function isBlockedPersonName(name: string): boolean {
  return BLOCKED_PERSON.test(name)
}

/** Drop any sentence that states a price. The public site does not publish prices. */
export function withoutPriceSentences(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((paragraph) =>
      paragraph
        .split(/(?<=[.!?])\s+/)
        .filter((sentence) => !PRICE_SENTENCE.test(sentence))
        .join(" ")
        .trim(),
    )
    .filter(Boolean)
    .join("\n\n")
}

export function safeSiteHref(href: string): string | null {
  const trimmed = href.trim()
  if (!trimmed || trimmed.length > 300) return null

  if (trimmed.startsWith("/") && !trimmed.startsWith("//") && !trimmed.includes("\\") && !trimmed.includes(" ")) {
    return trimmed
  }

  try {
    const url = new URL(trimmed)
    if (url.protocol === "mailto:" && url.pathname.toLowerCase() === "info@committedcitizens.co.uk") {
      return "mailto:info@committedcitizens.co.uk"
    }

    const host = url.hostname.replace(/^www\./, "")
    if (url.protocol === "https:" && host === "committedcitizens.co.uk") {
      return `${url.pathname}${url.search}${url.hash}` || "/"
    }
  } catch {
    return null
  }

  return null
}

/** Hide a half-written markdown link or bold mark while a reply is still streaming. */
export function visibleAnswerSource(source: string): string {
  let end = source.length
  const markers = source.match(/\*\*/g)
  if ((markers?.length ?? 0) % 2 === 1) {
    end = Math.min(end, source.lastIndexOf("**"))
  }

  const lastBracket = source.lastIndexOf("[", end)
  if (lastBracket >= 0) {
    const tail = source.slice(lastBracket, end)
    const complete = /^\[[^\]]+\]\([^)\s]+\)$/.test(tail)
    const inProgress = /^\[[^\]]*\]?\(?[^)\s]*$/.test(tail)
    if (!complete && inProgress) {
      end = Math.min(end, lastBracket)
    }
  }

  return source.slice(0, end)
}

function parseInline(text: string): AnswerSegment[] {
  const segments: AnswerSegment[] = []
  let index = 0

  while (index < text.length) {
    const rest = text.slice(index)
    const link = rest.match(/^\[([^\]]+)\]\(([^)\s]+)\)/)
    if (link) {
      const href = safeSiteHref(link[2])
      if (href) {
        segments.push({ type: "link", text: link[1], href })
      } else {
        segments.push({ type: "text", text: link[1] })
      }
      index += link[0].length
      continue
    }

    const strong = rest.match(/^\*\*([^*]+)\*\*/)
    if (strong) {
      segments.push({ type: "strong", text: strong[1] })
      index += strong[0].length
      continue
    }

    const nextLink = text.indexOf("[", index)
    const nextStrong = text.indexOf("**", index)
    let next = text.length
    if (nextLink >= 0) next = Math.min(next, nextLink)
    if (nextStrong >= 0) next = Math.min(next, nextStrong)

    if (next === index) {
      segments.push({ type: "text", text: text[index] ?? "" })
      index += 1
      continue
    }

    segments.push({ type: "text", text: text.slice(index, next) })
    index = next
  }

  return segments.filter((segment) => segment.text.length > 0)
}

export function parseAnswer(source: string): AnswerSegment[][] {
  const visible = visibleAnswerSource(source)
  return visible
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean)
    .map(parseInline)
    .filter((paragraph) => paragraph.length > 0)
}
