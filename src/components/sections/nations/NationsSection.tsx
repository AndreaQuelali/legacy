"use client"

import React, { useEffect, useRef } from 'react'
import { fadeUp } from '@/providers/AnimationProvider'
import NationsHeader from './NationsHeader'
import NationCard from './NationCard'

const nations = [
  { id: "01", name: "ARGENTINA", player: "LIONEL MESSI" },
  { id: "02", name: "BRAZIL", player: "NEYMAR JR" },
  { id: "03", name: "FRANCE", player: "KYLIAN MBAPPÉ" },
  { id: "04", name: "ENGLAND", player: "HARRY KANE" },
  { id: "05", name: "PORTUGAL", player: "C. RONALDO" },
]

export default function NationsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    if (sectionRef.current) {
      fadeUp(sectionRef.current)
    }
  }, [])
  
  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-[#131313]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <NationsHeader />

        {/* Cards Grid — Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-3">
          {nations.map((nation) => (
            <NationCard key={nation.id} {...nation} />
          ))}
        </div>
      </div>
    </section>
  )
}
