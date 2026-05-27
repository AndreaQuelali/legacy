"use client"

import React from 'react'
import { useTranslations } from 'next-intl'

export default function Countdown() {
  const t = useTranslations("hero")
  
  const stats = [
    { value: "245", label: t("days") },
    { value: "14", label: t("hours") },
    { value: "32", label: t("minutes") }
  ]

  return (
    <div className="flex flex-col">
      <p className="cinematic-label mb-2 sm:mb-4 opacity-60">
        {t("journey")}
      </p>
      <div className="flex gap-6 sm:gap-10 md:gap-12">
        {stats.map(({ value, label }) => (
          <div key={label} className="anim-countdown flex flex-col opacity-0">
            <span className="countdown-number">{value}</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
