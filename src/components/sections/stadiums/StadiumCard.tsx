"use client"

import React from 'react'

import { useTranslations } from 'next-intl'

interface StadiumCardProps {
  title: string
  location?: string
  capacity?: string
  variant?: 'large' | 'small'
  height?: string
  bgColor?: string
}

export default function StadiumCard({ 
  title, 
  location, 
  capacity, 
  variant = 'small' ,
  height = "210px",
  bgColor = "#1a1918"
}: StadiumCardProps) {
  const isLarge = variant === 'large'
  const t = useTranslations('stadiums')
  
  return (
    <div 
      className={`relative overflow-hidden border border-white/[0.08] group transition-all duration-700 hover:border-primary/30`} 
      style={{ height }}
    >
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ backgroundColor: bgColor }} />
      
      <div 
        className={`absolute inset-0 flex flex-col ${isLarge ? 'justify-end p-8' : 'items-center justify-center p-4 text-center'}`}
        style={isLarge ? { background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)" } : {}}
      >
        <h4 className={`font-bebas text-white uppercase tracking-widest leading-none ${isLarge ? 'text-[28px] sm:text-[34px]' : 'text-[22px] sm:text-[24px]'}`}>
          {title}
        </h4>
        
        {location && (
          <span className="font-inter text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mt-2">
            {location}
          </span>
        )}
        
        {capacity && (
          <p className="font-inter text-[11px] font-bold text-primary uppercase tracking-[0.15em] mt-2">
            {t("capacity")}: {capacity}
          </p>
        )}
      </div>
    </div>
  )
}
