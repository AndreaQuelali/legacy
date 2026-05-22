"use client"

import React from 'react'
import { useTranslations } from 'next-intl'

interface HeroTitleProps {
  h1Ref?: React.RefObject<HTMLHeadingElement | null>
}

export default function HeroTitle({ h1Ref }: HeroTitleProps) {
  const t = useTranslations("hero")
  
  return (
    <h1 
      ref={h1Ref} 
      className="hero-title drop-shadow-2xl mb-4"
    >
      {t("title_part1")} <br />
      <span className="gold-text">{t("title_part2")}</span>
    </h1>
  )
}
