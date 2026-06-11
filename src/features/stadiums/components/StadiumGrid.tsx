"use client"

import type { RefObject } from 'react'
import type { StadiumItem } from '../data/stadiums'
import StadiumCard from './StadiumCard'

interface StadiumGridProps {
  gridRef: RefObject<HTMLDivElement | null>
  items: StadiumItem[]
  bentoClasses: readonly string[]
  gridClass: string
  className?: string
  style?: React.CSSProperties
  onItemClick?: (stadium: StadiumItem) => void
}

export default function StadiumGrid({
  gridRef,
  items,
  bentoClasses,
  gridClass,
  className = '',
  style,
  onItemClick,
}: StadiumGridProps) {
  return (
    <div ref={gridRef} className={`${gridClass} ${className}`} style={style}>
      {items.map((stadium, i) => (
        <StadiumCard
          key={stadium.id}
          id={stadium.id}
          name={stadium.name}
          city={stadium.city}
          capacity={stadium.capacity}
          image={stadium.image}
          className={`stadium-card ${bentoClasses[i]} h-[140px] md:h-auto`}
          onClick={() => onItemClick?.(stadium)}
        />
      ))}
    </div>
  )
}
