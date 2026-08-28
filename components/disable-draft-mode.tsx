"use client"

import {useIsPresentationTool} from "next-sanity/hooks"

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool()

  if (isPresentationTool) {
    return null
  }

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-brand-dark px-4 py-2 text-sm font-semibold text-brand-white shadow-lg"
    >
      Disable draft preview
    </a>
  )
}
