import type {Metadata} from "next"
import {Suspense} from "react"
import {draftMode} from "next/headers"
import {VisualEditing} from "next-sanity/visual-editing"
import {DisableDraftMode} from "@/components/disable-draft-mode"

export async function generateMetadata(): Promise<Metadata> {
  if ((await draftMode()).isEnabled) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {}
}

export default async function InsightsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const preview = (await draftMode()).isEnabled

  return (
    <>
      {children}
      {preview ? (
        <>
          <VisualEditing />
          <Suspense fallback={null}>
            <DisableDraftMode />
          </Suspense>
        </>
      ) : null}
    </>
  )
}
