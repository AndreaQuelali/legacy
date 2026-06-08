import type { StaticImageData } from 'next/image'

import aztecaImg from './images/Azteca.jpeg'
import soFiImg from './images/SoFi.jpg'
import bcPlaceImg from './images/BC-Place.jpg'
import metlifeImg from './images/Metlife.jpg'
import mercedesBenzImg from './images/Mercedes-Benz.jpg'
import hardRockImg from './images/Hard-Rock.jpeg'
import lumenImg from './images/Lumen.jpg'
import levisImg from "./images/Levi's.jpg"
import attImg from './images/ATT.jpg'
import nrgImg from './images/NRG.jpeg'
import arrowheadImg from './images/Arrowhead.jpeg'
import gilletteImg from './images/Gillette.jpeg'
import lincolnFinancialImg from './images/Lincoln-Financial.jpg'
import bmoImg from './images/BMO.jpg'
import bbvaImg from './images/BBVA.jpg'
import akronImg from './images/Akron.jpg'

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
