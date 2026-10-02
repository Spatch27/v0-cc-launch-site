import type {Metadata} from "next"

export const metadata: Metadata = {
  title: "Studio",
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="fixed inset-0 z-[100] h-[100dvh] w-full overflow-visible bg-white">
      <style
        dangerouslySetInnerHTML={{
          __html:
            "#CookiebotWidget,#CybotCookiebotDialog,#CybotCookiebotDialogBodyUnderlay{display:none!important}html:has(#sanity),body:has(#sanity){overflow:visible!important}",
        }}
      />
      {children}
    </div>
  )
}
