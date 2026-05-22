"use client"

import React from 'react'

interface NationCardProps {
  id: string
  name: string
  player: string
}

export default function NationCard({ id, name, player }: NationCardProps) {
  return (
    <div
      className="relative group cursor-pointer overflow-hidden border border-white/[0.07] hover:border-primary/50 transition-all duration-500 h-[380px] sm:h-[420px]"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[#1a1a1a] group-hover:bg-[#1f1e1c] transition-colors duration-500" />

      {/* Nation ID + Name Info */}
      <div className="absolute top-5 left-5 z-10">
        <div className="font-bebas text-[20px] sm:text-[22px] text-primary leading-none">
          {id}
        </div>
        <div className="font-bebas text-[14px] sm:text-[16px] text-white tracking-widest mt-0.5">
          {name}
        </div>
      </div>

      {/* Interactive Bottom Layer */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-10 p-5"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)" }}
      >
        <p className="font-bebas text-[18px] sm:text-[20px] text-white tracking-wide uppercase">
          {player}
        </p>
        <button className="font-inter text-[9px] sm:text-[10px] font-bold text-primary flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase tracking-widest translate-y-2 group-hover:translate-y-0">
          VIEW TEAM <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  )
}
