"use client"

import React from 'react'
import { useTranslations } from 'next-intl'

export default function HeroActions() {
  const t = useTranslations("hero")
  
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 mt-8 sm:mt-12">
      <button className="group relative px-8 sm:px-10 py-3 sm:py-3.5 border border-primary overflow-hidden transition-all duration-500 w-full sm:min-w-[260px] glass-card">
        <span className="relative z-10 font-bebas text-[22px] tracking-widest text-white group-hover:text-black transition-colors duration-300">
          {t("explore_btn")}
        </span>
        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>

      <button className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_14px_#e9c176] transition-all">
          <span className="material-symbols-outlined text-white group-hover:text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            play_arrow
          </span>
        </div>
        <span className="font-inter text-[11px] font-bold tracking-[0.2em] text-white/60 group-hover:text-white transition-colors uppercase">
          {t("trailer_btn")}
        </span>
      </button>
    </div>
  )
}
