"use client"

import React, { useEffect, useRef } from 'react'
import gsap from '@/lib/gsap/gsap'

interface StatItemProps {
  icon: string
  value: string
  label: string
}

export default function StatItem({ icon, value, label }: StatItemProps) {
  const numberRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!numberRef.current) return
    
    // Parse target value from string (removing any non-digit chars if any)
    const targetValue = parseInt(value.replace(/[^0-9]/g, ''))
    if (isNaN(targetValue)) return

    const numberElement = numberRef.current
    const proxy = { val: 0 }

    gsap.to(proxy, {
      val: targetValue,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: numberElement,
        start: "top 90%",
        once: true
      },
      onUpdate: () => {
        numberElement.innerText = Math.floor(proxy.val).toString()
      }
    })
  }, [value])

  return (
    <div className="flex items-center gap-5">
      <span className="material-symbols-outlined text-primary" style={{ fontSize: "36px" }}>
        {icon}
      </span>
      <div>
        <div 
          ref={numberRef}
          className="countdown-number text-[40px] sm:text-[52px]"
        >
          0
        </div>
        <div className="countdown-label mt-0.5">
          {label}
        </div>
      </div>
    </div>
  )
}
