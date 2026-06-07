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
      lightRef.current.intensity = Math.min(160 * (phaseTimer.current / 0.06), 160)
      if (phaseTimer.current >= 0.06) {
        flashPhase.current = "off"
        phaseTimer.current = 0
      }
    } else if (flashPhase.current === "off") {
      phaseTimer.current += delta
      lightRef.current.intensity = Math.max(160 * (1 - phaseTimer.current / 0.14), 0)
      if (phaseTimer.current >= 0.14) {
        lightRef.current.intensity = 0
        flashPhase.current = "idle"
        timerRef.current = 0
        nextFlash.current = Math.random() * 2.5 + 0.4
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
