"use client"

import { useEffect, type RefObject } from "react"
import gsap from "@/lib/gsap/gsap"
import { playHeroTimeline } from "@/lib/gsap/timelines/heroTimeline"
import { dispatchHeroCinematicComplete } from "@/features/nations"

export function useHeroScroll(
  container: RefObject<HTMLElement | null>,
  marqueeInnerRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    if (!container.current) return

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
          end: '+=6500',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onLeave: () => dispatchHeroCinematicComplete(),
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
      
      // 3. Reveal Marquee
      scrollTl.fromTo('.hero-cinematic-marquee',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        4.8
      )

      // 4. Sweep marquee: measure actual text width and compute exact pixel travel.
      const vw = window.innerWidth
      const textWidth = marqueeInnerRef.current?.offsetWidth ?? vw * 4
      const xStart = vw                      // text starts off-screen-right
      const xEnd = -(textWidth - vw)         // last character lands at right viewport edge

      scrollTl.fromTo('.marquee-text-inner',
        { x: xStart, y: '-50%' },
        { x: xEnd, y: '-50%', ease: 'none', duration: 1.5 },
        4.8
      )

      // Hold marquee fully visible, then fade before handoff to Nations
      scrollTl.to('.hero-cinematic-marquee', { opacity: 1, duration: 0.5 }, 6.3)
      scrollTl.to('.hero-cinematic-marquee', {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, 6.8)

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
  }, [container, marqueeInnerRef])
}
