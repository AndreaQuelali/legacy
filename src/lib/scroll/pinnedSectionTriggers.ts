import { ScrollTrigger } from '@/lib/gsap/gsap'

/** Scroll position just after a pinned section ends (or a viewport fallback before pins exist). */
export function getAfterPinStart(pinId: string, offset = 10, fallback = 'top 85%') {
  return () => {
    const pin = ScrollTrigger.getById(pinId)
    if (!pin) return fallback
    return pin.end + offset
  }
}

export function afterStadiumPinStart(offset = 10, fallback = 'top 85%') {
  return getAfterPinStart('stadium-pin', offset, fallback)
}
