"use client"

import { useLayoutEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "@/lib/gsap/gsap"
import NationCard from "./NationCard"

export default function NationsSequence() {
  const t = useTranslations("nations")
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalWrapperRef = useRef<HTMLDivElement>(null)
  
  const nations = t.raw("nations_list") as Array<{
    id: string
    name: string
    player: string
    motto: string
    desc: string
    founded: string
    titles: string
    stadium: string
  }>

  const message = "THIRTY-TWO NATIONS ARRIVE WITH A DREAM. HUNDREDS OF PLAYERS CHASE GLORY. MILLIONS WILL WATCH. THROUGH EVERY MATCH, EVERY VICTORY, AND EVERY SACRIFICE, A LEGACY WILL BE WRITTEN FOREVER."

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = horizontalWrapperRef.current
      if (!wrapper) return

      const totalWidth = wrapper.scrollWidth
      const windowWidth = window.innerWidth
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      })

      tl.to(wrapper, {
        x: -(totalWidth - windowWidth),
        ease: "none",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen bg-black overflow-hidden">
      <div 
        ref={horizontalWrapperRef} 
        className="flex h-full items-center"
      >
        {/* Phase 1: Cinematic Message */}
        <div className="flex-shrink-0 flex items-center px-[30vw]">
          <h2 className="font-bebas text-[20vh] md:text-[35vh] leading-none text-white/5 uppercase select-none tracking-tighter whitespace-nowrap">
            {message}
          </h2>
        </div>

        {/* Phase 2: Nations Grid (Now Horizontal) */}
        <div className="flex h-full items-center gap-0">
          {nations.map((nation) => (
            <div key={nation.id} className="w-screen h-full flex-shrink-0 relative overflow-hidden flex items-center justify-center">
               {/* 
                  Reusing NationCard but forcing it to be always active 
                  since we are scrolling them horizontally into viewport 
               */}
               <div className="w-[90vw] h-[80vh] relative">
                  <NationCard nation={nation} isActive={true} />
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Atmospheric overlays for the whole sequence */}
      <div className="absolute inset-y-0 left-0 w-[10vw] bg-gradient-to-r from-black to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[10vw] bg-gradient-to-l from-black to-transparent z-30 pointer-events-none" />
    </section>
  )
}
