"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function WaitlistSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ firstName: "", email: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section className="relative bg-brand-light px-6 lg:px-12">
      <div className="mx-auto max-w-[1400px] py-32 lg:py-48">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section heading */}
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-tight text-brand-dark">
            Join the waitlist.
          </h2>

          {/* Supporting copy */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-dark/70">
            Be first to hear when we're ready to take on new engagements. We'll keep you close, share our thinking, and make sure you're front of the queue when the time is right.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-12 max-w-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="flex-1 border-2 border-brand-dark bg-brand-white px-4 py-3 text-base text-brand-dark placeholder-brand-dark/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2 focus:ring-offset-brand-light"
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-1 border-2 border-brand-dark bg-brand-white px-4 py-3 text-base text-brand-dark placeholder-brand-dark/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2 focus:ring-offset-brand-light"
              />
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="border-2 border-brand-dark bg-brand-dark px-8 py-3 text-base font-semibold text-brand-white transition-all duration-300 hover:bg-brand-dark/90 disabled:opacity-50"
              >
                {isSubmitting ? "Joining..." : isSubmitted ? "Joined!" : "Join"}
              </button>
            </div>

            {/* Success message */}
            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 text-base font-medium text-brand-dark"
              >
                ✓ Thank you for joining! Check your email to confirm.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
