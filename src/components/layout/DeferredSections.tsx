"use client"

import dynamic from "next/dynamic"
import { useIdleReady } from "@/hooks/useIdleReady"

// Below-the-fold sections ship in their own chunks, fetched only after the first interaction
const NationsSection = dynamic(() => import("@/features/nations/NationsSection"), { ssr: false })
const StadiumSection = dynamic(() => import("@/features/stadiums/StadiumSection"), { ssr: false })
const StatsBar = dynamic(() => import("@/features/stats/components/StatsBar"), { ssr: false })
const JourneySection = dynamic(() => import("@/features/journey/JourneySection"), { ssr: false })
const NationsMarquee = dynamic(() => import("@/features/nations/components/NationsMarquee"), { ssr: false })

export default function DeferredSections() {
  const ready = useIdleReady()

  // Placeholders keep in-page anchors (#nations, #stadiums, #journey) valid until the real sections mount
  if (!ready) {
    return (
      <div className="min-h-screen bg-[#050505]" aria-hidden="true">
        <div id="nations" />
        <div id="stadiums" />
        <div id="journey" />
      </div>
    )
  }

  return (
    <>
      <NationsSection />
      <StadiumSection />
      <StatsBar />
      <JourneySection />
      <NationsMarquee />
    </>
  )
}
