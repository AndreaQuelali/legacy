"use client"

import { forwardRef } from 'react'
import { useTranslations } from 'next-intl'

const HeroMarquee = forwardRef<HTMLDivElement, object>((props, ref) => {
  const t = useTranslations("hero")
  const marqueeText = t("cinematic_message")

  return (
    <div className="hero-cinematic-marquee absolute inset-0 z-10 pointer-events-none opacity-0">
      <div
        ref={ref}
        className="marquee-text-inner whitespace-nowrap"
        style={{ position: 'absolute', top: '50%', left: 0 }}
      >
        <span
          className="font-bebas text-[20vh] md:text-[28vh] leading-none uppercase tracking-tighter text-white"
        >
          {marqueeText}
        </span>
      </div>
    </div>
  )
})

HeroMarquee.displayName = "HeroMarquee"

export default HeroMarquee
