"use client"

import React from 'react'

interface HeroBackgroundProps {
  children?: React.ReactNode
}

export default function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 bg-[#0d0d0d] overflow-hidden">
      {/* Cinematic Spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(233, 193, 118, 0.08) 0%, transparent 70%), radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      
      {/* Depth Layer: Subtle vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />

      {/* Bottom Fade to ground/content flow */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />
      
      {children}
    </div>
  )
}
