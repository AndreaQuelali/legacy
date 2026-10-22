"use client"
import { useEffect, useState } from "react"

const INTERACTION_EVENTS = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const

/**
 * Becomes true after the first user interaction,
 * once the page has loaded and the browser is idle. Used to keep heavy,
 * initially invisible work (three.js scenes) off the critical path.
 */
export function useIdleReady(delay = 0) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let idleId: number | undefined
    let timers: number[] = []
    let triggered = false

    const cleanupListeners = () => {
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, trigger))
    }

    function trigger() {
      if (triggered) return
      triggered = true
      cleanupListeners()
      timers.push(
        window.setTimeout(() => {
          if ("requestIdleCallback" in window) {
            idleId = window.requestIdleCallback(() => setReady(true), { timeout: 3000 })
          } else {
            setReady(true)
          }
        }, delay)
      )
    }

    INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, trigger, { passive: true }))

    return () => {
      cleanupListeners()
      timers.forEach((id) => window.clearTimeout(id))
      timers = []
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
    }
  }, [delay])

  return ready
}
