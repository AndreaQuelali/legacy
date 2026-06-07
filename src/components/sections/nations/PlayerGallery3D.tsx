import * as THREE from "three"
import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from "@react-three/drei"
import { easing } from "maath"

const GOLDEN_RATIO = 1.61803398875

interface PlayerData {
  id: string
  name: string
  player: string
  folder: string
}

const PLAYERS: PlayerData[] = [
  { id: "01", name: "ARGENTINA", player: "LIONEL MESSI", folder: "argentina" },
  { id: "02", name: "BRASIL", player: "NEYMAR JR", folder: "brazil" },
  { id: "03", name: "FRANCIA", player: "KYLIAN MBAPPÉ", folder: "france" },
  { id: "04", name: "ALEMANIA", player: "JAMAL MUSIALA", folder: "germany" },
  { id: "05", name: "PORTUGAL", player: "C. RONALDO", folder: "portugal" },
  { id: "06", name: "ESPAÑA", player: "PEDRI", folder: "spain" },
]

function getSide(index: number, total: number): 'left' | 'right' {
  return index < total / 2 ? 'left' : 'right'
}

export default function PlayerGallery3D({ onSelect }: { onSelect: (id: string | null, side: 'left' | 'right') => void }) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (id: string | null) => {
    setSelected(id)
    if (id) {
      const idx = PLAYERS.findIndex(p => p.id === id)
      onSelect(id, getSide(idx, PLAYERS.length))
    } else {
      onSelect(null, 'left')
    }
  }

  const selectedIndex = selected ? PLAYERS.findIndex(p => p.id === selected) : -1

  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 60, position: [0, 3, 22] }}
        gl={{ alpha: true, antialias: true }}
      >
        <fog attach="fog" args={["#050505", 6, 28]} />
        <Environment preset="city" />

        <group position={[0, -0.5, 0]}>
          <Frames
            items={PLAYERS}
            selected={selected}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
          />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6.6, 0]}>
            <planeGeometry args={[200, 200]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={30}
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

        <CameraRig selected={selected} selectedIndex={selectedIndex} />
      </Canvas>
    </div>
  )
}

function Frames({ items, selected, selectedIndex, onSelect }: {
  items: PlayerData[]
  selected: string | null
  selectedIndex: number
  onSelect: (id: string | null) => void
}) {
  return (
    <group>
      {items.map((item, i) => {
        const isSelected = selected === item.id
        const isAdjacent = selectedIndex >= 0 && Math.abs(i - selectedIndex) === 1
        const hasSelection = selected !== null

        return (
          <Frame
            key={item.id}
            item={item}
            index={i}
            selectedIndex={selectedIndex}
            isSelected={isSelected}
            isAdjacent={isAdjacent}
            hasSelection={hasSelection}
            onSelect={() => onSelect(isSelected ? null : item.id)}
          />
        )
      })}
    </group>
  )
}

function Frame({ item, index, selectedIndex, isSelected, isAdjacent, hasSelection, onSelect }: {
  item: PlayerData
  index: number
  selectedIndex: number
  isSelected: boolean
  isAdjacent: boolean
  hasSelection: boolean
  onSelect: () => void
}) {
  const imageRef = useRef<THREE.Mesh>(null)
  const bgRef = useRef<THREE.MeshBasicMaterial>(null)
  const borderRef = useRef<THREE.MeshBasicMaterial>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  const side = useMemo(() => getSide(selectedIndex, 6), [selectedIndex])

  useFrame((_, dt) => {
    if (!imageRef.current || !bgRef.current || !borderRef.current || !groupRef.current) return

    let targetX = 0
    let targetZ = 0
    let targetRotationY = 0

    if (!hasSelection) {
      // Circular Gallery View (Initial State) - Larger radius for larger frames
      const arcAngle = ((index / (6 - 1)) - 0.5) * Math.PI * 0.8
      const radius = 11
      targetX = Math.sin(arcAngle) * radius
      targetZ = Math.cos(arcAngle) * radius - radius
      targetRotationY = -arcAngle
    } else {
      // Carousel View (Selected State)
      const diff = index - selectedIndex

      // Dynamic shift: Left side players (0,1,2) go to RIGHT (3.5), Right side players (3,4,5) go to LEFT (-3.5)
      const offsetDirection = side === 'left' ? 3.5 : -3.5

      if (isSelected) {
        targetX = offsetDirection
        targetZ = 0
        targetRotationY = 0
      } else if (isAdjacent) {
        // Peeking behind from left or right - Adjusted offset for larger size
        targetX = offsetDirection + (diff * 3.8)
        targetZ = -2.5
        targetRotationY = diff * -0.2
      } else {
        // Far away frames
        targetX = offsetDirection + (diff * 8)
        targetZ = -10
        targetRotationY = 0
      }
    }

    easing.damp3(groupRef.current.position, [targetX, 1, targetZ], 0.35, dt)
    easing.damp(groupRef.current.rotation, "y", targetRotationY, 0.35, dt)

    let targetOpacity = 0.75
    if (isSelected) targetOpacity = 1
    else if (hasSelection && isAdjacent) targetOpacity = 0.45
    else if (hasSelection) targetOpacity = 0
    else targetOpacity = hovered ? 1 : 0.75

    const targetZoom = isSelected ? 1 : hovered ? 1.08 : 1

    // Update material properties directly on refs
    const mat = imageRef.current.material as THREE.Material // Image material is special, we cast to any for dampen
    easing.damp(mat, "zoom", targetZoom, 0.2, dt)
    easing.damp(mat, "opacity", targetOpacity, 0.25, dt)
    easing.damp(bgRef.current, "opacity", targetOpacity * 0.45, 0.25, dt)
    easing.damp(borderRef.current, "opacity", targetOpacity, 0.25, dt)

    groupRef.current.visible = targetOpacity > 0.01
  })

  return (
    <group ref={groupRef}>
      <mesh
        name={item.id}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onClick={(e) => {
          e.stopPropagation()
          if (hasSelection && !isSelected && !isAdjacent) return
          onSelect()
        }}
      >
        <planeGeometry args={[9, 9 * GOLDEN_RATIO]} />
        <meshBasicMaterial ref={bgRef} color="#000" transparent opacity={0.5} />

        {/* Brand/Flag Background inside the frame */}
        <Image alt=""
          url={`/images/nations/${item.folder}/flag.png`}
          transparent
          scale={[9, 9 * GOLDEN_RATIO]}
          position={[0, 0, 0.005]}
          opacity={0.3}
        />

        <Image alt=""
          ref={imageRef}
          url={`/images/nations/${item.folder}/player.png`}
          transparent
          scale={[9, 9 * GOLDEN_RATIO]}
          position={[0, 0, 0.01]}
        />

        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[9.3, 9.3 * GOLDEN_RATIO]} />
          <meshBasicMaterial
            ref={borderRef}
            transparent
            color={isSelected ? "#eab308" : hovered ? "#ffffff" : "#282828"}
          />
        </mesh>
      </mesh>

      {!hasSelection && (
        <Text
          maxWidth={8}
          anchorX="center"
          anchorY="top"
          position={[0, -7.6, 0]}
          fontSize={0.6}
          font="/fonts/BebasNeue-Regular.ttf"
          color="white"
          fillOpacity={0.7}
        >
          {item.name}
        </Text>
      )}
    </group>
  )
}

function CameraRig({ selected, selectedIndex }: { selected: string | null, selectedIndex: number }) {
  const lookAtRef = useRef(new THREE.Vector3(0, 2, 0))

  useFrame((state, dt) => {
    if (selected) {
      const side = getSide(selectedIndex, 6)
      // To keep the selected frame perfectly straight ("de frente recto"), 
      // we offset the camera position as well, avoiding perspective rotation.
      const lookX = side === 'left' ? -0.8 : 0.8
      
      easing.damp3(state.camera.position, [lookX, 2.5, 16], 0.4, dt)
      easing.damp3(lookAtRef.current, [lookX, 2, 0], 0.4, dt)
      state.camera.lookAt(lookAtRef.current)
    } else {
      easing.damp3(state.camera.position, [0, 3, 22], 0.4, dt)
      easing.damp3(lookAtRef.current, [0, 2, 0], 0.4, dt)
      state.camera.lookAt(lookAtRef.current)
    }
  })

  return null
}
