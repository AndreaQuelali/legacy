"use client"

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import gsap from '@/lib/gsap/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NationCard from './NationCard'

export default function NationsSection() {
  const t = useTranslations('nations')
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const nations = t.raw('nations_list') as Array<{
    id: string
    name: string
    player: string
    motto: string
    desc: string
    founded: string
    titles: string
    stadium: string
  }>

  const activeIndexRef = useRef(0)

  useEffect(() => {
    const totalNations = nations.length
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=5000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        id: "nations-internal",
        onUpdate: (self) => {
          const progress = self.progress
          // We use totalNations + 0.2 to give the last nation more screen time
          const newIndex = Math.min(
            Math.floor(progress * (totalNations + 0.2)),
            totalNations - 1
          )
          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex
            setActiveIndex(newIndex)
          }
        },
      })
    })

    return () => ctx.revert()
  }, [nations.length])

  return (
    <section 
      id="nations" 
      ref={sectionRef} 
      className="relative h-screen w-full bg-[#050505] overflow-hidden"
    >
      {/* Background Atmosphere (Static across all cards for coherence) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.03)_0%,_transparent_50%)]" />

      {/* Nation Chapters */}
      <div className="relative h-full w-full">
        {nations.map((nation, i) => (
          <NationCard 
            key={nation.id} 
            nation={nation} 
            isActive={i === activeIndex} 
            index={i}
          />
        ))}
      </div>

      {/* SIDE INDICATOR (PROGRESS BAR) */}
      <div className="absolute left-6 sm:left-10 md:left-12 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-6">
        <div className="w-[1px] h-32 bg-white/10 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full bg-primary transition-all duration-500 ease-out"
            style={{ height: `${((activeIndex + 1) / nations.length) * 100}%` }}
          />
        </div>
        
        <div className="flex flex-col gap-4">
          {nations.map((nation, i) => (
            <button
              key={nation.id}
              onClick={() => {
                if (!sectionRef.current) return
                // Calculate absolute scroll position: offsetTop + (i / 5.2 * 5000)
                const scrollToPos = sectionRef.current.offsetTop + (i / (nations.length + 0.2)) * 5000 + 1; 
                window.scrollTo({
                  top: scrollToPos,
                  behavior: 'smooth'
                })
              }}
              className="group relative flex items-center"
            >
               <span className={`font-bebas text-[14px] tracking-widest transition-all duration-500 ${i === activeIndex ? 'text-primary scale-110' : 'text-white/20 group-hover:text-white/40'}`}>
                {nation.id}
              </span>
              {i === activeIndex && (
                <div className="absolute -left-4 w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* BOTTOM TRANSITION INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none opacity-50">
        <span className="font-inter text-[9px] font-bold tracking-[0.4em] text-white/40 uppercase">
          {t('scroll_discover')}
        </span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-scroll-hint" />
        </div>
      </div>

      {/* STYLES FOR ANIMATIONS */}
      <style jsx global>{`
        @keyframes scroll-hint {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-hint {
          animation: scroll-hint 2s infinite ease-in-out;
        }
        .ease-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-1%, 2%); }
        }
        .animate-float-slow {
          animation: float-slow 15s infinite ease-in-out;
        }
      `}</style>
    </section>
  )
}
