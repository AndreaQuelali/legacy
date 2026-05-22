"use client"

import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

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

interface NationCardProps {
  nation: NationData
  isActive: boolean
}

export default function NationCard({ nation, isActive }: NationCardProps) {
  const t = useTranslations('nations')

  return (
    <div
      className={`relative w-full h-full transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'}`}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/argentina.png"
          alt={nation.name}
          fill
          className="object-cover object-top"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/20" />

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-14 md:px-20 max-w-[700px]">
        <p className="font-inter text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-primary uppercase mb-3">
          {nation.name}
        </p>

        <h2 className="font-bebas text-[52px] sm:text-[72px] md:text-[88px] leading-[0.9] text-white mb-4 drop-shadow-2xl">
          {nation.player}
        </h2>

        <p className="font-bebas text-[16px] sm:text-[20px] tracking-[0.2em] text-white/60 mb-5">
          {nation.motto}
        </p>

        <div className="w-14 h-[1px] bg-primary mb-6 opacity-60" />

        <p className="font-inter text-[13px] sm:text-[14px] text-white/50 leading-relaxed max-w-[380px] mb-8">
          {nation.desc}
        </p>

        <button className="group flex items-center gap-3 w-fit border border-white/20 hover:border-primary px-6 py-3 transition-all duration-400">
          <span className="font-bebas text-[16px] tracking-widest text-white group-hover:text-primary transition-colors duration-300">
            {t('view_team')}
          </span>
          <span className="material-symbols-outlined text-white/50 group-hover:text-primary text-[18px] transition-colors duration-300 group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Bottom-right stats panel */}
      <div className="absolute bottom-8 right-8 z-10 flex gap-6 pr-24">
        <div className="flex flex-col items-center gap-1">
          <span className="font-inter text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase">{t('stat_founded')}</span>
          <span className="font-bebas text-[32px] sm:text-[40px] leading-none text-white">{nation.founded}</span>
        </div>
        <div className="w-[1px] bg-white/10 self-stretch" />
        <div className="flex flex-col items-center gap-1">
          <span className="font-inter text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase">{t('stat_titles')}</span>
          <span className="font-bebas text-[32px] sm:text-[40px] leading-none text-white">{nation.titles}</span>
        </div>
        <div className="w-[1px] bg-white/10 self-stretch" />
        <div className="flex flex-col items-stert gap-1">
          <span className="font-inter text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase">{t('stat_stadium')}</span>
          <span className="font-bebas text-[16px] sm:text-[18px] leading-tight text-white pt-1">{nation.stadium}</span>
        </div>
      </div>
    </div>
  )
}
