"use client"

import React from 'react'
import Image from 'next/image'

export default function JourneyBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Image
        src="/images/timeline/map.png"
        alt="North America Map"
        fill
        sizes='150vw'
        className="object-cover journey-map scale-125"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
    </div>
  )
}
