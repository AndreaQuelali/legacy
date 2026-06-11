import { ScrollTrigger } from '@/lib/gsap/gsap'

const NAV_SECTION_PINS = [
  { pinId: 'journey-pin', sectionId: 'journey' },
  { pinId: 'stadium-pin', sectionId: 'stadiums' },
  { pinId: 'nations-ball-pin', sectionId: 'nations' },
  { pinId: 'hero-main-scroll', sectionId: 'hero' },
] as const

export type NavSectionId = (typeof NAV_SECTION_PINS)[number]['sectionId']

/** Resolve the navbar active section from GSAP pin state (pinned sections break element-based triggers). */
export function resolveActiveNavSection(scrollY = 0): NavSectionId {
  if (scrollY <= 10) return 'hero'

  for (const { pinId, sectionId } of NAV_SECTION_PINS) {
    const pin = ScrollTrigger.getById(pinId)
    if (pin?.isActive) return sectionId
  }

  const stadiumPin = ScrollTrigger.getById('stadium-pin')
  const journeyPin = ScrollTrigger.getById('journey-pin')
  if (stadiumPin && journeyPin && scrollY >= stadiumPin.end && scrollY < journeyPin.start) {
    return 'stadiums'
  }

  const vh = window.innerHeight
  const sectionIds: NavSectionId[] = ['journey', 'stadiums', 'nations', 'hero']
  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue
    const { top, bottom } = el.getBoundingClientRect()
    if (top <= vh * 0.45 && bottom >= vh * 0.25) return id
  }

  return 'hero'
}
