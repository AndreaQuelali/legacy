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

      // 3. Reveal Horizontal Message (0.8 to 0.85 progress)
      // Since end is 6000, 0.8 is 4800px. 
      // I'll use duration-based values that match TrophyScene's 0.8 mark
      
      scrollTl.fromTo('.hero-cinematic-marquee', 
        { opacity: 0, scale: 0.9, x: '20vw' },
        { opacity: 1, scale: 1, x: '0vw', duration: 0.5, ease: 'power2.out' },
        4.8 // 80% of 6.0 total duration in the relative timeline
      )

      // 4. Horizontal Scroll of the message (4.8 to 5.7)
      scrollTl.to('.marquee-text-inner', {
        x: '-200vw', 
        ease: 'none',
        duration: 0.9
      }, 4.8)

      // 5. Transition to Nations Section - Slide OUT Horizontally (5.7 to 6.0)
      scrollTl.to('.hero-section-inner', {
        x: '-100vw',
        duration: 0.3,
        ease: 'power2.inOut'
      }, 5.7)

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
        <div className="hero-cinematic-marquee absolute inset-0 z-10 flex items-center pointer-events-none opacity-0">
          <div className="marquee-text-inner whitespace-nowrap pl-[100vw]">
            <span className="font-bebas text-[20vh] md:text-[30vh] leading-none text-white/10 uppercase tracking-tighter">
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

