"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import SplitTitle from '@/components/animations/SplitTitle'
import NationStats from './NationStats'
import gsap from '@/lib/gsap/gsap'

interface NationData {
  id: string
  name: string
  player: string
  motto: string
  desc: string
  founded: string
  titles: string
  stadium: string
}

interface NationCardProps {
  nation: NationData
  isActive: boolean
  index: number
}

const NATION_COLORS: Record<string, string> = {
  "01": "rgba(0, 191, 255, 0.4)", // Argentina
  "02": "rgba(251, 191, 36, 0.4)", // Brazil
  "03": "rgba(59, 130, 246, 0.4)", // France
  "04": "rgba(248, 250, 252, 0.2)", // England
  "05": "rgba(239, 68, 68, 0.4)",  // Portugal
}

export default function NationCard({ nation, isActive, index }: NationCardProps) {
  const t = useTranslations('nations')
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const flagRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isActive) {
        // ENTRANCE ANIMATION
        gsap.fromTo(playerRef.current, 
          { x: 200, opacity: 0, scale: 1.1 }, 
          { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
        )
        
        gsap.fromTo(flagRef.current,
          { x: 100, opacity: 0, scale: 1.05 },
          { x: 0, opacity: 0.4, scale: 1, duration: 1.5, ease: "power2.out", delay: 0.1 }
        )

        gsap.fromTo(bgRef.current,
          { scale: 1.1, filter: "blur(10px)" },
          { scale: 1, filter: "blur(0px)", duration: 2, ease: "power2.out" }
        )

        gsap.fromTo(contentRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.4 }
        )
      } else {
        // EXIT ANIMATION
        gsap.to(playerRef.current, { x: -200, opacity: 0, duration: 0.8, ease: "power3.in" })
        gsap.to(flagRef.current, { x: -100, opacity: 0, duration: 0.8, ease: "power2.in" })
        gsap.to(contentRef.current, { opacity: 0, duration: 0.5 })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isActive])

  const accentColor = NATION_COLORS[nation.id] || "rgba(233, 193, 118, 0.4)"

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden transition-all duration-1000 ${isActive ? 'z-10 visible' : 'z-0 invisible'}`}
    >
      {/* LAYER 1: DEEP BACKGROUND (City/Stadium) */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/images/nations/argentina/bg.png"
          alt={`${nation.name} background`}
          fill
          className="object-cover"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div 
          className="absolute inset-0 opacity-40 transition-colors duration-1000"
          style={{ 
            background: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 70%)` 
          }} 
        />
      </div>

      {/* LAYER 2: FLAG PARALLAX */}
      <div 
        ref={flagRef}
        className="absolute inset-x-0 top-0 h-full w-[120%] -left-[10%] z-1 opacity-40 pointer-events-none mix-blend-overlay"
      >
        <Image
          src="/images/nations/argentina/flag.png"
          alt={`${nation.name} flag`}
          fill
          className="object-cover scale-110"
        />
      </div>

      {/* LAYER 3: PLAYER FOOTAGE */}
      <div 
        ref={playerRef}
        className="absolute right-0 bottom-0 top-0 w-full md:w-3/4 z-5 pointer-events-none overflow-visible"
      >
        <div className="relative w-full h-full flex items-end justify-end translate-x-[10%] md:translate-x-0">
          <Image
            src="/images/nations/argentina/player.png"
            alt={nation.player}
            width={1200}
            height={1600}
            className="h-[105%] w-auto object-contain object-bottom drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      {/* GRADIENT OVERLAYS */}
      <div className="absolute inset-0 z-4 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 z-4 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

      {/* MAIN CONTENT LAYER */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-14 md:px-24">
        <div ref={contentRef} className="max-w-[700px]">
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="h-[2px] w-12 transition-all duration-1000"
              style={{ backgroundColor: accentColor.replace('0.4', '1') }}
            />
            <span className="font-inter text-[12px] font-bold tracking-[0.4em] text-white/60 uppercase">
              {t('subtitle')}
            </span>
          </div>

          <SplitTitle 
            text={nation.player}
            trigger={isActive}
            className="font-bebas text-[72px] sm:text-[100px] md:text-[140px] leading-[0.85] text-white mb-6 drop-shadow-2xl"
          />

          <p className="font-bebas text-[20px] sm:text-[28px] tracking-[0.15em] text-white/70 mb-8 max-w-xl italic">
            &ldquo;{nation.motto}&rdquo;
          </p>

          <p className="font-inter text-[15px] sm:text-[17px] text-white/50 leading-relaxed max-w-[450px] mb-12">
            {nation.desc}
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <button className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/40 px-10 py-4 transition-all duration-500">
              <span className="relative z-10 font-bebas text-[18px] tracking-[0.2em] text-white transition-colors duration-300">
                {t('view_team')}
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bebas text-black text-[18px] tracking-[0.2em]">
                {t('view_team')}
              </span>
            </button>
          </div>
        </div>

        {/* STATS AREA */}
        <div className="absolute bottom-16 sm:bottom-24 left-6 sm:left-14 md:left-24">
          <NationStats 
            founded={nation.founded} 
            titles={nation.titles} 
            stadium={nation.stadium} 
            isActive={isActive}
          />
        </div>
      </div>

      {/* ATMOSPHERIC PARTICLES (CSS ONLY FOR PERFORMANCE) */}
      <div className="absolute inset-0 pointer-events-none z-[6] opacity-30 mix-blend-screen overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full animate-float-slow">
           {/* Add subtle dot pattern or dust here via CSS if needed */}
        </div>
      </div>
    </div>
  )
}

