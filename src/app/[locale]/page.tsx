import TopNavBar from "@/components/layout/TopNavBar"
import Footer from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/hero"
import StatsBar from "@/components/sections/StatsBar"
import NationsSection from "@/components/sections/NationsSection"
import StadiumSection from "@/components/sections/StadiumSection"
import TimelineSection from "@/components/sections/TimelineSection"

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
