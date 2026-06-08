"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"

const INITIAL_FLASH_DELAY = Math.random() * 1.5 + 0.5

export interface CameraFlashesProps {
  active?: boolean
  scrollTriggerId?: string
  scrollRange?: [number, number]
}

export default function CameraFlashes({
  active = false,
  scrollTriggerId,
  scrollRange = [0.44, 0.72],
}: CameraFlashesProps) {
  const lightRef = useRef<THREE.PointLight>(null)
  const timerRef = useRef(0)
  const nextFlash = useRef(INITIAL_FLASH_DELAY)
  const flashPhase = useRef<"idle" | "on" | "off">("idle")
  const phaseTimer = useRef(0)

  useFrame((_, delta) => {
    if (!lightRef.current) return

    let isActive = active

    if (scrollTriggerId) {
      const st = ScrollTrigger.getById(scrollTriggerId)
      if (!st) return
      const p = st.progress
      isActive = p >= scrollRange[0] && p <= scrollRange[1]
    }

    if (!isActive) {
      lightRef.current.intensity = 0
      flashPhase.current = "idle"
      return
    }

    timerRef.current += delta

    if (flashPhase.current === "idle") {
      if (timerRef.current >= nextFlash.current) {
        const angle = Math.random() * Math.PI * 2
        const dist = 4 + Math.random() * 2
        lightRef.current.position.set(
          Math.cos(angle) * dist,
          1 + Math.random() * 3,
          Math.sin(angle) * dist
        )
        lightRef.current.intensity = 0
        flashPhase.current = "on"
        phaseTimer.current = 0
      }
    } else if (flashPhase.current === "on") {
      phaseTimer.current += delta
      const peak = 450
      lightRef.current.intensity = Math.min(peak * (phaseTimer.current / 0.04), peak)
      if (phaseTimer.current >= 0.04) {
        flashPhase.current = "off"
        phaseTimer.current = 0
      }
    } else if (flashPhase.current === "off") {
      phaseTimer.current += delta
      const peak = 450
      lightRef.current.intensity = Math.max(peak * (1 - phaseTimer.current / 0.1), 0)
      if (phaseTimer.current >= 0.1) {
        lightRef.current.intensity = 0
        flashPhase.current = "idle"
        timerRef.current = 0
        
        // "Paparazzi" burst logic: 45% chance of a quick follow-up flash
        const isBurst = Math.random() < 0.45
        nextFlash.current = isBurst ? Math.random() * 0.12 + 0.04 : Math.random() * 2.0 + 0.3
      }
    }
  })

  return (
    <pointLight
      ref={lightRef}
      color="#ffffff"
      intensity={0}
      distance={18}
      decay={2}
    />
  )
}
