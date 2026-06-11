"use client"

import { useEffect, type RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useScrollSectionsReady } from "@/hooks/useScrollSectionsReady"
import { dispatchScrollSectionsReady } from "@/lib/scroll/scrollSectionsGate"

gsap.registerPlugin(ScrollTrigger)

function getHorizontalScrollDistance(
  horizontalRef: RefObject<HTMLDivElement | null>
) {
  const totalWidth = horizontalRef.current?.scrollWidth ?? 0
  const viewportWidth = window.innerWidth
  return Math.max(0, totalWidth - viewportWidth)
}

export function useJourneyScroll(
  containerRef: RefObject<HTMLDivElement | null>,
  horizontalRef: RefObject<HTMLDivElement | null>,
  parallaxRef: RefObject<HTMLElement | null>
) {
  const scrollSectionsReady = useScrollSectionsReady()

  useEffect(() => {
    if (!scrollSectionsReady) return
    if (!horizontalRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(horizontalRef.current, {
        x: () => -getHorizontalScrollDistance(horizontalRef),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getHorizontalScrollDistance(horizontalRef)}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "journey-pin",
        },
      })

      if (parallaxRef.current) {
        gsap.fromTo(
          ".journey-map",
          { y: -40 },
          {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: parallaxRef.current,
              scrub: true,
              start: "top bottom",
              end: "bottom top",
            },
          }
        )
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        dispatchScrollSectionsReady()
      })
    })

    return () => ctx.revert()
  }, [scrollSectionsReady, containerRef, horizontalRef, parallaxRef])
}
