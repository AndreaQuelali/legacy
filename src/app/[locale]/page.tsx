"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "@/lib/gsap/gsap"
import TopNavBar from "@/components/layout/TopNavBar"
import Footer from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/hero"
import { StatsBar } from "@/components/sections/stats"
import { NationsSection, NationsMarquee } from "@/components/sections/nations"
import { StadiumSection } from "@/components/sections/stadiums"
import { TimelineSection } from "@/components/sections/timeline"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // MASTER SCROLL FOR HORIZONTAL TRANSITION
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=11000", 
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      })

      // 0 to 6000: Hero (6 units)
      masterTl.to({}, { duration: 6 })

      // 6000 to 7000: Transition (1 unit)
      masterTl.to(wrapperRef.current, {
        x: "-100vw",
        duration: 1,
        ease: "power2.inOut"
      })

      // 7000 to 11000: Nations (4 units)
      masterTl.to({}, { duration: 4 })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="overflow-x-hidden">
      <TopNavBar />
      
      <div ref={containerRef} className="relative h-screen w-full">
        <div ref={wrapperRef} className="flex h-full w-[200vw]">
          <div className="w-screen h-full shrink-0">
            <HeroSection />
          </div>
          <div className="w-screen h-full shrink-0">
            <NationsSection />
          </div>
        </div>
      </div>

      <StadiumSection />
      <StatsBar />
      <TimelineSection />
      <NationsMarquee />
      <Footer />
    </div>
  )
}
