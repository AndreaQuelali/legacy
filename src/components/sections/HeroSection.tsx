"use client"

import { useEffect, useRef } from "react"
import { fadeUp } from "@/providers/AnimationProvider"
import Scene from "@/components/3d/Scene"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      fadeUp(containerRef.current.querySelector("h1")!, 0.2)
      fadeUp(containerRef.current.querySelector("p")!, 0.4)
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 text-center"
    >
      <Scene />
      
      <div className="z-10 max-w-4xl pointer-events-none">
        <h1 className="gold-gradient-text animate-glow mb-6 text-6xl font-black uppercase tracking-tighter sm:text-8xl md:text-9xl">
          LEGACY
        </h1>
        <p className="mx-auto max-w-2xl text-lg font-medium tracking-widest text-white/60 uppercase sm:text-xl">
          The Journey to World Cup 2026 Begins Here
        </p>
      </div>
      
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
    </section>
  )
}
