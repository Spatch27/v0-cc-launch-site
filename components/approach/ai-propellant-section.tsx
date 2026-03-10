"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { fadeInUp } from "@/lib/animations"
import { Section } from "@/components/section"

export function AIPropellantSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <>
      {/* Full-width hero with image and overlay */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <div className="relative h-80 overflow-hidden">
          {/* Image */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/red-zeppelin-8cmFI3Y7Xt4-unsplash-UNqMNqXAg0GfkjEdfa1Af4pjveokXW.jpg"
            alt="Road through yellow fields - AI as a propellant"
            className="w-full h-full object-cover object-bottom"
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
              AI as a propellant.
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
          className="max-w-3xl"
        >
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-brand-dark">
              We're not an AI consultancy. We're a transformation consultancy that knows how to put AI to work. We start with how your marketing actually works — and work out where AI removes drag and where it creates new capability. Sometimes that's automating handoffs. Sometimes it's surfacing insights your team couldn't reach before. Sometimes it's giving a lean team the output of one twice its size.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              We push back where it adds complexity but little value. Not every workflow needs an agent. Not every process needs automating. Most consultancies sell AI as the solution. We treat it as part of the solution — powerful when it's embedded properly, wasteful when it isn't.
            </p>
          </div>
        </motion.div>
      </Section>
    </>
  )
}
