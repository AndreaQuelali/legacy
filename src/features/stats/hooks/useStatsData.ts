"use client"

import { useTranslations } from 'next-intl'

export interface StatData {
  icon: string
  value: string
  label: string
}

export function useStatsData(): StatData[] {
  const t = useTranslations('stats')
  return [
    { icon: "public", value: "32", label: t("nations") },
    { icon: "groups", value: "736", label: t("players") },
    { icon: "stadium", value: "16", label: t("host_cities") },
    { icon: "emoji_events", value: "1", label: t("champion") },
  ]
}
