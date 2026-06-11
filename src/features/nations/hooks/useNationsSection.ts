"use client"

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react'
import { useLenis } from 'lenis/react'
import gsap, { ScrollTrigger } from '@/lib/gsap/gsap'
import {
  HERO_CINEMATIC_COMPLETE_EVENT,
  isHeroCinematicComplete,
} from '@/lib/scroll/heroScrollGate'
import type { NationData } from '../data/nations'

interface UseNationsSectionOptions {
  nations: NationData[]
}

export function useNationsSection({ nations }: UseNationsSectionOptions) {
  const lenis = useLenis()
  const sectionRef = useRef<HTMLElement>(null)
  const pinTriggerRef = useRef<ScrollTrigger | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [ballHoveredIndex, setBallHoveredIndex] = useState<number | null>(null)
  const [sectionInView, setSectionInView] = useState(false)
  const [heroCinematicDone, setHeroCinematicDone] = useState(false)
  const scrollProgress = useRef(0)

  useEffect(() => {
    const markHeroDone = () => setHeroCinematicDone(true)

    if (isHeroCinematicComplete()) {
      markHeroDone()
    }

    window.addEventListener(HERO_CINEMATIC_COMPLETE_EVENT, markHeroDone)
    return () => window.removeEventListener(HERO_CINEMATIC_COMPLETE_EVENT, markHeroDone)
  }, [])

  const showBallIntro = heroCinematicDone && sectionInView && !selectedId

  const handleBallCardEnter = useCallback((index: number) => {
    setBallHoveredIndex(index)
    setTimeout(() => setBallHoveredIndex(null), 600)
  }, [])

  useLayoutEffect(() => {
    if (!heroCinematicDone) return

    const ctx = gsap.context(() => {
      pinTriggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        id: 'nations-ball-pin',
        onUpdate: (self) => {
          scrollProgress.current = self.progress
        },
        onEnter: () => {
          setSectionInView(true)
        },
      })

      if (pinTriggerRef.current.isActive) {
        setSectionInView(true)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [heroCinematicDone])

  useEffect(() => {
    if (!lenis) return
    lenis.start()
    return () => {
      lenis.start()
    }
  }, [lenis])

  const selectedNation = nations.find((n) => n.id === selectedId) || null
  const selectedIndex = nations.findIndex((n) => n.id === selectedId)

  const handlePrev = () => {
    if (selectedIndex <= 0) return
    setSelectedId(nations[selectedIndex - 1].id)
  }

  const handleNext = () => {
    if (selectedIndex >= nations.length - 1) return
    setSelectedId(nations[selectedIndex + 1].id)
  }

  return {
    sectionRef,
    selectedId,
    setSelectedId,
    ballHoveredIndex,
    showBallIntro,
    heroCinematicDone,
    selectedNation,
    selectedIndex,
    scrollProgress,
    handleBallCardEnter,
    handlePrev,
    handleNext,
  }
}
