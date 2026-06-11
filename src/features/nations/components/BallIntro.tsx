"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import {
  BALL_RADIUS,
  CARD_X_POSITIONS,
  FLOOR_Y,
  FLOOR_Z,
  BALL_PEAK_MAX,
  ROLL_ENTRY_X,
  ROLL_EXIT_X,
  TARGET_BALL_DIAMETER,
  TOTAL_CARDS,
  cardZAtIndex,
} from "../hooks/galleryConstants"

export { CARD_X_POSITIONS }

// ─── Easing helpers ───────────────────────────────────────────────────────────

type EaseFn = (t: number) => number

const easePower2Out: EaseFn = (t) => 1 - (1 - t) * (1 - t)
const easePower2In: EaseFn = (t) => t * t
const easePower3InOut: EaseFn = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
const easePower4In: EaseFn = (t) => t * t * t * t
const easeSineInOut: EaseFn = (t) => -(Math.cos(Math.PI * t) - 1) / 2

// ─── Timeline segment types ─────────────────────────────────────────────────

type SpinMode = "roll" | "tumble" | "fastY"

interface RollSegment {
  kind: "roll"
  fromX: number
  toX: number
  duration: number
  y: number
  z: number
  ease: EaseFn
}

interface BounceSegment {
  kind: "bounce"
  fromX: number
  toX: number
  fromY: number
  toY: number
  peakY: number
  duration: number
  zBase: number
  zSurge: number
  easeX: EaseFn
  easeUp: EaseFn
  easeDown: EaseFn
  spinMode: SpinMode
  spinSpeed: number
  cardIndex: number
  cardTriggerStart: number
  cardTriggerEnd: number
}

type IntroSegment = RollSegment | BounceSegment

function buildTimeline(): IntroSegment[] {
  const bounces: Omit<
    BounceSegment,
    "kind" | "fromX" | "toX" | "fromY" | "toY"
  >[] = [
    // España — hop bajo desde el piso
    {
      peakY: Math.min(3.5, BALL_PEAK_MAX),
      duration: 0.55,
      zBase: FLOOR_Z + 0.4,
      zSurge: 0.9,
      easeX: easePower2Out,
      easeUp: easePower2Out,
      easeDown: easePower2In,
      spinMode: "fastY",
      spinSpeed: 4.5,
      cardIndex: 0,
      cardTriggerStart: 0.55,
      cardTriggerEnd: 0.92,
    },
    // Francia — arco alto y lento
    {
      peakY: Math.min(10.5, BALL_PEAK_MAX),
      duration: 1.05,
      zBase: FLOOR_Z + 0.8,
      zSurge: 1.9,
      easeX: easeSineInOut,
      easeUp: easePower2Out,
      easeDown: easePower2Out,
      spinMode: "tumble",
      spinSpeed: 2.8,
      cardIndex: 1,
      cardTriggerStart: 0.48,
      cardTriggerEnd: 0.88,
    },
    // Argentina — rebote rápido y bajo
    {
      peakY: Math.min(4.2, BALL_PEAK_MAX),
      duration: 0.42,
      zBase: FLOOR_Z + 0.3,
      zSurge: 0.55,
      easeX: easePower4In,
      easeUp: easePower2Out,
      easeDown: easePower4In,
      spinMode: "fastY",
      spinSpeed: 3.5,
      cardIndex: 2,
      cardTriggerStart: 0.6,
      cardTriggerEnd: 0.9,
    },
    // Portugal — arco medio con hang
    {
      peakY: Math.min(7.8, BALL_PEAK_MAX),
      duration: 0.88,
      zBase: FLOOR_Z + 0.6,
      zSurge: 1.3,
      easeX: easePower3InOut,
      easeUp: easeSineInOut,
      easeDown: easePower2Out,
      spinMode: "tumble",
      spinSpeed: 2.2,
      cardIndex: 3,
      cardTriggerStart: 0.52,
      cardTriggerEnd: 0.9,
    },
    // Brasil — clímax, el más alto
    {
      peakY: Math.min(11.5, BALL_PEAK_MAX),
      duration: 1.12,
      zBase: FLOOR_Z + 1.0,
      zSurge: 2.2,
      easeX: easeSineInOut,
      easeUp: easePower2Out,
      easeDown: easeSineInOut,
      spinMode: "tumble",
      spinSpeed: 3.2,
      cardIndex: 4,
      cardTriggerStart: 0.5,
      cardTriggerEnd: 0.86,
    },
    // Alemania — caída rápida al piso
    {
      peakY: Math.min(5.5, BALL_PEAK_MAX),
      duration: 0.48,
      zBase: FLOOR_Z + 0.35,
      zSurge: 0.7,
      easeX: easePower2In,
      easeUp: easePower2Out,
      easeDown: easePower4In,
      spinMode: "fastY",
      spinSpeed: 4.8,
      cardIndex: 5,
      cardTriggerStart: 0.58,
      cardTriggerEnd: 0.92,
    },
  ]

  const segments: IntroSegment[] = [
    {
      kind: "roll",
      fromX: ROLL_ENTRY_X,
      toX: CARD_X_POSITIONS[0],
      duration: 0.6,
      y: FLOOR_Y,
      z: FLOOR_Z,
      ease: easePower2Out,
    },
  ]

  for (let i = 0; i < TOTAL_CARDS - 1; i++) {
    const b = bounces[i]
    segments.push({
      kind: "bounce",
      fromX: CARD_X_POSITIONS[i],
      toX: CARD_X_POSITIONS[i + 1],
      fromY: FLOOR_Y,
      toY: FLOOR_Y,
      ...b,
    })
  }

  // Last card highlight — short bounce on spot before exit
  const last = bounces[5]
  segments.push({
    kind: "bounce",
    fromX: CARD_X_POSITIONS[5],
    toX: CARD_X_POSITIONS[5] + 4,
    fromY: FLOOR_Y,
    toY: FLOOR_Y,
    ...last,
  })

  segments.push({
    kind: "roll",
    fromX: CARD_X_POSITIONS[5] + 4,
    toX: ROLL_EXIT_X,
    duration: 0.8,
    y: FLOOR_Y,
    z: FLOOR_Z,
    ease: easePower2Out,
  })

  return segments
}

const TIMELINE = buildTimeline()
const TOTAL_DURATION = TIMELINE.reduce((sum, s) => sum + s.duration, 0)

function zAtX(x: number): number {
  if (x <= CARD_X_POSITIONS[0]) return cardZAtIndex(0)
  if (x >= CARD_X_POSITIONS[TOTAL_CARDS - 1]) return cardZAtIndex(TOTAL_CARDS - 1)
  for (let i = 0; i < TOTAL_CARDS - 1; i++) {
    if (x >= CARD_X_POSITIONS[i] && x <= CARD_X_POSITIONS[i + 1]) {
      const t =
        (x - CARD_X_POSITIONS[i]) /
        (CARD_X_POSITIONS[i + 1] - CARD_X_POSITIONS[i])
      return cardZAtIndex(i) * (1 - t) + cardZAtIndex(i + 1) * t
    }
  }
  return 0
}

function bounceHeight(
  segT: number,
  fromY: number,
  toY: number,
  peakY: number,
  easeUp: EaseFn,
  easeDown: EaseFn
): number {
  if (segT <= 0.5) {
    return fromY + (peakY - fromY) * easeUp(segT * 2)
  }
  return peakY + (toY - peakY) * easeDown((segT - 0.5) * 2)
}

function getSegmentState(t: number): {
  segment: IntroSegment
  segT: number
  index: number
} {
  let acc = 0
  for (let i = 0; i < TIMELINE.length; i++) {
    const seg = TIMELINE[i]
    if (t < acc + seg.duration) {
      return { segment: seg, segT: (t - acc) / seg.duration, index: i }
    }
    acc += seg.duration
  }
  const last = TIMELINE[TIMELINE.length - 1]
  return { segment: last, segT: 1, index: TIMELINE.length - 1 }
}

// ─── Model prep ─────────────────────────────────────────────────────────────

interface BallIntroProps {
  scrollProgress?: React.MutableRefObject<number>
  onCardEnter: (index: number) => void
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

export default function BallIntro({
  scrollProgress,
  onCardEnter,
  startDelay = 0,
}: BallIntroProps) {
  const { scene } = useGLTF("/models/balon_futbol_paises.glb")
  const ballModel = useMemo(() => prepareBallModel(scene), [scene])

  const groupRef = useRef<THREE.Group>(null)
  const lastCardIndex = useRef(-1)
  const prevX = useRef(0)

  useFrame((_, dt) => {
    if (!groupRef.current) return

    const t = (scrollProgress?.current || 0) * TOTAL_DURATION - startDelay

    if (t < 0) {
      groupRef.current.visible = false
      return
    }

    groupRef.current.visible = true

    // GSAP bounds constraints (keeps the ball at exact edge limits if scrolled slightly past)
    const clampedT = Math.min(Math.max(t, 0), TOTAL_DURATION)

    const { segment, segT } = getSegmentState(clampedT)
    let x: number
    let y: number
    let z: number

    if (segment.kind === "roll") {
      const eased = segment.ease(segT)
      x = segment.fromX + (segment.toX - segment.fromX) * eased
      y = segment.y
      z = segment.z

      const deltaX = x - prevX.current
      groupRef.current.rotation.x -= deltaX / BALL_RADIUS
      groupRef.current.rotation.y = 0
      groupRef.current.rotation.z = 0
    } else {
      const easedX = segment.easeX(segT)
      x = segment.fromX + (segment.toX - segment.fromX) * easedX
      y = bounceHeight(segT, segment.fromY, segment.toY, segment.peakY, segment.easeUp, segment.easeDown)

      z =
        segment.zBase +
        zAtX(x) * 0.2 +
        Math.sin(segT * Math.PI) * segment.zSurge

      const flight = Math.sin(segT * Math.PI)
      const spin = segment.spinSpeed * (0.6 + flight * 0.8)

      if (segment.spinMode === "roll") {
        const deltaX = x - prevX.current
        groupRef.current.rotation.x -= deltaX / BALL_RADIUS
      } else if (segment.spinMode === "fastY") {
        groupRef.current.rotation.y += dt * spin
        groupRef.current.rotation.x += dt * spin * 0.15
      } else {
        groupRef.current.rotation.y += dt * spin
        groupRef.current.rotation.z += dt * spin * 0.4
        groupRef.current.rotation.x += dt * spin * 0.08
      }

      if (
        segment.cardIndex !== lastCardIndex.current &&
        segT >= segment.cardTriggerStart &&
        segT <= segment.cardTriggerEnd
      ) {
        lastCardIndex.current = segment.cardIndex
        onCardEnter(segment.cardIndex)
      }
    }

    prevX.current = x
    groupRef.current.position.set(x, y, z)
    groupRef.current.scale.set(1, 1, 1)
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
