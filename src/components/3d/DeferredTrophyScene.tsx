"use client"

import dynamic from "next/dynamic"
import { useIdleReady } from "@/hooks/useIdleReady"

const TrophyScene = dynamic(() => import("./TrophyScene"), { ssr: false })

/**
 * Mounts the heavy three.js trophy scene only once the page has loaded and the
 * browser is idle, so it never competes with first paint or hydration.
 */
export default function DeferredTrophyScene() {
  const ready = useIdleReady()
  return ready ? <TrophyScene /> : null
}
