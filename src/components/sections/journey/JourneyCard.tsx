"use client"

import React from 'react'
import Image from 'next/image'

interface JourneyCardProps {
  id: string
  date: string
  title: string
  desc: string
  icon: string
  image: string
  isLast?: boolean
}

export default function JourneyCard({ id, date, title, desc, icon, image, isLast }: JourneyCardProps) {
  return (
    <div className={`relative flex flex-col items-center w-[300px] h-[550px] flex-shrink-0 group ${isLast ? 'z-20' : 'z-10'}`}>
      
      {/* Label and Number */}
      <div className="flex flex-col items-center mb-6">
        <span className="font-bebas text-primary text-lg tracking-widest">{id}</span>
        <h3 className="font-bebas text-white text-3xl tracking-wider mt-1">{title}</h3>
      </div>

      {/* Timeline Node */}
      <div className="relative mb-10">
        <div className="w-12 h-12 rounded-full border border-primary/50 bg-[#050505] flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:border-primary">
            <span className="material-symbols-outlined text-primary text-2xl">
                {icon}
            </span>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Card Content */}
      <div className={`
        relative w-full aspect-[4/5] rounded-sm overflow-hidden border transition-all duration-700
        ${isLast ? 'border-primary/60 shadow-[0_0_30px_rgba(234,179,8,0.2)]' : 'border-white/10 group-hover:border-white/20'}
      `}>
        {/* Image */}
        <div className="absolute inset-0 w-full h-full">
            <Image 
                src={image} 
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className={`object-cover ${id === '07' ? '' : 'filter grayscale contrast-125'} transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0`}
            />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

        {/* Text over image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <p className="text-[12px] text-white/70 leading-relaxed max-w-[240px] mx-auto mb-4 font-inter">
                {desc}
            </p>
            <span className="font-inter font-bold text-primary text-[12px] tracking-[0.2em]">
                {date}
            </span>
        </div>
      </div>

      {/* Connection Line Fragment (Desktop) */}
      {!isLast && (
          <div className="absolute top-[84px] left-[150px] w-full h-[1px] bg-gradient-to-r from-primary/50 to-primary/50 hidden md:block" />
      )}
    </div>
  )
}
