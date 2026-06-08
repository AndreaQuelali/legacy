"use client"

import { useState, useRef, useMemo, useEffect, useCallback, useLayoutEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import gsap, { ScrollTrigger } from '@/lib/gsap/gsap'
import SplitTitle from '@/components/animations/SplitTitle'
import PlayerGallery3D, { type GalleryItem } from './components/PlayerGallery3D'
import NationInfoOverlay from './components/NationInfoOverlay'
import { NATIONS, getNationFolder, orderNationsByConfig, type NationData } from '@/data/nations'
import {
  HERO_CINEMATIC_COMPLETE_EVENT,
  isHeroCinematicComplete,
} from './hooks/heroScrollGate'

export default function NationsSection() {
  const t = useTranslations('nations')
  const lenis = useLenis()
  const sectionRef = useRef<HTMLElement>(null)
  const pinTriggerRef = useRef<ScrollTrigger | null>(null)
  const ballIntroCompleteRef = useRef(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [ballIntroComplete, setBallIntroComplete] = useState(false)
  const [ballHoveredIndex, setBallHoveredIndex] = useState<number | null>(null)
  const [sectionInView, setSectionInView] = useState(false)
  const [heroCinematicDone, setHeroCinematicDone] = useState(false)

  useEffect(() => {
    ballIntroCompleteRef.current = ballIntroComplete
  }, [ballIntroComplete])

  // Nations must wait until the hero marquee ("CADA NACIÓN LLEGA…") finishes
  useEffect(() => {
    const markHeroDone = () => setHeroCinematicDone(true)

    if (isHeroCinematicComplete()) {
      markHeroDone()
    }

    window.addEventListener(HERO_CINEMATIC_COMPLETE_EVENT, markHeroDone)
    return () => window.removeEventListener(HERO_CINEMATIC_COMPLETE_EVENT, markHeroDone)
  }, [])

  const showBallIntro =
    heroCinematicDone && sectionInView && !ballIntroComplete && !selectedId
  const shouldLockScroll = showBallIntro

  const handleBallCardEnter = useCallback((index: number) => {
    setBallHoveredIndex(index)
    setTimeout(() => setBallHoveredIndex(null), 600)
  }, [])

  const handleBallComplete = useCallback(() => {
    setBallHoveredIndex(null)
    setBallIntroComplete(true)
    pinTriggerRef.current?.kill()
    pinTriggerRef.current = null
    ScrollTrigger.refresh()
  }, [])

  // Pin section only after hero cinematic sequence completes
  useLayoutEffect(() => {
    if (ballIntroComplete || !heroCinematicDone) return

    const ctx = gsap.context(() => {
      pinTriggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        id: 'nations-ball-pin',
        onEnter: () => {
          if (!ballIntroCompleteRef.current) setSectionInView(true)
        },
      })

      if (pinTriggerRef.current.isActive) {
        setSectionInView(true)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [ballIntroComplete, heroCinematicDone])

  // Lock scroll while ball intro plays inside pinned section
  useEffect(() => {
    if (!lenis) return
    if (shouldLockScroll) {
      lenis.stop()
    } else {
      lenis.start()
    }
    return () => {
      lenis.start()
    }
  }, [lenis, shouldLockScroll])

  // Safety net: unlock if intro never completes (~11s animation + buffer)
  useEffect(() => {
    if (!showBallIntro) return

    const timeout = setTimeout(() => {
      handleBallComplete()
    }, 18000)

    return () => clearTimeout(timeout)
  }, [showBallIntro, handleBallComplete])

  const nationsRaw = t.raw('nations_list') as NationData[]
  const nations = useMemo(() => orderNationsByConfig(nationsRaw), [nationsRaw])

  const galleryItems = useMemo<GalleryItem[]>(() => {
    return NATIONS.map(({ id, folder }) => {
      const nation = nations.find((n) => n.id === id)
      return {
        id,
        folder,
        name: nation?.name ?? id,
        player: nation?.player ?? '',
      }
    })
  }, [nations])

  const selectedNation = nations.find(n => n.id === selectedId) || null
  const selectedIndex = nations.findIndex(n => n.id === selectedId)
  const folder = selectedId ? getNationFolder(selectedId) : null

  const handlePrev = () => {
    if (selectedIndex <= 0) return
    setSelectedId(nations[selectedIndex - 1].id)
  }
  const handleNext = () => {
    if (selectedIndex >= nations.length - 1) return
    setSelectedId(nations[selectedIndex + 1].id)
  }

  return (
    <section
      id="nations"
      ref={sectionRef}
      className={`relative h-[100dvh] w-full bg-[#050505] overflow-hidden ${
        heroCinematicDone ? '' : 'invisible pointer-events-none'
      }`}
    >
      {/* 1. DYNAMIC BACKGROUND LAYER */}
      <AnimatePresence>
        {selectedId && folder && selectedNation && (
          <motion.div
            key={selectedId + '-bg'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute inset-0">
              <Image
                src={`/images/nations/${folder}/bg.png`}
                alt={selectedNation.name}
                fill
                className="object-cover opacity-35"
                priority
              />
              <div className="absolute inset-0 bg-black/65" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. ATMOSPHERIC GLOW */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,_rgba(234,179,8,0.025)_0%,_transparent_70%)] pointer-events-none" />

      {/* 3. FRAME UNDER NAVBAR */}
      <div
        className="relative flex flex-col overflow-hidden h-full pt-[var(--nav-h,5rem)]"
      >
        {/* Header — only idle mode */}
        {!selectedId && (
          <div className="shrink-0 z-20 text-center pointer-events-none px-4 pt-6 md:pt-8 pb-2">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-px w-8 bg-primary/40" />
              <span className="hero-subtitle text-[10px] sm:text-[11px] tracking-[0.4em] text-primary">
                {t('subtitle')}
              </span>
              <div className="h-px w-8 bg-primary/40" />
            </div>

            <SplitTitle
              text={t('title')}
              className="section-title drop-shadow-lg"
            />

            <p className="font-inter text-[10px] sm:text-xs text-white/25 mt-2 sm:mt-3 tracking-[0.2em] hidden sm:block uppercase">
              {t('select_hint')}
            </p>
          </div>
        )}

        {/* 4. 3D GALLERY CANVAS */}
        <div
          className={`relative flex-1 min-h-0 z-[10] flex items-center justify-center transition-all duration-700 ${
            selectedId ? 'md:ml-auto md:w-[40%] md:flex-none' : 'w-full'
          }`}
        >
          <PlayerGallery3D
            items={galleryItems}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
            ballHoveredIndex={ballHoveredIndex}
            showBallIntro={showBallIntro}
            onBallCardEnter={handleBallCardEnter}
            onBallComplete={handleBallComplete}
          />
        </div>

        {/* 5. HTML DETAILS OVERLAY (desktop) */}
        <div className="hidden md:block">
          <NationInfoOverlay
            nation={selectedNation}
            onClose={() => setSelectedId(null)}
          />
        </div>

        {/* 6. MOBILE DETAILS SHEET */}
        <AnimatePresence>
          {selectedNation && (
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80 || info.velocity.y > 400) {
                  setSelectedId(null)
                }
              }}
              className="md:hidden absolute bottom-0 inset-x-0 z-[50] bg-black/90 backdrop-blur-xl border-t border-white/10 rounded-t-3xl px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] max-h-[55vh] overflow-y-auto"
            >
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

              <button
                onClick={() => setSelectedId(null)}
                aria-label={t('close')}
                className="absolute top-5 right-6 text-white/40 hover:text-white transition-colors font-bebas text-sm tracking-widest"
              >
                ✕ {t('close')}
              </button>

              <div className="flex flex-col gap-3">
                <span className="hero-subtitle text-[9px] font-bold tracking-[0.4em] text-primary uppercase">{t('subtitle')}</span>
                <h2 className="font-bebas text-5xl leading-none text-white">{selectedNation.name}</h2>
                <p className="font-bebas text-base tracking-wider text-white/60 italic">&ldquo;{selectedNation.motto}&rdquo;</p>
                <p className="font-inter text-sm text-white/40 leading-relaxed">{selectedNation.desc}</p>

                <div className="flex gap-6 mt-2 pt-4 border-t border-white/10">
                  <div>
                    <div className="font-inter text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase mb-1">{t('stat_founded')}</div>
                    <div className="font-bebas text-2xl text-white">{selectedNation.founded}</div>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <div className="font-inter text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase mb-1">{t('stat_titles')}</div>
                    <div className="font-bebas text-2xl text-white">{selectedNation.titles}</div>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <div className="font-inter text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase mb-1">{t('stat_stadium')}</div>
                    <div className="font-bebas text-lg text-white leading-tight">{selectedNation.stadium}</div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={handlePrev}
                    disabled={selectedIndex <= 0}
                    aria-label={t('prev_nation')}
                    className="flex items-center gap-2 font-bebas text-sm tracking-widest text-white/40 hover:text-primary disabled:opacity-20 transition-colors"
                  >
                    ← {selectedIndex > 0 ? nations[selectedIndex - 1].name : ''}
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={selectedIndex >= nations.length - 1}
                    aria-label={t('next_nation')}
                    className="flex items-center gap-2 font-bebas text-sm tracking-widest text-white/40 hover:text-primary disabled:opacity-20 transition-colors"
                  >
                    {selectedIndex < nations.length - 1 ? nations[selectedIndex + 1].name : ''} →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  )
}
