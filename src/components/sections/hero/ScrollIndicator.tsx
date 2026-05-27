"use client"

import React from 'react'

export default function ScrollIndicator() {
  return (
    <div className="anim-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 opacity-0">
      <div className="w-[1px] h-12 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />
      <div className="indicator-dot w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_#e9c176]" />
    </div>
  )
}
