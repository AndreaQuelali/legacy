"use client"

import React from 'react'
import TimelineHeader from './TimelineHeader'
import TimelineItem from './TimelineItem'

interface Milestone {
  date: string
  title: string
  desc: string
  icon: string
  side: "left" | "right"
}

const milestones: Milestone[] = [
  {
    date: "MARCH 2024",
    title: "QUALIFIERS BEGIN",
    desc: "NATIONS ACROSS SIX CONTINENTS BEGIN THEIR ARDUOUS JOURNEY TO SECURE ONE OF THE 48 COVETED SPOTS.",
    icon: "flag",
    side: "left",
  },
  {
    date: "JUNE 2025",
    title: "THE FINAL DRAW",
    desc: "THE WORLD WATCHES AS GROUPS ARE DRAWN AND THE PATH TO THE FINAL IS FINALLY REVEALED FOR EVERY QUALIFIED NATION.",
    icon: "shuffle",
    side: "right",
  },
  {
    date: "JUNE 11, 2026",
    title: "OPENING CEREMONY",
    desc: "A SPECTACLE LIKE NO OTHER AT THE AZTECA STADIUM KICKS OFF THE MOST AMBITIOUS TOURNAMENT IN HISTORY.",
    icon: "celebration",
    side: "left",
  },
]

export default function TimelineSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#131313]">
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
