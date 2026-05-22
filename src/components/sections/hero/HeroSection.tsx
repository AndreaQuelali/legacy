"use client"

import { useEffect, useRef } from "react"
import { fadeUp } from "@/providers/AnimationProvider"
import { 
  HeroBackground, 
  HeroContent, 
  Countdown, 
  LocationInfo, 
  ScrollIndicator 
} from "."

export default function HeroSection() {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (h1Ref.current) fadeUp(h1Ref.current, 0.2)
    if (pRef.current) fadeUp(pRef.current, 0.4)
  }, [])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0d0d0d]">
      <HeroBackground />

      <HeroContent h1Ref={h1Ref} pRef={pRef} />

      <ScrollIndicator />

      {/* Footer bar for Hero */}
      <div className="absolute bottom-10 inset-x-0 px-6 sm:px-10 z-20 flex items-end justify-between max-w-[1440px] mx-auto w-full">
        <Countdown />
        <LocationInfo />
      </div>
    </section>
  )
}

