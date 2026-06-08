"use client"

import { useTranslations } from 'next-intl'
import type { NationData } from '../data/nations'
import NationStats from './NationStats'

interface NationDetailContentProps {
  nation: NationData
  layout?: 'desktop' | 'mobile'
  statsActive?: boolean
}

export default function NationDetailContent({
  nation,
  layout = 'desktop',
  statsActive = true,
}: NationDetailContentProps) {
  const t = useTranslations('nations')

  if (layout === 'mobile') {
    return (
      <div className="flex flex-col gap-3">
        <span className="hero-subtitle text-[9px] font-bold tracking-[0.4em] text-primary uppercase">
          {t('subtitle')}
        </span>
        <h2 className="font-bebas text-5xl leading-none text-white">{nation.name}</h2>
        <p className="font-bebas text-base tracking-wider text-white/60 italic">
          &ldquo;{nation.motto}&rdquo;
        </p>
        <p className="font-inter text-sm text-white/40 leading-relaxed">{nation.desc}</p>

        <div className="flex gap-6 mt-2 pt-4 border-t border-white/10">
          <div>
            <div className="font-inter text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase mb-1">
              {t('stat_founded')}
            </div>
            <div className="font-bebas text-2xl text-white">{nation.founded}</div>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <div className="font-inter text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase mb-1">
              {t('stat_titles')}
            </div>
            <div className="font-bebas text-2xl text-white">{nation.titles}</div>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <div className="font-inter text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase mb-1">
              {t('stat_stadium')}
            </div>
            <div className="font-bebas text-lg text-white leading-tight">{nation.stadium}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <span className="hero-subtitle text-[10px] sm:text-[11px] tracking-[0.4em] text-primary uppercase">
        {t('subtitle')}
      </span>

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
          isActive={statsActive}
        />
      </div>
    </>
  )
}
