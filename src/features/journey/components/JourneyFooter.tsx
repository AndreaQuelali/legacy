"use client"

import React from 'react'
import { useTranslations } from 'next-intl'

export default function JourneyFooter() {
  const t = useTranslations('journey')

  return (
    <div className="py-12 text-center">
      <span className="font-inter text-[10px] tracking-[0.3em] text-primary/60 uppercase">
        {t("footer_scroll", { defaultValue: "SCROLL TO FOLLOW THE JOURNEY" })}
      </span>
      <div className="w-[1px] h-10 bg-gradient-to-b from-primary/60 to-transparent mx-auto mt-4" />
    </div>
  )
}
