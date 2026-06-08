import type { StaticImageData } from 'next/image'
import { STADIUM_IMAGE_MAP } from '../assets/stadiumImages'

export const BENTO_CLASSES_A = [
  'md:col-span-4 md:row-span-2',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-2',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
] as const

export const BENTO_CLASSES_B = [
  'md:col-span-4 md:row-span-2',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-2',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
] as const

export const STADIUMS = [
  { id: '1', image: STADIUM_IMAGE_MAP['1'], bentoA: BENTO_CLASSES_A[0], bentoB: BENTO_CLASSES_B[0] },
  { id: '2', image: STADIUM_IMAGE_MAP['2'], bentoA: BENTO_CLASSES_A[1], bentoB: BENTO_CLASSES_B[1] },
  { id: '3', image: STADIUM_IMAGE_MAP['3'], bentoA: BENTO_CLASSES_A[2], bentoB: BENTO_CLASSES_B[2] },
  { id: '4', image: STADIUM_IMAGE_MAP['4'], bentoA: BENTO_CLASSES_A[3], bentoB: BENTO_CLASSES_B[3] },
  { id: '5', image: STADIUM_IMAGE_MAP['5'], bentoA: BENTO_CLASSES_A[4], bentoB: BENTO_CLASSES_B[4] },
  { id: '6', image: STADIUM_IMAGE_MAP['6'], bentoA: BENTO_CLASSES_A[5], bentoB: BENTO_CLASSES_B[5] },
  { id: '7', image: STADIUM_IMAGE_MAP['7'], bentoA: BENTO_CLASSES_A[6], bentoB: BENTO_CLASSES_B[6] },
  { id: '8', image: STADIUM_IMAGE_MAP['8'], bentoA: BENTO_CLASSES_A[7], bentoB: BENTO_CLASSES_B[7] },
  { id: '9', image: STADIUM_IMAGE_MAP['9'], bentoA: BENTO_CLASSES_A[0], bentoB: BENTO_CLASSES_B[0] },
  { id: '10', image: STADIUM_IMAGE_MAP['10'], bentoA: BENTO_CLASSES_A[1], bentoB: BENTO_CLASSES_B[1] },
  { id: '11', image: STADIUM_IMAGE_MAP['11'], bentoA: BENTO_CLASSES_A[2], bentoB: BENTO_CLASSES_B[2] },
  { id: '12', image: STADIUM_IMAGE_MAP['12'], bentoA: BENTO_CLASSES_A[3], bentoB: BENTO_CLASSES_B[3] },
  { id: '13', image: STADIUM_IMAGE_MAP['13'], bentoA: BENTO_CLASSES_A[4], bentoB: BENTO_CLASSES_B[4] },
  { id: '14', image: STADIUM_IMAGE_MAP['14'], bentoA: BENTO_CLASSES_A[5], bentoB: BENTO_CLASSES_B[5] },
  { id: '15', image: STADIUM_IMAGE_MAP['15'], bentoA: BENTO_CLASSES_A[6], bentoB: BENTO_CLASSES_B[6] },
  { id: '16', image: STADIUM_IMAGE_MAP['16'], bentoA: BENTO_CLASSES_A[7], bentoB: BENTO_CLASSES_B[7] },
] as const

export type StadiumConfig = (typeof STADIUMS)[number]

export interface StadiumItem {
  id: string
  name: string
  city: string
  capacity: string
  image: StaticImageData
  bentoA: string
  bentoB: string
}

export const STADIUM_COUNT = STADIUMS.length
