import { expect, test } from '@playwright/test'
import { ready, routes, trackErrors, url } from './helpers'

test.describe('every page', () => {
  for (const r of routes) {
    test(`renders /${r.path}`, async ({ page }) => {
      const errors = trackErrors(page)
      const res = await page.goto(url(r.path))
      expect(res?.status()).toBe(200)
      await ready(page)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('h1')).toContainText(r.h1)
      // demo must never be indexed
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
      // unique, page-specific metadata from the prerenderer
      await expect(page).toHaveTitle(/Joensuun Huoltopalvelu/)
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{50,}/)
      // prerendered HTML contains the content (works before JS)
      const html = await (await page.request.get(url(r.path))).text()
      expect(html).toContain('<h1')
      // no horizontal overflow
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
      // images in the first screen load
      const broken = await page.evaluate(() =>
        [...document.images].filter((i) => i.complete && i.loading !== 'lazy' && i.naturalWidth === 0).map((i) => i.src),
      )
      expect(broken).toEqual([])
      expect(errors).toEqual([])
    })
  }

  test('titles are unique', async ({ page }) => {
    const titles = new Set<string>()
    for (const r of routes) {
      await page.goto(url(r.path))
      titles.add(await page.title())
    }
    expect(titles.size).toBe(routes.length)
  })

  test('unknown URL shows the branded 404 page with status 404', async ({ page }) => {
    const res = await page.goto(url('ei-tallaista-sivua/'))
    expect(res?.status()).toBe(404)
    await ready(page)
    await expect(page.locator('h1')).toContainText('linkoukseen')
    await expect(page.getByRole('link', { name: 'Etusivulle', exact: true })).toBeVisible()
  })

  test('robots.txt blocks indexing and sitemap lists the pages', async ({ request }) => {
    const robots = await (await request.get(url('robots.txt'))).text()
    expect(robots).toContain('Disallow: /')
    const sitemap = await (await request.get(url('sitemap.xml'))).text()
    for (const r of routes) expect(sitemap).toContain(`joensuun-huoltopalvelu-demo/${r.path}</loc>`)
  })

  test('all internal links resolve', async ({ page, request }) => {
    const seen = new Set<string>()
    for (const r of routes) {
      await page.goto(url(r.path))
      const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).href))
      for (const h of hrefs) {
        const u = new URL(h)
        if (u.origin !== new URL(page.url()).origin) continue
        const key = u.pathname
        if (seen.has(key)) continue
        seen.add(key)
        const res = await request.get(key)
        expect(res.status(), `broken link ${key} on /${r.path}`).toBe(200)
      }
    }
    expect(seen.size).toBeGreaterThan(6)
  })

  test('structured data uses verified business facts', async ({ page }) => {
    await page.goto(url())
    const blocks = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => JSON.parse(x.textContent || '{}')))
    const biz = blocks.find((b) => b.name === 'Joensuun Huoltopalvelu Oy')
    expect(biz.identifier.value).toBe('0167861-4')
    expect(biz.telephone).toBe('+358405328734')
    expect(biz.address.streetAddress).toBe('Pamilonkatu 34')
    expect(biz.foundingDate).toBe('1976-12-17')
  })
})
