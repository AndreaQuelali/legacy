"use client"

import { useTranslations } from 'next-intl'
import SplitTitle from '@/components/animations/SplitTitle'

export default function TimelineHeader() {
  const t = useTranslations('timeline')

  return (
    <div className="text-center">
      <span className="hero-subtitle text-[10px] sm:text-[11px] tracking-[0.4em]">
        {t("subtitle")}
      </span>
      <SplitTitle
        text={t("title")}
        className="section-title mt-3"
      />
    </div>
  )
}
