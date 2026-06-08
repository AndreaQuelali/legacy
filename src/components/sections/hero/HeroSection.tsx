"use client"

import { useRef } from "react"
import {
  HeroBackground,
  HeroAtmosphere,
  HeroMarquee,
  HeroContent,
  Countdown,
  LocationInfo,
  ScrollIndicator
} from "."
import TrophyScene from "@/components/3d/TrophyScene"
import FlagOverlay from "./FlagOverlay"
import { useHeroScroll } from "./useHeroScroll"

/**
 * HeroSection Component
 * 
 * Cinematic landing experience for World Cup 2026.
 * Manages composition of 3D elements, atmospheric layers, and scroll-driven animations.
 */
export default function HeroSection() {
  const container = useRef<HTMLElement>(null)
  const marqueeInnerRef = useRef<HTMLDivElement>(null)

  // Initialize GSAP scroll animations
  useHeroScroll(container, marqueeInnerRef)

  return (
    <section 
      id="hero" 
      ref={container} 
      className="hero-section relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0d0d0d]"
    >
      <div className="hero-section-inner absolute inset-0 size-full flex flex-col items-center justify-center">
        {/* Background static image layer */}
        <div className="hero-bg-overlay absolute inset-0 z-0">
          <HeroBackground />
        </div>

        {/* Atmospheric Environment Layer (revealed with trophy) */}
        <HeroAtmosphere />

        {/* 3D Scene Layer */}
        <div className="trophy-canvas-container absolute inset-0 z-[2] opacity-0">
          <TrophyScene />
        </div>

        {/* Flag Overlay — staggered country flags synced to trophy spin */}
        <FlagOverlay />

        {/* Cinematic Horizontal Marquee Layer */}
        <HeroMarquee ref={marqueeInnerRef} />

        {/* Foreground Content */}
        <div className="hero-foreground-content relative z-20 w-full flex flex-col items-center">
          <HeroContent />
        </div>

        <ScrollIndicator />

        {/* Footer bar for Hero */}
        <div className="hero-footer-bar absolute bottom-10 inset-x-0 px-6 sm:px-10 z-30 flex items-end justify-between max-w-[1440px] mx-auto w-full">
          <Countdown />
          <LocationInfo />
        </div>
      </div>
    </section>
  )
}

