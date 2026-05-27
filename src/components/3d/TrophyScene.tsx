"use client"

import React, { useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import gsap from '@/lib/gsap/gsap'

function Trophy() {
  const { scene } = useGLTF('/models/cup_world.glb')
  const groupRef = useRef<THREE.Group>(null)
  const spotLightRef = useRef<THREE.SpotLight>(null)
  const ambientLightRef = useRef<THREE.AmbientLight>(null)

  // Use useFrame for complex multi-phase rotation and scaling
  useFrame(() => {
    if (!groupRef.current) return
    const st = ScrollTrigger.getById('hero-main-scroll')
    if (st) {
      const p = st.progress // 0 to 1

      // Thresholds (Normalized 0 to 1)
      const revealEnd = 0.2
      const p1End = 0.4
      const p2End = 0.6
      const p3End = 0.8
      const finalPhase = 1.0

      // Continuous rotation values
      const horizontalRot = Math.PI * 2
      const diagonalTilt = Math.PI * 0.15 // Subtle tilt for diagonal

      if (p <= revealEnd) {
        // Just revealing, state is static or handled by GSAP
        groupRef.current.rotation.set(0, 0, 0)
        groupRef.current.scale.set(1, 1, 1)
        groupRef.current.position.y = -1.2
      }
      else if (p <= p1End) {
        // Phase 1: Smooth Horizontal
        const local = (p - revealEnd) / (p1End - revealEnd)
        groupRef.current.rotation.set(0, local * Math.PI * 2, 0)
        groupRef.current.scale.set(1, 1, 1)
        groupRef.current.position.y = -1.2
      }
      else if (p <= p2End) {
        // Phase 2: Smooth Transition into Diagonal Right
        const local = (p - p1End) / (p2End - p1End)
        // Keep Y rotation going while introducing Z tilt
        groupRef.current.rotation.set(0, horizontalRot + local * Math.PI * 2, local * diagonalTilt)
        groupRef.current.scale.set(1, 1, 1)
        groupRef.current.position.y = -1.2
      }
      else if (p <= p3End) {
        // Phase 3: Smooth Transition into Diagonal Left
        const local = (p - p2End) / (p3End - p2End)
        // Transition Z tilt from positive to negative
        groupRef.current.rotation.set(0, horizontalRot * 2 + local * Math.PI * 2, diagonalTilt - local * (diagonalTilt * 2))
        groupRef.current.scale.set(1, 1, 1)
        groupRef.current.position.y = -1.2
      }
      else {
        // Final Phase: Horizontal + Extreme Scale + Focus on Globe
        const local = (p - p3End) / (finalPhase - p3End)
        const scaleAmount = 1 + local * 7 // Dramatic zoom
        groupRef.current.scale.set(scaleAmount, scaleAmount, scaleAmount)

        // Push the trophy DOWN aggressively so the globe (at the top) stays in frame
        // Previous -6 was not enough, using -16 to target the top globe precisely
        groupRef.current.position.y = -1.2 - (local * 16)

        // Subtle tilt recovery and continuous rotation
        const currentZTilt = -diagonalTilt * (1 - local)
        groupRef.current.rotation.set(0, horizontalRot * 3 + local * Math.PI * 2, currentZTilt)
      }
    }
  })

  useEffect(() => {
    if (!groupRef.current) return

    const ctx = gsap.context(() => {
      // Initial state setup
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

      // Phase 1: Reveal & Bloom (0 to 1.2) - 20% of the timeline
      tl.to(groupRef.current!.position, {
        z: 0,
        y: -1.2,
        duration: 1.2,
        ease: 'power2.inOut'
      }, 0)

      // Lighting Reveal (0 to 1.2)
      if (spotLightRef.current) {
        tl.to(spotLightRef.current, {
          intensity: 100,
          duration: 1.2,
          ease: 'power2.inOut'
        }, 0)
      }

      if (ambientLightRef.current) {
        tl.to(ambientLightRef.current, {
          intensity: 1,
          duration: 1.2
        }, 0)
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

export default function TrophyScene() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <Trophy />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Preload to avoid mounting delays
useGLTF.preload('/models/cup_world.glb')
