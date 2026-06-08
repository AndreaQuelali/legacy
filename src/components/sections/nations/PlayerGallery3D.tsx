"use client"

import * as THREE from "three"
import { useRef, Suspense, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from "@react-three/drei"
import { easing } from "maath"
import CameraFlashes from "@/components/3d/CameraFlashes"
import BallIntro from "./BallIntro"

const GOLDEN_RATIO = 1.61803398875

// Idle gallery — linear row with gentle depth
const IDLE_FRAME_WIDTH = 8.2
const IDLE_FRAME_HEIGHT = IDLE_FRAME_WIDTH * GOLDEN_RATIO
const IDLE_OUTER_BORDER = 0.5
const IDLE_MAT_BORDER = 0.12
const IDLE_SPACING = 10.2   // center-to-center gap

// Selected detail view — compact carousel in 40% panel
const SEL_FRAME_WIDTH = 6.5
const SEL_FRAME_HEIGHT = SEL_FRAME_WIDTH * GOLDEN_RATIO
const SEL_OUTER_BORDER = 0.28
const SEL_MAT_BORDER = 0.1

/** Primary gold from globals.css (--color-primary) */
const PRIMARY_GOLD = "#e9c176"

// First card X minus entry offset — matches BallIntro segment 0 start
const CARD_X_PLACEHOLDER_X = -25.5 - 18

/** Visible placeholder while the ball GLB loads inside Suspense */
function BallIntroPlaceholder() {
  return (
    <mesh position={[CARD_X_PLACEHOLDER_X, 6, 3.5]}>
      <sphereGeometry args={[1, 20, 20]} />
      <meshStandardMaterial
        color={PRIMARY_GOLD}
        emissive={PRIMARY_GOLD}
        emissiveIntensity={0.35}
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  )
}

interface PlayerData {
  id: string
  name: string
  player: string
  folder: string
}

export type GalleryItem = PlayerData

interface PlayerGallery3DProps {
  items: GalleryItem[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  /** Index of the card the ball is currently hovering over, or null */
  ballHoveredIndex?: number | null
  /** Whether to show the intro ball animation */
  showBallIntro?: boolean
  onBallCardEnter?: (index: number) => void
  onBallComplete?: () => void
}

export default function PlayerGallery3D({
  items,
  selectedId,
  onSelect,
  ballHoveredIndex = null,
  showBallIntro = false,
  onBallCardEnter,
  onBallComplete,
}: PlayerGallery3DProps) {
  const selectedIndex = selectedId ? items.findIndex((p) => p.id === selectedId) : -1
  const isIdle = selectedId === null

  const handleSelect = (id: string | null) => {
    onSelect(id)
  }

  const frameHeight = isIdle ? IDLE_FRAME_HEIGHT : SEL_FRAME_HEIGHT

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas
        className="w-full h-full"
        dpr={[1, 1.5]}
        camera={{ fov: isIdle ? 58 : 48, position: isIdle ? [0, 1.0, 27] : [0, 1.2, 11] }}
        gl={{ alpha: true, antialias: true }}
      >
        {isIdle && <color attach="background" args={["#050505"]} />}
        <fog attach="fog" args={["#050505", isIdle ? 35 : 10, isIdle ? 70 : 35]} />
        <Environment preset="city" />
        <CameraFlashes active={isIdle && !showBallIntro} />

        <group position={[0, isIdle ? 1.55 : 0.5, 0]}>
          <Frames
            items={items}
            selectedId={selectedId}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
            ballHoveredIndex={ballHoveredIndex}
          />

          {isIdle && (
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -frameHeight / 2 - 0.1, 0]}>
              <planeGeometry args={[70, 70]} />
              <MeshReflectorMaterial
                blur={[700, 280]}
                resolution={1024}
                mixBlur={1}
                mixStrength={11}
                roughness={0.88}
                depthScale={0.35}
                minDepthThreshold={0.66}
                maxDepthThreshold={0.74}
                color="#060606"
                metalness={0.4}
                mirror={0.38}
              />
            </mesh>
          )}

          {/* Ball intro animation inside Suspense so useGLTF can suspend safely */}
          {showBallIntro && onBallCardEnter && onBallComplete && (
            <Suspense fallback={<BallIntroPlaceholder />}>
              <BallIntro
                key="ball-intro"
                onCardEnter={onBallCardEnter}
                onComplete={onBallComplete}
              />
            </Suspense>
          )}
        </group>

        <CameraRig selectedId={selectedId} />
      </Canvas>
    </div>
  )
}

function Frames({
  items,
  selectedId,
  selectedIndex,
  onSelect,
  ballHoveredIndex,
}: {
  items: PlayerData[]
  selectedId: string | null
  selectedIndex: number
  onSelect: (id: string | null) => void
  ballHoveredIndex?: number | null
}) {
  return (
    <group>
      {items.map((item, i) => {
        const isSelected = selectedId === item.id
        const isAdjacent = selectedIndex >= 0 && Math.abs(i - selectedIndex) === 1
        const hasSelection = selectedId !== null

        return (
          <Frame
            key={item.id}
            item={item}
            index={i}
            total={items.length}
            selectedIndex={selectedIndex}
            isSelected={isSelected}
            isAdjacent={isAdjacent}
            hasSelection={hasSelection}
            isBallHovered={ballHoveredIndex === i}
            onSelect={() => onSelect(isSelected ? null : item.id)}
          />
        )
      })}
    </group>
  )
}

function Frame({
  item,
  index,
  total,
  selectedIndex,
  isSelected,
  isAdjacent,
  hasSelection,
  isBallHovered,
  onSelect,
}: {
  item: PlayerData
  index: number
  total: number
  selectedIndex: number
  isSelected: boolean
  isAdjacent: boolean
  hasSelection: boolean
  isBallHovered: boolean
  onSelect: () => void
}) {
  const imageRef = useRef<THREE.Mesh>(null)
  const bgRef = useRef<THREE.MeshBasicMaterial>(null)
  const outerBorderRef = useRef<THREE.MeshBasicMaterial>(null)
  const matBorderRef = useRef<THREE.MeshBasicMaterial>(null)
  const groupRef = useRef<THREE.Group>(null)
  const scaleRef = useRef<THREE.Group>(null)
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  const goldColor = useRef(new THREE.Color(PRIMARY_GOLD))
  const blackColor = useRef(new THREE.Color("#0a0a0a"))

  // Treat ball-hover the same as pointer hover for visuals
  const isEffectivelyHovered = hovered || isBallHovered

  const frameW = hasSelection ? SEL_FRAME_WIDTH : IDLE_FRAME_WIDTH
  const frameH = hasSelection ? SEL_FRAME_HEIGHT : IDLE_FRAME_HEIGHT
  const outerBorder = hasSelection ? SEL_OUTER_BORDER : IDLE_OUTER_BORDER
  const matBorder = hasSelection ? SEL_MAT_BORDER : IDLE_MAT_BORDER

  useFrame((_, dt) => {
    if (
      !imageRef.current ||
      !bgRef.current ||
      !outerBorderRef.current ||
      !matBorderRef.current ||
      !groupRef.current ||
      !scaleRef.current
    )
      return

    let targetX = 0
    let targetZ = 0
    let targetRotationY = 0
    let targetScale = 1
    const targetY = hasSelection ? 0.5 : 0

    if (!hasSelection) {
      // Linear layout: equal spacing, gentle Z-depth curve, mild inward rotation
      const normalizedPos = index / (total - 1) - 0.5   // -0.5 to +0.5
      const absNorm = Math.abs(normalizedPos) * 2         // 0 at center, 1 at edges
      targetX = normalizedPos * (total - 1) * IDLE_SPACING
      targetZ = -(absNorm * absNorm) * 2.5               // 0 at center, -2.5 at edges
      targetRotationY = -normalizedPos * 0.38             // max ±0.19 rad ≈ ±11°

      targetScale = 1
    } else {
      const diff = index - selectedIndex

      if (isSelected) {
        targetX = 0
        targetZ = 0
        targetRotationY = 0
      } else if (isAdjacent) {
        targetX = diff * 2.2
        targetZ = -2
        targetRotationY = diff * -0.2
      } else {
        targetX = diff * 6
        targetZ = -10
        targetRotationY = 0
      }
      targetScale = 0.92
    }

    easing.damp3(groupRef.current.position, [targetX, targetY, targetZ], 0.35, dt)
    easing.damp(groupRef.current.rotation, "y", targetRotationY, 0.35, dt)
    easing.damp3(
      scaleRef.current.scale,
      [targetScale, targetScale, targetScale],
      0.35,
      dt
    )

    let targetOpacity = 1
    if (isSelected) targetOpacity = 1
    else if (hasSelection && isAdjacent) targetOpacity = 0.45
    else if (hasSelection) targetOpacity = 0
    else {
      const centerIndex = (total - 1) / 2
      const distFromCenter = Math.abs(index - centerIndex)
      targetOpacity = distFromCenter > 2.5 ? 0.55 : 1
    }

    const targetZoom = isSelected ? 1 : isEffectivelyHovered ? 1.05 : 1

    const mat = imageRef.current.material as THREE.Material
    easing.damp(mat, "zoom", targetZoom, 0.2, dt)
    easing.damp(mat, "opacity", targetOpacity, 0.25, dt)
    easing.damp(bgRef.current, "opacity", targetOpacity, 0.25, dt)
    easing.damp(outerBorderRef.current, "opacity", targetOpacity, 0.25, dt)
    easing.damp(matBorderRef.current, "opacity", targetOpacity, 0.25, dt)

    // Animate border: gold when selected OR ball-hovered, black otherwise
    outerBorderRef.current.color.lerp(
      isSelected || isBallHovered ? goldColor.current : blackColor.current,
      Math.min(dt * 5, 1)
    )

    groupRef.current.visible = targetOpacity > 0.01
  })

  const outerW = frameW + outerBorder * 2
  const outerH = frameH + outerBorder * 2
  const matW = frameW + matBorder * 2
  const matH = frameH + matBorder * 2

  return (
    <group ref={groupRef}>
      <group ref={scaleRef}>
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
          <mesh position={[0, 0, -0.025]}>
            <planeGeometry args={[outerW, outerH]} />
            <meshBasicMaterial ref={outerBorderRef} color="#0a0a0a" transparent />
          </mesh>

          <mesh position={[0, 0, -0.018]}>
            <planeGeometry args={[matW, matH]} />
            <meshBasicMaterial ref={matBorderRef} color="#f5f5f5" transparent />
          </mesh>

          <planeGeometry args={[frameW, frameH]} />
          <meshBasicMaterial ref={bgRef} color="#000" transparent opacity={1} />

          <Image
            url={`/images/nations/${item.folder}/flag.png`}
            transparent
            scale={[frameW, frameH]}
            position={[0, 0, 0.005]}
            opacity={0.35}
          />

          <Image
            ref={imageRef}
            url={`/images/nations/${item.folder}/player.png`}
            transparent
            scale={[frameW, frameH]}
            position={[0, 0, 0.01]}
          />

          {(isEffectivelyHovered || isBallHovered) && !isSelected && (
            <mesh position={[0, 0, 0.012]}>
              <planeGeometry args={[frameW, frameH]} />
              <meshBasicMaterial transparent color="#ffffff" opacity={0.08} />
            </mesh>
          )}
        </mesh>

        {!hasSelection && (
          <Text
            maxWidth={frameW + 2}
            anchorX="center"
            anchorY="bottom"
            position={[0, frameH / 2 + outerBorder + 0.25, 0.02]}
            fontSize={0.48}
            font="/fonts/BebasNeue-Regular.ttf"
            color="white"
            fillOpacity={0.65}
            letterSpacing={0.04}
          >
            {item.name.toUpperCase()}
          </Text>
        )}
      </group>
    </group>
  )
}

function CameraRig({ selectedId }: { selectedId: string | null }) {
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((state, dt) => {
    if (selectedId) {
      // Camera directly in front of selected frame (targetX=0, targetY=0.5)
      // Same X and Y as lookAt so the frame faces perfectly straight
      easing.damp3(state.camera.position, [0, 0.5, 11], 0.4, dt)
      easing.damp3(lookAtRef.current, [0, 0.5, 0], 0.4, dt)
    } else {
      easing.damp3(state.camera.position, [0, 1.0, 27], 0.4, dt)
      easing.damp3(lookAtRef.current, [0, 0.85, 0], 0.4, dt)
    }
    state.camera.lookAt(lookAtRef.current)
  })

  return null
}
