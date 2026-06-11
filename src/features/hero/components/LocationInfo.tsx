"use client"

import { useTranslations } from 'next-intl'

export default function LocationInfo() {
  const t = useTranslations("hero")

  return (
    <div className="anim-location text-right hidden md:block opacity-0">
      <p className="cinematic-label mb-2 opacity-60">
        {t("location_label")}
      </p>
      <p className="font-bebas text-[24px] lg:text-[28px] text-white tracking-[0.15em] leading-tight max-w-[300px]">
        {t("location")}
      </p>
    </div>
  )
}
