"use client"

import React from 'react'

export default function StadiumHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 gap-6">
      <div>
        <span className="hero-subtitle text-[10px] sm:text-[11px] tracking-[0.4em]">
          IMMERSE YOURSELF
        </span>
        <h2 className="section-title mt-2">
          THE ARENAS OF 2026
        </h2>
      </div>
      <button className="px-7 py-3 border border-white/20 font-inter text-[10px] sm:text-[11px] font-bold text-white hover:border-primary hover:text-primary transition-all duration-300 uppercase tracking-[0.18em] whitespace-nowrap glass-card">
        VIEW ALL VENUES
      </button>
    </div>
  )
}
