"use client"

import { useRef } from "react"
import { 
  Link as LinkIcon, 
  Eye, 
  Clock, 
  CreditCard, 
  AlertCircle 
} from "lucide-react"

const problems = [
  {
    icon: LinkIcon,
    problem: "Customers falling through the gaps",
    solution:
      "We rebuild the handoffs between teams and platforms so signals get acted on in real time.",
  },
  {
    icon: Eye,
    problem: "Flying blind on what's working",
    solution:
      "We build telemetry your team will actually use, not another dashboard nobody opens.",
  },
  {
    icon: Clock,
    problem: "Everything takes too long",
    solution: "We redesign workflows and build agents that shorten cycles. Fast.",
  },
  {
    icon: CreditCard,
    problem: "Paying for tech nobody's really using",
    solution:
      "We rationalise the stack and make your technology serve your people.",
  },
  {
    icon: AlertCircle,
    problem: "Workarounds become the work",
    solution:
      'We restore confidence, clarity and energy. "Everyone gets a jetpack."',
  },
]

export function WhatLooksLikeSection() {
  return (
    <section className="relative bg-brand-white py-24">
      {/* Header - not sticky */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <h2 className="mb-16 font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
          What it looks like.
        </h2>
      </div>

      {/* Stacking cards container */}
      <div className="relative">
        {problems.map((item, i) => {
          const Icon = item.icon
          const isLast = i === problems.length - 1
          
          return (
            <div
              key={item.problem}
              className="sticky"
              style={{ 
                top: `${80 + i * 60}px`,
                zIndex: i + 1
              }}
            >
              <div className="mx-auto max-w-[1400px] px-6 pb-4 lg:px-12">
                <div className="w-full border-2 border-brand-dark bg-brand-light p-8 shadow-lg lg:p-12">
                  {/* Visible part: Icon and headline */}
                  <div className="flex items-start gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-pink text-brand-white">
                      <Icon size={26} />
                    </div>
                    <h3 className="font-display text-2xl font-bold leading-tight text-brand-dark md:text-3xl">
                      {item.problem}
                    </h3>
                  </div>
                  
                  {/* Text that gets covered by next card */}
                  <div className="ml-20 mt-6">
                    <p className="max-w-3xl text-lg leading-relaxed text-brand-dark/70">
                      {item.solution}
                    </p>
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
