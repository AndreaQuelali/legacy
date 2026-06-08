"use client"

import TopNavBar from "@/components/layout/TopNavBar"
import Footer from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/hero"
import { StatsBar } from "@/components/sections/stats"
import { NationsSection, NationsMarquee } from "@/components/sections/nations"
import { StadiumSection } from "@/components/sections/stadiums"
import { JourneySection } from "@/components/sections/journey"

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
