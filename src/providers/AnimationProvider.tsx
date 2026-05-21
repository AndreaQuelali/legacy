"use client"

import { ReactNode, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function AnimationProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  return <>{children}</>
}

// Reusable GSAP animation helper
export const fadeUp = (element: string | Element, delay: number = 0) => {
  return gsap.from(element, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay,
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    },
  })
}
