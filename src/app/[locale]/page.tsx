"use client"

import TopNavBar from "@/components/layout/TopNavBar"
import Footer from "@/components/layout/Footer"
import { HeroSection } from "@/features/hero"
import { StatsBar } from "@/features/stats"
import { NationsSection, NationsMarquee } from "@/features/nations"
import { StadiumSection } from "@/features/stadiums"
import { JourneySection } from "@/features/journey"

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <TopNavBar />
      <HeroSection />
      <NationsSection />
      <StadiumSection />
      <StatsBar />
      <JourneySection />
      <NationsMarquee />
      <Footer />
    </div>
  )
}
