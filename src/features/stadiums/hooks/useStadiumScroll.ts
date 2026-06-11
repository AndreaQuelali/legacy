"use client"

import { useEffect, type RefObject } from 'react'
import gsap, { ScrollTrigger } from '@/lib/gsap/gsap'
import { useScrollSectionsReady } from '@/hooks/useScrollSectionsReady'
import { dispatchScrollSectionsReady } from '@/lib/scroll/scrollSectionsGate'

export function useStadiumScroll(
  containerRef: RefObject<HTMLDivElement | null>,
  showBRef: RefObject<boolean>,
  triggerFlip: (nextShowB: boolean) => void
) {
  const scrollSectionsReady = useScrollSectionsReady()

  useEffect(() => {
    if (!scrollSectionsReady || !containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => (window.innerWidth < 768 ? '+=120%' : '+=200%'),
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: 'stadium-pin',
        onUpdate: (self) => {
          const wantsB = self.progress > 0.5
          if (wantsB !== showBRef.current) {
            triggerFlip(wantsB)
          }
        },
      })

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        dispatchScrollSectionsReady()
      })
    }, containerRef)

    return () => ctx.revert()
  }, [scrollSectionsReady, containerRef, showBRef, triggerFlip])
}
