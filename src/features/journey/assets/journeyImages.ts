import type { StaticImageData } from 'next/image'

import openingImg from './images/01-opening.webp'
import groupsImg from './images/02-groups.webp'
import round32Img from './images/03-round32.webp'
import round16Img from './images/04-round16.webp'
import quartersImg from './images/05-quarters.webp'
import semisImg from './images/06-semis.webp'
import finalImg from './images/07-final.webp'
import mapImg from './images/map.webp'

export const JOURNEY_MILESTONE_IMAGES: readonly StaticImageData[] = [
  openingImg,
  groupsImg,
  round32Img,
  round16Img,
  quartersImg,
  semisImg,
  finalImg,
] as const

export const JOURNEY_MAP_IMAGE = mapImg
