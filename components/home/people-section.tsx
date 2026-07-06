"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Section } from "@/components/section"

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const textChild = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function PeopleSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <Section background="white">
      <div ref={ref} className="grid items-center gap-4 lg:gap-12 lg:grid-cols-2">

        {/* Image — left */}
        <motion.div
          className="relative flex h-auto min-h-[300px] lg:min-h-[32rem] items-center justify-center overflow-hidden rounded-lg"
          initial={{ opacity: 0, x: -40, scale: 0.97 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -40, scale: 0.97 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/people-together.png"
            alt="A team of people collaborating around a table"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Text — right */}
        <motion.div
          className="space-y-6"
          variants={textContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={textChild}
            className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl"
          >
            The way to do the work is with the people.
          </motion.h2>

          <motion.div variants={textChild} className="space-y-4">
            <p className="text-lg leading-relaxed text-brand-dark">
              Tech vendors sell you a platform. Consultants hand you a deck. Both skip the one thing that actually builds momentum &ndash; your team. And that matters more than ever now: AI is making the easy work faster, but the hard calls &ndash; what to stop, what to change &ndash; are getting heavier, and those are human calls, made together.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark">
              Marketing needs to change the way it works. That can only happen when people come together around real, specific problems. That&apos;s where we come in &ndash; Committed Citizens, helping to drive change from the inside.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </Section>
  )
}
