"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"
import BalloonPopIllustration from "@/components/illustrations/jigsaw"

export function BuiltForOutcomesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <>
      {/* Full-width hero with image and overlay */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <div className="relative h-80 overflow-hidden">
          {/* Image */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/red-zeppelin-QgFAMvj8JXY-unsplash-Atf9xL7jMAn8ReluQk9GxfCPn3akwg.jpg"
            alt="Colorful forest from above - Built for outcomes"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70" />
          {/* Centered heading overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl font-bold text-center md:text-7xl"
              style={{ color: "#FFD100" }}
            >
              Built for outcomes, not renewals.
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Content section below */}
      <Section background="light" className="!py-8 lg:!py-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <div className="relative flex h-auto min-h-[32rem] items-center justify-center overflow-hidden rounded-lg bg-[#e3dcdc]">
            <div className="w-full origin-center scale-130">
              <BalloonPopIllustration />
            </div>
          </div>
          <div className="max-w-3xl space-y-4">
            <p className="text-lg leading-relaxed text-brand-dark">
              Most transformation programmes are designed to sell you a platform, not fix how you work. Over 40% of the average marketing budget goes on technology and the agencies that implement it. Less than a third reaches your customers. The recommendation is the implementation. The implementation is the licence. The licence is the lock-in.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              We're platform-agnostic. No tech tie-ins. No renewal cycles to protect. Your operating model gets shaped around your team's needs, not someone else's contract terms.
            </p>
          </div>
        </motion.div>
      </Section>
    </>
  )
}
