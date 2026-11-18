import { PLATE_WIDTHS, plateImages, type PlateImageId } from '../data/imageManifest'

/** Prefix a public/ path with the deployment base path. */
export const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

export const plateSrc = (id: PlateImageId, w: (typeof PLATE_WIDTHS)[number] = 960) => asset(`images/plates/${id}-${w}.webp`)

export const plateSrcSet = (id: PlateImageId) =>
  PLATE_WIDTHS.map((w) => `${asset(`images/plates/${id}-${w}.webp`)} ${Math.min(w, plateImages[id].w)}w`).join(', ')

export const plateSize = (id: PlateImageId) => plateImages[id]
