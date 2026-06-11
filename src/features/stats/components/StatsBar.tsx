"use client"

import { useEffect, useRef } from 'react'
import { fadeUp } from '@/providers/AnimationProvider'
import StatItem from './StatItem'
import { useStatsData } from '../hooks/useStatsData'

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const stats = useStatsData()

  useEffect(() => {
    if (sectionRef.current) {
      fadeUp(sectionRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-10 sm:py-14 bg-[#0e0e0e] border-y border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10">
        {stats.map((stat) => (
          <StatItem key={stat.icon} {...stat} />
        ))}
      </div>
    </section>
  )
}
