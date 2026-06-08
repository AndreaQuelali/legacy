"use client"

import { useState, useRef, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import PlayerGallery3D, { type GalleryItem } from './PlayerGallery3D'
import NationInfoOverlay from './NationInfoOverlay'
import { NATIONS, getNationFolder, orderNationsByConfig, type NationData } from '@/data/nations'

export default function NationsSection() {
  const t = useTranslations('nations')
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [overlaySide, setOverlaySide] = useState<'left' | 'right'>('left')

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
    const prev = nations[selectedIndex - 1]
    setSelectedId(prev.id)
    setOverlaySide(selectedIndex - 1 < nations.length / 2 ? 'left' : 'right')
  }
  const handleNext = () => {
    if (selectedIndex >= nations.length - 1) return
    const next = nations[selectedIndex + 1]
    setSelectedId(next.id)
    setOverlaySide(selectedIndex + 1 < nations.length / 2 ? 'left' : 'right')
  }

  return (
    <section
      id="nations"
      ref={sectionRef}
      className="relative h-screen w-full bg-[#050505] overflow-hidden"
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

      {/* 3. 3D GALLERY CANVAS */}
      <div
        className={`absolute inset-0 z-[10] flex items-center justify-center transition-all duration-700 ${
          selectedId
            ? overlaySide === "left"
              ? "md:left-[60%] md:w-[40%]"
              : "md:left-0 md:w-[40%]"
            : ""
        }`}
      >
        <PlayerGallery3D
          items={galleryItems}
          selectedId={selectedId}
          onSelect={(id, side) => {
            setSelectedId(id)
            setOverlaySide(side)
          }}
        />
      </div>

      {/* 4. HTML DETAILS OVERLAY (desktop) */}
      <div className="hidden md:block">
        <NationInfoOverlay
          nation={selectedNation}
          side={overlaySide}
          onClose={() => setSelectedId(null)}
        />
      </div>

      {/* 5. MOBILE DETAILS SHEET */}
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
              <span className="font-inter text-[10px] font-bold tracking-[0.4em] text-white/50 uppercase">{t('subtitle')}</span>
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

      {/* 6. SECTION HEADER */}
      {!selectedId && (
        <div className="absolute top-14 md:top-16 inset-x-0 z-20 text-center pointer-events-none px-4 opacity-80">
          <div className="flex items-center justify-center gap-4 mb-1.5">
            <div className="h-px w-8 bg-primary/40" />
            <span className="font-bebas text-xs tracking-[0.4em] text-white/40 uppercase">{t('subtitle')}</span>
            <div className="h-px w-8 bg-primary/40" />
          </div>
          <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white tracking-widest drop-shadow-lg leading-none">
            {t('title')}
          </h2>
          <p className="font-inter text-xs text-white/25 mt-1 tracking-widest hidden sm:block">
            {t('select_hint')}
          </p>
        </div>
      )}

      {/* 7. BOTTOM INDICATOR */}
      {!selectedId && (
        <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 z-20 pointer-events-none opacity-30">
          <span className="font-inter text-[8px] font-bold tracking-[0.5em] text-white/40 uppercase">{t('explore_glory')}</span>
          <div className="h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      )}
    </section>
  )
}
