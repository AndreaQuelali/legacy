"use client"

import { ReactLenis } from "lenis/react"
import { ReactNode } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()

  // On mobile, ReactLenis intercepts and simulates smooth scrolling which causes
  // major slowdowns and conflicts with native touch events. Native scroll is preferred.
  if (isMobile) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}

