"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { Section } from "@/components/section"
import { MomentumDiagram } from "@/components/approach/momentum-diagram"
import { OperatingModelDiagram } from "@/components/approach/operating-model-diagram"

export function PhilosophySection() {
  return (
    <>
      {/* Operating Model Section */}
      <Section background="white">
        <div className="mb-16 flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
          <motion.div variants={fadeInUp} className="lg:w-1/4">
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
              Operating model
            </span>
          </motion.div>
          <motion.div variants={fadeInUp} className="lg:w-3/4">
            <h2 className="mb-6 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
              We operate like a product team.
            </h2>
            <div className="max-w-3xl space-y-4">
              <p className="text-lg leading-relaxed text-brand-dark/60">
                Not a consulting engagement. No lengthy discovery or dogmatism that your team quietly ignores. Nimble, iterative, focused on outcomes. We work with your team until the new ways of working are simply how things get done.
              </p>
              <div className="space-y-3 pt-4">
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-pink" />
                  <p className="text-brand-dark/70">
                    <span className="font-semibold text-brand-dark">Technology starts projects,</span> people complete them
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-pink" />
                  <p className="text-brand-dark/70">
                    <span className="font-semibold text-brand-dark">Six-week value cycles</span> instead of long roadmaps
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-pink" />
                  <p className="text-brand-dark/70">
                    <span className="font-semibold text-brand-dark">No lengthy discovery,</span> just results
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Operating Model Diagram */}
        <div className="mt-20 pt-20 border-t border-brand-dark/10">
          <OperatingModelDiagram />
        </div>
      </Section>

      {/* Momentum Section */}
      <Section background="light-beige">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
          <motion.div variants={fadeInUp} className="lg:w-1/4">
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-brand-pink">
              Your toolkit
            </span>
          </motion.div>
          <motion.div variants={fadeInUp} className="lg:w-3/4">
            <MomentumDiagram />
          </motion.div>
        </div>
      </Section>
    </>
  )
}
