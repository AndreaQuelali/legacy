"use client"

import { useMemo } from 'react'
import type { StaticImageData } from 'next/image'
import { useTranslations } from 'next-intl'
import { JOURNEY_MILESTONE_IMAGES } from '../assets/journeyImages'
import { MILESTONE_ICONS, MILESTONE_KEYS } from '../data/journey'

export interface Milestone {
  id: string
  date: string
  title: string
  desc: string
  icon: string
  image: StaticImageData
}

export function useJourneyMilestones(): Milestone[] {
  const t = useTranslations('journey')

  return useMemo(
    () =>
      MILESTONE_KEYS.map((key, index) => ({
        id: t(`${key}.id`),
        date: t(`${key}.date`),
        title: t(`${key}.title`),
        desc: t(`${key}.desc`),
        icon: MILESTONE_ICONS[index],
        image: JOURNEY_MILESTONE_IMAGES[index],
      })),
    [t]
  )
}
