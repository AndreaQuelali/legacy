"use client"

import { useEffect } from "react"
import { useLenis } from "lenis/react"
import gsap from "@/lib/gsap/gsap"
import { ScrollTrigger } from "@/lib/gsap/gsap"

export function LenisScrollTriggerSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const scroller = document.documentElement

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    ScrollTrigger.defaults({ scroller })

    lenis.on("scroll", ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    return () => {
      lenis.off("scroll", ScrollTrigger.update)
      gsap.ticker.remove(tickerCallback)
      ScrollTrigger.scrollerProxy(scroller, {})
      ScrollTrigger.defaults({ scroller: undefined })
    }
  }, [lenis])

  return null
}
