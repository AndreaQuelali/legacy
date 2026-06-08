"use client"

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { STADIUMS, type StadiumItem } from '../data/stadiums'

interface StadiumListEntry {
  id: string
  name: string
  city: string
  capacity: string
}

export function useStadiumData(): StadiumItem[] {
  const t = useTranslations('stadiums')
  const stadiumList = t.raw('list') as StadiumListEntry[]

  return useMemo(() => {
    const listById = new Map(stadiumList.map((entry) => [entry.id, entry]))

    return STADIUMS.map((stadium) => {
      const entry = listById.get(stadium.id)
      return {
        id: stadium.id,
        image: stadium.image,
        bentoA: stadium.bentoA,
        bentoB: stadium.bentoB,
        name: entry?.name ?? '',
        city: entry?.city ?? '',
        capacity: entry?.capacity ?? '',
      }
    })
  }, [stadiumList])
}
