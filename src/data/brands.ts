/**
 * Brands listed on the original homepage ("Kauttamme saat varaosat ja huollon
 * seuraaviin merkkeihin"). Group = which rating-plate guide on the original
 * "Ota yhteyttä" page covers the brand. Brands without a group have no
 * dedicated guide on the original site.
 */
export type GuideGroupId = 'miele' | 'electrolux' | 'gorenje' | 'bsh'

export interface Brand {
  id: string
  name: string
  /** Label used on the original site. */
  label: string
  category: 'kodinkoneet' | 'keskuspölynimurit' | 'pölynimurit'
  group?: GuideGroupId
}

export const brands: Brand[] = [
  { id: 'aeg', name: 'AEG', label: 'AEG kodinkoneet', category: 'kodinkoneet', group: 'electrolux' },
  { id: 'electrolux', name: 'Electrolux', label: 'Electrolux kodinkoneet', category: 'kodinkoneet', group: 'electrolux' },
  { id: 'asko', name: 'Asko', label: 'ASKO & ASKO Professional kodinkoneet', category: 'kodinkoneet', group: 'gorenje' },
  { id: 'allaway', name: 'Allaway', label: 'Allaway keskuspölynimurit', category: 'keskuspölynimurit' },
  { id: 'bosch', name: 'Bosch', label: 'Bosch kodinkoneet', category: 'kodinkoneet', group: 'bsh' },
  { id: 'elektro-helios', name: 'Elektro Helios', label: 'Elektro Helios kodinkoneet', category: 'kodinkoneet' },
  { id: 'gorenje', name: 'Gorenje', label: 'Gorenje kodinkoneet', category: 'kodinkoneet', group: 'gorenje' },
  { id: 'gaggenau', name: 'Gaggenau', label: 'Gaggenau kodinkoneet', category: 'kodinkoneet', group: 'bsh' },
  { id: 'hisense', name: 'Hisense', label: 'Hisense kodinkoneet', category: 'kodinkoneet', group: 'gorenje' },
  { id: 'junker', name: 'Junker', label: 'Junker kodinkoneet', category: 'kodinkoneet', group: 'bsh' },
  { id: 'miele', name: 'Miele', label: 'Miele & Miele Professional kodinkoneet', category: 'kodinkoneet', group: 'miele' },
  { id: 'puzer', name: 'Puzer', label: 'Puzer keskuspölynimurit', category: 'keskuspölynimurit' },
  { id: 'progress', name: 'Progress', label: 'Progress kodinkoneet', category: 'kodinkoneet', group: 'electrolux' },
  { id: 'rosenlew', name: 'Rosenlew', label: 'Rosenlew kodinkoneet', category: 'kodinkoneet', group: 'electrolux' },
  { id: 'siemens', name: 'Siemens', label: 'Siemens kodinkoneet', category: 'kodinkoneet', group: 'bsh' },
  { id: 'upo', name: 'UPO', label: 'UPO kodinkoneet', category: 'kodinkoneet', group: 'gorenje' },
  { id: 'volta', name: 'Volta', label: 'Volta pölynimurit', category: 'pölynimurit' },
  { id: 'zanussi', name: 'Zanussi', label: 'Zanussi kodinkoneet', category: 'kodinkoneet' },
]

export const brandById = (id: string | null | undefined) => brands.find((b) => b.id === id)
export const brandCount = brands.length
