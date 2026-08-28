import Image from "next/image"
import Link from "next/link"
import type {ReactNode} from "react"
import type {SanityBodyBlock, SanitySpan, SanityTextBlock} from "@/lib/sanity/types"

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#")
}

function BodyLink({href, children}: {href: string; children: ReactNode}) {
  if (isInternalHref(href)) {
    return (
      <Link
        href={href}
        className="font-semibold text-brand-dark underline hover:text-brand-pink transition-colors"
      >
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-brand-primary underline hover:text-brand-primary/80"
    >
      {children}
    </a>
  )
}

function blockPlainText(block: SanityTextBlock) {
  return (block.children ?? []).map((span) => span.text ?? "").join("")
}

function renderSpans(block: SanityTextBlock) {
  const defs = new Map((block.markDefs ?? []).map((def) => [def._key, def]))

  return (block.children ?? []).map((span: SanitySpan, index) => {
    const linkKey = span.marks?.find((mark) => defs.get(mark)?._type === "link")
    const href = linkKey ? defs.get(linkKey)?.href : undefined

    if (href) {
      return (
        <BodyLink key={span._key ?? index} href={href}>
          {span.text}
        </BodyLink>
      )
    }

    return <span key={span._key ?? index}>{span.text}</span>
  })
}

export function InsightArticleBody({body}: {body: SanityBodyBlock[]}) {
  return (
    <>
      {body.map((block, i) => {
        const key = block._key ?? i

        if (block._type === "code") {
          return (
            <pre
              key={key}
              className="mb-6 overflow-x-auto rounded-sm bg-brand-dark/5 px-4 py-3 font-mono text-sm leading-relaxed text-brand-dark"
            >
              <code>{block.text}</code>
            </pre>
          )
        }

        if (block._type === "inlineImage") {
          const src = block.src || block.externalUrl
          if (!src) {
            return null
          }

          return (
            <figure key={key} className="my-10">
              <Image
                src={src}
                alt={block.alt || ""}
                width={1200}
                height={400}
                className="w-full rounded-sm border border-brand-dark/10"
                sizes="(max-width: 768px) 100vw, 720px"
              />
              {block.caption ? (
                <figcaption className="mt-3 text-sm text-brand-dark/50 text-center leading-relaxed">
                  {block.caption}
                </figcaption>
              ) : null}
            </figure>
          )
        }

        if (block._type !== "block") {
          return null
        }

        if (block.style === "h2") {
          return (
            <h2
              key={key}
              className="mb-6 mt-12 first:mt-0 font-display text-3xl font-bold leading-tight text-brand-dark"
            >
              {blockPlainText(block)}
            </h2>
          )
        }

        return (
          <p key={key} className="mb-6 text-lg leading-relaxed text-brand-dark/80">
            {renderSpans(block)}
          </p>
        )
      })}
    </>
  )
}
