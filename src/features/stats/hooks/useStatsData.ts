"use client"

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { STADIUM_COUNT } from '@/features/stadiums/data/stadiums'
import { STAT_CONFIG } from '../data/stats'

export interface StatData {
  icon: string
  value: string
  label: string
}

export function useStatsData(): StatData[] {
  const t = useTranslations('stats')

  return useMemo(
    () =>
      STAT_CONFIG.map((stat) => ({
        icon: stat.icon,
        value: 'valueKey' in stat ? String(STADIUM_COUNT) : stat.value,
        label: t('valueKey' in stat ? stat.valueKey : stat.labelKey),
      })),
    [t]
  )
}
