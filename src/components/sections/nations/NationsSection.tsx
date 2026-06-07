"use client"

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import PlayerGallery3D from './PlayerGallery3D'
import NationInfoOverlay from './NationInfoOverlay'

const NATION_FOLDERS: Record<string, string> = {
  "01": "argentina",
  "02": "brazil",
  "03": "france",
  "04": "germany",
  "05": "portugal",
  "06": "spain",
}

export default function NationsSection() {
  const t = useTranslations('nations')
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [overlaySide, setOverlaySide] = useState<'left' | 'right'>('left')

  const nations = t.raw('nations_list') as Array<{
    id: string
    name: string
    player: string
    motto: string
    desc: string
    founded: string
    titles: string
    stadium: string
  }>

  const selectedNation = nations.find(n => n.id === selectedId) || null
  const selectedIndex = nations.findIndex(n => n.id === selectedId)
  const folder = selectedId ? NATION_FOLDERS[selectedId] : null

  // Prev / next helpers (for mobile navigation buttons)
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
        {selectedId && folder && (
          <motion.div
            key={selectedId + '-bg'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {/* Stadium */}
            <div className="absolute inset-0">
              <Image src={`/images/nations/${folder}/bg.png`} alt="Background" fill className="object-cover opacity-40" priority />
              <div className="absolute inset-0 bg-black/55" />
            </div>
            {/* Flag */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <Image src={`/images/nations/${folder}/flag.png`} alt="Flag" fill className="object-cover scale-110" />
            </div>
            {/* Gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. ATMOSPHERIC GLOW */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,_rgba(234,179,8,0.025)_0%,_transparent_70%)] pointer-events-none" />

      {/* 3. 3D GALLERY CANVAS */}
      <div className="relative z-[10] h-full w-full">
        <PlayerGallery3D
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
            className="md:hidden absolute bottom-0 inset-x-0 z-[50] bg-black/90 backdrop-blur-xl border-t border-white/10 rounded-t-3xl px-6 py-8"
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

            {/* Close */}
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-5 right-6 text-white/40 hover:text-white transition-colors font-bebas text-sm tracking-widest"
            >
              ✕ CERRAR
            </button>

            {/* Content */}
            <div className="flex flex-col gap-3">
              <span className="font-inter text-[10px] font-bold tracking-[0.4em] text-white/50 uppercase">{t('subtitle')}</span>
              <h2 className="font-bebas text-5xl leading-none text-white">{selectedNation.player}</h2>
              <p className="font-bebas text-base tracking-wider text-white/60 italic">&ldquo;{selectedNation.motto}&rdquo;</p>
              <p className="font-inter text-sm text-white/40 leading-relaxed">{selectedNation.desc}</p>

              {/* Stats row */}
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

              {/* Prev / Next navigation */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePrev}
                  disabled={selectedIndex <= 0}
                  className="flex items-center gap-2 font-bebas text-sm tracking-widest text-white/40 hover:text-primary disabled:opacity-20 transition-colors"
                >
                  ← {selectedIndex > 0 ? nations[selectedIndex - 1].name : ''}
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedIndex >= nations.length - 1}
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
        <div className="absolute top-16 md:top-20 inset-x-0 z-20 text-center pointer-events-none px-4">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8 bg-primary/40" />
            <span className="font-bebas text-xs tracking-[0.4em] text-white/40 uppercase">{t('subtitle')}</span>
            <div className="h-px w-8 bg-primary/40" />
          </div>
          <h2 className="font-bebas text-3xl sm:text-5xl md:text-6xl text-white tracking-widest drop-shadow-lg">
            ESTRELLAS DEL MAÑANA
          </h2>
          <p className="font-inter text-xs text-white/25 mt-2 tracking-widest hidden sm:block">
            SELECCIONA UN JUGADOR PARA EXPLORAR
          </p>
        </div>
      )}

      {/* 7. BOTTOM INDICATOR */}
      {!selectedId && (
        <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 z-20 pointer-events-none opacity-30">
          <span className="font-inter text-[8px] font-bold tracking-[0.5em] text-white/40 uppercase">EXPLORA LA GLORIA</span>
          <div className="h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      )}
    </section>
  )
}


