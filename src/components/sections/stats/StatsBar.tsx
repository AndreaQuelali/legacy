"use client"

import React from 'react'
import StatItem from './StatItem'

const stats = [
  { icon: "public", value: "32", label: "NATIONS" },
  { icon: "groups", value: "736", label: "PLAYERS" },
  { icon: "stadium", value: "16", label: "HOST CITIES" },
  { icon: "emoji_events", value: "1", label: "CHAMPION" },
]

export default function StatsBar() {
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
