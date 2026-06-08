import type { StaticImageData } from 'next/image'
import type { NationFolder } from '../data/nations'

import spainBg from './images/spain/bg.png'
import spainFlag from './images/spain/flag.png'
import spainPlayer from './images/spain/player.png'
import franceBg from './images/france/bg.png'
import franceFlag from './images/france/flag.png'
import francePlayer from './images/france/player.png'
import argentinaBg from './images/argentina/bg.png'
import argentinaFlag from './images/argentina/flag.png'
import argentinaPlayer from './images/argentina/player.png'
import portugalBg from './images/portugal/bg.png'
import portugalFlag from './images/portugal/flag.png'
import portugalPlayer from './images/portugal/player.png'
import brazilBg from './images/brazil/bg.png'
import brazilFlag from './images/brazil/flag.png'
import brazilPlayer from './images/brazil/player.png'
import germanyBg from './images/germany/bg.png'
import germanyFlag from './images/germany/flag.png'
import germanyPlayer from './images/germany/player.png'

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
