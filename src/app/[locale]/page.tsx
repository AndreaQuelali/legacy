"use client"

import TopNavBar from "@/components/layout/TopNavBar"
import Footer from "@/components/layout/Footer"
import { HeroSection } from "@/features/hero"
import DeferredSections from "@/components/layout/DeferredSections"

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <TopNavBar />
      <HeroSection />
      <DeferredSections />
      <Footer />
    </div>
  )
}
