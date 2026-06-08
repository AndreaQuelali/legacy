"use client"

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import gsap from '@/lib/gsap/gsap'

interface NationStatsProps {
  founded: string
  titles: string
  stadium: string
  isActive: boolean
}

export default function NationStats({ founded, titles, stadium, isActive }: NationStatsProps) {
  const t = useTranslations('nations')
  const foundedRef = useRef<HTMLSpanElement>(null)
  const titlesRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isActive) return

    const stats = {
      founded: 0,
      titles: 0
    }

    const ctx = gsap.context(() => {
      gsap.to(stats, {
        founded: parseInt(founded),
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (foundedRef.current) {
            foundedRef.current.textContent = Math.floor(stats.founded).toString()
          }
        }
      })

      gsap.to(stats, {
        titles: parseInt(titles),
        duration: 1.5,
        ease: "power2.out",
        delay: 0.2,
        onUpdate: () => {
          if (titlesRef.current) {
            titlesRef.current.textContent = Math.floor(stats.titles).toString()
          }
        }
      })
    })

    return () => ctx.revert()
  }, [isActive, founded, titles])

  return (
    <div className="flex gap-8 sm:gap-12">
      <div className="flex flex-col items-center">
        <span className="font-inter text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase mb-1">
          {t('stat_founded')}
        </span>
        <span 
          ref={foundedRef} 
          className="font-bebas text-[40px] sm:text-[52px] leading-none text-white"
        >
          0
        </span>
      </div>

      <div className="w-[1px] bg-white/10 self-stretch my-2" />

      <div className="flex flex-col items-center">
        <span className="font-inter text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase mb-1">
          {t('stat_titles')}
        </span>
        <span 
          ref={titlesRef} 
          className="font-bebas text-[40px] sm:text-[52px] leading-none text-white"
        >
          0
        </span>
      </div>

      <div className="w-[1px] bg-white/10 self-stretch my-2" />

      <div className="flex flex-col items-start px-2">
        <span className="font-inter text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase mb-1">
          {t('stat_stadium')}
        </span>
        <span className="font-bebas text-[20px] sm:text-[24px] leading-tight text-white/90 max-w-[120px]">
          {stadium}
        </span>
      </div>
    </div>
  )
}
