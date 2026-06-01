"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
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
  const t = useTranslations("hero")
  const container = useRef<HTMLElement>(null)

  useEffect(() => {
    // Calling context without scoping to container allows it to grab TopNavBar globally
    const ctx = gsap.context(() => {
      // Intro GSAP Timeline
      playHeroTimeline()

      // Cinematic Scroll Sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          id: 'hero-main-scroll',
          trigger: '.hero-section',
          start: 'top top',
          // Match the master: 6000px of scroll budget before the slide begins
          end: '+=6000',
          scrub: 1,
          // No pin here — the master ScrollTrigger in page.tsx pins the container
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

      // 3. Reveal Horizontal Message (0.8 to 0.85 progress)
      // Since end is 6000, 0.8 is 4800px. 
      // I'll use duration-based values that match TrophyScene's 0.8 mark

      // 3. Reveal Marquee — text starts at x:0 so the full phrase is readable immediately
      scrollTl.fromTo('.hero-cinematic-marquee',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        4.8
      )

      // 4. Scroll the marquee left — keep travel short so the full phrase stays in view
      scrollTl.fromTo('.marquee-text-inner',
        { x: '0vw' },
        { x: '-150vw', ease: 'none', duration: 0.9 },
        4.8
      )

      // 5. Transition handled by master timeline in page.tsx (horizontal slide)

      // Initial intro text hide
      scrollTl.to('.hero-foreground-content', {
        opacity: 0,
        y: -100,
        duration: 1
      }, 0)

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

  const marqueeText = t("cinematic_message")

  return (
    <section ref={container} className="hero-section relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0d0d0d]">
      <div className="hero-section-inner absolute inset-0 size-full flex flex-col items-center justify-center">
        {/* Background static image layer */}
        <div className="hero-bg-overlay absolute inset-0 z-0">
          <HeroBackground />
        </div>

        {/* 3D Scene Layer */}
        <div className="trophy-canvas-container absolute inset-0 z-0 opacity-20">
          <TrophyScene />
        </div>

        {/* Cinematic Horizontal Marquee Layer (Revealed later) */}
        <div className="hero-cinematic-marquee absolute inset-0 z-10 flex items-center pointer-events-none opacity-0 overflow-hidden">
          <div className="marquee-text-inner whitespace-nowrap pl-0">
            <span
              className="font-bebas text-[20vh] md:text-[28vh] leading-none uppercase tracking-tighter text-white"
            >
              {marqueeText}
            </span>
          </div>
        </div>

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

