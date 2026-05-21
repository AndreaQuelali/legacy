import HeroSection from "@/components/sections/HeroSection"
import SectionPlaceholder from "@/components/sections/SectionPlaceholder"

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <div className="relative z-10 bg-stadium-black">
        <SectionPlaceholder title="Nations" />
        <SectionPlaceholder title="Players" />
        <SectionPlaceholder title="Stadium" />
        <SectionPlaceholder title="Timeline" />
        <SectionPlaceholder title="CTA" />
      </div>
      
      <footer className="w-full border-t border-white/5 bg-black py-10 text-center text-xs tracking-widest text-white/20 uppercase">
        © 2026 LEGACY PROJECT | ALL RIGHTS RESERVED
      </footer>
    </>
  )
}
