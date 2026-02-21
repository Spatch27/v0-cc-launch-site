"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { fadeInUp, textRollUp, textRollDown } from "@/lib/animations"
import { Section } from "@/components/section"
import { Mail, Linkedin, Send, CheckCircle, ArrowRight } from "lucide-react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMessageHovered, setIsMessageHovered] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

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
      } else {
        try {
          const data = await res.json()
          setError(data.error || "Failed to submit form")
        } catch {
          setError("Failed to submit form")
        }
      }
    } catch (err) {
      console.error("[v0] Form submission error:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-yellow-light px-6 pt-40 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-brand-dark"
          >
            Let&apos;s <i>talk</i>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-brand-dark/80"
          >
            We&apos;re building something great and we&apos;d love you to be part of it.
          </motion.p>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="relative bg-brand-dark px-6 py-20 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display text-4xl font-bold text-brand-white">
                  Join the waitlist.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-brand-white/70">
                  Be first to hear when we're ready to take on new engagements. We'll keep you close, share our thinking, and make sure you're front of the queue when the time is right.
                </p>
              </div>

              {submitted ? (
                <div className="flex flex-col gap-6 bg-brand-dark/50 border border-brand-white/10 p-12">
                  <CheckCircle size={48} className="text-brand-pink" />
                  <h3 className="font-display text-2xl font-bold text-brand-white">
                    Thanks for joining!
                  </h3>
                  <p className="text-lg text-brand-white/60">
                    We'll be in touch soon with exciting updates.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-4">
                  <div className="flex-1">
                    <label htmlFor="waitlistName" className="mb-2 block text-sm font-medium text-brand-white">
                      Name
                    </label>
                    <input
                      id="waitlistName"
                      name="name"
                      type="text"
                      required
                      className="w-full border border-brand-white/20 bg-brand-dark/50 px-4 py-3 text-brand-white outline-none transition-colors placeholder:text-brand-white/40 focus:border-brand-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="waitlistEmail" className="mb-2 block text-sm font-medium text-brand-white">
                      Email
                    </label>
                    <input
                      id="waitlistEmail"
                      name="email"
                      type="email"
                      required
                      className="w-full border border-brand-white/20 bg-brand-dark/50 px-4 py-3 text-brand-white outline-none transition-colors placeholder:text-brand-white/40 focus:border-brand-white"
                      placeholder="your@email.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center gap-3 border-2 border-brand-light bg-brand-light px-8 py-3 text-base font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-white disabled:opacity-50"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span className="relative inline-block overflow-hidden">
                      <motion.span
                        initial="initial"
                        animate={isHovered ? "hover" : "initial"}
                        variants={textRollUp}
                        className="block"
                      >
                        {loading ? "Joining..." : "Join"}
                      </motion.span>
                      <motion.span
                        initial="initial"
                        animate={isHovered ? "hover" : "initial"}
                        variants={textRollDown}
                        className="absolute inset-0 block"
                      >
                        {loading ? "Joining..." : "Join"}
                      </motion.span>
                    </span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      <Section background="light">
        <div className="space-y-16">
          {/* Intro text */}
          <div className="relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="font-display text-3xl font-bold text-brand-dark">
              Can't wait? Neither can we.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-dark/70">
              If you have a challenge that won't sit still, jump the queue and get in touch directly.
            </p>
          </motion.div>
          </div>

          {/* Form + Contact links */}
          <div className="relative grid gap-20 lg:grid-cols-2">
            {/* Form */}
            <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
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
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
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
                  onMouseEnter={() => setIsMessageHovered(true)}
                  onMouseLeave={() => setIsMessageHovered(false)}
                >
                  <span className="relative inline-block overflow-hidden">
                    <motion.span
                      initial="initial"
                      animate={isMessageHovered ? "hover" : "initial"}
                      variants={textRollUp}
                      className="block"
                    >
                      {loading ? "Sending..." : "Send message"}
                    </motion.span>
                    <motion.span
                      initial="initial"
                      animate={isMessageHovered ? "hover" : "initial"}
                      variants={textRollDown}
                      className="absolute inset-0 block"
                    >
                      {loading ? "Sending..." : "Send message"}
                    </motion.span>
                  </span>
                  <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
            </motion.div>
            </div>

            {/* Contact links */}
            <div className="relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-10"
            >
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
          </div>
        </div>
      </Section>
    </>
  )
}
