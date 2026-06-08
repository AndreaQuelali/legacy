"use client"

import { useTranslations } from 'next-intl'

export interface StadiumItem {
  id: string
  name: string
  city: string
  capacity: string
  image: string
}

const STADIUM_IMAGES = [
  '/images/stadiums/Azteca.jpeg',
  '/images/stadiums/SoFi.jpg',
  '/images/stadiums/BC-Place.jpg',
  '/images/stadiums/Metlife.jpg',
  '/images/stadiums/Mercedes-Benz.jpg',
  '/images/stadiums/Hard-Rock.jpeg',
  '/images/stadiums/Lumen.jpg',
  "/images/stadiums/Levi's.jpg",
  '/images/stadiums/ATT.jpg',
  '/images/stadiums/NRG.jpeg',
  '/images/stadiums/Arrowhead.jpeg',
  '/images/stadiums/Gillette.jpeg',
  '/images/stadiums/Lincoln-Financial.jpg',
  '/images/stadiums/BMO.jpg',
  '/images/stadiums/BBVA.jpg',
  '/images/stadiums/Akron.jpg',
]

export function useStadiumData(): StadiumItem[] {
  const t = useTranslations('stadiums')
  const stadiumList = t.raw('list') as Array<{ id: string; name: string; city: string; capacity: string }>

  return STADIUM_IMAGES.map((image, i) => ({
    id: String(i + 1),
    image,
    name: stadiumList[i]?.name || '',
    city: stadiumList[i]?.city || '',
    capacity: stadiumList[i]?.capacity || '',
  }))
}
