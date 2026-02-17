"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import { Mail, Linkedin, Send, CheckCircle, ArrowRight } from "lucide-react"

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
      // Silently handle error
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-yellow-light px-6 pt-40 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-sm font-medium tracking-[0.2em] uppercase text-brand-dark"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-brand-dark"
          >
            Let&apos;s talk.
          </motion.h1>
        </div>
      </section>

      {/* Form section */}
      <Section background="light">
        <div className="grid gap-20 lg:grid-cols-2">
          {/* Form */}
          <motion.div variants={fadeInUp}>
            {submitted ? (
              <div className="flex flex-col gap-6 bg-brand-white p-12">
                <CheckCircle size={48} className="text-brand-pink" />
                <h2 className="font-display text-3xl font-bold text-brand-dark">
                  Thanks for reaching out.
                </h2>
                <p className="text-lg text-brand-dark/60">
                  We&apos;ll be back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                  <label htmlFor="name" className="mb-3 block text-sm font-medium text-brand-dark">
                    Name <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full border-0 border-b-2 border-brand-dark/10 bg-transparent px-0 py-3 text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-brand-pink"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-3 block text-sm font-medium text-brand-dark">
                    Email <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full border-0 border-b-2 border-brand-dark/10 bg-transparent px-0 py-3 text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-brand-pink"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="mb-3 block text-sm font-medium text-brand-dark">
                    Company <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    className="w-full border-0 border-b-2 border-brand-dark/10 bg-transparent px-0 py-3 text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-brand-pink"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="mb-3 block text-sm font-medium text-brand-dark">
                    Role
                  </label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    className="w-full border-0 border-b-2 border-brand-dark/10 bg-transparent px-0 py-3 text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-brand-pink"
                    placeholder="Your role"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-3 block text-sm font-medium text-brand-dark">
                    What can we help with?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full border-0 border-b-2 border-brand-dark/10 bg-transparent px-0 py-3 text-brand-dark outline-none transition-colors placeholder:text-brand-dark/30 focus:border-brand-pink"
                    placeholder="Tell us about your challenge..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-4 inline-flex w-fit items-center gap-3 self-start border-2 border-brand-dark bg-brand-light px-8 py-4 text-base font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-white disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send message"}
                  <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: contact details */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-10">
            <div>
              <h2 className="mb-4 font-display text-2xl font-bold text-brand-dark">
                Prefer a direct line?
              </h2>
              <p className="text-lg leading-relaxed text-brand-dark/60">
                Drop us an email or connect on LinkedIn.
              </p>
            </div>

            <a
              href="mailto:hello@committedcitizens.co.uk"
              className="group flex items-center gap-5 border-b border-brand-dark/10 pb-8 transition-colors"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-dark text-brand-white transition-colors duration-300 group-hover:bg-brand-pink group-hover:text-brand-dark">
                <Mail size={22} />
              </div>
              <div>
                <p className="font-semibold text-brand-dark">Email</p>
                <p className="text-sm text-brand-dark/50">
                  hello@committedcitizens.co.uk
                </p>
              </div>
              <ArrowRight size={16} className="ml-auto text-brand-dark/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-pink" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 border-b border-brand-dark/10 pb-8 transition-colors"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-dark text-brand-white transition-colors duration-300 group-hover:bg-brand-pink group-hover:text-brand-dark">
                <Linkedin size={22} />
              </div>
              <div>
                <p className="font-semibold text-brand-dark">LinkedIn</p>
                <p className="text-sm text-brand-dark/50">
                  Connect with us
                </p>
              </div>
              <ArrowRight size={16} className="ml-auto text-brand-dark/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-pink" />
            </a>
          </motion.div>
        </div>
      </Section>
    </>
  )
}
