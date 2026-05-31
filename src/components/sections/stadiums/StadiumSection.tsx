"use client"

import React, { useEffect, useRef } from 'react'
import { fadeUp } from '@/providers/AnimationProvider'
import StadiumHeader from './StadiumHeader'
import StadiumCard from './StadiumCard'

export default function StadiumSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      fadeUp(sectionRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-[#131313]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <StadiumHeader />

        {/* Grid Layout: Main Large Card + Sidebar with Smaller Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-5 mt-4">
          <StadiumCard
            variant="large"
            title="AZTECA STADIUM, MEXICO CITY"
            capacity="87,523"
            height="460px"
          />

          <div className="flex flex-col gap-5">
            <StadiumCard
              title="SOFI STADIUM"
              location="LOS ANGELES"
              height="220px"
              bgColor="#1a1918"
            />
            <StadiumCard
              title="BC PLACE"
              location="VANCOUVER"
              height="220px"
              bgColor="#161a19"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
