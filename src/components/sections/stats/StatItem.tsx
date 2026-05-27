"use client"

import React from 'react'

interface StatItemProps {
  icon: string
  value: string
  label: string
}

export default function StatItem({ icon, value, label }: StatItemProps) {
  return (
    <div className="flex items-center gap-5">
      <span className="material-symbols-outlined text-primary" style={{ fontSize: "36px" }}>
        {icon}
      </span>
      <div>
        <div className="countdown-number text-[40px] sm:text-[52px]">
          {value}
        </div>
        <div className="countdown-label mt-0.5">
          {label}
        </div>
      </div>
    </div>
  )
}
