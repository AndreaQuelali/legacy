"use client"

import React from 'react'
import { useTranslations } from 'next-intl'
import { MARQUEE_NATIONS } from '../hooks/marqueeNations'

export default function NationsMarquee() {
  const t = useTranslations('countries')
  return (
    <section className="relative py-16 bg-[#0e0e0e] overflow-hidden border-b border-white/5">
      {/* Edge Gradients for Smooth Entry/Exit */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0e0e0e] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0e0e0e] to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-12">
        {/* First Row: Flags Only (Left to Right) */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee shrink-0 gap-10 items-center pr-10">
            {MARQUEE_NATIONS.map((country, idx) => (
              <div
                key={`${country.code}-${idx}`}
                className="flex items-center transition-transform duration-500 hover:scale-125 cursor-pointer"
              >
                <span className={`fi fi-${country.code} text-[50px] md:text-[64px] rounded-sm shadow-2xl border border-white/10`} />
              </div>
            ))}
          </div>
          <div className="flex animate-marquee shrink-0 gap-10 items-center pr-10">
            {MARQUEE_NATIONS.map((country, idx) => (
              <div
                key={`${country.code}-dup-${idx}`}
                className="flex items-center transition-transform duration-500 hover:scale-125 cursor-pointer"
              >
                <span className={`fi fi-${country.code} text-[50px] md:text-[64px] rounded-sm shadow-2xl border border-white/10`} />
              </div>
            ))}
          </div>
        </div>

        {/* Second Row: Names Only (Right to Left) */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee-reverse shrink-0 items-center">
            {MARQUEE_NATIONS.map((country, idx) => (
              <div
                key={`${country.code}-name-${idx}`}
                className="flex items-center group/item cursor-pointer transition-all duration-400 hover:scale-110"
              >
                <span className="font-bebas text-[32px] md:text-[46px] tracking-[0.2em] text-white/30 group-hover/item:text-primary transition-colors duration-300 uppercase mr-[-0.2em]">
                  {t(country.key)}
                </span>
                <span className="px-8 md:px-12 text-primary/10 select-none">•</span>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee-reverse shrink-0 items-center">
            {MARQUEE_NATIONS.map((country, idx) => (
              <div
                key={`${country.code}-name-dup-${idx}`}
                className="flex items-center group/item cursor-pointer transition-all duration-400 hover:scale-110"
              >
                <span className="font-bebas text-[32px] md:text-[46px] tracking-[0.2em] text-white/30 group-hover/item:text-primary transition-colors duration-300 uppercase mr-[-0.2em]">
                  {t(country.key)}
                </span>
                <span className="px-8 md:px-12 text-primary/10 select-none">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
