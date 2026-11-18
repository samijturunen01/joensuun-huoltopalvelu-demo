import type { Page } from '@playwright/test'

export const BASE = '/joensuun-huoltopalvelu-demo/'
export const url = (p = '') => `${BASE}${p.replace(/^\//, '')}`

export const routes = [
  { path: '', h1: /Joensuussa/ },
  { path: 'huolto/', h1: /Kodinkonehuolto/ },
  { path: 'varaosat/', h1: /Varaosat/ },
  { path: 'tyyppikilpi/', h1: /tyyppikilven/ },
  { path: 'hinnasto/', h1: /Hinnasto/ },
  { path: 'huoltopyynto/', h1: /Kerro laitteesta/ },
  { path: 'yhteystiedot/', h1: /tule käymään/ },
]

export const navLabels = ['Etusivu', 'Huolto', 'Varaosat', 'Tyyppikilpi', 'Hinnasto', 'Yhteystiedot']

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024

/** Collect console errors (ignoring the intentional 404 document status). */
export function trackErrors(page: Page) {
  const errors: string[] = []
  page.on('console', (m) => {
    if (m.type() === 'error' && !/status of 404/.test(m.text())) errors.push(m.text())
  })
  page.on('pageerror', (e) => errors.push(e.message))
  return errors
}

/** Wait until the app has hydrated. */
export const ready = (page: Page) => page.waitForFunction(() => (window as unknown as { __jhpReady?: boolean }).__jhpReady === true)
