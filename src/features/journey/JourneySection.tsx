"use client"

import React, { useRef } from 'react'
import {
  JourneyHeader,
  JourneyCard,
  JourneyBackground,
  JourneyFooter,
  useJourneyMilestones,
  useJourneyScroll
} from './'

/**
 * JourneySection Component
 * 
 * Immersive horizontal timeline showcasing the World Cup 2026 milestones.
 */
export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  
  // Data and Animations
  const milestones = useJourneyMilestones()
  useJourneyScroll(containerRef, horizontalRef)

  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-[#050505]"
    >
      {/* Background Map & Overlay */}
      <JourneyBackground />

      <div ref={containerRef} className="relative z-10 min-h-screen flex flex-col pt-10 md:pt-20">
        <div className="px-6 py-4 md:py-6">
          <JourneyHeader />
        </div>

        {/* Horizontal Scroll Content */}
        <div className="w-full overflow-hidden mt-4 md:mt-8 flex justify-start">
          <div
            ref={horizontalRef}
            className="flex w-max gap-20 px-[20vw] md:px-[30vw]"
          >
            {/* Visual Timeline Line */}
            <div className="absolute top-[210px] left-0 w-full h-[1px] bg-white/10" />

            {milestones.map((ms, i) => (
              <div key={ms.id} className="journey-card">
                <JourneyCard
                  {...ms}
                  isLast={i === milestones.length - 1}
                />
              </div>
            ))}
          </div>
        </div>

        <JourneyFooter />
      </div>
    </section>
  )
}
