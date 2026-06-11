"use client"

import { useEffect, useState } from 'react'
import {
  SCROLL_SECTIONS_READY_EVENT,
  isScrollSectionsReady,
} from '@/lib/scroll/scrollSectionsGate'

export function useScrollSectionsReady() {
  const [ready, setReady] = useState(() => isScrollSectionsReady())

  useEffect(() => {
    if (ready) return

    const markReady = () => setReady(true)
    window.addEventListener(SCROLL_SECTIONS_READY_EVENT, markReady)
    return () => window.removeEventListener(SCROLL_SECTIONS_READY_EVENT, markReady)
  }, [ready])

  return ready
}
