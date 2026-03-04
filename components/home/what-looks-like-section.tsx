"use client"

import { useRef } from "react"
import { 
  Users,
  Eye, 
  Clock, 
  Zap, 
  AlertCircle 
} from "lucide-react"

const problems = [
  {
    icon: Users,
    eyebrow: "CUSTOMER",
    heading: "Falling through the gaps",
    drag: "Your brand promise and the experience people actually get are drifting apart. Gaps open at the handoffs. Channels contradict each other.",
    flow: "One orchestrated experience, end-to-end.",
  },
  {
    icon: Eye,
    eyebrow: "DATA",
    heading: "Flying blind on what's working",
    drag: "Dashboards multiply. Reports say different things. Nobody has the data they need when they need it.",
    flow: "Telemetry your team will actually use. Real-time clarity.",
  },
  {
    icon: Clock,
    eyebrow: "PROCESS",
    heading: "Everything takes too long",
    drag: "Approval loops. Stakeholder consensus. Hand-offs between systems. Briefs that should take days take weeks.",
    flow: "Workflows redesigned. Cycles shortened. Agents handling routine work.",
  },
  {
    icon: Zap,
    eyebrow: "STACK",
    heading: "Paying for tech nobody's really using",
    drag: "Six-figure martech investments. Tools that don't talk to each other. Shelfware accumulating.",
    flow: "Rationalized stack. Technology that serves your people.",
  },
  {
    icon: AlertCircle,
    eyebrow: "CULTURE",
    heading: "Workarounds become the work",
    drag: "Teams invent their own processes. Manual effort thrives. Best people spend time unblocking instead of working.",
    flow: "Restored clarity and confidence. Everyone gets a jetpack.",
  },
]

export function WhatLooksLikeSection() {
  return (
    <section className="relative bg-brand-white py-24">
      {/* Header */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <h2 className="mb-16 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
          What it looks like.
        </h2>
      </div>

      {/* Stacking cards container */}
      <div className="relative">
        {problems.map((item, i) => {
          const Icon = item.icon
          
          return (
            <div
              key={item.heading}
              className="sticky relative"
              style={{ 
                top: `${80 + i * 80}px`,
                zIndex: i + 1
              }}
            >
              <div className="mx-auto max-w-[1400px] px-6 pb-4 lg:px-12">
                <div className="w-full border-2 border-brand-dark bg-brand-white p-8 lg:p-12">
                  {/* Eyebrow with icon */}
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-pink text-brand-white">
                      <Icon size={16} />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-brand-dark">
                      {item.eyebrow}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 className="mb-8 font-display text-3xl font-bold leading-tight text-brand-dark lg:text-4xl">
                    {item.heading}
                  </h3>

                  {/* Two-column body: DRAG and FLOW */}
                  <div className="grid gap-8 lg:grid-cols-2">
                    {/* DRAG section */}
                    <div>
                      <div className="mb-3 text-xs font-bold tracking-widest text-brand-dark">
                        DRAG
                      </div>
                      <p className="text-base leading-relaxed text-brand-dark/70">
                        {item.drag}
                      </p>
                    </div>

                    {/* FLOW section */}
                    <div>
                      <div className="mb-3 text-xs font-bold tracking-widest text-brand-orange">
                        FLOW
                      </div>
                      <p className="text-base leading-relaxed text-brand-dark/70">
                        {item.flow}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        
        {/* Spacer to allow last card to be fully visible */}
        <div className="h-[40vh]" />
      </div>
    </section>
  )
}
