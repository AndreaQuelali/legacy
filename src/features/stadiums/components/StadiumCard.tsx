"use client"

import React from 'react'
import Image, { type StaticImageData } from 'next/image'
import { useTranslations } from 'next-intl'

interface StadiumCardProps {
  id: string
  name: string
  city: string
  capacity: string
  image: StaticImageData
  className?: string
}

export default function StadiumCard({
  id,
  name,
  city,
  capacity,
  image,
  className = "",
}: StadiumCardProps) {
  const t = useTranslations('stadiums')

  return (
    <div
      data-flip-id={`stadium-${id}`}
      className={`relative overflow-hidden group rounded-sm border border-white/10 transition-[border-color] duration-300 hover:border-primary/30 opacity-100 ${className}`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-colors duration-500" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5 z-10">
        <div className="overflow-hidden">
          <span className="block font-inter text-[8px] sm:text-[10px] font-bold text-primary uppercase tracking-[0.3em] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out mb-0.5">
            {city}
          </span>
        </div>

        <h4 className="font-bebas text-white uppercase tracking-wider leading-tight text-[16px] xs:text-[18px] sm:text-[26px] group-hover:text-primary transition-colors duration-300">
          {name}
        </h4>

        <div className="overflow-hidden">
          <div className="flex items-center gap-2 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out mt-1.5">
            <div className="h-px flex-1 bg-primary/40" />
            <span className="font-inter text-[9px] font-bold text-primary/70 uppercase tracking-[0.25em] whitespace-nowrap">
              {t('capacity')}: {capacity}
            </span>
            <div className="h-px w-3 bg-primary/40" />
          </div>
        </div>

        <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-white/10 group-hover:border-primary/50 transition-all duration-500" />
        <div className="absolute top-5 right-5 w-1 h-1 rounded-full bg-primary/0 group-hover:bg-primary/60 transition-all duration-500 delay-100" />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  )
}
