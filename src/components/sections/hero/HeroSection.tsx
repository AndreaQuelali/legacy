"use client"

import { useEffect, useRef } from "react"
import gsap from "@/lib/gsap/gsap"
import { playHeroTimeline } from "@/lib/gsap/timelines/heroTimeline"
import { 
  HeroBackground, 
  HeroContent, 
  Countdown, 
  LocationInfo, 
  ScrollIndicator 
} from "."

export default function HeroSection() {
  const container = useRef<HTMLElement>(null)
  
  useEffect(() => {
    // Calling context without scoping to container allows it to grab TopNavBar globally
    const ctx = gsap.context(() => {
      playHeroTimeline()
    })
    
    return () => ctx.revert()
  }, [])

  return (
    <section ref={container} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0d0d0d]">
      <HeroBackground />

      <HeroContent />

      <ScrollIndicator />

      {/* Footer bar for Hero */}
      <div className="absolute bottom-10 inset-x-0 px-6 sm:px-10 z-20 flex items-end justify-between max-w-[1440px] mx-auto w-full">
        <Countdown />
        <LocationInfo />
      </div>
    </section>
  )
}

