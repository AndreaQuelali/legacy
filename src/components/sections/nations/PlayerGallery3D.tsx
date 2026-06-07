"use client"

import * as THREE from "three"
import { useEffect, useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from "@react-three/drei"
import { easing } from "maath"
import gsap from "gsap"

const GOLDEN_RATIO = 1.61803398875

interface PlayerData {
  id: string
  name: string
  player: string
  motto: string
  folder: string
  code: string
}

const PLAYERS: PlayerData[] = [
  { id: "01", name: "ARGENTINA", player: "LIONEL MESSI", motto: "PASIÓN. ORGULLO. GLORIA.", folder: "argentina", code: "ar" },
  { id: "02", name: "BRASIL", player: "NEYMAR JR", motto: "ALEGRÍA. HABILIDAD. DESTINO.", folder: "brazil", code: "br" },
  { id: "03", name: "FRANCIA", player: "KYLIAN MBAPPÉ", motto: "LIBERTAD. UNIDAD. GLORIA.", folder: "france", code: "fr" },
  { id: "04", name: "ALEMANIA", player: "JAMAL MUSIALA", motto: "PODER. PRECISIÓN. AMBICIÓN.", folder: "germany", code: "de" },
  { id: "05", name: "PORTUGAL", player: "C. RONALDO", motto: "CORAZÓN. HISTORIA. TRIUNFO.", folder: "portugal", code: "pt" },
]

export default function PlayerGallery3D({ onSelect }: { onSelect: (id: string | null) => void }) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (id: string | null) => {
    setSelected(id)
    onSelect(id)
  }

  return (
    <div className="w-full h-full">
      <Canvas 
        dpr={[1, 1.5]} 
        camera={{ fov: 70, position: [0, 2, 15] }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Remove opaque background to see the HTML background layers below */}
        <fog attach="fog" args={["#050505", 5, 20]} />
        
        <Environment preset="city" />
        
        <group position={[0, 0.5, 0]}>
          <Frames 
            items={PLAYERS} 
            selected={selected} 
            onSelect={handleSelect} 
          />
          
          {/* Reflective Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#101010"
              metalness={0.5}
              mirror={1}
            />
          </mesh>
        </group>
        
        <CameraRig selected={selected} />
      </Canvas>
    </div>
  )
}

function Frames({ items, selected, onSelect }: { items: PlayerData[], selected: string | null, onSelect: (id: string | null) => void }) {
  return (
    <group>
      {items.map((item, i) => {
          const count = items.length
          const angle = ((i / (count - 1)) - 0.5) * Math.PI * 0.7
          
          return (
            <Frame
              key={item.id}
              item={item}
              index={i}
              angle={angle}
              isSelected={selected === item.id}
              hasSelection={selected !== null}
              onSelect={() => onSelect(selected === item.id ? null : item.id)}
            />
          )
      })}
    </group>
  )
}

function Frame({ item, index, angle, isSelected, hasSelection, onSelect, ...props }: any) {
  const imageRef = useRef<any>(null)
  const bgRef = useRef<any>(null)
  const borderRef = useRef<any>(null)
  const groupRef = useRef<THREE.Group>(null)
  
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  useFrame((state, dt) => {
    if (!imageRef.current || !bgRef.current || !borderRef.current || !groupRef.current) return
    
    // Position interpolation (Depth pushback)
    const baseRadius = 7
    const pushbackRadius = 5.5
    const targetRadius = (hasSelection && !isSelected) ? pushbackRadius : baseRadius
    
    // We dampen a custom property or just manually calculate target position
    // To make it simple, we can just dampen the absolute world position
    const targetX = Math.sin(angle) * targetRadius
    const targetZ = Math.cos(angle) * targetRadius - baseRadius // kept baseRadius here so the center doesn't shift
    
    easing.damp3(groupRef.current.position, [targetX, 1, targetZ], 0.3, dt)
    groupRef.current.rotation.set(0, -angle, 0)
    
    const targetZoom = isSelected ? 1 : (hovered ? 1.1 : 1)
    
    let targetOpacity = 0.7
    if (isSelected) targetOpacity = 1
    else if (hasSelection) targetOpacity = 0.35 // Semi-transparent instead of completely hidden
    else targetOpacity = hovered ? 0.9 : 0.7

    easing.damp(imageRef.current.material, "zoom", targetZoom, 0.2, dt)
    easing.damp(imageRef.current.material, "opacity", targetOpacity, 0.2, dt)
    easing.damp(bgRef.current, "opacity", targetOpacity * 0.5, 0.2, dt)
    easing.damp(borderRef.current, "opacity", targetOpacity, 0.2, dt)
    
    groupRef.current.visible = true
  })

  return (
    <group ref={groupRef} {...props}>
      <mesh
        name={item.id}
        userData={{ index }} // Pass index to UserData for CameraRig
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
      >
        <planeGeometry args={[3, 3 * GOLDEN_RATIO]} />
        <meshBasicMaterial ref={bgRef} color="#000" transparent opacity={0.5} />
        
        <Image
          ref={imageRef}
          url={`/images/nations/${item.folder}/player.png`}
          transparent
          side={THREE.DoubleSide}
          scale={[2.8, 2.8 * GOLDEN_RATIO]}
          position={[0, 0, 0.01]}
        />
        
        {/* Frame Border */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[3.1, 3.1 * GOLDEN_RATIO]} />
          <meshBasicMaterial ref={borderRef} transparent color={isSelected ? "#eab308" : (hovered ? "#ffffff" : "#333333")} />
        </mesh>
      </mesh>
      
      {/* Label - Only show when nothing is selected */}
      {!hasSelection && (
          <Text
            maxWidth={3}
            anchorX="center"
            anchorY="top"
            position={[0, -2.6, 0]}
            fontSize={0.25}
            font="/fonts/BebasNeue-Regular.ttf"
            color="white"
            opacity={0.8}
          >
            {item.name}
          </Text>
      )}
    </group>
  )
}

function CameraRig({ selected }: { selected: string | null }) {
  const { scene } = useThree()
  const lookAtRef = useRef(new THREE.Vector3(0, 2, 0))
  
  useFrame((state, dt) => {
    if (selected) {
      const targetFrame = scene.getObjectByName(selected)
      if (targetFrame) {
        const index = targetFrame.userData.index
        const isRightSide = index > 2
        
        const pos = new THREE.Vector3()
        targetFrame.getWorldPosition(pos)
        const quat = new THREE.Quaternion()
        targetFrame.getWorldQuaternion(quat)
        
        // Si está a la derecha del arco (3, 4), movemos la cámara a la derecha (+X)
        // para que el jugador quede a la izquierda de la pantalla.
        // Si está a la izquierda o centro (0, 1, 2), movemos a la izquierda (-X).
        const offsetX = isRightSide ? 3.2 : -3.2
        
        const cameraOffset = new THREE.Vector3(offsetX, 0, 5.5)
        const cameraPos = cameraOffset.clone().applyQuaternion(quat).add(pos)
        
        const lookAtOffset = new THREE.Vector3(offsetX, 0, 0)
        const targetLookAt = lookAtOffset.clone().applyQuaternion(quat).add(pos)
        
        easing.damp3(state.camera.position, cameraPos, 0.4, dt)
        easing.damp3(lookAtRef.current, targetLookAt, 0.4, dt)
        state.camera.lookAt(lookAtRef.current)
      }
    } else {
      easing.damp3(state.camera.position, [0, 2, 15], 0.4, dt)
      easing.damp3(lookAtRef.current, [0, 2, 0], 0.4, dt)
      state.camera.lookAt(lookAtRef.current)
    }
  })
  
  return null
}

