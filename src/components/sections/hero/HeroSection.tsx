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
import FlagOverlay from "./FlagOverlay"

export default function HeroSection() {
  const t = useTranslations("hero")
  const container = useRef<HTMLElement>(null)
  const marqueeInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Calling context without scoping to container allows it to grab TopNavBar globally
    const ctx = gsap.context(() => {
      // Intro GSAP Timeline
      playHeroTimeline()

      // Cinematic Scroll Sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          id: 'hero-main-scroll',
          trigger: container.current,
          start: 'top top',
          end: '+=6000',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
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

      // 2. Reveal Trophy Atmosphere Layer (starts after title exit, peaks at 0.5)
      scrollTl.to('.trophy-atmosphere-layer', {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut'
      }, 1.5)

      // 2b. Fade out atmosphere before globe phase
      scrollTl.to('.trophy-atmosphere-layer', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in'
      }, 4.5)

      // 2c. Reveal Trophy Container (Starts after title exit)
      scrollTl.to('.trophy-canvas-container', {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut'
      }, 1.5)

      // 3. Reveal Horizontal Message (0.8 to 0.85 progress)
      // Since end is 6000, 0.8 is 4800px. 
      // I'll use duration-based values that match TrophyScene's 0.8 mark

      // 3. Reveal Marquee
      scrollTl.fromTo('.hero-cinematic-marquee',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        4.8
      )

      // 4. Sweep marquee: measure actual text width and compute exact pixel travel.
      //    xStart: text left edge aligns with viewport right edge (just entering from right)
      //    xEnd:   text right edge aligns with viewport right edge (last character visible)
      //    This works regardless of language (EN vs ES) or screen width.
      const vw = window.innerWidth
      const textWidth = marqueeInnerRef.current?.offsetWidth ?? vw * 4
      const xStart = vw                      // text starts off-screen-right
      const xEnd = -(textWidth - vw)         // last character lands at right viewport edge

      scrollTl.fromTo('.marquee-text-inner',
        { x: xStart, y: '-50%' },
        { x: xEnd, y: '-50%', ease: 'none', duration: 1.5 },
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
    <section id="hero" ref={container} className="hero-section relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0d0d0d]">
      <div className="hero-section-inner absolute inset-0 size-full flex flex-col items-center justify-center">
        {/* Background static image layer */}
        <div className="hero-bg-overlay absolute inset-0 z-0">
          <HeroBackground />
        </div>

        {/* Atmospheric Environment Layer (revealed with trophy) */}
        <div className="trophy-atmosphere-layer absolute inset-0 z-[1] pointer-events-none opacity-0">

          {/* Blurred stadium background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/hero.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(40px) brightness(0.18)',
              transform: 'scale(1.1)',
            }}
          />

          {/* Golden radial halo (center glow) */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 55% 55% at 50% 58%, rgba(233,193,118,0.22) 0%, rgba(233,193,118,0.06) 45%, transparent 70%)',
            }}
          />

          {/* Secondary warm glow ring */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 35% 35% at 50% 60%, rgba(253,224,139,0.14) 0%, transparent 60%)',
              animation: 'halopulse 3s ease-in-out infinite',
            }}
          />

          {/* Volumetric fog — bottom layer */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/5"
            style={{
              background: 'linear-gradient(to top, rgba(233,193,118,0.07) 0%, transparent 100%)',
            }}
          />

          {/* Volumetric fog — mid layer (slight offset) */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 40% at 50% 80%, rgba(255,255,255,0.04) 0%, transparent 70%)',
            }}
          />

          {/* Vignette to keep edges dark */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)',
            }}
          />
        </div>

        {/* 3D Scene Layer */}
        <div className="trophy-canvas-container absolute inset-0 z-[2] opacity-0">
          <TrophyScene />
        </div>

        {/* Flag Overlay — staggered country flags synced to trophy spin */}
        <FlagOverlay />

        {/* Cinematic Horizontal Marquee Layer (Revealed later) */}
        {/* The inner div is absolutely positioned at vertical-center; GSAP drives the horizontal x. */}
        <div className="hero-cinematic-marquee absolute inset-0 z-10 pointer-events-none opacity-0">
          <div
            ref={marqueeInnerRef}
            className="marquee-text-inner whitespace-nowrap"
            style={{ position: 'absolute', top: '50%', left: 0 }}
          >
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

