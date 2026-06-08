"use client"

import React from 'react'
import Image from 'next/image'
import { JOURNEY_MAP_IMAGE } from '../assets/journeyImages'

export default function JourneyBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Image
        src={JOURNEY_MAP_IMAGE}
        alt="North America Map"
        fill
        sizes='150vw'
        className="object-cover journey-map scale-125"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
    </div>
  )
}
