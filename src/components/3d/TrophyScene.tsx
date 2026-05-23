"use client"

import React, { useEffect, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from '@/lib/gsap/gsap'

function Trophy() {
  const { scene } = useGLTF('/models/cup_world.glb')
  const groupRef = useRef<THREE.Group>(null)
  const spotLightRef = useRef<THREE.SpotLight>(null)
  const ambientLightRef = useRef<THREE.AmbientLight>(null)

  useEffect(() => {
    if (!groupRef.current) return

    // Initial state layout - barely visible in the back
    groupRef.current.position.set(0, -0.5, -4)
    groupRef.current.scale.set(1, 1, 1)
    groupRef.current.rotation.y = -Math.PI / 8 // Slight angle

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: '+=2500',
        scrub: 1.5, // Smooth scrubbing
      }
    })

    // Cinematic Move Forward
    tl.to(groupRef.current.position, {
      z: 0,
      y: -1.2,
      duration: 1,
      ease: 'power2.inOut'
    }, 0)

    tl.to(groupRef.current.scale, {
      x: 0.16,
      y: 0.16,
      z: 0.16,
      duration: 1,
      ease: 'power2.inOut'
    }, 0)

    // Rotate Trophy
    tl.to(groupRef.current.rotation, {
      y: Math.PI / 2, // Side profile
      duration: 1.5,
      ease: 'power1.inOut'
    }, 0)

    // Increase lighting dramatically
    if (spotLightRef.current) {
      tl.to(spotLightRef.current, {
        intensity: 50,
        duration: 1,
        ease: 'power2.inOut'
      }, 0)
    }

    if (ambientLightRef.current) {
      tl.to(ambientLightRef.current, {
        intensity: 0.8,
        duration: 1
      }, 0)
    }

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
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <primitive object={scene} />
      </Float>
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
