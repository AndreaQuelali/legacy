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
import TrophyScene from "@/components/3d/TrophyScene"

export default function HeroSection() {
  const container = useRef<HTMLElement>(null)

  useEffect(() => {
    // Calling context without scoping to container allows it to grab TopNavBar globally
    const ctx = gsap.context(() => {
      // Intro GSAP Timeline
      playHeroTimeline()

      // Cinematic Scroll Sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          id: 'hero-main-scroll', // Added ID for synchronization
          trigger: '.hero-section',
          start: 'top top',
          end: '+=6000', // Pinned for more phases
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      })

      // 1. Title Cinematic Exit (0 to 1.5)
      scrollTl.to('.hero-foreground-content', {
        scale: 3.5,
        opacity: 0,
        y: -150,
        duration: 1.5,
        ease: 'power2.inOut'
      }, 0)

      // Fade out background (0 to 1.5)
      scrollTl.to('.hero-bg-overlay', {
        opacity: 0,
        duration: 1.5,
        ease: 'power1.inOut'
      }, 0)

      // 2. Reveal Trophy Container (0.5 to 1.5)
      scrollTl.to('.trophy-canvas-container', {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut'
      }, 0.5)

      // 3. Keep pinned for all rotation phases (1.5 to 6.0)
      scrollTl.to({}, { duration: 4.5 }, 1.5)

      // Hide smaller elements quickly
      scrollTl.to(['.anim-scroll-indicator', '.hero-footer-bar'], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.in'
      }, 0)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={container} className="hero-section relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0d0d0d]">
      {/* Background static image layer */}
      <div className="hero-bg-overlay absolute inset-0 z-0">
        <HeroBackground />
      </div>

      {/* 3D Scene Layer */}
      <div className="trophy-canvas-container absolute inset-0 z-0 opacity-20">
        <TrophyScene />
      </div>

      {/* Foreground Content */}
      <div className="hero-foreground-content relative z-10 w-full flex flex-col items-center">
        <HeroContent />
      </div>

      <ScrollIndicator />

      {/* Footer bar for Hero */}
      <div className="hero-footer-bar absolute bottom-10 inset-x-0 px-6 sm:px-10 z-20 flex items-end justify-between max-w-[1440px] mx-auto w-full">
        <Countdown />
        <LocationInfo />
      </div>
    </section>
  )
}

