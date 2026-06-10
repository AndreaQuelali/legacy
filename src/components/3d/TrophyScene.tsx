"use client"

import React, { useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import gsap from '@/lib/gsap/gsap'
import CameraFlashes from '@/components/3d/CameraFlashes'
import { useIsMobile } from '@/hooks/useIsMobile'

// ─── Circular particle alphaMap (generated once at module level) ──────────────
function createCircleTexture(): THREE.CanvasTexture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const center = size / 2
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.8)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(center, center, center, 0, Math.PI * 2)
  ctx.fill()
  return new THREE.CanvasTexture(canvas)
}

// ─── Module-level precomputed particle positions/velocities ──────────────────
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
// ─── Gold Dust Particles (circular via alphaMap) ─────────────────────────────
function Particles({ isMobile }: { isMobile: boolean }) {
  const pointsRef   = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const posRef      = useRef(PARTICLE_POSITIONS.slice())
  const stRef       = useRef<globalThis.ScrollTrigger | null>(null)
  // alphaMap is created once on first render (client-only)
  const textureRef  = useRef<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    textureRef.current = createCircleTexture()
    if (materialRef.current) {
      materialRef.current.alphaMap   = textureRef.current
      materialRef.current.alphaTest  = 0.05
      materialRef.current.needsUpdate = true
    }
    return () => {
      textureRef.current?.dispose()
    }
  }, [])

  useFrame(() => {
    if (!pointsRef.current || !materialRef.current) return
    stRef.current = stRef.current || ScrollTrigger.getById('hero-main-scroll') || null
    if (!stRef.current) return
    const p = stRef.current.progress

    // Fade in at 0.4, hold through the marquee phase, then fade out at the very end
    let opacity = 0
    if (p >= 0.4 && p <= 0.5) opacity = (p - 0.4) / 0.1
    else if (p > 0.5 && p <= 0.95) opacity = 0.7
    else if (p > 0.95) opacity = 0.7 * (1 - (p - 0.95) / 0.05)

    materialRef.current.opacity = opacity

    // Drift particles upward and loop them back - keep active until the very end
    if (p > 0.4 && p <= 1.0) {
      const arr  = posRef.current
      const geo  = pointsRef.current.geometry as THREE.BufferGeometry
      const attr = geo.attributes.position as THREE.BufferAttribute
      const activeCount = isMobile ? 80 : PARTICLE_COUNT
      for (let i = 0; i < activeCount; i++) {
        arr[i * 3]     += PARTICLE_VELOCITIES[i * 3]
        arr[i * 3 + 1] += PARTICLE_VELOCITIES[i * 3 + 1]
        arr[i * 3 + 2] += PARTICLE_VELOCITIES[i * 3 + 2]
        if (arr[i * 3 + 1] > 4) {
          arr[i * 3 + 1] = -3 + Math.random()
        }
      }
      attr.array.set(arr)
      // Hide geometry that isn't drawn on mobile
      geo.setDrawRange(0, activeCount)
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
        size={0.055}
        transparent
        opacity={0}
        depthWrite={false}
        sizeAttenuation
        alphaTest={0.05}
      />
    </points>
  )
}

// ─── Trophy Model ─────────────────────────────────────────────────────────────
function Trophy() {
  const { scene } = useGLTF('/models/cup_world.glb')
  const groupRef       = useRef<THREE.Group>(null)
  const spotLightRef   = useRef<THREE.SpotLight>(null)
  const ambientLightRef = useRef<THREE.AmbientLight>(null)
  const stRef          = useRef<globalThis.ScrollTrigger | null>(null)

  useFrame(() => {
    if (!groupRef.current) return
    stRef.current = stRef.current || ScrollTrigger.getById('hero-main-scroll') || null
    if (!stRef.current) return
    const p = stRef.current.progress

    // ── Phase boundaries ──────────────────────────────────────────────────────
    // 0.00 → 0.40  reveal (GSAP handles position/opacity)
    // 0.40 → 0.65  ONE smooth rotation (0 → 2π) with gentle diagonal tilt
    // 0.65 → 0.80  globe zoom: scale up, fly into screen
    // 0.80 → 0.95  off screen (marquee visible)
    // 0.95 → 1.00  exit slide left
    const REVEAL_END  = 0.40
    const SPIN_END    = 0.65
    const GLOBE_END   = 0.80
    const MSG_END     = 0.95

    const MAX_TILT = Math.PI * 0.12  // ≈ 22° max diagonal lean

    if (p <= REVEAL_END) {
      // Stationary — GSAP timeline drives position here
      groupRef.current.rotation.set(0, 0, 0)
      groupRef.current.scale.set(1, 1, 1)
      groupRef.current.position.y = -1.2
    } else if (p <= SPIN_END) {
      // Single rotation: 0 → 2π, smooth eased tilt arc
      const t   = (p - REVEAL_END) / (SPIN_END - REVEAL_END) // 0→1
      const yRot = t * Math.PI * 2
      // tilt: rise to MAX_TILT at mid spin, back to 0 at end
      const tilt = Math.sin(t * Math.PI) * MAX_TILT
      groupRef.current.rotation.set(0, yRot, tilt)
      groupRef.current.scale.set(1, 1, 1)
      groupRef.current.position.y = -1.2
    } else if (p <= GLOBE_END) {
      // Globe zoom-out: scale 1→8, fly upward off screen
      const t = (p - SPIN_END) / (GLOBE_END - SPIN_END) // 0→1
      const s = 1 + t * 7
      groupRef.current.scale.set(s, s, s)
      groupRef.current.position.y = -1.2 - t * 16
      // Return rotation to upright during zoom
      const yFull = Math.PI * 2
      groupRef.current.rotation.set(0, yFull + t * Math.PI * 0.5, 0)
    } else if (p <= MSG_END) {
      // Off screen — hold position
      groupRef.current.scale.set(8, 8, 8)
      groupRef.current.position.y = -17.2
    } else {
      // Exit: slide left
      const t = (p - MSG_END) / (1.0 - MSG_END)
      groupRef.current.position.x = -t * 10
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
  const isMobile = useIsMobile()

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={isMobile ? 1 : [1, 1.5]}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <Trophy />
          <Particles isMobile={isMobile} />
          <CameraFlashes scrollTriggerId="hero-main-scroll" scrollRange={[0.44, 0.72]} />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/cup_world.glb')
