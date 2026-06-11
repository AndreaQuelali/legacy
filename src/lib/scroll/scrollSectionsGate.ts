/** Fired after Nations pin is mounted and ScrollTrigger layout is recalculated */
export const SCROLL_SECTIONS_READY_EVENT = 'legacy:scroll-sections-ready'

let scrollSectionsReady = false

export function dispatchScrollSectionsReady() {
  if (typeof window === 'undefined') return
  scrollSectionsReady = true
  window.dispatchEvent(new CustomEvent(SCROLL_SECTIONS_READY_EVENT))
}

export function isScrollSectionsReady(): boolean {
  return scrollSectionsReady
}
