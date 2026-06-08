"use client"

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { NATIONS, orderNationsByConfig, type NationData } from '../data/nations'
import type { GalleryItem } from '../components/PlayerGallery3D'

export function useNationsData() {
  const t = useTranslations('nations')
  const nationsRaw = t.raw('nations_list') as NationData[]

  const nations = useMemo(() => orderNationsByConfig(nationsRaw), [nationsRaw])

  const galleryItems = useMemo<GalleryItem[]>(() => {
    return NATIONS.map(({ id, folder }) => {
      const nation = nations.find((n) => n.id === id)
      return {
        id,
        folder,
        name: nation?.name ?? id,
        player: nation?.player ?? '',
      }
    })
  }, [nations])

  return { nations, galleryItems }
}
