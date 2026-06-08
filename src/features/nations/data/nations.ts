export const NATIONS = [
  { id: "01", folder: "spain" },
  { id: "02", folder: "france" },
  { id: "03", folder: "argentina" },
  { id: "04", folder: "portugal" },
  { id: "05", folder: "brazil" },
  { id: "06", folder: "germany" },
] as const

export type NationId = (typeof NATIONS)[number]["id"]
export type NationFolder = (typeof NATIONS)[number]["folder"]

export function getNationFolder(id: string): NationFolder | undefined {
  return NATIONS.find((n) => n.id === id)?.folder
}

export interface NationData {
  id: string
  name: string
  player: string
  motto: string
  desc: string
  founded: string
  titles: string
  stadium: string
}

export function orderNationsByConfig(nations: NationData[]): NationData[] {
  return NATIONS.map(({ id }) => nations.find((n) => n.id === id)).filter(
    (n): n is NationData => n !== undefined
  )
}
