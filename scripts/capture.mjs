/**
 * Visual QA helper: screenshots of every route (desktop/tablet/mobile) plus
 * intro animation frames. Usage:
 *   node scripts/capture.mjs <outDir> [baseUrl] [--intro] [--only=/path/]
 */
import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'

const out = process.argv[2] || 'qa-shots'
const baseUrl = (process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : 'http://127.0.0.1:4317/joensuun-huoltopalvelu-demo/').replace(/\/?$/, '/')
const intro = process.argv.includes('--intro')
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7)
const routes = only ? [only] : ['', 'huolto/', 'varaosat/', 'tyyppikilpi/', 'hinnasto/', 'huoltopyynto/', 'yhteystiedot/', 'ei-ole-olemassa/']
const viewports = [
  ['d', 1440, 900],
  ['t', 834, 1112],
  ['m', 390, 844],
]

await fs.mkdir(out, { recursive: true })
const browser = await chromium.launch()

if (intro) {
  for (const [tag, w, h] of [viewports[0], viewports[2]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } })
    await page.goto(baseUrl, { waitUntil: 'commit' })
    const t0 = Date.now()
    for (const ms of [150, 600, 1100, 1600, 2200, 2800, 3600]) {
      await page.waitForTimeout(Math.max(0, ms - (Date.now() - t0)))
      await page.screenshot({ path: `${out}/intro-${tag}-${String(ms).padStart(4, '0')}.png` })
    }
    await page.close()
  }
} else {
  for (const [tag, w, h] of viewports) {
    const page = await browser.newPage({ viewport: { width: w, height: h } })
    const errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(e.message))
    for (const r of routes) {
      await page.goto(baseUrl + r, { waitUntil: 'networkidle' })
      await page.waitForTimeout(3800)
      // reveal everything for a full-page shot
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 60))
        }
        window.scrollTo(0, 0)
      })
      await page.waitForTimeout(1300)
      const name = (r.replace(/\//g, '') || 'home').slice(0, 20)
      await page.screenshot({ path: `${out}/${tag}-${name}.png`, fullPage: true })
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      if (overflow > 0) console.log(`OVERFLOW ${tag} ${r}: ${overflow}px`)
    }
    if (errors.length) console.log(`console errors (${tag}):`, [...new Set(errors)].join('\n'))
    await page.close()
  }
}
await browser.close()
console.log('captured →', out)
