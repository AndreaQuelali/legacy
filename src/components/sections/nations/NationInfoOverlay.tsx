"use client"

import React from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import NationStats from './NationStats'

interface NationData {
  id: string
  name: string
  player: string
  motto: string
  desc: string
  founded: string
  titles: string
  stadium: string
}

const NATION_COLORS: Record<string, string> = {
  "01": "#dc2626",
  "02": "#3b82f6",
  "03": "#00bfff",
  "04": "#ef4444",
  "05": "#fbbf24",
  "06": "#f8fafc",
}

export default function NationInfoOverlay({ 
  nation, 
  side = 'left',
  onClose 
}: { 
  nation: NationData | null,
  side?: 'left' | 'right',
  onClose: () => void 
}) {
  const t = useTranslations('nations')

  const isRight = side === 'right'
  const initialX = isRight ? 50 : -50

  return (
    <AnimatePresence mode="wait">
      {nation && (
        <>
          <motion.button
            key={`back-${nation.id}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={onClose}
            aria-label={t('back_gallery')}
            className="fixed top-24 left-6 z-[60] inline-flex items-center gap-3 px-5 py-3 border border-primary/60 bg-black/70 backdrop-blur-md rounded-sm group hover:bg-primary/20 hover:border-primary transition-all duration-300 pointer-events-auto"
          >
            <span className="font-bebas text-lg text-primary leading-none group-hover:-translate-x-0.5 transition-transform">
              ←
            </span>
            <span className="font-bebas text-sm tracking-[0.2em] text-primary group-hover:text-white transition-colors">
              {t('back_gallery')}
            </span>
          </motion.button>

          <motion.div 
            key={`overlay-${nation.id}`}
            initial={{ opacity: 0, x: initialX }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: initialX }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`absolute inset-y-0 ${isRight ? 'right-0' : 'left-0'} w-full md:w-[60%] h-full z-[40] pointer-events-none flex items-center justify-center px-6 sm:px-14 md:px-16 overflow-y-auto`}
          >
            <div className="max-w-[500px] w-full pointer-events-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[2px] w-12" style={{ backgroundColor: NATION_COLORS[nation.id] || "#eab308" }} />
                <span className="font-inter text-[12px] font-bold tracking-[0.4em] text-white/60 uppercase">
                  {t('subtitle')}
                </span>
                <div className="h-[2px] w-12" style={{ backgroundColor: NATION_COLORS[nation.id] || "#eab308" }} />
              </div>

              <h1 className="font-bebas text-[60px] sm:text-[70px] md:text-[80px] lg:text-[100px] leading-[0.85] text-white mb-6 drop-shadow-2xl">
                {nation.name}
              </h1>

              <p className="font-bebas text-[18px] sm:text-[24px] tracking-[0.15em] text-white/70 mb-8 italic">
                &ldquo;{nation.motto}&rdquo;
              </p>

              <p className="font-inter text-[14px] sm:text-[16px] text-white/50 leading-relaxed max-w-[400px] mx-auto mb-12">
                {nation.desc}
              </p>

              <div className="flex justify-center">
                <NationStats 
                  founded={nation.founded} 
                  titles={nation.titles} 
                  stadium={nation.stadium} 
                  isActive={true}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
