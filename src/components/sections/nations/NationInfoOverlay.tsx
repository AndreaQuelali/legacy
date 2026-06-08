"use client"

import React from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import SplitTitle from '@/components/animations/SplitTitle'
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

const PRIMARY_GOLD = "#e9c176"

export default function NationInfoOverlay({ 
  nation, 
  onClose 
}: { 
  nation: NationData | null,
  onClose: () => void 
}) {
  const t = useTranslations('nations')

  return (
    <AnimatePresence mode="wait">
      {nation && (
        <motion.div 
          key={`overlay-${nation.id}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 w-full md:w-[60%] h-full z-[40] pointer-events-none flex items-center justify-center px-6 sm:px-14 md:px-16 overflow-y-auto"
        >
          <button
            onClick={onClose}
            aria-label={t('back_gallery')}
            className="absolute top-8 left-4 sm:top-12 sm:left-8 md:top-14 md:left-10 inline-flex items-center gap-3 px-8 py-4 border border-primary/60 bg-black/70 backdrop-blur-md rounded-sm group hover:bg-primary/20 hover:border-primary transition-all duration-300 pointer-events-auto z-10"
          >
            <span className="font-bebas text-lg text-primary leading-none group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <span className="font-bebas text-sm tracking-[0.2em] text-primary group-hover:text-white transition-colors">
              {t('back_gallery')}
            </span>
          </button>

          <div className="max-w-[500px] w-full pointer-events-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[2px] w-12" style={{ backgroundColor: NATION_COLORS[nation.id] || PRIMARY_GOLD }} />
              <span className="hero-subtitle text-[10px] sm:text-[11px] tracking-[0.4em] text-primary uppercase">
                {t('subtitle')}
              </span>
              <div className="h-[2px] w-12" style={{ backgroundColor: NATION_COLORS[nation.id] || PRIMARY_GOLD }} />
            </div>

            <SplitTitle 
              text={nation.name}
              className="section-title mb-6 drop-shadow-2xl"
              type="chars"
            />

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
      )}
    </AnimatePresence>
  )
}
