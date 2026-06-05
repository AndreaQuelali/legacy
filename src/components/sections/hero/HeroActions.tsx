"use client"

import { useTranslations } from 'next-intl'
import { useLenis } from 'lenis/react'

export default function HeroActions() {
  const t = useTranslations("hero")
  const lenis = useLenis()

  const handleExplore = () => {
    if (lenis) {
      lenis.scrollTo('#nations', {
        duration: 2,
        offset: 0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    } else {
      const nations = document.getElementById('nations')
      nations?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 mt-8 sm:mt-12">
      <button 
        onClick={handleExplore}
        className="anim-cta group relative px-8 sm:px-10 py-3 sm:py-3.5 border border-primary overflow-hidden transition-all duration-500 w-full sm:min-w-[260px] glass-card opacity-0"
      >
        <span className="relative z-10 font-bebas text-[22px] tracking-widest text-white group-hover:text-black transition-colors duration-300">
          {t("explore_btn")}
        </span>
        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>
    </div>
  )
}
