"use client"

import { useState, useRef, useCallback, useEffect } from 'react'
import gsap, { Flip, ScrollTrigger } from '@/lib/gsap/gsap'

export function useStadiumFlip() {
  const gridARef = useRef<HTMLDivElement>(null)
  const gridBRef = useRef<HTMLDivElement>(null)
  const [showB, setShowB] = useState(false)
  const isAnimating = useRef(false)
  const showBRef = useRef(showB)

  useEffect(() => {
    showBRef.current = showB
  }, [showB])

  const triggerFlip = useCallback((nextShowB: boolean) => {
    if (isAnimating.current) return
    if (!gridARef.current || !gridBRef.current) return
    isAnimating.current = true

    const gridIn = nextShowB ? gridBRef.current : gridARef.current
    const gridOut = nextShowB ? gridARef.current : gridBRef.current

    gsap.set(gridIn, { autoAlpha: 0, display: 'grid' })

    const state = Flip.getState('[data-flip-id]')

    setShowB(nextShowB)

    gsap.delayedCall(0, () => {
      gsap.to(gridOut, { autoAlpha: 0, duration: 0.6, ease: 'power2.in' })
      gsap.to(gridIn, { autoAlpha: 1, duration: 0.6, delay: 0.15, ease: 'power2.out' })

      Flip.from(state, {
        duration: 0.9,
        ease: 'power2.inOut',
        stagger: 0.03,
        absolute: false,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { autoAlpha: 0, scale: 0.88, y: 20 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }
          ),
        onLeave: (els) =>
          gsap.to(els, { autoAlpha: 0, scale: 0.88, y: -20, duration: 0.5, ease: 'power3.in' }),
        onComplete: () => {
          gsap.set(gridOut, { display: 'none' })
          isAnimating.current = false
          setTimeout(() => ScrollTrigger.refresh(), 100)
        },
      })
    })
  }, [])

  return {
    gridARef,
    gridBRef,
    showB,
    showBRef,
    triggerFlip,
  }
}
