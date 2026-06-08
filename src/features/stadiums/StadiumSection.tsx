"use client"

import React, { useRef } from 'react'
import StadiumHeader from './components/StadiumHeader'
import StadiumGrid from './components/StadiumGrid'
import { useStadiumData } from './hooks/useStadiumData'
import { useStadiumFlip } from './hooks/useStadiumFlip'
import { useStadiumScroll } from './hooks/useStadiumScroll'

const GRID_CLASS = 'grid grid-cols-2 md:grid-cols-8 md:grid-rows-3 gap-3 md:gap-5 md:h-[680px] w-full'

export default function StadiumSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stadiums = useStadiumData()
  const { gridARef, gridBRef, showB, showBRef, triggerFlip } = useStadiumFlip()

  useStadiumScroll(containerRef, showBRef, triggerFlip)

  const setA = stadiums.slice(0, 8)
  const setB = stadiums.slice(8, 16)

  return (
    <section
      id="stadiums"
      ref={containerRef}
      className="relative bg-[#050505] min-h-screen flex flex-col justify-center py-16 lg:py-20 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[60%] rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[30%] h-[50%] rounded-full bg-primary/5 blur-[130px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full z-10">
        <StadiumHeader />

        <div className="relative mt-4 min-h-[640px] md:h-[680px] w-full flex items-center justify-center">
          <StadiumGrid
            gridRef={gridARef}
            items={setA}
            bentoClasses={setA.map((s) => s.bentoA)}
            gridClass={GRID_CLASS}
          />

          <StadiumGrid
            gridRef={gridBRef}
            items={setB}
            bentoClasses={setB.map((s) => s.bentoB)}
            gridClass={GRID_CLASS}
            className="absolute inset-0 opacity-0 invisible"
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        <div className={`rounded-full transition-all duration-500 ${!showB ? 'w-10 h-[3px] bg-primary' : 'w-3 h-[2px] bg-white/20'}`} />
        <div className={`rounded-full transition-all duration-500 ${showB ? 'w-10 h-[3px] bg-primary' : 'w-3 h-[2px] bg-white/20'}`} />
      </div>
    </section>
  )
}
