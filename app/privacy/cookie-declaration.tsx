"use client"

import Script from "next/script"

export function CookieDeclaration() {
  return (
    <div className="mt-8 [&_#CookieDeclaration]:font-sans [&_#CookieDeclaration]:text-base [&_#CookieDeclaration]:leading-relaxed [&_#CookieDeclaration]:text-brand-dark/70 [&_#CookieDeclaration_h3]:font-display [&_#CookieDeclaration_h3]:text-xl [&_#CookieDeclaration_h3]:font-bold [&_#CookieDeclaration_h3]:text-brand-dark [&_#CookieDeclaration_a]:text-brand-pink [&_#CookieDeclaration_a]:underline [&_#CookieDeclaration_a]:underline-offset-4 [&_#CookieDeclaration_table]:w-full [&_#CookieDeclaration_table]:text-sm [&_#CookieDeclaration_th]:text-left [&_#CookieDeclaration_th]:font-semibold [&_#CookieDeclaration_th]:text-brand-dark [&_#CookieDeclaration_th]:py-2 [&_#CookieDeclaration_td]:py-2 [&_#CookieDeclaration_td]:align-top [&_#CookieDeclaration_tr]:border-b [&_#CookieDeclaration_tr]:border-brand-dark/10">
      <div id="CookieDeclaration" />
      <Script
        id="CookieDeclarationScript"
        src="https://consent.cookiebot.com/bc3d8b4b-cf51-4f81-a255-e89443188c10/cd.js"
        strategy="afterInteractive"
      />
    </div>
  )
}
