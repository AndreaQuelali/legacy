"use client"

const milestones = [
  {
    date: "MARCH 2024",
    title: "QUALIFIERS BEGIN",
    desc: "Nations across six continents begin their arduous journey to secure one of the 48 coveted spots.",
    icon: "flag",
    side: "left", // text left, card right
  },
  {
    date: "JUNE 2025",
    title: "THE FINAL DRAW",
    desc: "The world watches as groups are drawn and the path to the final is finally revealed for every qualified nation.",
    icon: "shuffle",
    side: "right", // text right, card left
  },
  {
    date: "JUNE 11, 2026",
    title: "OPENING CEREMONY",
    desc: "A spectacle like no other at the Azteca Stadium kicks off the most ambitious tournament in history.",
    icon: "celebration",
    side: "left",
  },
]

export default function TimelineSection() {
  return (
    <section className="py-24 bg-[#131313]">
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-inter text-[11px] font-bold text-primary tracking-[0.4em] uppercase">THE JOURNEY</span>
          <h2 className="font-bebas text-[64px] md:text-[80px] text-white mt-3 uppercase leading-none tracking-tight">ROAD TO 2026</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

          <div className="space-y-20">
            {milestones.map((ms, i) => {
              const isLeft = ms.side === "left"
              return (
                <div key={i} className={`relative flex flex-col md:flex-row items-center gap-10 group ${isLeft ? "" : "md:flex-row-reverse"}`}>
                  {/* Text side */}
                  <div className={`md:w-1/2 ${isLeft ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}>
                    <span className="font-inter text-[11px] font-bold text-primary uppercase tracking-[0.25em]">{ms.date}</span>
                    <h3 className="font-bebas text-[32px] md:text-[40px] text-white mt-2 uppercase tracking-wide">{ms.title}</h3>
                    <p className={`font-inter text-[14px] text-white/55 leading-relaxed mt-2 max-w-sm ${isLeft ? "ml-auto" : ""}`}>{ms.desc}</p>
                  </div>

                  {/* Centre dot */}
                  <div className="relative z-10 hidden md:flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 rounded-full border-2 border-primary bg-[#131313] shadow-[0_0_12px_#e9c176]" />
                  </div>

                  {/* Card placeholder side */}
                  <div className={`md:w-1/2 flex ${isLeft ? "md:justify-start md:pl-16" : "md:justify-end md:pr-16"}`}>
                    <div className="w-72 h-44 border border-white/10 bg-[#1a1a1a] flex items-center justify-center group-hover:border-primary/40 transition-colors">
                      <span className="material-symbols-outlined text-white/[0.08] group-hover:text-primary/15 transition-colors" style={{ fontSize: "56px" }}>{ms.icon}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
