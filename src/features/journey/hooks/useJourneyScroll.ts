"use client"

import { useEffect, type RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useJourneyScroll(
  containerRef: RefObject<HTMLDivElement | null>,
  horizontalRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!horizontalRef.current || !containerRef.current) return

      // Horizontal Scroll
      const totalWidth = horizontalRef.current.scrollWidth
      const viewportWidth = window.innerWidth

      gsap.to(horizontalRef.current, {
        x: () => -(totalWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      // Background Parallax — vertical only, no horizontal movement
      gsap.fromTo(".journey-map", {
        y: -40,
      }, {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: true,
          start: "top bottom",
          end: "bottom top"
        }
      })
    })

    return () => ctx.revert()
  }, [containerRef, horizontalRef])
}
