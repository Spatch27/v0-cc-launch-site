import type { Metadata } from "next"
import { Section } from "@/components/section"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Committed Citizens. How we handle your data.",
}

export default function PrivacyPage() {
  return (
    <>
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
            Introduction
          </h2>
          <p>
            Committed Citizens Ltd respects your privacy and is committed to
            protecting your personal data. This policy explains how we collect,
            use, and safeguard your information when you interact with our
            website.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold text-brand-dark">
            What we collect
          </h2>
          <p>
            We collect information you voluntarily provide through our contact
            form, including your name, email address, company, role, and
            message. We also collect standard analytics data through Vercel
            Analytics.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold text-brand-dark">
            How we use your data
          </h2>
          <p>
            We use your data solely to respond to enquiries and to understand
            how visitors use our website. We never sell your data to third
            parties.
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold text-brand-dark">
            Contact
          </h2>
          <p>
            For any privacy-related questions, please email{" "}
            <a
              href="mailto:hello@committedcitizens.co.uk"
              className="text-brand-pink underline underline-offset-4 transition-colors hover:text-brand-dark"
            >
              hello@committedcitizens.co.uk
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  )
}
