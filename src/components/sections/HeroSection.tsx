"use client"

import { useEffect, useRef } from "react"
import { fadeUp } from "@/providers/AnimationProvider"

export default function HeroSection() {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (h1Ref.current) fadeUp(h1Ref.current, 0.2)
    if (pRef.current) fadeUp(pRef.current, 0.4)
  }, [])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background — dark stadium atmosphere */}
      <div className="absolute inset-0 z-0 bg-[#0d0d0d]">
        {/* Spotlight vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(80,70,40,0.18) 0%, transparent 70%), radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.85) 100%)",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Small label above */}
        <span className="font-inter text-[11px] font-bold tracking-[0.45em] text-primary uppercase mb-2">
          FIFA WORLD CUP
        </span>
        {/* Gold line */}
        <div className="h-[1px] w-20 bg-primary mb-3" />

        {/* Year */}
        <div className="font-bebas text-[64px] leading-none text-white mb-1">2026</div>

        {/* Main headline */}
        <h1 ref={h1Ref} className="font-bebas leading-[0.88] tracking-tight text-white uppercase drop-shadow-2xl" style={{ fontSize: "clamp(80px, 14vw, 170px)" }}>
          THE WORLD <br />
          <span className="text-primary">IS OUR STAGE</span>
        </h1>

        {/* Body text */}
        <p ref={pRef} className="font-inter text-[16px] text-white/70 max-w-xl mx-auto mt-5 mb-10 leading-relaxed">
          32 nations. 1 dream. The road to glory begins now. Experience the largest football event in history across North America.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button className="group relative px-10 py-3.5 border border-primary overflow-hidden transition-all duration-500 min-w-[260px]">
            <span className="relative z-10 font-bebas text-[22px] tracking-widest text-white group-hover:text-black transition-colors duration-300">
              EXPLORE THE NATIONS
            </span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <button className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_14px_#e9c176] transition-all">
              <span className="material-symbols-outlined text-white group-hover:text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
            </div>
            <span className="font-inter text-[11px] font-bold tracking-[0.2em] text-white/60 group-hover:text-white transition-colors uppercase">
              WATCH TRAILER
            </span>
          </button>
        </div>
      </div>

      {/* Bottom bar: countdown left + location right */}
      <div className="absolute bottom-10 inset-x-0 px-10 z-20 flex items-end justify-between max-w-[1440px] mx-auto w-full">
        <div>
          <p className="font-inter text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase mb-3">THE JOURNEY BEGINS IN</p>
          <div className="flex gap-10">
            {[["245", "DAYS"], ["14", "HOURS"], ["32", "MINUTES"]].map(([v, l]) => (
              <div key={l} className="flex flex-col">
                <span className="font-bebas text-[48px] leading-none text-white">{v}</span>
                <span className="font-inter text-[10px] font-bold tracking-[0.2em] text-primary/70 uppercase">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-right hidden md:block">
          <p className="font-inter text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase mb-1">CURRENT LOCATION</p>
          <p className="font-bebas text-[28px] text-white tracking-widest">UNITED STATES • MEXICO • CANADA</p>
        </div>
      </div>
    </section>
  )
}
