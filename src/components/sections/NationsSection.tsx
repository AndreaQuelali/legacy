"use client"

const nations = [
  { id: "01", name: "ARGENTINA", player: "LIONEL MESSI" },
  { id: "02", name: "BRAZIL", player: "NEYMAR JR" },
  { id: "03", name: "FRANCE", player: "KYLIAN MBAPPÉ" },
  { id: "04", name: "ENGLAND", player: "HARRY KANE" },
  { id: "05", name: "PORTUGAL", player: "C. RONALDO" },
]

export default function NationsSection() {
  return (
    <section className="py-24 bg-[#131313]">
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-inter text-[11px] font-bold text-primary tracking-[0.4em] uppercase">32 NATIONS. 32 STORIES.</span>
          <h2 className="font-bebas text-[64px] md:text-[80px] text-white mt-3 uppercase leading-none tracking-tight">REPRESENT YOUR COUNTRY</h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-5 gap-3">
          {nations.map((nation) => (
            <div
              key={nation.id}
              className="relative group cursor-pointer overflow-hidden border border-white/[0.07] hover:border-primary/70 transition-all duration-500"
              style={{ height: "420px" }}
            >
              {/* Empty dark background (image placeholder) */}
              <div className="absolute inset-0 bg-[#1a1a1a] group-hover:bg-[#1f1e1c] transition-colors duration-500" />

              {/* Nation number + name — top left */}
              <div className="absolute top-5 left-5 z-10">
                <div className="font-bebas text-[22px] text-primary leading-none">{nation.id}</div>
                <div className="font-bebas text-[16px] text-white tracking-widest mt-0.5">{nation.name}</div>
              </div>

              {/* Player name — bottom left */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)" }}>
                <p className="font-bebas text-[20px] text-white tracking-wide">{nation.player}</p>
                <button className="font-inter text-[10px] font-bold text-primary flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                  VIEW TEAM <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
