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
        <motion.div 
          key={`overlay-${nation.id}`}
          initial={{ opacity: 0, x: initialX }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: initialX }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`absolute inset-y-0 ${isRight ? 'right-0' : 'left-0'} w-full md:w-1/2 z-[40] pointer-events-none flex flex-col justify-center px-6 sm:px-14 md:px-24 max-h-[85vh] overflow-y-auto`}
        >
          <div className={`max-w-[500px] pointer-events-auto ${isRight ? 'ml-auto' : ''}`}>
            <button 
              onClick={onClose}
              aria-label={t('back_gallery')}
              className={`mb-10 flex items-center gap-3 group ${isRight ? 'justify-end w-full' : ''}`}
            >
              {!isRight && <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-primary transition-all duration-300" />}
              <span className="font-bebas text-sm tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
                {t('back_gallery')}
              </span>
              {isRight && <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-primary transition-all duration-300" />}
            </button>

            <div className={`flex items-center gap-4 mb-6 ${isRight ? 'justify-end' : ''}`}>
              {!isRight && <div className="h-[2px] w-12" style={{ backgroundColor: NATION_COLORS[nation.id] || "#eab308" }} />}
              <span className="font-inter text-[12px] font-bold tracking-[0.4em] text-white/60 uppercase">
                {t('subtitle')}
              </span>
              {isRight && <div className="h-[2px] w-12" style={{ backgroundColor: NATION_COLORS[nation.id] || "#eab308" }} />}
            </div>

            <h1 className={`font-bebas text-[60px] sm:text-[70px] md:text-[80px] lg:text-[100px] leading-[0.85] text-white mb-6 drop-shadow-2xl ${isRight ? 'text-right' : ''}`}>
              {nation.name}
            </h1>

            <p className={`font-bebas text-[18px] sm:text-[24px] tracking-[0.15em] text-white/70 mb-8 italic ${isRight ? 'text-right' : ''}`}>
              &ldquo;{nation.motto}&rdquo;
            </p>

            <p className={`font-inter text-[14px] sm:text-[16px] text-white/50 leading-relaxed max-w-[400px] mb-12 ${isRight ? 'text-right ml-auto' : ''}`}>
              {nation.desc}
            </p>

            <div className={`mt-auto flex ${isRight ? 'justify-end' : ''}`}>
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
