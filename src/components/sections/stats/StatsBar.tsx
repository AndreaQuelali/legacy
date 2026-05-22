"use client"

import React from 'react'
import { useTranslations } from 'next-intl'
import StatItem from './StatItem'

export default function StatsBar() {
  const t = useTranslations('stats')
  
  const stats = [
    { icon: "public", value: "32", label: t("nations") },
    { icon: "groups", value: "736", label: t("players") },
    { icon: "stadium", value: "16", label: t("host_cities") },
    { icon: "emoji_events", value: "1", label: t("champion") },
  ]
  return (
    <section className="py-10 sm:py-14 bg-[#0e0e0e] border-y border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {stats.map((stat, i) => (
          <StatItem key={i} {...stat} />
        ))}
      </div>
    </section>
  )
}
