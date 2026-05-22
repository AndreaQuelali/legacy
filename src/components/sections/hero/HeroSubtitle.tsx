"use client"

import React from 'react'
import { useTranslations } from 'next-intl'

export default function HeroSubtitle() {
  const t = useTranslations("hero")
  
  return (
    <div className="anim-subtitle flex flex-col items-center mb-6 opacity-0">
      <span className="hero-subtitle mb-2">
        {t("subtitle")}
      </span>
      {/* Gold line separator */}
      <div className="h-[1px] w-20 bg-primary mb-3 opacity-50" />
      
      {/* Cinematic Year */}
      <div className="font-bebas text-[48px] sm:text-[64px] leading-none text-white tracking-widest">
        {t("year")}
      </div>
    </div>
  )
}
