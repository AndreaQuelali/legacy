"use client"

import React from 'react'

interface TimelineItemProps {
  date: string
  title: string
  desc: string
  icon: string
  side: "left" | "right"
}

export default function TimelineItem({ date, title, desc, icon, side }: TimelineItemProps) {
  const isLeft = side === "left"
  
  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-8 sm:gap-10 group ${isLeft ? "" : "md:flex-row-reverse"}`}>
      {/* Content Side */}
      <div className={`w-full md:w-1/2 ${isLeft ? "md:text-right md:pr-16" : "md:text-left md:pl-16"} text-center md:text-inherit`}>
        <span className="font-inter text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-[0.25em]">
          {date}
        </span>
        <h3 className="font-bebas text-[30px] sm:text-[34px] md:text-[40px] text-white mt-2 uppercase tracking-wide">
          {title}
        </h3>
        <p className={`body-muted text-[13px] sm:text-[14px] mt-2 max-w-sm mx-auto md:mx-0 ${isLeft ? "md:ml-auto" : ""}`}>
          {desc}
        </p>
      </div>

      {/* Center Anchor Point */}
      <div className="relative z-10 hidden md:flex items-center justify-center flex-shrink-0">
        <div className="w-4 h-4 rounded-full border-2 border-primary bg-[#131313] shadow-[0_0_12px_#e9c176] transition-transform duration-500 group-hover:scale-125" />
      </div>

      {/* Visual Placeholder Side */}
      <div className={`w-full md:w-1/2 flex items-center justify-center ${isLeft ? "md:justify-start md:pl-16" : "md:justify-end md:pr-16"}`}>
        <div className="w-full sm:w-80 h-44 border border-white/10 bg-[#1a1a1a] flex items-center justify-center group-hover:border-primary/40 transition-all duration-500 overflow-hidden relative">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="material-symbols-outlined text-white/[0.08] group-hover:text-primary/20 transition-all duration-500 scale-90 group-hover:scale-110" style={{ fontSize: "56px" }}>
            {icon}
          </span>
        </div>
      </div>
    </div>
  )
}
