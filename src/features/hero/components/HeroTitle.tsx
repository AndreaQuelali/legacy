"use client"

import { useTranslations } from 'next-intl'

export default function HeroTitle() {
  const t = useTranslations("hero")

  return (
    <h1 className="hero-title drop-shadow-2xl mb-4 flex flex-col items-center">
      <span className="anim-title-1 block opacity-0">{t("title_part1")}</span>
      <span className="anim-title-2 block gold-text opacity-0 whitespace-nowrap">{t("title_part2")}</span>
    </h1>
  )
}
