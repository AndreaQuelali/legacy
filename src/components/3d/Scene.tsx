"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, PerspectiveCamera, Environment } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function TrophyPlaceholder() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#eab308" 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#eab308"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
        
        <TrophyPlaceholder />
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
