"use client"

import { Linkedin, Twitter, LinkIcon } from "lucide-react"
import { useState } from "react"

interface ArticleSidebarProps {
  author: string
  authorRole: string
  date: string
  readTime: string
  title: string
}

export function ArticleSidebar({
  author,
  authorRole,
  date,
  readTime,
  title,
}: ArticleSidebarProps) {
  const [copied, setCopied] = useState(false)

  function handleCopyLink() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function shareOnTwitter() {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent(title)
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank",
        "noopener,noreferrer"
      )
    }
  }

  function shareOnLinkedIn() {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href)
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank",
        "noopener,noreferrer"
      )
    }
  }

  return (
    <aside className="lg:sticky lg:top-32 lg:self-start">
      <div className="flex flex-col gap-8">
        {/* Author */}
        <div>
          <p className="mb-1 text-xs font-semibold tracking-[0.15em] uppercase text-brand-dark/40">
            Written by
          </p>
          <p className="text-base font-semibold text-brand-dark">{author}</p>
          <p className="text-sm text-brand-dark/60">{authorRole}</p>
        </div>

        {/* Date */}
        <div>
          <p className="mb-1 text-xs font-semibold tracking-[0.15em] uppercase text-brand-dark/40">
            Published
          </p>
          <p className="text-base text-brand-dark">{date}</p>
        </div>

        {/* Read Time */}
        <div>
          <p className="mb-1 text-xs font-semibold tracking-[0.15em] uppercase text-brand-dark/40">
            Read time
          </p>
          <p className="text-base text-brand-dark">{readTime}</p>
        </div>

        {/* Divider */}
        <hr className="border-brand-dark/10" />

        {/* Social Share */}
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.15em] uppercase text-brand-dark/40">
            Share
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={shareOnTwitter}
              className="flex h-10 w-10 items-center justify-center bg-brand-light text-brand-dark/60 transition-colors hover:bg-brand-dark hover:text-brand-white"
              aria-label="Share on Twitter"
            >
              <Twitter size={16} />
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="flex h-10 w-10 items-center justify-center bg-brand-light text-brand-dark/60 transition-colors hover:bg-brand-dark hover:text-brand-white"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={16} />
            </button>
            <button
              onClick={handleCopyLink}
              className="flex h-10 w-10 items-center justify-center bg-brand-light text-brand-dark/60 transition-colors hover:bg-brand-dark hover:text-brand-white"
              aria-label="Copy article link"
            >
              <LinkIcon size={16} />
            </button>
            {copied && (
              <span className="text-xs font-medium text-brand-orange">
                Copied
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
