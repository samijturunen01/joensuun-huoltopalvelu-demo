import { expect, test, type Page } from '@playwright/test'
import { isMobile, navLabels, ready, url } from './helpers'

async function openNav(page: Page) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Avaa valikko' }).click()
    return page.getByRole('navigation', { name: 'Mobiilivalikko' })
  }
  return page.getByRole('navigation', { name: 'Päävalikko' })
}

test('"Etusivu" is the first navigation item and the active item is marked', async ({ page }) => {
  await page.goto(url('hinnasto/'))
  await ready(page)
  const nav = await openNav(page)
  const links = nav.getByRole('link')
  await expect(links.first()).toHaveText(/Etusivu/)
  for (const [i, label] of navLabels.entries()) await expect(links.nth(i)).toContainText(label)
  await expect(nav.getByRole('link', { name: /Hinnasto/ })).toHaveAttribute('aria-current', 'page')
})

test('logo links to the homepage', async ({ page }) => {
  await page.goto(url('varaosat/'))
  await ready(page)
  await page.getByRole('link', { name: /etusivulle/ }).first().click()
  await expect(page).toHaveURL(/joensuun-huoltopalvelu-demo\/?$/)
})

test('navigation menu opens the destination page at the very top', async ({ page }) => {
  await page.goto(url('huolto/'))
  await ready(page)
  await page.evaluate(() => window.scrollTo(0, 1800))
  await page.waitForTimeout(150)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Hinnasto/ }).click()
  await expect(page).toHaveURL(/hinnasto\/$/)
  await expect(page.locator('h1')).toContainText('Hinnasto')
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})

test('CTA buttons open the destination page at the top', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(150)
  await page.locator('#contact-cta').locator('xpath=ancestor::section').getByRole('link', { name: /Tee huoltopyyntö/ }).click()
  await expect(page).toHaveURL(/huoltopyynto\/$/)
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})

test('back and forward restore the scroll position', async ({ page }) => {
  await page.goto(url('huolto/'))
  await ready(page)
  await page.evaluate(() => window.scrollTo(0, 1200))
  await page.waitForTimeout(250)
  // A plain click like a user's: Playwright's click() first scrolls the sticky header link
  // "into view" (moving the page ~half a viewport), which a real visitor never does.
  await page.locator('header a[href$="/varaosat/"], #mobile-menu a[href$="/varaosat/"]').first().dispatchEvent('click')
  await expect(page).toHaveURL(/varaosat\/$/)
  await page.goBack()
  await expect(page).toHaveURL(/huolto\/$/)
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(1200)
  await page.goForward()
  await expect(page).toHaveURL(/varaosat\/$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('anchor links land on their section', async ({ page }) => {
  await page.goto(url('varaosat/#merkit'))
  await ready(page)
  await expect.poll(() => page.evaluate(() => Math.round(document.getElementById('merkit')!.getBoundingClientRect().top))).toBeLessThan(140)
})

test('direct deep links and refresh work', async ({ page }) => {
  await page.goto(url('tyyppikilpi/?merkki=miele&laite=uuni'))
  await ready(page)
  await expect(page.getByRole('heading', { name: /uunin ja lieden tyyppikilpi/ })).toBeVisible()
  await page.reload()
  await ready(page)
  await expect(page.getByRole('heading', { name: /uunin ja lieden tyyppikilpi/ })).toBeVisible()
})

test('page transitions are immediate (no blocking overlay)', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const nav = await openNav(page)
  const t0 = Date.now()
  await nav.getByRole('link', { name: /Yhteystiedot/ }).click()
  await expect(page.locator('h1')).toContainText('tule käymään')
  expect(Date.now() - t0).toBeLessThan(1500)
  // nothing covers the page
  const covered = await page.evaluate(() => {
    const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
    return !!el?.closest('[class*="fixed"][class*="inset-0"]')
  })
  expect(covered).toBe(false)
})

test('mobile menu opens, closes with Escape and navigates', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await page.goto(url())
  await ready(page)
  const toggle = page.getByRole('button', { name: 'Avaa valikko' })
  await toggle.click()
  await expect(page.locator('#mobile-menu')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#mobile-menu')).toBeHidden()
  await toggle.click()
  await page.getByRole('navigation', { name: 'Mobiilivalikko' }).getByRole('link', { name: /Tyyppikilpi/ }).click()
  await expect(page).toHaveURL(/tyyppikilpi\/$/)
  await expect(page.locator('#mobile-menu')).toBeHidden()
})

test('mobile quick-contact bar offers call, WhatsApp and request', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await page.goto(url('hinnasto/'))
  const bar = page.getByRole('navigation', { name: 'Pikayhteydet' })
  await expect(bar.getByRole('link', { name: 'Soita' })).toHaveAttribute('href', 'tel:+358405328734')
  await expect(bar.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', 'https://wa.me/358405328734')
  await expect(bar.getByRole('link', { name: 'Huoltopyyntö' })).toBeVisible()
})
