import type { Metadata } from "next"
import { Script } from "next/script"
import { Section } from "@/components/section"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Committed Citizens. How we handle your data.",
}

export default function PrivacyPage() {
  return (
    <>
      <Script
        id="CookieDeclaration"
        src="https://consent.cookiebot.com/bc3d8b4b-cf51-4f81-a255-e89443188c10/cd.js"
        strategy="afterInteractive"
      />
      <section className="bg-brand-dark px-6 pt-40 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-6 text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
            Legal
          </p>
          <h1 className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-brand-white">
            Privacy Policy
          </h1>
        </div>
      </section>

      <Section background="light" narrow>
        <div className="prose prose-lg max-w-none text-brand-dark/70">
          <h2 className="font-display text-2xl font-bold text-brand-dark">
            We take your privacy seriously.
          </h2>

          <h2 className="mt-12 font-display text-2xl font-bold text-brand-dark">
            Who we are
          </h2>
          <p>
            Committed Citizens Ltd is the data controller responsible for your personal information. If you have any questions about this privacy statement or how your data is handled, you can contact us at:{" "}
            <a
              href="mailto:info@committedcitizens.co.uk"
              className="text-brand-pink underline underline-offset-4 transition-colors hover:text-brand-dark"
            >
              info@committedcitizens.co.uk
            </a>
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold text-brand-dark">
            What information we collect
          </h2>
          <p>
            If you contact us via this website, we may collect your name, email address, your company, your role, and any information you choose to include in your message. If you subscribe to our newsletter, we collect your email address.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold text-brand-dark">
            How we use your information
          </h2>
          <p>
            We use this information solely to respond to enquiries, arrange conversations, communicate with you in relation to our services, and - where you have subscribed - send you our newsletter.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold text-brand-dark">
            Our legal basis for processing
          </h2>
          <p>
            We process your data on the basis of legitimate interests (responding to your enquiry and managing our business relationships) or, where applicable, your consent (for example, when you subscribe to our newsletter). You can withdraw consent at any time by unsubscribing or contacting us.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold text-brand-dark">
            How your information is stored
          </h2>
          <p>
            Your information is stored securely using trusted service providers who process data on our behalf under appropriate safeguards. We do not sell, rent, or share your personal data with third parties for their own purposes.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold text-brand-dark">
            Cookies and analytics
          </h2>
          <p>
            This website uses Google Analytics 4 to help us understand how visitors use the site. Google Analytics uses cookies to collect anonymised usage data. These cookies are only placed with your consent, which you can manage via the cookie banner on this site. You can also opt out of Google Analytics by installing the Google Analytics opt-out browser add-on.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold text-brand-dark">
            How long we keep your information
          </h2>
          <p>
            We retain personal information only for as long as necessary to fulfil the purpose for which it was collected, or as required for professional or legal reasons. Newsletter subscribers' details are kept until they unsubscribe.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold text-brand-dark">
            Your rights
          </h2>
          <p>
            Under UK data protection law, you have the right to request access to, correction of, or deletion of your personal data at any time. You also have the right to object to processing or request that we restrict it. To exercise any of these rights, please contact us at the address above. If you are not satisfied with how we handle your data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at{" "}
            <a
              href="https://ico.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-pink underline underline-offset-4 transition-colors hover:text-brand-dark"
            >
              ico.org.uk
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  )
}
