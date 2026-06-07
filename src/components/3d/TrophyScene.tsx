"use client"

import React, { useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import gsap from '@/lib/gsap/gsap'

// ─── Module-level precomputed data (avoids impure calls in render) ───────────
const PARTICLE_COUNT = 220
const PARTICLE_POSITIONS = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r     = 2.5 + Math.random() * 2.5
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.acos(2 * Math.random() - 1)
    arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = r * Math.cos(phi)
  }
  return arr
})()
const PARTICLE_VELOCITIES = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i * 3]     = (Math.random() - 0.5) * 0.002
    arr[i * 3 + 1] = 0.001 + Math.random() * 0.003
    arr[i * 3 + 2] = (Math.random() - 0.5) * 0.002
  }
  return arr
})()
const INITIAL_FLASH_DELAY = Math.random() * 1.5 + 0.5

// ─── Gold Dust Particles ────────────────────────────────────────────────────
function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const posRef = useRef(PARTICLE_POSITIONS.slice())

  useFrame(() => {
    if (!pointsRef.current || !materialRef.current) return
    const st = ScrollTrigger.getById('hero-main-scroll')
    if (!st) return
    const p = st.progress

    // Fade in at 0.4, full at 0.5, fade out from 0.8 to 0.9
    let opacity = 0
    if (p >= 0.4 && p <= 0.5) opacity = (p - 0.4) / 0.1
    else if (p > 0.5 && p <= 0.8) opacity = 0.7
    else if (p > 0.8 && p <= 0.9) opacity = 0.7 * (1 - (p - 0.8) / 0.1)

    materialRef.current.opacity = opacity

    // Drift particles upward, loop them back to bottom
    if (p > 0.4 && p < 0.9) {
      const arr = posRef.current
      const geo = (pointsRef.current.geometry as THREE.BufferGeometry)
      const attr = geo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        arr[i * 3]     += PARTICLE_VELOCITIES[i * 3]
        arr[i * 3 + 1] += PARTICLE_VELOCITIES[i * 3 + 1]
        arr[i * 3 + 2] += PARTICLE_VELOCITIES[i * 3 + 2]
        // Loop: if particle drifts too high, reset to bottom
        if (arr[i * 3 + 1] > 4) {
          arr[i * 3 + 1] = -3 + Math.random()
        }
      }
      attr.array.set(arr)
      attr.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color="#fde08b"
        size={0.03}
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Camera Flash Lights ─────────────────────────────────────────────────────
function CameraFlashes() {
  const lightRef  = useRef<THREE.PointLight>(null)
  const timerRef   = useRef(0)
  const nextFlash  = useRef(INITIAL_FLASH_DELAY)
  const flashPhase = useRef<'idle' | 'on' | 'off'>('idle')
  const phaseTimer  = useRef(0)

  useFrame((_, delta) => {
    if (!lightRef.current) return
    const st = ScrollTrigger.getById('hero-main-scroll')
    if (!st) return
    const p = st.progress

    if (p < 0.44 || p > 0.88) {
      lightRef.current.intensity = 0
      flashPhase.current = 'idle'
      return
    }

    timerRef.current += delta

    if (flashPhase.current === 'idle') {
      if (timerRef.current >= nextFlash.current) {
        // Trigger flash — randomize position around the scene perimeter
        const angle = Math.random() * Math.PI * 2
        const dist  = 4 + Math.random() * 2
        lightRef.current.position.set(
          Math.cos(angle) * dist,
          1 + Math.random() * 3,
          Math.sin(angle) * dist
        )
        lightRef.current.intensity = 0
        flashPhase.current = 'on'
        phaseTimer.current = 0
      }
    } else if (flashPhase.current === 'on') {
      phaseTimer.current += delta
      // Rise to full intensity over 60ms
      lightRef.current.intensity = Math.min(160 * (phaseTimer.current / 0.06), 160)
      if (phaseTimer.current >= 0.06) {
        flashPhase.current = 'off'
        phaseTimer.current = 0
      }
    } else if (flashPhase.current === 'off') {
      phaseTimer.current += delta
      // Decay over 140ms
      lightRef.current.intensity = Math.max(160 * (1 - phaseTimer.current / 0.14), 0)
      if (phaseTimer.current >= 0.14) {
        lightRef.current.intensity = 0
        flashPhase.current = 'idle'
        timerRef.current  = 0
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

// ─── Trophy Model ─────────────────────────────────────────────────────────────
function Trophy() {
  const { scene } = useGLTF('/models/cup_world.glb')
  const groupRef = useRef<THREE.Group>(null)
  const spotLightRef = useRef<THREE.SpotLight>(null)
  const ambientLightRef = useRef<THREE.AmbientLight>(null)

  useFrame(() => {
    if (!groupRef.current) return
    const st = ScrollTrigger.getById('hero-main-scroll')
    if (st) {
      const p = st.progress

      const revealEnd       = 0.4
      const p1End           = 0.55
      const p2End           = 0.70
      const p3End           = 0.80
      const globePhaseStart = 0.85
      const messagePhaseEnd = 0.95
      const finalPhase      = 1.0

      const horizontalRot = Math.PI * 2
      const diagonalTilt  = Math.PI * 0.15

      if (p <= revealEnd) {
        groupRef.current.rotation.set(0, 0, 0)
        groupRef.current.scale.set(1, 1, 1)
        groupRef.current.position.y = -1.2
      } else if (p <= p1End) {
        const local = (p - revealEnd) / (p1End - revealEnd)
        groupRef.current.rotation.set(0, local * Math.PI * 2, 0)
      } else if (p <= p2End) {
        const local = (p - p1End) / (p2End - p1End)
        groupRef.current.rotation.set(0, horizontalRot + local * Math.PI * 2, local * diagonalTilt)
      } else if (p <= p3End) {
        const local = (p - p2End) / (p3End - p2End)
        groupRef.current.rotation.set(0, horizontalRot * 2 + local * Math.PI * 2, diagonalTilt - local * (diagonalTilt * 2))
      } else if (p <= globePhaseStart) {
        const local       = (p - p3End) / (globePhaseStart - p3End)
        const scaleAmount = 1 + local * 7
        groupRef.current.scale.set(scaleAmount, scaleAmount, scaleAmount)
        groupRef.current.position.y = -1.2 - local * 16
        groupRef.current.rotation.set(0, horizontalRot * 3 + local * Math.PI * 2, -diagonalTilt * (1 - local))
      } else if (p <= messagePhaseEnd) {
        const scaleAmount = 8
        groupRef.current.scale.set(scaleAmount, scaleAmount, scaleAmount)
        groupRef.current.position.y = -17.2
        groupRef.current.rotation.set(0, horizontalRot * 4, 0)
      } else {
        const local = (p - messagePhaseEnd) / (finalPhase - messagePhaseEnd)
        // @ts-expect-error - Custom property or R3F group issues
        groupRef.current.opacity = 1 - local
        groupRef.current.position.x = -local * 10
      }
    }
  })

  useEffect(() => {
    if (!groupRef.current) return

    const ctx = gsap.context(() => {
      groupRef.current!.position.set(0, -0.5, -4)
      groupRef.current!.scale.set(1, 1, 1)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: '+=6000',
          scrub: 1,
          pinnedContainer: '.hero-section',
          invalidateOnRefresh: true,
        }
      })

      tl.to(groupRef.current!.position, {
        z: 0,
        y: -1.2,
        duration: 1.2,
        ease: 'power2.inOut'
      }, 1.5)

      if (spotLightRef.current) {
        tl.to(spotLightRef.current, {
          intensity: 100,
          duration: 1.2,
          ease: 'power2.inOut'
        }, 1.5)
      }

      if (ambientLightRef.current) {
        tl.to(ambientLightRef.current, {
          intensity: 1,
          duration: 1.2
        }, 1.5)
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <group ref={groupRef}>
      <ambientLight ref={ambientLightRef} intensity={0.1} />
      <spotLight
        ref={spotLightRef}
        position={[0, 5, 5]}
        intensity={2}
        angle={0.6}
        penumbra={1}
        color="#fde08b"
      />
      <primitive object={scene} />
    </group>
  )
}

// ─── Scene Root ───────────────────────────────────────────────────────────────
export default function TrophyScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <Trophy />
          <Particles />
          <CameraFlashes />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/cup_world.glb')
