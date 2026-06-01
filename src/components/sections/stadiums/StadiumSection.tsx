"use client"

import React, { useEffect, useRef, useState } from 'react'
import gsap, { ScrollTrigger, Flip } from '@/lib/gsap/gsap'
import { useTranslations } from 'next-intl'
import StadiumHeader from './StadiumHeader'
import StadiumCard from './StadiumCard'

const STADIUM_DATA = [
  { id: '1', image: '/images/Azteca.jpg' },
  { id: '2', image: '/images/SoFi.jpg' },
  { id: '3', image: '/images/BC-Place.jpg' },
  { id: '4', image: '/images/Metlife.jpg' },
  { id: '5', image: '/images/Mercedes-Benz.jpg' },
  { id: '6', image: '/images/Hard-Rock.jpeg' },
  { id: '7', image: '/images/Lumen.jpg' },
  { id: '8', image: '/images/Levi\'s.jpg' },
  { id: '9', image: '/images/ATT.jpg' },
  { id: '10', image: '/images/NRG.jpeg' },
  { id: '11', image: '/images/Arrowhead.jpeg' },
  { id: '12', image: '/images/Gillette.jpeg' },
  { id: '13', image: '/images/Lincoln-Financial.jpg' },
  { id: '14', image: '/images/BMO.jpg' },
  { id: '15', image: '/images/BBVA.jpg' },
  { id: '16', image: '/images/Akron.jpg' },
]

export default function StadiumSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [showSecondSet, setShowSecondSet] = useState(false)
  const t = useTranslations('stadiums')
  
  // Get localized data
  const stadiumList = t.raw('list') as Array<{ id: string, name: string, city: string }>
  const localizedStadiums = STADIUM_DATA.map((item, index) => ({
    ...item,
    name: stadiumList[index]?.name || '',
    city: stadiumList[index]?.city || '',
  }))

  const set1 = localizedStadiums.slice(0, 8)
  const set2 = localizedStadiums.slice(8, 16)
  
  const currentSet = showSecondSet ? set2 : set1

  const triggerFlip = (nextState: boolean) => {
    if (!gridRef.current) return
    
    // 1. Capture state
    const state = Flip.getState(".stadium-card", {
      props: "opacity,transform",
    })
    
    // 2. Add a quick overlay fade for smoothness
    const grid = gridRef.current
    gsap.to(grid, { 
      opacity: 0.4, 
      scale: 0.98,
      duration: 0.3, 
      onComplete: () => {
        // 3. Swap state
        setShowSecondSet(nextState)
        
        // 4. Animate back in with Flip
        gsap.delayedCall(0, () => {
          gsap.to(grid, { opacity: 1, scale: 1, duration: 0.4 })
          
          Flip.from(state, {
            duration: 1.2,
            ease: "expo.inOut",
            stagger: 0.04,
            absolute: true,
            onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }),
            onLeave: (elements) => gsap.to(elements, { opacity: 0, y: -30, scale: 0.9, duration: 0.6, ease: "power3.in" })
          })
        })
      }
    })
  }

  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const shouldShowSecond = (self as any).progress > 0.5
          if (shouldShowSecond !== showSecondSet) {
            triggerFlip(shouldShowSecond)
          }
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [showSecondSet])

  // Define Bento grid classes for each index (0-7)
  const getGridClasses = (index: number) => {
    const classes = [
      "md:col-span-4 md:row-span-2 h-[300px] md:h-full", // Item 0
      "md:col-span-2 md:row-span-1 h-[200px] md:h-full", // Item 1
      "md:col-span-2 md:row-span-1 h-[200px] md:h-full", // Item 2
      "md:col-span-2 md:row-span-2 h-[300px] md:h-full", // Item 3
      "md:col-span-2 md:row-span-1 h-[200px] md:h-full", // Item 4
      "md:col-span-2 md:row-span-1 h-[200px] md:h-full", // Item 5
      "md:col-span-2 md:row-span-1 h-[200px] md:h-full", // Item 6
      "md:col-span-2 md:row-span-1 h-[200px] md:h-full", // Item 7
    ]
    return classes[index] || ""
  }

  return (
    <section 
      id="stadiums" 
      ref={containerRef} 
      className="relative min-h-screen bg-[#050505] py-20 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full z-10">
        <StadiumHeader />

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-8 md:grid-rows-3 gap-4 md:gap-6 mt-8 md:h-[720px]"
        >
          {currentSet.map((stadium, index) => (
            <StadiumCard
              key={stadium.id}
              id={stadium.id}
              name={stadium.name}
              city={stadium.city}
              image={stadium.image}
              className={`stadium-card ${getGridClasses(index)}`}
            />
          ))}
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className={`h-[2px] w-12 transition-all duration-500 ${!showSecondSet ? 'bg-primary w-20' : 'bg-white/20'}`} />
        <div className={`h-[2px] w-12 transition-all duration-500 ${showSecondSet ? 'bg-primary w-20' : 'bg-white/20'}`} />
      </div>
    </section>
  )
}

