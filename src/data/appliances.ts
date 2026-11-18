import type { PlateImageId } from './imageManifest'

/**
 * Appliance types. The list follows the rating-plate guide on the original
 * "Ota yhteyttä" page plus the vacuum brands on the original homepage
 * (Allaway and Puzer central vacuums, Volta vacuums).
 */
export type ApplianceId =
  | 'pesukone'
  | 'jaakaappi'
  | 'astianpesukone'
  | 'uuni'
  | 'keittotaso'
  | 'mikro'
  | 'imuri'
  | 'keskusimuri'

export interface Appliance {
  id: ApplianceId
  name: string
  short: string
  /** Genitive of the short name, e.g. "pesukoneen". */
  genitive: string
  /** One-line rating-plate hint (condensed from the original guide). */
  hint: string
  /** A representative authentic photo from the company's guide. */
  photo?: PlateImageId
  inGuide: boolean
}

export const appliances: Appliance[] = [
  {
    id: 'pesukone',
    name: 'Pyykinpesukoneet ja kuivausrummut',
    short: 'Pesukone',
    genitive: 'pyykinpesukoneen',
    hint: 'Kilpi yleensä täyttöluukun kauluksen vieressä tai luukun sisäpinnassa.',
    photo: 'miele-pesukone',
    inGuide: true,
  },
  {
    id: 'jaakaappi',
    name: 'Jääkaapit ja pakastimet',
    short: 'Jääkaappi',
    genitive: 'jääkaapin',
    hint: 'Kilpi kaapin sisäsivulla, usein vihanneslokeron takana.',
    photo: 'electrolux-jaakaappi',
    inGuide: true,
  },
  {
    id: 'astianpesukone',
    name: 'Astianpesukoneet',
    short: 'Astianpesukone',
    genitive: 'astianpesukoneen',
    hint: 'Kilpi luukun reunassa tai yläosassa, kun luukku on auki.',
    photo: 'miele-astianpesukone',
    inGuide: true,
  },
  {
    id: 'uuni',
    name: 'Uunit ja liedet',
    short: 'Uuni ja liesi',
    genitive: 'uunin ja lieden',
    hint: 'Kilpi rungossa tai uunikammion reunassa, kun luukku on auki.',
    photo: 'miele-uuni',
    inGuide: true,
  },
  {
    id: 'keittotaso',
    name: 'Keitto- ja induktiotasot',
    short: 'Keittotaso',
    genitive: 'keittotason',
    hint: 'Kilpi laitteen pohjassa – luettavissa myös avoimen upotusreiän kautta.',
    photo: 'gorenje-keittotaso',
    inGuide: true,
  },
  {
    id: 'mikro',
    name: 'Mikroaaltouunit',
    short: 'Mikro',
    genitive: 'mikroaaltouunin',
    hint: 'Kilpi rungossa luukun alla tai käyttöpaneelin sivussa.',
    photo: 'electrolux-mikro',
    inGuide: true,
  },
  {
    id: 'imuri',
    name: 'Pölynimurit',
    short: 'Pölynimuri',
    genitive: 'pölynimurin',
    hint: 'Kilpi imurin pohjassa.',
    photo: 'miele-imuri',
    inGuide: true,
  },
  {
    id: 'keskusimuri',
    name: 'Keskuspölynimurit',
    short: 'Keskusimuri',
    genitive: 'keskuspölynimurin',
    hint: 'Allaway- ja Puzer-keskuspölynimurit.',
    inGuide: false,
  },
]

export const applianceById = (id: string | null | undefined) => appliances.find((a) => a.id === id)
