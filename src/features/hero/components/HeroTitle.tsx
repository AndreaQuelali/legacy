"use client"

import { useTranslations } from 'next-intl'

export default function HeroTitle() {
  const t = useTranslations("hero")

  return (
    <h1 className="hero-title drop-shadow-2xl mb-4 flex flex-col items-center">
      <span className="anim-title-1 hero-title-line block">{t("title_part1")}</span>
      <span className="anim-title-2 hero-title-line hero-title-line-2 block gold-text whitespace-nowrap">{t("title_part2")}</span>
    </h1>
  )
}
