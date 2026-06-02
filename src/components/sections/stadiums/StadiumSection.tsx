"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import gsap, { ScrollTrigger, Flip } from '@/lib/gsap/gsap'
import { useTranslations } from 'next-intl'
import StadiumHeader from './StadiumHeader'
import StadiumCard from './StadiumCard'

const STADIUM_DATA = [
  { id: '1',  image: '/images/Azteca.jpg' },
  { id: '2',  image: '/images/SoFi.jpg' },
  { id: '3',  image: '/images/BC-Place.jpg' },
  { id: '4',  image: '/images/Metlife.jpg' },
  { id: '5',  image: '/images/Mercedes-Benz.jpg' },
  { id: '6',  image: '/images/Hard-Rock.jpeg' },
  { id: '7',  image: '/images/Lumen.jpg' },
  { id: '8',  image: "/images/Levi's.jpg" },
  { id: '9',  image: '/images/ATT.jpg' },
  { id: '10', image: '/images/NRG.jpeg' },
  { id: '11', image: '/images/Arrowhead.jpeg' },
  { id: '12', image: '/images/Gillette.jpeg' },
  { id: '13', image: '/images/Lincoln-Financial.jpg' },
  { id: '14', image: '/images/BMO.jpg' },
  { id: '15', image: '/images/BBVA.jpg' },
  { id: '16', image: '/images/Akron.jpg' },
]

// 8-column, 3-row Bento for each set.
// col-start enforces placement top-left → right, filling 8 cols × 3 rows.
// Layout A: 4×2 hero left, 2×2 right, 4 smalls bottom
// [0:4×2][1:2×1][2:2×1]
// [0:   ][3:2×2][4:2×1]
// [5:2×1][6:2×1][3:   ][7:2×1]

// Layout B: same pattern for the second 8 stadiums
// Hero changes to item 0 of the second group

const BENTO_CLASSES_A = [
  'md:col-span-4 md:row-span-2',  // 0 — Azteca (hero)
  'md:col-span-2 md:row-span-1',  // 1 — SoFi
  'md:col-span-2 md:row-span-1',  // 2 — BC Place
  'md:col-span-2 md:row-span-2',  // 3 — MetLife (tall)
  'md:col-span-2 md:row-span-1',  // 4 — Mercedes-Benz
  'md:col-span-2 md:row-span-1',  // 5 — Hard Rock
  'md:col-span-2 md:row-span-1',  // 6 — Lumen
  'md:col-span-2 md:row-span-1',  // 7 — Levi's
]

const BENTO_CLASSES_B = [
  'md:col-span-4 md:row-span-2',  // 0/8  — AT&T  (hero)
  'md:col-span-2 md:row-span-1',  // 1/9  — NRG
  'md:col-span-2 md:row-span-2',  // 2/10 — Arrowhead (tall)
  'md:col-span-2 md:row-span-1',  // 3/11 — Gillette
  'md:col-span-2 md:row-span-1',  // 4/12 — Lincoln Financial
  'md:col-span-2 md:row-span-1',  // 5/13 — BMO
  'md:col-span-2 md:row-span-1',  // 6/14 — BBVA
  'md:col-span-2 md:row-span-1',  // 7/15 — Akron
]

export default function StadiumSection() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const gridARef      = useRef<HTMLDivElement>(null)
  const gridBRef      = useRef<HTMLDivElement>(null)
  const [showB, setShowB] = useState(false)
  const isAnimating   = useRef(false)

  const t = useTranslations('stadiums')
  const stadiumList = t.raw('list') as Array<{ id: string; name: string; city: string; capacity: string }>

  const stadiums = STADIUM_DATA.map((item, i) => ({
    ...item,
    name:     stadiumList[i]?.name     || '',
    city:     stadiumList[i]?.city     || '',
    capacity: stadiumList[i]?.capacity || '',
  }))

  const setA = stadiums.slice(0, 8)
  const setB = stadiums.slice(8, 16)

  // ─── Flip Transition ────────────────────────────────────────────────────
  // The two grids (A and B) are absolute-stacked. When the flip triggers,
  // we snapshot positions of all cards across both grids, then cross-fade
  // the grids while GSAP Flip morphs each card to its new position.
  const triggerFlip = useCallback((nextShowB: boolean) => {
    if (isAnimating.current) return
    if (!gridARef.current || !gridBRef.current) return
    isAnimating.current = true

    const gridIn  = nextShowB ? gridBRef.current : gridARef.current
    const gridOut = nextShowB ? gridARef.current : gridBRef.current

    // Make incoming grid visible but transparent so GSAP Flip can read positions
    gsap.set(gridIn, { autoAlpha: 0, display: 'grid' })

    // Snapshot state of all card elements across BOTH grids
    const state = Flip.getState('[data-flip-id]')

    // Switch React state (re-render is instant, flip captures the diff)
    setShowB(nextShowB)

    gsap.delayedCall(0, () => {
      // Cross-fade the grids
      gsap.to(gridOut, { autoAlpha: 0, duration: 0.6, ease: 'power2.in' })
      gsap.to(gridIn,  { autoAlpha: 1, duration: 0.6, delay: 0.15, ease: 'power2.out' })

      // GSAP Flip morphs card positions
      Flip.from(state, {
        duration: 0.9,
        ease: 'power2.inOut',
        stagger: 0.03,
        absolute: false,
        onEnter: (els) =>
          gsap.fromTo(els,
            { autoAlpha: 0, scale: 0.88, y: 20 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }
          ),
        onLeave: (els) =>
          gsap.to(els,
            { autoAlpha: 0, scale: 0.88, y: -20, duration: 0.5, ease: 'power3.in' }
          ),
        onComplete: () => {
          gsap.set(gridOut, { display: 'none' })
          isAnimating.current = false
          // Force refresh so navbar and other sections sync correctly with pinning
          ScrollTrigger.refresh()
        },
      })
    })
  }, [])

  const showBRef = useRef(showB)
  useEffect(() => {
    showBRef.current = showB
  }, [showB])

  // ─── ScrollTrigger ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=160%',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const wantsB = (self as any).progress > 0.5
          if (wantsB !== showBRef.current) {
            triggerFlip(wantsB)
          }
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [triggerFlip])

  // ─── Shared grid class ──────────────────────────────────────────────────
  const gridClass = 'grid grid-cols-1 md:grid-cols-8 md:grid-rows-3 gap-4 md:gap-5 md:h-[680px] w-full'

  return (
    <section
      id="stadiums"
      ref={containerRef}
      className="relative bg-[#050505] min-h-screen flex flex-col justify-center py-16 lg:py-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[60%] rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[30%] h-[50%] rounded-full bg-primary/5 blur-[130px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full z-10">
        <StadiumHeader />

        {/* Grid container — relative so absolute grids can stack */}
        <div className="relative mt-8 min-h-[500px] md:h-[680px] w-full flex items-center justify-center">

          {/* ── GRID A (stadiums 1–8) ── */}
          <div ref={gridARef} className={gridClass}>
            {setA.map((s, i) => (
              <StadiumCard
                key={s.id}
                id={s.id}
                name={s.name}
                city={s.city}
                capacity={s.capacity}
                image={s.image}
                className={`stadium-card ${BENTO_CLASSES_A[i]} h-[180px] md:h-auto`}
              />
            ))}
          </div>

          {/* ── GRID B (stadiums 9–16) — hidden initially ── */}
          <div
            ref={gridBRef}
            className={`${gridClass} absolute inset-0 opacity-0 invisible`}
            style={{ display: 'none' }}
          >
            {setB.map((s, i) => (
              <StadiumCard
                key={s.id}
                id={s.id}
                name={s.name}
                city={s.city}
                capacity={s.capacity}
                image={s.image}
                className={`stadium-card ${BENTO_CLASSES_B[i]} h-[180px] md:h-auto`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        <div className={`rounded-full transition-all duration-500 ${!showB ? 'w-10 h-[3px] bg-primary' : 'w-3 h-[2px] bg-white/20'}`} />
        <div className={`rounded-full transition-all duration-500 ${showB  ? 'w-10 h-[3px] bg-primary' : 'w-3 h-[2px] bg-white/20'}`} />
      </div>
    </section>
  )
}
