"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { Mail, Linkedin, Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          role: formData.get("role"),
          message: formData.get("message"),
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      // Silently handle error for now
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="bg-brand-dark px-6 pt-32 pb-20 lg:px-8 lg:pt-40 lg:pb-28">
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl font-bold text-brand-white md:text-6xl"
          >
            Let&apos;s talk.
          </motion.h1>
        </motion.div>
      </section>

      <Section background="white">
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-2">
          {/* Form */}
          <motion.div variants={fadeInUp}>
            {submitted ? (
              <div className="flex flex-col items-center gap-4 rounded-xl bg-brand-light p-12 text-center">
                <CheckCircle size={48} className="text-brand-pink" />
                <h2 className="font-display text-2xl font-bold text-brand-dark">
                  Thanks for getting in touch
                </h2>
                <p className="text-brand-dark/70">
                  We&apos;ll be back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-brand-dark">
                    Name <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-brand-light bg-brand-white px-4 py-3 text-brand-dark outline-none transition-colors focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-brand-dark">
                    Email <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-brand-light bg-brand-white px-4 py-3 text-brand-dark outline-none transition-colors focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium text-brand-dark">
                    Company <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    className="w-full rounded-lg border border-brand-light bg-brand-white px-4 py-3 text-brand-dark outline-none transition-colors focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="mb-2 block text-sm font-medium text-brand-dark">
                    Role
                  </label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    className="w-full rounded-lg border border-brand-light bg-brand-white px-4 py-3 text-brand-dark outline-none transition-colors focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-brand-dark">
                    What can we help with?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full rounded-lg border border-brand-light bg-brand-white px-4 py-3 text-brand-dark outline-none transition-colors focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-pink px-8 py-4 text-base font-semibold text-brand-dark transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send message"}
                  <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact details */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-8">
            <div>
              <h2 className="mb-4 font-display text-2xl font-bold text-brand-dark">
                Direct contact
              </h2>
              <p className="mb-8 leading-relaxed text-brand-dark/70">
                Prefer to reach out directly? Drop us an email or connect on
                LinkedIn.
              </p>
            </div>

            <a
              href="mailto:hello@committedcitizens.co.uk"
              className="flex items-center gap-4 rounded-xl border border-brand-light p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pink/10">
                <Mail size={24} className="text-brand-pink" />
              </div>
              <div>
                <p className="font-semibold text-brand-dark">Email us</p>
                <p className="text-sm text-brand-dark/60">
                  hello@committedcitizens.co.uk
                </p>
              </div>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-brand-light p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pink/10">
                <Linkedin size={24} className="text-brand-pink" />
              </div>
              <div>
                <p className="font-semibold text-brand-dark">LinkedIn</p>
                <p className="text-sm text-brand-dark/60">
                  Connect with us
                </p>
              </div>
            </a>
          </motion.div>
        </div>
      </Section>
    </>
  )
}
