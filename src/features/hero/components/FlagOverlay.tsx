"use client"

import { useEffect, useRef, useMemo } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CircleFlag } from "react-circle-flags"

// 32 nations for the World Cup experience
const NATIONS = [
  { code: "ar", label: "Argentina" }, { code: "br", label: "Brasil" },
  { code: "fr", label: "France" }, { code: "de", label: "Germany" },
  { code: "pt", label: "Portugal" }, { code: "es", label: "Spain" },
  { code: "mx", label: "Mexico" }, { code: "us", label: "USA" },
  { code: "ca", label: "Canada" }, { code: "gb-eng", label: "England" },
  { code: "it", label: "Italy" }, { code: "nl", label: "Netherlands" },
  { code: "be", label: "Belgium" }, { code: "hr", label: "Croatia" },
  { code: "ma", label: "Morocco" }, { code: "jp", label: "Japan" },
  { code: "kr", label: "South Korea" }, { code: "sn", label: "Senegal" },
  { code: "uy", label: "Uruguay" }, { code: "co", label: "Colombia" },
  { code: "ch", label: "Switzerland" }, { code: "dk", label: "Denmark" },
  { code: "sa", label: "Saudi Arabia" }, { code: "au", label: "Australia" },
  { code: "ec", label: "Ecuador" }, { code: "rs", label: "Serbia" },
  { code: "cm", label: "Cameroon" }, { code: "gh", label: "Ghana" },
  { code: "pl", label: "Poland" }, { code: "eg", label: "Egypt" },
  { code: "ng", label: "Nigeria" }, { code: "cl", label: "Chile" },
]

export default function FlagOverlay() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  // Pre-calculate positions and timings for 32 flags
  const flagsData = useMemo(() => {
    return NATIONS.map((nation, i) => {
      // Quadrant distribution (0=TL, 1=TR, 2=BL, 3=BR)
      const quad = i % 4

      // Staggered timing: entire block from 0.40 to 0.75
      // 32 flags / 4 per time chunk = 8 waves
      const wave = Math.floor(i / 4)
      const duration = 0.12 // each flag is visible for 0.12 scroll units
      const overlap = 0.08  // waves start every 0.04 scroll units
      const showAt = 0.40 + wave * (duration - overlap)
      const hideAt = showAt + duration

      // Position logic based on quadrant with some scatter
      // We avoid the center where the trophy is (approx 40% to 60% area)
      let top, left, right, bottom;
      const hOffset = 8 + (i % 3) * 8 + "%"
      const vOffset = 10 + (Math.floor(i / 3) % 3) * 12 + "%"

      if (quad === 0) { top = vOffset; left = hOffset }
      if (quad === 1) { top = vOffset; right = hOffset }
      if (quad === 2) { bottom = vOffset; left = hOffset }
      if (quad === 3) { bottom = vOffset; right = hOffset }

      return {
        ...nation,
        showAt,
        hideAt,
        style: { top, left, right, bottom, position: "absolute" } as React.CSSProperties,
        quad
      }
    })
  }, [])

  useEffect(() => {
    let rafId: number

    const tick = () => {
      const st = ScrollTrigger.getById("hero-main-scroll")
      const p = st?.progress ?? 0

      flagsData.forEach((flag, i) => {
        const el = refs.current[i]
        if (!el) return

        const visible = p >= flag.showAt && p < flag.hideAt

        // Smooth fade and movement
        let alpha = 0
        if (visible) {
          const fadeWindow = 0.02
          const fadeIn = Math.min((p - flag.showAt) / fadeWindow, 1)
          const fadeOut = Math.min((flag.hideAt - p) / fadeWindow, 1)
          alpha = Math.min(fadeIn, fadeOut)
        }

        el.style.opacity = String(alpha)

        // Dynamic movement based on quadrant
        if (visible) {
          const moveProgress = (p - flag.showAt) / (flag.hideAt - flag.showAt)
          const drift = (moveProgress - 0.5) * 40 // drift -20px to 20px

          let tx = 0, ty = 0
          if (flag.quad === 0 || flag.quad === 2) tx = drift // move right
          else tx = -drift // move left

          ty = -drift * 0.5 // subtle upward drift

          el.style.transform = `translate(${tx}px, ${ty}px) scale(${0.8 + alpha * 0.2})`
        } else {
          el.style.transform = "translate(0, 20px) scale(0.8)"
        }
      })

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [flagsData])

  return (
    <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden">
      {flagsData.map((flag, i) => (
        <div
          key={`${flag.code}-${i}`}
          ref={el => { refs.current[i] = el }}
          className="opacity-0 will-change-transform"
          style={flag.style}
        >
          <div className="flex flex-col items-center">
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-20 bg-yellow-500"
              style={{ transform: "scale(1.5)" }}
            />

            {/* Circle Flag */}
            <div className="relative rounded-full p-[1px] bg-white/20 backdrop-blur-sm shadow-2xl border border-white/10">
              <CircleFlag
                countryCode={flag.code}
                height="48"
                className="w-12 md:w-14 rounded-full"
              />
            </div>

            {/* Label */}
            <div className="mt-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/5">
              <p className="text-[8px] md:text-[10px] font-bebas tracking-[0.15em] text-white/80 uppercase">
                {flag.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


