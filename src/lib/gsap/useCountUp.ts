"use client"

import { useEffect, type RefObject } from 'react'
import gsap from '@/lib/gsap/gsap'

interface UseCountUpScrollOptions {
  trigger: 'scroll'
  duration?: number
  scrollStart?: string
}

interface UseCountUpManualOptions {
  trigger: 'manual'
  isActive: boolean
  duration?: number
}

type UseCountUpOptions = (UseCountUpScrollOptions | UseCountUpManualOptions) & {
  delay?: number
}

export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  value: string,
  options: UseCountUpOptions
) {
  const isActive = options.trigger === 'manual' ? options.isActive : true
  const duration = options.duration ?? (options.trigger === 'scroll' ? 2 : 1.5)
  const scrollStart = options.trigger === 'scroll' ? (options.scrollStart ?? 'top 90%') : undefined
  const delay = options.delay ?? 0

  useEffect(() => {
    if (!isActive) return

    const element = ref.current
    if (!element) return

    const applyStaticValue = () => {
      element.textContent = value
    }

    const targetValue = parseInt(value.replace(/[^0-9]/g, ''), 10)
    if (isNaN(targetValue)) {
      applyStaticValue()
      return
    }

    const proxy = { val: 0 }
    let ctx: gsap.Context | null = null

    try {
      ctx = gsap.context(() => {
        const tweenConfig: gsap.TweenVars = {
          val: targetValue,
          duration,
          ease: 'power2.out',
          delay,
          onUpdate: () => {
            element.textContent = Math.floor(proxy.val).toString()
          },
        }

        if (options.trigger === 'scroll') {
          tweenConfig.scrollTrigger = {
            trigger: element,
            start: scrollStart,
            once: true,
          }
        }

        gsap.to(proxy, tweenConfig)
      })
    } catch (error) {
      console.error('CountUp animation failed, using static fallback:', error)
      applyStaticValue()
      return
    }

    return () => ctx?.revert()
  }, [isActive, value, duration, delay, scrollStart, options.trigger, ref])
}
