"use client"

import { useTranslations } from 'next-intl';

export default function TopNavBar() {
  const t = useTranslations('nav');

  return (
    <nav className="anim-navbar fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10 opacity-0">
      <div className="flex items-center justify-between px-10 py-4 max-w-[1440px] mx-auto">
        {/* Logo — 2 lines */}
        <div className="font-bebas leading-none text-white">
          <div className="text-[22px] tracking-[0.15em]">{t('title1')}</div>
          <div className="text-[22px] tracking-[0.15em]">{t('title2')}</div>
        </div>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-8">
          <a className="cinematic-label text-primary border-b border-primary pb-0.5" href="#">{t('home')}</a>
          <a className="cinematic-label text-white/70 hover:text-primary transition-colors" href="#">{t('nations')}</a>
          <a className="cinematic-label text-white/70 hover:text-primary transition-colors" href="#">{t('players')}</a>
          <a className="cinematic-label text-white/70 hover:text-primary transition-colors" href="#">{t('stadiums')}</a>
          <a className="cinematic-label text-white/70 hover:text-primary transition-colors leading-tight text-center" href="#">{t('road_to')}<br/>2026</a>
          <a className="cinematic-label text-white/70 hover:text-primary transition-colors" href="#">{t('about')}</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="cinematic-label text-primary border border-primary px-6 py-2.5 hover:bg-primary hover:text-black transition-all duration-300 glass-card">
            {t('explore')}
          </button>
          <span className="material-symbols-outlined text-white/80 cursor-pointer text-[24px]">grid_view</span>
        </div>
      </div>
    </nav>
  )
}
