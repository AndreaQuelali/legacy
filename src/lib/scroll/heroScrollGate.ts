import { ScrollTrigger } from '@/lib/gsap/gsap'

/** Fired when the hero pinned scroll sequence (including cinematic marquee) completes */
export const HERO_CINEMATIC_COMPLETE_EVENT = 'legacy:hero-cinematic-complete'

export function dispatchHeroCinematicComplete() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(HERO_CINEMATIC_COMPLETE_EVENT))
  }
}

export function isHeroCinematicComplete(): boolean {
  if (typeof window === 'undefined') return false
  const st = ScrollTrigger.getById('hero-main-scroll')
  return !!st && st.progress >= 0.99
}
