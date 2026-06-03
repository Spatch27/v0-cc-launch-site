"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const pillars = [
  {
    id: "people",
    title: "People",
    icon: "/icons/icon-team.svg",
    shortDescription: "Talented individuals aligned around shared purpose.",
    expandedDescription:
      "Clear decision rights, protected focus, genuine ownership. Great marketers joined to build bold work — we help them do exactly that instead of drowning in approval loops and broken systems.",
    bgColor: "bg-brand-pink",
    textColor: "text-brand-dark",
  },
  {
    id: "process",
    title: "Process",
    icon: "/icons/icon-process.svg",
    shortDescription: "Lean pathways that accelerate rather than impede.",
    expandedDescription:
      "Briefs that should take hours no longer take days. Approvals involve the right people, not everyone. Each improvement removes a step rather than adding one. Lean pathways, clean handoffs, fewer loops.",
    bgColor: "bg-brand-orange",
    textColor: "text-brand-dark",
  },
  {
    id: "data",
    title: "Data",
    icon: "/icons/icon-data.svg",
    shortDescription: "A single view of what matters and why.",
    expandedDescription:
      "Marketing and finance speak the same language. Decisions are made on what to do next, not debates about which numbers are right. A single, agreed view of what's happening, why, and what matters next.",
    bgColor: "bg-brand-yellow-deep",
    textColor: "text-brand-dark",
  },
  {
    id: "tech",
    title: "Tech",
    icon: "/icons/icon-technology.svg",
    shortDescription: "A stack built around how people actually work.",
    expandedDescription:
      "Licences that earn their keep. Platforms people love to use. Tool work gives way to customer work. A leaner, better-loved stack that serves the team rather than the other way around.",
    bgColor: "bg-brand-yellow-light",
    textColor: "text-brand-dark",
  },
]

export function FourPillarsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="bg-brand-light">
      {/* Header */}
      <div className="px-6 py-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-display text-4xl font-bold leading-snug text-brand-dark md:text-5xl">
            What it looks like.
          </h2>
        </div>
      </div>

      {/* Desktop: 4 columns with hover expansion */}
      <div className="hidden md:block">
        <div
          className="flex w-full"
          style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}
        >
          {pillars.map((pillar, index) => {
            // Calculate width based on hover state
            // Default: all equal (25%)
            // Hovered: expanded to 40%, others shrink to 20%
            let widthPercent = 25
            if (hoveredIndex !== null) {
              if (hoveredIndex === index) {
                widthPercent = 40
              } else {
                widthPercent = 20
              }
            }

            return (
              <div
                key={pillar.id}
                className={cn(
                  pillar.bgColor,
                  pillar.textColor,
                  "relative flex flex-col overflow-hidden transition-all duration-500 ease-out"
                )}
                style={{ width: `${widthPercent}%` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Content container */}
                <div className="flex h-full flex-col justify-between p-6 lg:p-8">
                  {/* Top: Icon and Title */}
                  <div>
                    <img
                      src={pillar.icon}
                      alt=""
                      className="mb-4 h-12 w-12 lg:h-16 lg:w-16"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(0.1) sepia(0) hue-rotate(0deg)",
                      }}
                    />
                    <h3 className="font-display text-2xl font-bold lg:text-3xl">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Bottom: Description */}
                  <div className="mt-auto">
                    <p
                      className={cn(
                        "text-sm leading-relaxed lg:text-base",
                        "transition-opacity duration-300"
                      )}
                    >
                      {pillar.shortDescription}
                    </p>

                    {/* Expanded content - only visible on hover */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-500",
                        hoveredIndex === index
                          ? "mt-4 max-h-48 opacity-100"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="text-sm leading-relaxed lg:text-base">
                        {pillar.expandedDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile: Accordion */}
      <div className="block md:hidden px-6 pb-8">
        <Accordion type="single" collapsible className="w-full">
          {pillars.map((pillar) => (
            <AccordionItem
              key={pillar.id}
              value={pillar.id}
              className={cn(pillar.bgColor, "border-none mb-2")}
            >
              <AccordionTrigger
                className={cn(
                  pillar.textColor,
                  "px-4 py-4 hover:no-underline"
                )}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={pillar.icon}
                    alt=""
                    className="h-8 w-8"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(0.1) sepia(0) hue-rotate(0deg)",
                    }}
                  />
                  <span className="font-display text-xl font-bold">
                    {pillar.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className={cn(pillar.textColor, "px-4 pb-4")}>
                <p className="mb-3 text-sm leading-relaxed">
                  {pillar.shortDescription}
                </p>
                <p className="text-sm leading-relaxed opacity-80">
                  {pillar.expandedDescription}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
