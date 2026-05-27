import TopNavBar from "@/components/layout/TopNavBar"
import Footer from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/hero"
import { StatsBar } from "@/components/sections/stats"
import { NationsSection } from "@/components/sections/nations"
import { StadiumSection } from "@/components/sections/stadiums"
import { TimelineSection } from "@/components/sections/timeline"

export default function Home() {
  return (
    <>
      <TopNavBar />
      <HeroSection />
      <StatsBar />
      <NationsSection />
      <StadiumSection />
      <TimelineSection />
      <Footer />
    </>
  )
}
