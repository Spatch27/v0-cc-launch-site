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

function isBulletBlock(block: SanityBodyBlock): block is SanityTextBlock {
  return block._type === "block" && block.listItem === "bullet"
}

function renderSpans(block: SanityTextBlock) {
  const defs = new Map((block.markDefs ?? []).map((def) => [def._key, def]))

  return (block.children ?? []).map((span: SanitySpan, index) => {
    const marks = span.marks ?? []
    let node: ReactNode = span.text

    if (marks.includes("em")) {
      node = <em className="italic">{node}</em>
    }

    if (marks.includes("strong")) {
      node = <strong className="font-semibold text-brand-dark">{node}</strong>
    }

    const linkKey = marks.find((mark) => defs.get(mark)?._type === "link")
    const href = linkKey ? defs.get(linkKey)?.href : undefined

    if (href) {
      node = (
        <BodyLink href={href}>
          {node}
        </BodyLink>
      )
    }

    return <span key={span._key ?? index}>{node}</span>
  })
}

type BulletTreeItem = {
  block: SanityTextBlock
  children: BulletTreeItem[]
}

function nestBulletItems(items: SanityTextBlock[]): BulletTreeItem[] {
  const root: BulletTreeItem[] = []
  const stack: {level: number; items: BulletTreeItem[]}[] = [{level: 0, items: root}]

  for (const block of items) {
    const level = Math.max(1, block.level ?? 1)
    const node: BulletTreeItem = {block, children: []}

    while (stack.length > 1 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }

    while (stack[stack.length - 1].level < level - 1) {
      const parentList = stack[stack.length - 1].items
      const last = parentList[parentList.length - 1]
      if (!last) {
        break
      }
      stack.push({level: stack[stack.length - 1].level + 1, items: last.children})
    }

    stack[stack.length - 1].items.push(node)
    stack.push({level, items: node.children})
  }

  return root
}

const bulletListClassName =
  "mb-6 list-disc space-y-2 pl-6 text-lg leading-relaxed text-brand-dark/80"
const nestedBulletListClassName =
  "mt-2 mb-0 list-disc space-y-2 pl-6 text-lg leading-relaxed text-brand-dark/80"

function BulletList({items, nested = false}: {items: BulletTreeItem[]; nested?: boolean}) {
  if (items.length === 0) {
    return null
  }

  return (
    <ul className={nested ? nestedBulletListClassName : bulletListClassName}>
      {items.map((item, index) => (
        <li key={item.block._key ?? index}>
          {renderSpans(item.block)}
          {item.children.length > 0 ? <BulletList items={item.children} nested /> : null}
        </li>
      ))}
    </ul>
  )
}

function renderTextBlock(block: SanityTextBlock, key: string | number) {
  if (block.style === "h2") {
    return (
      <h2
        key={key}
        className="mb-6 mt-12 first:mt-0 font-display text-3xl font-bold leading-tight text-brand-dark"
      >
        {renderSpans(block)}
      </h2>
    )
  }

  return (
    <p key={key} className="mb-6 text-lg leading-relaxed text-brand-dark/80">
      {renderSpans(block)}
    </p>
  )
}

export function InsightArticleBody({body}: {body: SanityBodyBlock[]}) {
  const nodes: ReactNode[] = []
  let index = 0

  while (index < body.length) {
    const block = body[index]
    const key = block._key ?? index

    if (isBulletBlock(block)) {
      const items: SanityTextBlock[] = []
      while (index < body.length && isBulletBlock(body[index])) {
        items.push(body[index] as SanityTextBlock)
        index += 1
      }
      nodes.push(<BulletList key={key} items={nestBulletItems(items)} />)
      continue
    }

    index += 1

    if (block._type === "code") {
      nodes.push(
        <pre
          key={key}
          className="mb-6 overflow-x-auto rounded-sm bg-brand-dark/5 px-4 py-3 font-mono text-sm leading-relaxed text-brand-dark"
        >
          <code>{block.text}</code>
        </pre>,
      )
      continue
    }

    if (block._type === "inlineImage") {
      const src = block.src || block.externalUrl
      if (!src) {
        continue
      }

      nodes.push(
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
        </figure>,
      )
      continue
    }

    nodes.push(renderTextBlock(block, key))
  }

  return <>{nodes}</>
}
