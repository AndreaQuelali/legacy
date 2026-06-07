"use client"

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import PlayerGallery3D from './PlayerGallery3D'
import NationInfoOverlay from './NationInfoOverlay'

export default function NationsSection() {
  const t = useTranslations('nations')
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

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

  const NATION_FOLDERS: Record<string, string> = {
    "01": "argentina",
    "02": "brazil",
    "03": "france",
    "04": "germany",
    "05": "portugal",
  }

  const folder = selectedId ? NATION_FOLDERS[selectedId] : null

  return (
    <section 
      id="nations" 
      ref={sectionRef} 
      className="relative h-screen w-full bg-[#050505] overflow-hidden"
    >
      {/* 1. DYNAMIC BACKGROUND LAYER (Shows only when a nation is selected) */}
      <AnimatePresence>
        {selectedId && folder && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            {/* Stadium Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={`/images/nations/${folder}/bg.png`}
                alt="Background"
                fill
                className="object-cover opacity-40"
                priority
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Flag Overlay */}
            <div className="absolute inset-0 z-1 opacity-20 pointer-events-none mix-blend-overlay">
              <Image
                src={`/images/nations/${folder}/flag.png`}
                alt="Flag"
                fill
                className="object-cover scale-110"
              />
            </div>
            
            {/* Dark vignette to focus on content */}
            <div className="absolute inset-0 z-2 bg-gradient-to-r from-black via-transparent to-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. ATMOSPHERIC GRADIENT (Always present) */}
      <div className="absolute inset-0 z-5 bg-[radial-gradient(circle_at_50%_50%,_rgba(234,179,8,0.02)_0%,_transparent_70%)] pointer-events-none" />

      {/* 3. 3D GALLERY CANVAS */}
      <div className="relative z-10 h-full w-full">
        <PlayerGallery3D onSelect={setSelectedId} />
      </div>

      {/* 4. DETAIL OVERLAY (Left or Right side info) */}
      <NationInfoOverlay 
        nation={selectedNation} 
        side={nations.findIndex(n => n.id === selectedId) > 2 ? 'right' : 'left'}
        onClose={() => setSelectedId(null)} 
      />

      {/* 5. SECTION HEADER (Hidden if something is selected to avoid clutter) */}
      {!selectedId && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-primary/40" />
            <span className="font-bebas text-sm tracking-[0.4em] text-white/40 uppercase">
              {t('subtitle')}
            </span>
            <div className="h-[1px] w-8 bg-primary/40" />
          </div>
          <h2 className="font-bebas text-4xl md:text-6xl text-white tracking-widest drop-shadow-lg">
             ESTRELLAS DEL MAÑANA
          </h2>
        </div>
      )}

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-40">
        <span className="font-inter text-[8px] font-bold tracking-[0.5em] text-white/40 uppercase">
          EXPLORA LA GLORIA
        </span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  )
}

