"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "@/lib/gsap/gsap"

export default function CinematicMessage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const message = "EVERY NATION ARRIVES WITH A DREAM. ONLY ONE LEAVES WITH THE LEGACY."

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = textRef.current?.scrollWidth || 0
      const windowWidth = window.innerWidth

      // Calculate total horizontal distance:
      // Starting from fully off-screen right to fully off-screen left (or just ending at the end)
      // Usually these GSAP marques start visible or just off-screen.
      // User said "move horizontally across the screen".

      gsap.to(textRef.current, {
        x: -(scrollWidth - windowWidth + 200), // Extra space
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000", // Pinned for 3000px of vertical scroll
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-black flex items-center overflow-hidden border-y border-white/5"
    >
      <div
        ref={textRef}
        className="whitespace-nowrap px-[10vw]"
      >
        <span className="font-bebas text-[15vh] md:text-[25vh] leading-none text-white/10 uppercase select-none tracking-tighter">
          {message}
        </span>
      </div>

      {/* Atmospheric overlays */}
      <div className="absolute inset-y-0 left-0 w-[15vw] bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[15vw] bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
    </section>
  )
}
