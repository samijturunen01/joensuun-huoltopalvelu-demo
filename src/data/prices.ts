/**
 * Price list exactly as published on joensuunhuoltopalvelu.fi/hinnasto/
 * ("Hinnat sis. alv 25.5%"). Labels are lightly normalised for readability;
 * the amounts are unchanged. Verify with the customer before production.
 */
export interface PriceRow {
  label: string
  original: string
  price: number
  unit?: string
}

export const VAT_LABEL = 'Hinnat sisältävät arvonlisäveron 25,5 %.'

export const workPrices: PriceRow[] = [
  { label: 'Lisätyö / pienkorjaus', original: 'Lisätyö/pienkorjaus', price: 25.3 },
  { label: 'Lisä-, pien- tai tarkistuskorjaus', original: 'Lisä-/Pien-/Tarkistuskorjaus', price: 39.5 },
  { label: 'Kustannusarvio / lisä- tai pienkorjaus', original: 'Kustannusarvio/Lisä-/Pienkorjaus', price: 59.7 },
  { label: 'Kustannusarvio (laajempi)', original: 'Kustannusarvio (laajempi)', price: 75.9 },
  { label: 'Yleiskorjaus / työtunti', original: 'Yleiskorjaus/Työtunti', price: 79.95 },
  { label: 'Yleiskorjaus, laajempi', original: 'Yleiskorjaus Laajempi', price: 113.35 },
  { label: 'Yleiskorjaus, iso tai vaativa', original: 'Yleiskorjaus Iso/Vaativa', price: 151.8 },
]

export interface Zone {
  id: string
  label: string
  detail: string
  original: string
  price: number
  unit?: string
}

export const travelZones: Zone[] = [
  { id: 'kaupunki', label: 'Kaupungin alue', detail: 'Joensuun kaupungin alue', original: 'AJO Kaupungin alue', price: 15.2 },
  { id: 'v2', label: '2-vyöhyke', detail: 'alle 20 km', original: 'AJO 2-vyöhyke (alle 20km)', price: 30.35 },
  { id: 'v3', label: '3-vyöhyke', detail: 'alle 30 km', original: 'AJO 3-vyöhyke (alle 30km)', price: 40.5 },
  { id: 'yli30', label: 'Yli 30 km', detail: 'ajo + matka', original: 'AJO + MATKA (yli 30km)', price: 1.6, unit: '/km' },
]

const fmt = new Intl.NumberFormat('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
export const euro = (n: number, unit = '') => `${fmt.format(n)} €${unit ? ` ${unit}` : ''}`
