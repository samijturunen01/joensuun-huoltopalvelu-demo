import { expect, test } from '@playwright/test'
import { ready, url } from './helpers'

test('rating-plate guide: brand + appliance update the photo, URL and request link', async ({ page }) => {
  await page.goto(url('tyyppikilpi/'))
  await ready(page)
  await page.getByRole('button', { name: 'Miele', exact: true }).click()
  await page.getByRole('button', { name: /Uuni ja liesi/ }).click()
  await expect(page).toHaveURL(/merkki=miele/)
  await expect(page).toHaveURL(/laite=uuni/)
  await expect(page.getByRole('heading', { name: /uunin ja lieden tyyppikilpi/ })).toBeVisible()
  await expect(page.locator('figure img[src*="miele-uuni"]').first()).toBeVisible()
  await expect(page.getByRole('link', { name: /Jatka huoltopyyntöön/ })).toHaveAttribute('href', /merkki=miele.*laite=uuni|laite=uuni.*merkki=miele/)
})

test('rating-plate guide: BSH note and unlisted brand guidance', async ({ page }) => {
  await page.goto(url('tyyppikilpi/?merkki=bosch&laite=astianpesukone'))
  await ready(page)
  await expect(page.getByText(/Z-Nr: 00782/).first()).toBeVisible()
  await page.getByRole('button', { name: 'Zanussi', exact: true }).click()
  await expect(page.getByText(/Zanussi: ei omaa ohjetta/)).toBeVisible()
})

test('rating-plate photo opens full size and closes', async ({ page }) => {
  await page.goto(url('tyyppikilpi/?merkki=siemens&laite=jaakaappi'))
  await ready(page)
  await page.getByRole('button', { name: 'Suurenna kuva' }).first().click()
  const dialog = page.locator('dialog[open]')
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Sulje kuva' }).click()
  await expect(page.locator('dialog[open]')).toHaveCount(0)
})

test('plate decoder highlights the selected field', async ({ page }) => {
  await page.goto(url('tyyppikilpi/'))
  await ready(page)
  const serial = page.getByRole('button', { name: /Sarjanumero/ }).first()
  await serial.click()
  await expect(serial).toHaveAttribute('aria-pressed', 'true')
})

test('hero drum spins to the next authentic plate photo', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await page.keyboard.press('Escape') // finish intro
  await expect(page.getByText('Kuva 01/06')).toBeVisible()
  await page.getByRole('button', { name: /Pyöritä rumpua/ }).click()
  await expect(page.getByText('Kuva 02/06')).toBeVisible({ timeout: 4000 })
})

test('service request: validation errors, then demo submission', async ({ page }) => {
  await page.goto(url('huoltopyynto/'))
  await ready(page)
  await page.getByRole('button', { name: /Lähetä huoltopyyntö/ }).click()
  await expect(page.getByText('Kirjoita nimesi.')).toBeVisible()
  await expect(page.getByText(/Anna puhelinnumero tai sähköpostiosoite/)).toBeVisible()
  await expect(page.locator('#name')).toBeFocused()
  await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true')

  await page.locator('#name').fill('Testi Asiakas')
  await page.locator('#email').fill('virheellinen')
  await page.getByRole('button', { name: /Lähetä huoltopyyntö/ }).click()
  await expect(page.getByText(/Tarkista sähköpostiosoite/)).toBeVisible()

  await page.locator('#email').fill('testi@esimerkki.fi')
  await page.locator('#brand').selectOption('Bosch')
  await page.locator('#description').fill('Pesukone ei linkoa, näytöllä vikakoodi E18.')
  await page.getByLabel(/Tietojani saa käyttää/).check()
  // Nothing may be sent anywhere: watch for outgoing POSTs
  const posts: string[] = []
  page.on('request', (r) => r.method() === 'POST' && posts.push(r.url()))
  await page.getByRole('button', { name: /Lähetä huoltopyyntö/ }).click()
  await expect(page.getByRole('status')).toContainText('Demoversio – viestiä ei lähetetty.')
  expect(posts).toEqual([])
})

test('service request is prefilled from the guide and the spare-part slip', async ({ page }) => {
  await page.goto(url('huoltopyynto/?merkki=bosch&laite=pesukone&tyyppi=varaosa&malli=WAT28400&art=FD9303'))
  await ready(page)
  await expect(page.locator('#brand')).toHaveValue('Bosch')
  await expect(page.locator('#appliance')).toHaveValue('pesukone')
  await expect(page.locator('#model')).toHaveValue('WAT28400')
  await expect(page.locator('#articleNumber')).toHaveValue('FD9303')
  await expect(page.getByRole('radio', { name: 'Varaosa' })).toBeChecked()
  // context-aware helper shows the BSH tip
  await expect(page.getByText(/BSH-laitteissa sarjanumero/)).toBeVisible()
})

test('spare-part slip carries details to the form', async ({ page }) => {
  await page.goto(url('varaosat/'))
  await ready(page)
  const slip = page.locator('form[aria-labelledby="slip-title"]')
  await slip.locator('select').first().selectOption('miele')
  await slip.locator('input').first().fill('W3162')
  await slip.getByRole('button', { name: /Jatka varaosakyselyyn/ }).click()
  await expect(page).toHaveURL(/huoltopyynto\/\?.*merkki=miele/)
  await expect(page.locator('#model')).toHaveValue('W3162')
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})

test('contact page: click-to-load Google Map at the verified address + directions', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  await expect(page.locator('iframe')).toHaveCount(0) // privacy: nothing loads before consent
  await expect(page.getByRole('link', { name: /Katso reittiohjeet/ })).toHaveAttribute('href', /destination=Pamilonkatu%2034%2C%2080130%20Joensuu/)
  await expect(page.getByRole('link', { name: /Avaa Google Mapsissa/ })).toHaveAttribute('href', /Pamilonkatu%2034/)
  await page.getByRole('button', { name: 'Näytä kartta' }).click()
  const frame = page.locator('iframe')
  await expect(frame).toHaveAttribute('src', /maps\.google\.com\/maps\?q=Pamilonkatu%2034%2C%2080130%20Joensuu.*output=embed/)
  const box = await frame.boundingBox()
  expect(box!.width).toBeGreaterThan(250)
})

test('contact details are actionable links', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  await expect(page.locator('main a[href="tel:+358405328734"]').first()).toBeVisible()
  await expect(page.locator('main a[href="mailto:joensuun.huoltopalvelu@telemail.fi"]').first()).toBeVisible()
  await expect(page.locator('main a[href="sms:+358405328734"]').first()).toBeVisible()
  await expect(page.getByText('003701678614').first()).toBeVisible()
})

test('FAQ accordion opens', async ({ page }) => {
  await page.goto(url('hinnasto/'))
  await ready(page)
  const q = page.getByText('Paljonko huolto maksaa?')
  await q.click()
  await expect(page.getByText(/tarkistuskorjaus on 39,50 €/)).toBeVisible()
})

test('price list matches the published prices', async ({ page }) => {
  await page.goto(url('hinnasto/'))
  for (const p of ['25,30 €', '39,50 €', '59,70 €', '75,90 €', '79,95 €', '113,35 €', '151,80 €', '15,20 €', '30,35 €', '40,50 €', '1,60 € /km']) {
    await expect(page.getByText(p, { exact: true }).first()).toBeAttached()
  }
})
