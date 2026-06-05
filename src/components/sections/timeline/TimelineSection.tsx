"use client"

import React, { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TimelineHeader from './TimelineHeader'
import JourneyCard from './JourneyCard'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface Milestone {
  id: string
  date: string
  title: string
  desc: string
  icon: string
  image: string
}

export default function TimelineSection() {
  const t = useTranslations('timeline')
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!horizontalRef.current || !containerRef.current) return

      // Horizontal Scroll
      const totalWidth = horizontalRef.current.scrollWidth
      const viewportWidth = window.innerWidth

      gsap.to(horizontalRef.current, {
        x: () => -(totalWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      // Background Parallax — vertical only, no horizontal movement
      gsap.fromTo(".timeline-map", {
        y: -40,
      }, {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: true,
          start: "top bottom",
          end: "bottom top"
        }
      })
    })

    return () => ctx.revert()
  }, [])

  const milestones: Milestone[] = [
    {
      id: t("milestone1.id"),
      date: t("milestone1.date"),
      title: t("milestone1.title"),
      desc: t("milestone1.desc"),
      icon: "public",
      image: "/images/timeline/qualifiers.png"
    },
    {
      id: t("milestone2.id"),
      date: t("milestone2.date"),
      title: t("milestone2.title"),
      desc: t("milestone2.desc"),
      icon: "auto_awesome_motion",
      image: "/images/timeline/draw.png"
    },
    {
      id: t("milestone3.id"),
      date: t("milestone3.date"),
      title: t("milestone3.title"),
      desc: t("milestone3.desc"),
      icon: "groups",
      image: "/images/timeline/group_stage.png"
    },
    {
      id: t("milestone4.id"),
      date: t("milestone4.date"),
      title: t("milestone4.title"),
      desc: t("milestone4.desc"),
      icon: "account_tree",
      image: "/images/timeline/knockout.png"
    },
    {
      id: t("milestone5.id"),
      date: t("milestone5.date"),
      title: t("milestone5.title"),
      desc: t("milestone5.desc"),
      icon: "trophy",
      image: "/images/timeline/final.png"
    },
  ]

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505]"
    >
      {/* Background Map */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Image
          src="/images/timeline/map.png"
          alt="North America Map"
          fill
          sizes='150vw'
          className="object-cover timeline-map scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div ref={containerRef} className="relative z-10 min-h-screen flex flex-col pt-10 md:pt-20">
        <div className="px-6 py-4 md:py-6">
          <TimelineHeader />
        </div>

        <div className="flex flex-col items-center overflow-hidden mt-4 md:mt-8">
          <div
            ref={horizontalRef}
            className="flex gap-20 px-[20vw] md:px-[30vw]"
          >
            {/* Visual Timeline Line */}
            <div className="absolute top-[210px] left-0 w-full h-[1px] bg-white/10" />

            {milestones.map((ms, i) => (
              <div key={ms.id} className="journey-card">
                <JourneyCard
                  {...ms}
                  isLast={i === milestones.length - 1}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="py-12 text-center">
          <span className="font-inter text-[10px] tracking-[0.3em] text-primary/60 uppercase">
            {t("footer_scroll", { defaultValue: "SCROLL TO FOLLOW THE JOURNEY" })}
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary/60 to-transparent mx-auto mt-4" />
        </div>
      </div>
    </section>
  )
}
