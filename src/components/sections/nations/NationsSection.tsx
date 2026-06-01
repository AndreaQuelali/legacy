"use client"

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { fadeUp } from '@/providers/AnimationProvider'
import gsap from '@/lib/gsap/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NationCard from './NationCard'

export default function NationsSection() {
  const t = useTranslations('nations')
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const nations = t.raw('nations_list') as Array<{
    id: string
    name: string
    player: string
    motto: string
    desc: string
    founded: string
    titles: string
    stadium: string
  }>

  const nextIndex = (activeIndex + 1) % nations.length

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Pinning handled by master in page.tsx
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: () => 7000, 
        end: () => `+=4000`, 
        scrub: true,
        onUpdate: (self) => {
          const index = Math.floor(self.progress * nations.length)
          const clampedIndex = Math.min(index, nations.length - 1)
          setActiveIndex(clampedIndex)
        },
      })

      // Initial intro animation
      fadeUp(sectionRef.current!)
    })

    return () => ctx.revert()
  }, [nations.length])

  return (
    <section ref={sectionRef} className="relative bg-black overflow-hidden" style={{ height: '100svh', minHeight: '600px' }}>

      <div className="absolute inset-0 md:ml-48">
        {nations.map((nation, i) => (
          <NationCard key={nation.id} nation={nation} isActive={i === activeIndex} />
        ))}
      </div>

      {/* LEFT PANEL — nations list sidebar */}
      <div className="hidden md:flex absolute left-0 top-0 bottom-0 z-20 w-48 flex-col justify-center pl-6 sm:pl-10 pr-6 py-10">
        <div className="flex flex-col gap-1">
          {nations.map((nation, i) => (
            <button
              key={nation.id}
              onClick={() => setActiveIndex(i)}
              className={`group flex items-center gap-4 py-3 border-l-2 pl-4 text-left transition-all duration-400 ${i === activeIndex
                ? 'border-primary'
                : 'border-white/10 hover:border-white/30'
                }`}
            >
              <span className={`font-bebas text-[13px] transition-colors duration-300 ${i === activeIndex ? 'text-primary' : 'text-white/20 group-hover:text-white/40'
                }`}>
                {nation.id}
              </span>
              <div className="flex flex-col">
                {i === activeIndex && (
                  <span className="font-inter text-[8px] font-bold tracking-[0.25em] text-primary uppercase mb-0.5">
                    {nation.player}
                  </span>
                )}
                <span className={`font-bebas text-[14px] sm:text-[15px] tracking-widest transition-colors duration-300 ${i === activeIndex ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                  }`}>
                  {nation.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-between px-6 sm:px-10 py-6 border-t border-white/[0.06]">
        <button
          onClick={() => setActiveIndex(nextIndex)}
          className="group flex items-center gap-3"
        >
          <div className="flex flex-col items-start">
            <span className="font-inter text-[9px] font-bold tracking-[0.25em] text-white/30 uppercase">
              {t('next_nation')}
            </span>
            <span className="font-bebas text-[16px] tracking-widest text-white group-hover:text-primary transition-colors duration-300">
              {nations[nextIndex].name}
            </span>
          </div>
          <span className="material-symbols-outlined text-white/30 group-hover:text-primary text-[20px] transition-colors duration-300">
            arrow_forward
          </span>
        </button>

        <div className="hidden sm:flex flex-col items-center gap-1">
          <span className="font-inter text-[9px] font-bold tracking-[0.3em] text-primary uppercase">
            {t('legacy_continues')}
          </span>
          <div className="flex gap-1 items-center mt-0.5">
            {[0, 1, 2].map(i => (
              <span key={i} className="material-symbols-outlined text-white/20 text-[14px]">chevron_right</span>
            ))}
          </div>
          <span className="font-inter text-[9px] tracking-[0.2em] text-white/30 uppercase">
            {t('scroll_discover')}
          </span>
        </div>

        <div className="font-bebas text-[18px] sm:text-[22px] tracking-widest">
          <span className="text-primary">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="text-white/20"> / {String(nations.length).padStart(2, '0')}</span>
        </div>
      </div>

      <div
        className="absolute top-0 left-0 h-[2px] bg-primary z-30 transition-all duration-700"
        style={{ width: `${((activeIndex + 1) / nations.length) * 100}%` }}
      />
    </section>
  )
}
