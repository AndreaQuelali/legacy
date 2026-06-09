import type { StaticImageData } from 'next/image'

import aztecaImg from './images/Azteca.webp'
import soFiImg from './images/SoFi.webp'
import bcPlaceImg from './images/BC-Place.webp'
import metlifeImg from './images/Metlife.webp'
import mercedesBenzImg from './images/Mercedes-Benz.webp'
import hardRockImg from './images/Hard-Rock.webp'
import lumenImg from './images/Lumen.webp'
import levisImg from "./images/Levi's.webp"
import attImg from './images/ATT.webp'
import nrgImg from './images/NRG.webp'
import arrowheadImg from './images/Arrowhead.webp'
import gilletteImg from './images/Gillette.webp'
import lincolnFinancialImg from './images/Lincoln-Financial.webp'
import bmoImg from './images/BMO.webp'
import bbvaImg from './images/BBVA.webp'
import akronImg from './images/Akron.webp'

export const STADIUM_IMAGE_MAP = {
  '1': aztecaImg,
  '2': soFiImg,
  '3': bcPlaceImg,
  '4': metlifeImg,
  '5': mercedesBenzImg,
  '6': hardRockImg,
  '7': lumenImg,
  '8': levisImg,
  '9': attImg,
  '10': nrgImg,
  '11': arrowheadImg,
  '12': gilletteImg,
  '13': lincolnFinancialImg,
  '14': bmoImg,
  '15': bbvaImg,
  '16': akronImg,
} as const satisfies Record<string, StaticImageData>

export type StadiumId = keyof typeof STADIUM_IMAGE_MAP
