"use client"

import React from 'react'
import Image from 'next/image'

interface StadiumCardProps {
  id: string
  name: string
  city: string
  image: string
  className?: string
}

export default function StadiumCard({
  id,
  name,
  city,
  image,
  className = ""
}: StadiumCardProps) {

  return (
    <div
      data-flip-id={id}
      className={`relative overflow-hidden group rounded-sm border border-white/10 ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
        <div className="overflow-hidden">
          <span className="block font-inter text-[9px] font-bold text-primary uppercase tracking-[0.25em] mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {city}
          </span>
        </div>
        <div>
          <h4 className="font-bebas text-white uppercase tracking-wider leading-normal text-xl sm:text-2xl group-hover:text-primary transition-colors duration-300">
            {name}
          </h4>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Glass reflection effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  )
}

