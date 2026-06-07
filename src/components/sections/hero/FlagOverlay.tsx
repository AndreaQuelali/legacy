"use client"

import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CircleFlag } from "react-circle-flags"

// Each flag: country code, scroll range, and screen position
const FLAGS = [
  {
    key: "argentina",
    code: "ar",
    label: "Argentina",
    showAt: 0.41,
    hideAt: 0.54,
    style: { top: "22%", left: "12%" },
  },
  {
    key: "brazil",
    code: "br",
    label: "Brasil",
    showAt: 0.47,
    hideAt: 0.59,
    style: { top: "30%", right: "12%" },
  },
  {
    key: "france",
    code: "fr",
    label: "France",
    showAt: 0.52,
    hideAt: 0.63,
    style: { bottom: "28%", left: "20%" },
  },
  {
    key: "germany",
    code: "de",
    label: "Germany",
    showAt: 0.57,
    hideAt: 0.68,
    style: { top: "18%", right: "22%" },
  },
  {
    key: "portugal",
    code: "pt",
    label: "Portugal",
    showAt: 0.61,
    hideAt: 0.72,
    style: { bottom: "22%", right: "16%" },
  },
] as const

export default function FlagOverlay() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let rafId: number

    const tick = () => {
      const st = ScrollTrigger.getById("hero-main-scroll")
      const p = st?.progress ?? 0

      FLAGS.forEach((flag, i) => {
        const el = refs.current[i]
        if (!el) return

        const visible = p >= flag.showAt && p < flag.hideAt

        // Compute a normalized 0→1→0 opacity over the window
        let alpha = 0
        if (visible) {
          const fadeWindow = 0.02
          const fadeIn  = Math.min((p - flag.showAt) / fadeWindow, 1)
          const fadeOut = Math.min((flag.hideAt - p) / fadeWindow, 1)
          alpha = Math.min(fadeIn, fadeOut)
        }

        el.style.opacity    = String(alpha)
        el.style.transform  = visible
          ? "translateX(0) translateY(0)"
          : flag.key === "france" || flag.key === "portugal"
            ? "translateY(24px)"
            : i % 2 === 0
              ? "translateX(-40px)"
              : "translateX(40px)"
      })

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-[3]">
      {FLAGS.map((flag, i) => (
        <div
          key={flag.key}
          ref={el => { refs.current[i] = el }}
          className="absolute opacity-0 transition-transform duration-300"
          style={flag.style as React.CSSProperties}
        >
          {/* Circular Flag via react-circle-flags */}
          <div className="relative group flex flex-col items-center">
            {/* Glossy shadow/glow for the circle */}
            <div
              className="absolute inset-x-0 top-0 aspect-square rounded-full blur-lg opacity-40 bg-yellow-400/20"
              style={{ transform: "scale(1.2)" }}
            />
            
            <div className="relative rounded-full p-[2px] bg-gradient-to-b from-yellow-300/40 to-yellow-600/40 shadow-2xl">
              <CircleFlag 
                countryCode={flag.code} 
                height="64"
                className="w-16 md:w-20 rounded-full"
              />
            </div>

            {/* Country label */}
            <p className="mt-3 text-center font-bebas tracking-[0.2em] text-xs text-white/70 uppercase">
              {flag.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

