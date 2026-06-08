import type { StaticImageData } from 'next/image'

import openingImg from './images/01-opening.jpg'
import groupsImg from './images/02-groups.jpg'
import round32Img from './images/03-round32.jpg'
import round16Img from './images/04-round16.jpg'
import quartersImg from './images/05-quarters.jpg'
import semisImg from './images/06-semis.jpg'
import finalImg from './images/07-final.jpg'
import mapImg from './images/map.png'

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
