"use client"

import React from 'react'

import { useTranslations } from 'next-intl'

export default function TimelineHeader() {
  const t = useTranslations('timeline')
  
  return (
    <div className="text-center mb-16 sm:mb-24">
      <span className="hero-subtitle text-[10px] sm:text-[11px] tracking-[0.4em]">
        {t("subtitle")}
      </span>
      <h2 className="section-title mt-3">
        {t("title")}
      </h2>
    </div>
  )
}
