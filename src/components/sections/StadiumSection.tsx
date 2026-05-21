"use client"

export default function StadiumSection() {
  return (
    <section className="py-24 bg-[#131313]">
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="font-inter text-[11px] font-bold text-primary tracking-[0.4em] uppercase">IMMERSE YOURSELF</span>
            <h2 className="font-bebas text-[56px] md:text-[64px] text-white mt-2 uppercase leading-none">THE ARENAS OF 2026</h2>
          </div>
          <button className="px-7 py-3 border border-white/25 font-inter text-[11px] font-bold text-white hover:border-primary hover:text-primary transition-all uppercase tracking-[0.18em] whitespace-nowrap">
            VIEW ALL VENUES
          </button>
        </div>

        {/* Grid: big left + 2 small right */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5">
          {/* Large card — Azteca */}
          <div className="relative overflow-hidden border border-white/[0.08] group" style={{ height: "440px" }}>
            <div className="absolute inset-0 bg-[#1a1918]" />
            <div className="absolute bottom-0 left-0 right-0 p-8"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)" }}>
              <h3 className="font-bebas text-[28px] text-white uppercase tracking-wide">AZTECA STADIUM, MEXICO CITY</h3>
              <p className="font-inter text-[11px] font-bold text-primary uppercase tracking-[0.15em] mt-1">CAPACITY: 87,523</p>
            </div>
          </div>

          {/* Small cards column */}
          <div className="flex flex-col gap-5 w-full md:w-[310px]">
            {/* SoFi */}
            <div className="relative overflow-hidden border border-white/[0.08] group" style={{ height: "210px" }}>
              <div className="absolute inset-0 bg-[#1a1918]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h4 className="font-bebas text-[24px] text-white uppercase tracking-widest">SOFI STADIUM</h4>
                <span className="font-inter text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mt-1">LOS ANGELES</span>
              </div>
            </div>
            {/* BC Place */}
            <div className="relative overflow-hidden border border-white/[0.08] group" style={{ height: "210px" }}>
              <div className="absolute inset-0 bg-[#161a19]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h4 className="font-bebas text-[24px] text-white uppercase tracking-widest">BC PLACE</h4>
                <span className="font-inter text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mt-1">VANCOUVER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
