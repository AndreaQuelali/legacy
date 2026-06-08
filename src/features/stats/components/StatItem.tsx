"use client"

import React, { useRef } from 'react'
import { useCountUp } from '@/lib/gsap/useCountUp'
import type { StatData } from '../hooks/useStatsData'

export default function StatItem({ icon, value, label }: StatData) {
  const numberRef = useRef<HTMLDivElement>(null)

  useCountUp(numberRef, value, { trigger: 'scroll', duration: 2 })

  return (
    <div className="flex items-center gap-5">
      <span className="material-symbols-outlined text-primary" style={{ fontSize: "36px" }}>
        {icon}
      </span>
      <div>
        <div
          ref={numberRef}
          className="countdown-number text-[40px] sm:text-[52px]"
        >
          0
        </div>
        <div className="countdown-label mt-0.5">
          {label}
        </div>
      </div>
    </div>
  )
}
