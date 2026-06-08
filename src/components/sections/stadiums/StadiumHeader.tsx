"use client"

import { useTranslations } from 'next-intl'
import SplitTitle from '@/components/animations/SplitTitle'

export default function StadiumHeader() {
  const t = useTranslations('stadiums')

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 sm:mb-10 gap-6">
      <div>
        <span className="hero-subtitle text-[10px] sm:text-[11px] tracking-[0.4em]">
          {t("subtitle")}
        </span>
        <SplitTitle
          text={t("title")}
          type="words"
          className="section-title mt-2 w-full max-w-[240px] sm:max-w-none"
        />
      </div>
    </div>
  )
}
