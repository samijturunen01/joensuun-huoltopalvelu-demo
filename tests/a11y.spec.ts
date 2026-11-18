import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { ready, routes, url } from './helpers'

test.describe('accessibility (axe, WCAG 2.1 A/AA)', () => {
  test.use({ reducedMotion: 'reduce' }) // audit the settled page, not mid-animation

  for (const r of [...routes, { path: 'ei-ole/', h1: /./ }]) {
    test(`/${r.path}`, async ({ page }) => {
      await page.goto(url(r.path))
      await ready(page)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 4).join(' | ')}`)).toEqual([])
    })
  }

  test('keyboard: skip link and visible focus', async ({ page }) => {
    await page.goto(url('huolto/'))
    await ready(page)
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Siirry sisältöön' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeInViewport()
    await page.keyboard.press('Enter')
    await page.keyboard.press('Tab')
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle)
    expect(outline).not.toBe('none')
  })
})
