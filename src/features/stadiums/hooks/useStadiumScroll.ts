"use client"

import { useEffect, type RefObject } from 'react'
import gsap, { ScrollTrigger } from '@/lib/gsap/gsap'

export function useStadiumScroll(
  containerRef: RefObject<HTMLDivElement | null>,
  showBRef: RefObject<boolean>,
  triggerFlip: (nextShowB: boolean) => void
) {
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => (window.innerWidth < 768 ? '+=120%' : '+=200%'),
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const wantsB = self.progress > 0.5
          if (wantsB !== showBRef.current) {
            triggerFlip(wantsB)
          }
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, showBRef, triggerFlip])
}
