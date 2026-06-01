"use client"

import { useTranslations } from 'next-intl'
import SplitTitle from '@/components/animations/SplitTitle'

export default function StadiumHeader() {
  const t = useTranslations('stadiums')
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 gap-6">
      <div>
        <span className="hero-subtitle text-[10px] sm:text-[11px] tracking-[0.4em]">
          {t("subtitle")}
        </span>
        <SplitTitle 
          text={t("title")} 
          className="section-title mt-2"
        />
      </div>
      <button className="px-7 py-3 border border-white/20 font-inter text-[10px] sm:text-[11px] font-bold text-white hover:border-primary hover:text-primary transition-all duration-300 uppercase tracking-[0.18em] whitespace-nowrap glass-card">
        {t("view_all")}
      </button>
    </div>
  )
}
