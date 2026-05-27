"use client"

import React, { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { fadeUp } from '@/providers/AnimationProvider'
import TimelineHeader from './TimelineHeader'
import TimelineItem from './TimelineItem'

interface Milestone {
  date: string
  title: string
  desc: string
  icon: string
  side: "left" | "right"
}

export default function TimelineSection() {
  const t = useTranslations('timeline')
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    if (sectionRef.current) {
      fadeUp(sectionRef.current)
    }
  }, [])

  const milestones: Milestone[] = [
    {
      date: t("milestone1.date"),
      title: t("milestone1.title"),
      desc: t("milestone1.desc"),
      icon: "flag",
      side: "left",
    },
    {
      date: t("milestone2.date"),
      title: t("milestone2.title"),
      desc: t("milestone2.desc"),
      icon: "shuffle",
      side: "right",
    },
    {
      date: t("milestone3.date"),
      title: t("milestone3.title"),
      desc: t("milestone3.desc"),
      icon: "celebration",
      side: "left",
    },
  ]
  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-[#131313]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <TimelineHeader />

        <div className="relative">
          {/* Central Vertical Line (Visible only on Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

          {/* Milestone List */}
          <div className="space-y-16 md:space-y-24">
            {milestones.map((ms, i) => (
              <TimelineItem key={i} {...ms} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
