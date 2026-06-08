"use client"

export default function HeroAtmosphere() {
  return (
    <div className="trophy-atmosphere-layer absolute inset-0 z-[1] pointer-events-none opacity-0">
      {/* Blurred stadium background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(40px) brightness(0.18)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Golden radial halo (center glow) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 55% at 50% 58%, rgba(233,193,118,0.22) 0%, rgba(233,193,118,0.06) 45%, transparent 70%)',
        }}
      />

      {/* Secondary warm glow ring */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 35% 35% at 50% 60%, rgba(253,224,139,0.14) 0%, transparent 60%)',
          animation: 'halopulse 3s ease-in-out infinite',
        }}
      />

      {/* Volumetric fog — bottom layer */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5"
        style={{
          background: 'linear-gradient(to top, rgba(233,193,118,0.07) 0%, transparent 100%)',
        }}
      />

      {/* Volumetric fog — mid layer (slight offset) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 80%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Vignette to keep edges dark */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)',
        }}
      />
    </div>
  )
}
