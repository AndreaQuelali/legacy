"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

// These must match PlayerGallery3D: normalizedPos * (total-1) * IDLE_SPACING
const TOTAL_CARDS = 6
const IDLE_SPACING = 10.2
export const CARD_X_POSITIONS: number[] = Array.from({ length: TOTAL_CARDS }, (_, i) => {
  const normalizedPos = i / (TOTAL_CARDS - 1) - 0.5
  return normalizedPos * (TOTAL_CARDS - 1) * IDLE_SPACING
})

// Ball dimensions (in group-local space; group is at world Y=1.55)
// Aligned with idle frame tops (frameH/2 ≈ 6.6) and in front of cards (Z≈0…-2.5)
const BALL_Y_BASE = 6.0
const BOUNCE_PEAK = 2.5
const BALL_Z = 3.5
const TARGET_BALL_DIAMETER = 2.0

interface BallIntroProps {
  onCardEnter: (index: number) => void
  onComplete: () => void
  segmentDuration?: number
  startDelay?: number
}

function prepareBallModel(scene: THREE.Group): THREE.Group {
  const cloned = scene.clone(true)
  const box = new THREE.Box3().setFromObject(cloned)
  const size = new THREE.Vector3()
  box.getSize(size)
  const maxDim = Math.max(size.x, size.y, size.z)
  if (maxDim > 0) {
    cloned.scale.setScalar(TARGET_BALL_DIAMETER / maxDim)
  }

  cloned.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    child.castShadow = true
    child.receiveShadow = true
    const materials = Array.isArray(child.material) ? child.material : [child.material]
    for (const material of materials) {
      if (material) material.side = THREE.DoubleSide
    }
  })

  return cloned
}

/**
 * Renders inside the PlayerGallery3D Canvas.
 * Must be wrapped in <Suspense> by the parent because useGLTF suspends.
 */
export default function BallIntro({
  onCardEnter,
  onComplete,
  segmentDuration = 0.8,
  startDelay = 1.0,
}: BallIntroProps) {
  const { scene } = useGLTF("/models/balon_futbol_paises.glb")
  const ballModel = useMemo(() => prepareBallModel(scene), [scene])

  const groupRef = useRef<THREE.Group>(null)
  const elapsed = useRef(0)
  const lastCardIndex = useRef(-1)
  const finished = useRef(false)
  const firstFrame = useRef(true)

  useFrame((_, dt) => {
    if (finished.current || !groupRef.current) return

    if (firstFrame.current) {
      firstFrame.current = false
      elapsed.current = 0
    }

    elapsed.current += dt

    const t = elapsed.current - startDelay

    if (t < 0) {
      groupRef.current.visible = false
      return
    }

    groupRef.current.visible = true

    const totalSegments = TOTAL_CARDS + 1
    const totalDuration = totalSegments * segmentDuration

    if (t >= totalDuration) {
      if (!finished.current) {
        finished.current = true
        groupRef.current.visible = false
        onComplete()
      }
      return
    }

    const segment = Math.floor(t / segmentDuration)
    const segT = (t % segmentDuration) / segmentDuration

    const eased = segT < 0.5
      ? 2 * segT * segT
      : 1 - Math.pow(-2 * segT + 2, 2) / 2

    let fromX: number
    let toX: number
    if (segment === 0) {
      fromX = CARD_X_POSITIONS[0] - 18
      toX = CARD_X_POSITIONS[0]
    } else if (segment < TOTAL_CARDS) {
      fromX = CARD_X_POSITIONS[segment - 1]
      toX = CARD_X_POSITIONS[segment]
    } else {
      fromX = CARD_X_POSITIONS[TOTAL_CARDS - 1]
      toX = CARD_X_POSITIONS[TOTAL_CARDS - 1] + 24
    }
    const x = fromX + (toX - fromX) * eased

    const arcHeight = segment < TOTAL_CARDS ? BOUNCE_PEAK : BOUNCE_PEAK * 2
    const y = BALL_Y_BASE + arcHeight * Math.sin(segT * Math.PI)

    const z = BALL_Z - Math.sin(segT * Math.PI) * 1.2

    groupRef.current.position.set(x, y, z)

    const flight = Math.sin(segT * Math.PI)
    const stretch = 1 + 0.18 * flight
    const squash = 1 - 0.1 * flight
    groupRef.current.scale.set(squash, stretch, squash)

    const spinSpeed = 3.5 + flight * 2.5
    groupRef.current.rotation.y += dt * spinSpeed
    groupRef.current.rotation.z += dt * spinSpeed * 0.35

    const cardIndex = segment < TOTAL_CARDS ? segment : -1
    if (
      cardIndex >= 0 &&
      cardIndex !== lastCardIndex.current &&
      segT > 0.35 &&
      segT < 0.85
    ) {
      lastCardIndex.current = cardIndex
      onCardEnter(cardIndex)
    }
  })

  return (
    <group ref={groupRef} visible={false}>
      <primitive object={ballModel} />
      <pointLight color="#e9c176" intensity={12} distance={18} decay={2} />
      <pointLight color="#ffffff" intensity={4} distance={10} decay={2} />
    </group>
  )
}

useGLTF.preload("/models/balon_futbol_paises.glb")
