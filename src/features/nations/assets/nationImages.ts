import type { StaticImageData } from 'next/image'
import type { NationFolder } from '../data/nations'

import spainBg from './images/spain/bg.webp'
import spainFlag from './images/spain/flag.webp'
import spainPlayer from './images/spain/player.webp'
import franceBg from './images/france/bg.webp'
import franceFlag from './images/france/flag.webp'
import francePlayer from './images/france/player.webp'
import argentinaBg from './images/argentina/bg.webp'
import argentinaFlag from './images/argentina/flag.webp'
import argentinaPlayer from './images/argentina/player.webp'
import portugalBg from './images/portugal/bg.webp'
import portugalFlag from './images/portugal/flag.webp'
import portugalPlayer from './images/portugal/player.webp'
import brazilBg from './images/brazil/bg.webp'
import brazilFlag from './images/brazil/flag.webp'
import brazilPlayer from './images/brazil/player.webp'
import germanyBg from './images/germany/bg.webp'
import germanyFlag from './images/germany/flag.webp'
import germanyPlayer from './images/germany/player.webp'

type NationImageKind = 'bg' | 'flag' | 'player'

type NationImageSet = Record<NationImageKind, StaticImageData>

export const NATION_IMAGES: Record<NationFolder, NationImageSet> = {
  spain: { bg: spainBg, flag: spainFlag, player: spainPlayer },
  france: { bg: franceBg, flag: franceFlag, player: francePlayer },
  argentina: { bg: argentinaBg, flag: argentinaFlag, player: argentinaPlayer },
  portugal: { bg: portugalBg, flag: portugalFlag, player: portugalPlayer },
  brazil: { bg: brazilBg, flag: brazilFlag, player: brazilPlayer },
  germany: { bg: germanyBg, flag: germanyFlag, player: germanyPlayer },
}

export function getNationImage(folder: NationFolder, kind: NationImageKind): string {
  return NATION_IMAGES[folder][kind].src
}

export function getNationImageData(folder: NationFolder, kind: NationImageKind): StaticImageData {
  return NATION_IMAGES[folder][kind]
}
