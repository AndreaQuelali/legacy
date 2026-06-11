"use client"

import { ReactLenis } from "lenis/react"
import { ReactNode } from "react"
import { LenisScrollTriggerSync } from "./LenisScrollTriggerSync"

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.5, smoothWheel: true, autoRaf: false }}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}
