"use client"

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Countdown() {
  const t = useTranslations("hero")

  const [timeLeft, setTimeLeft] = useState(() => {
    const targetDate = new Date('2026-06-11T15:00:00').getTime()
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    }
  })

  useEffect(() => {
    const targetDate = new Date('2026-06-11T15:00:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    { value: timeLeft.days.toString().padStart(2, '0'), label: t("days") },
    { value: timeLeft.hours.toString().padStart(2, '0'), label: t("hours") },
    { value: timeLeft.minutes.toString().padStart(2, '0'), label: t("minutes") },
    { value: timeLeft.seconds.toString().padStart(2, '0'), label: t("seconds") }
  ]

  return (
    <div className="flex flex-col">
      <p className="cinematic-label mb-2 sm:mb-4 opacity-60">
        {t("journey")}
      </p>
      <div className="flex gap-6 sm:gap-8 md:gap-10">
        {stats.map(({ value, label }) => (
          <div key={label} className="anim-countdown flex flex-col opacity-0">
            <span className="countdown-number tabular-nums" suppressHydrationWarning>{value}</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
