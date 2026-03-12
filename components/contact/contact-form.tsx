"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { fadeInUp, textRollUp, textRollDown } from "@/lib/animations"
import { Section } from "@/components/section"
import { Mail, Linkedin, Send, CheckCircle, ArrowRight } from "lucide-react"

export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMessageHovered, setIsMessageHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const body = {
        name: formData.get("name"),
        email: formData.get("email"),
        company: formData.get("company"),
        role: formData.get("role"),
        message: formData.get("message"),
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(data.error || "Failed to submit form")
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
      <motion.section
        ref={sectionRef}
        style={{ scale, opacity }}
        className="relative min-h-svh lg:h-screen bg-brand-yellow-light px-6 lg:px-12"
        layout
      >
        <div className="mx-auto flex max-w-[1400px] flex-col pt-20 lg:pt-28 pb-24 lg:pb-16 gap-52 lg:gap-32 lg:h-full lg:justify-between">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-brand-dark"
          >
            Let&apos;s <i>talk</i>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl self-end text-right text-lg leading-relaxed text-brand-dark"
          >
            We&apos;re building a business that makes marketing work better. If you&apos;re a marketing leader who&apos;s frustrated by drag and ready for momentum, we&apos;d love to hear from you.
          </motion.p>
        </div>
      </motion.section>

      {/* Waitlist Section */}
      <section className="relative bg-brand-dark px-6 py-20 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="font-display text-5xl md:text-6xl font-bold leading-snug text-brand-white max-w-3xl">
              Release the handbrake.
            </h2>
            <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-brand-white/70">
              <p>
                The Drag Diagnostic is a free 60-minute session. No pitch. No audit. Just a structured conversation about where operational drag is costing you the most - and what to fix first.
              </p>
              <p>
                You'll walk away with a Flow Map: a single-page view of where friction is concentrated, what it's costing you, and which fix would yield the fastest return. Board-ready language for a budget conversation, not a feelings conversation.
              </p>
              <p>
                Yours to keep, whether or not we work together.
              </p>
              <p className="font-medium text-brand-white">
                Just fill in the form below and we'll start the ball rolling.
              </p>
            </div>

            {submitted && (
              <div className="flex flex-col gap-6 bg-brand-dark/50 border border-brand-white/10 p-12">
                <CheckCircle size={48} className="text-brand-pink" />
                <h3 className="font-display text-2xl font-bold text-brand-white">
                  Thanks for booking!
                </h3>
                <p className="text-lg text-brand-white/60">
                  We'll be in touch soon to confirm your diagnostic session.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <Section background="light" compact>
        <div className="space-y-4">
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
                <p className="text-lg text-brand-dark">
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
                  <p className="text-sm text-brand-dark">
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
                  <p className="text-sm text-brand-dark">
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
