import { expect, test } from '@playwright/test'
import { isMobile, ready, url } from './helpers'

test('logo intro plays on a full homepage load and ends with the plate photo', async ({ page }) => {
  await page.goto(url())
  // pre-paint hold is in place on first load…
  expect(await page.evaluate(() => document.documentElement.classList.contains('intro-pending') || !!document.querySelector('[data-panel]'))).toBe(true)
  await ready(page)
  // …the mark draws (housing stroke animates) and the porthole opens
  await expect
    .poll(() => page.evaluate(() => getComputedStyle(document.querySelector('[data-porthole]')!).clipPath), { timeout: 6000 })
    .toMatch(/none|circle\(50%/)
  await expect(page.locator('[data-porthole] img')).toBeVisible()
  await expect(page.locator('h1')).toBeInViewport()
  expect(await page.evaluate(() => document.documentElement.classList.contains('intro-pending'))).toBe(false)
})

test('intro plays again after a browser refresh (no storage suppression)', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await page.reload()
  const started = await page.evaluate(
    () =>
      new Promise<boolean>((resolve) => {
        const el = document.querySelector('[data-part="housing"]') as SVGElement | null
        const check = () => el && getComputedStyle(el).strokeDashoffset !== '0px' && getComputedStyle(el).strokeDashoffset !== '0'
        if (check()) return resolve(true)
        let n = 0
        const t = setInterval(() => {
          if (check()) {
            clearInterval(t)
            resolve(true)
          } else if (++n > 40) {
            clearInterval(t)
            resolve(false)
          }
        }, 25)
      }),
  )
  expect(started).toBe(true)
  const storage = await page.evaluate(() => localStorage.length + sessionStorage.length + document.cookie.length)
  expect(storage).toBe(0)
})

test('intro does not replay when returning home through the menu', async ({ page }) => {
  await page.goto(url('hinnasto/'))
  await ready(page)
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Avaa valikko' }).click()
    await page.getByRole('navigation', { name: 'Mobiilivalikko' }).getByRole('link', { name: /Etusivu/ }).click()
  } else {
    await page.getByRole('navigation', { name: 'Päävalikko' }).getByRole('link', { name: 'Etusivu' }).click()
  }
  await expect(page).toHaveURL(/demo\/?$/)
  // immediately complete: panel visible, no hold, porthole open
  await page.waitForTimeout(120)
  const state = await page.evaluate(() => ({
    pending: document.documentElement.classList.contains('intro-pending'),
    panelOpacity: getComputedStyle(document.querySelector('[data-panel]')!).opacity,
    clip: getComputedStyle(document.querySelector('[data-porthole]')!).clipPath,
  }))
  expect(state.pending).toBe(false)
  expect(state.panelOpacity).toBe('1')
  expect(state.clip).toBe('none')
})

test('any input skips the intro instantly', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await page.keyboard.press('Tab')
  await page.waitForTimeout(100)
  const clip = await page.evaluate(() => getComputedStyle(document.querySelector('[data-porthole]')!).clipPath)
  expect(clip).toBe('none')
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test('no intro and all content immediately visible', async ({ page }) => {
    await page.goto(url())
    expect(await page.evaluate(() => document.documentElement.classList.contains('intro-pending'))).toBe(false)
    await ready(page)
    await expect(page.locator('h1')).toBeVisible()
    const state = await page.evaluate(() => ({
      clip: getComputedStyle(document.querySelector('[data-porthole]')!).clipPath,
      reveal: getComputedStyle(document.querySelector('[data-reveal]')!).opacity,
    }))
    expect(state.clip).toBe('none')
    expect(state.reveal).toBe('1')
  })
})
