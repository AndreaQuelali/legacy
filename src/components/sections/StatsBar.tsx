"use client"

const stats = [
  { icon: "public", value: "32", label: "NATIONS" },
  { icon: "groups", value: "736", label: "PLAYERS" },
  { icon: "stadium", value: "16", label: "HOST CITIES" },
  { icon: "emoji_events", value: "1", label: "CHAMPION" },
]

export default function StatsBar() {
  return (
    <section className="py-14 bg-[#0e0e0e] border-y border-white/5">
      <div className="max-w-[1440px] mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-5">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "36px" }}>{stat.icon}</span>
            <div>
              <div className="font-bebas text-[52px] leading-none text-white">{stat.value}</div>
              <div className="font-inter text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase mt-0.5">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
