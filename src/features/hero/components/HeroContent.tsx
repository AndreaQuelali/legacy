"use client"

import React from 'react'
import { useTranslations } from 'next-intl'
import HeroTitle from './HeroTitle'
import HeroSubtitle from './HeroSubtitle'
import HeroActions from './HeroActions'

export default function HeroContent() {
  const t = useTranslations("hero")

  return (
    <div className="relative z-10 text-center px-6 flex flex-col items-center max-w-5xl">
      <HeroSubtitle />
      <HeroTitle />
      
      <p className="hero-title-line hero-title-line-3 body-muted max-w-xl mx-auto mt-6">
        {t("description")}
      </p>

      <HeroActions />
    </div>
  )
}
