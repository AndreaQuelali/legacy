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
      const revealEnd = 0.15
      const p1End = 0.35
      const p2End = 0.55
      const p3End = 0.75
      const globePhaseStart = 0.8
      const messagePhaseEnd = 0.95
      const finalPhase = 1.0

      // Continuous rotation values
      const horizontalRot = Math.PI * 2
      const diagonalTilt = Math.PI * 0.15 

      if (p <= revealEnd) {
        groupRef.current.rotation.set(0, 0, 0)
        groupRef.current.scale.set(1, 1, 1)
        groupRef.current.position.y = -1.2
      }
      else if (p <= p1End) {
        const local = (p - revealEnd) / (p1End - revealEnd)
        groupRef.current.rotation.set(0, local * Math.PI * 2, 0)
      }
      else if (p <= p2End) {
        const local = (p - p1End) / (p2End - p1End)
        groupRef.current.rotation.set(0, horizontalRot + local * Math.PI * 2, local * diagonalTilt)
      }
      else if (p <= p3End) {
        const local = (p - p2End) / (p3End - p2End)
        groupRef.current.rotation.set(0, horizontalRot * 2 + local * Math.PI * 2, diagonalTilt - local * (diagonalTilt * 2))
      }
      else if (p <= globePhaseStart) {
         // Transitioning to Globe
         const local = (p - p3End) / (globePhaseStart - p3End)
         const scaleAmount = 1 + local * 7
         groupRef.current.scale.set(scaleAmount, scaleAmount, scaleAmount)
         groupRef.current.position.y = -1.2 - (local * 16)
         groupRef.current.rotation.set(0, horizontalRot * 3 + local * Math.PI * 2, -diagonalTilt * (1 - local))
      }
      else if (p <= messagePhaseEnd) {
        // HOLD GLOBE - STOP ANIMATION FOR TEXT
        const scaleAmount = 8
        groupRef.current.scale.set(scaleAmount, scaleAmount, scaleAmount)
        groupRef.current.position.y = -17.2
        groupRef.current.rotation.set(0, horizontalRot * 4, 0)
      }
      else {
        // TRANSITION TO NATIONS SECTION (Move trophy away or fade)
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
