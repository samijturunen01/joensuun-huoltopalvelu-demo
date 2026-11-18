/**
 * Builds the brand assets from the company's authentic logo files
 * (source-assets/original, downloaded from joensuunhuoltopalvelu.fi):
 *  - The wordmark "Joensuun Huoltopalvelu Oy" is traced 1:1 from
 *    Logofinalnew-colors.png with potrace (letter counters preserved).
 *  - The washing-machine mark is rebuilt as stroke geometry (scripts/mark-geometry.mjs)
 *    so it can be animated; it was overlaid on the original to verify the fit.
 *  - Favicons come from the company's own green "JHP" favicon.
 * Output: public/brand/*.svg|png, public/*.png
 */
import sharp from 'sharp'
import potrace from 'potrace'
import fs from 'node:fs/promises'
import { markSvgInner, BADGE } from './mark-geometry.mjs'

const SRC = 'source-assets/original/Logofinalnew-colors.png'
const FAV = 'source-assets/original/cropped-favicon-green.png'
const S = 4 // trace at 4x for smooth curves

const trace = (buf, opts = {}) =>
  new Promise((res, rej) =>
    potrace.trace(buf, { threshold: 128, turdSize: 8, optTolerance: 0.25, alphaMax: 1, ...opts }, (e, svg) =>
      e ? rej(e) : res(svg),
    ),
  )
const pathsOf = (svg) => [...svg.matchAll(/<path[^>]*d="([^"]+)"/g)].map((m) => m[1])
const scalePath = (d, k, dx = 0, dy = 0) =>
  d
    .replace(/(-?\d+(?:\.\d+)?)[ ,]+(-?\d+(?:\.\d+)?)/g, (_, a, b) => `${+(a * k + dx).toFixed(1)} ${+(b * k + dy).toFixed(1)}`)
    .replace(/\s*,\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/ ?([MCLZ]) ?/g, '$1')

async function whiteMask(file, x, w) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const g = Buffer.alloc(info.width * info.height)
  for (let i = 0; i < g.length; i++) {
    const a = data[i * 4 + 3]
    const white = a < 128 ? 0 : Math.min(data[i * 4], data[i * 4 + 1], data[i * 4 + 2])
    g[i] = 255 - white // artwork → dark for potrace
  }
  return sharp(g, { raw: { width: info.width, height: info.height, channels: 1 } })
    .extract({ left: x, top: 0, width: w, height: info.height })
    .resize(w * S, info.height * S, { kernel: 'lanczos3' })
    .png()
    .toBuffer()
}

// ---- Wordmark (x ≥ 228 in the 1244×285 source) ----
const WORD_X = 228
const meta = await sharp(SRC).metadata()
const wordSvg = await trace(await whiteMask(SRC, WORD_X, meta.width - WORD_X))
const word = pathsOf(wordSvg)
  .map((d) => scalePath(d, 1 / S, WORD_X))
  .join('')
// Word bounds in source space (measured): x 232–1195, y 118–231
const WB = { x: 230, y: 112, w: 968, h: 122 }

const wordFile = (fill) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${WB.x} ${WB.y} ${WB.w} ${WB.h}" role="img" aria-label="Joensuun Huoltopalvelu Oy"><path fill="${fill}" fill-rule="evenodd" d="${word}"/></svg>\n`

const gradient = `<linearGradient id="jhp-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5AC071"/><stop offset=".22" stop-color="#2EA15C"/><stop offset=".36" stop-color="#008648"/><stop offset=".78" stop-color="#005A29"/><stop offset="1" stop-color="#005223"/></linearGradient>`
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BADGE.w} ${BADGE.h}" role="img" aria-label="Joensuun Huoltopalvelu Oy"><defs>${gradient}</defs><rect width="${BADGE.w}" height="${BADGE.h}" rx="${BADGE.r}" fill="url(#jhp-g)"/>${markSvgInner('#fff')}<path fill="#fff" fill-rule="evenodd" d="${word}"/></svg>\n`

await fs.mkdir('public/brand', { recursive: true })
await fs.writeFile('public/brand/logo.svg', logo)
await fs.writeFile('public/brand/wordmark-white.svg', wordFile('#ffffff'))
await fs.writeFile('public/brand/wordmark-ink.svg', wordFile('#0d1a12'))

// ---- Favicon: trace the "JHP" letters of the company's own favicon ----
const favMeta = await sharp(FAV).metadata()
const favSvg = await trace(await whiteMask(FAV, 0, favMeta.width), { turdSize: 20 })
const fav = pathsOf(favSvg)
  .map((d) => scalePath(d, 1 / S))
  .join('')
const W = favMeta.width
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}"><rect width="${W}" height="${W}" rx="${W * 0.3}" fill="#007F38"/><path fill="#fff" fill-rule="evenodd" d="${fav}"/></svg>\n`
await fs.writeFile('public/brand/favicon.svg', favicon)
for (const [size, name] of [
  [32, 'favicon-32.png'],
  [180, 'apple-touch-icon.png'],
  [192, 'icon-192.png'],
  [512, 'icon-512.png'],
]) {
  await sharp(FAV).resize(size, size).png().toFile(`public/${name}`)
}

// ---- Logo PNG for structured data ----
await sharp(Buffer.from(logo)).resize(1244).png().toFile('public/brand/logo.png')
console.log('brand assets built:', word.length, 'chars wordmark path')
