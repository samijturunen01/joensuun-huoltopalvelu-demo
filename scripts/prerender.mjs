/**
 * Prerenders every route to static HTML with page-specific metadata, so each
 * URL works on GitHub Pages (direct links and refreshes, no SPA redirect hack)
 * and has meaningful HTML for crawlers and link previews. The branded 404 is
 * written to dist/404.html.
 *
 * Indexing stays disabled unless VITE_ALLOW_INDEXING=true (production only,
 * after customer approval).
 */
import { createServer } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'

const base = process.env.VITE_BASE_PATH || '/joensuun-huoltopalvelu-demo/'
const site = (process.env.SITE_URL || 'https://samijturunen01.github.io/joensuun-huoltopalvelu-demo/').replace(/\/?$/, '/')
const allowIndexing = process.env.VITE_ALLOW_INDEXING === 'true'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const urlFor = (p) => (p === '/' || p === '/404' ? site : `${site}${p.slice(1)}/`)
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })

try {
  const { render, routes, company, faqs, brands } = await server.ssrLoadModule('/src/entry-server.tsx')
  const template = await fs.readFile('dist/index.html', 'utf8')

  // Structured data – verified facts only (see docs/CONTENT_SOURCES.md).
  const business = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    additionalType: 'https://schema.org/LocalBusiness',
    '@id': `${site}#yritys`,
    name: company.name,
    url: site,
    logo: `${site}brand/logo.png`,
    image: `${site}images/og-joensuun-huoltopalvelu.jpg`,
    description: 'Kodinkonehuolto ja varaosat Joensuussa ja Pohjois-Karjalassa vuodesta 1976.',
    telephone: company.phone.e164,
    email: company.email,
    foundingDate: company.foundedDate,
    identifier: { '@type': 'PropertyValue', propertyID: 'Y-tunnus', value: company.businessId },
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: 'FI',
    },
    geo: { '@type': 'GeoCoordinates', latitude: company.geo.lat, longitude: company.geo.lon },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: company.hours.opens,
        closes: company.hours.closes,
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Joensuu' },
      { '@type': 'AdministrativeArea', name: 'Pohjois-Karjala' },
    ],
    knowsAbout: brands.map((b) => b.label),
  }

  const assets = await fs.readdir('dist/assets')
  const fontPreloads = [/^bricolage-grotesque-latin-wdth-normal-.*\.woff2$/, /^onest-latin-wght-normal-.*\.woff2$/]
    .map((re) => assets.find((f) => re.test(f)))
    .filter(Boolean)
    .map((f) => `<link rel="preload" href="${base}assets/${f}" as="font" type="font/woff2" crossorigin />`)

  for (const meta of routes) {
    const route = meta.path
    const body = render(route, base)
    const url = urlFor(route)

    const crumbs =
      route === '/' || route === '/404'
        ? null
        : {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Etusivu', item: site },
              { '@type': 'ListItem', position: 2, name: meta.label, item: url },
            ],
          }
    const faqLd =
      route === '/'
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          }
        : null

    const head = [
      ...fontPreloads,
      `<title>${esc(meta.title)}</title>`,
      `<meta name="description" content="${esc(meta.description)}" />`,
      route === '/404' ? '' : `<link rel="canonical" href="${url}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:locale" content="fi_FI" />`,
      `<meta property="og:site_name" content="${esc(company.name)}" />`,
      `<meta property="og:title" content="${esc(meta.title)}" />`,
      `<meta property="og:description" content="${esc(meta.description)}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${site}images/og-joensuun-huoltopalvelu.jpg" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="Joensuun Huoltopalvelu Oy:n logo ja pyykinpesukoneen tyyppikilpi rummun ikkunassa." />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      ld(business),
      crumbs ? ld(crumbs) : '',
      faqLd ? ld(faqLd) : '',
    ]
      .filter(Boolean)
      .join('\n    ')

    let html = template
      .replace(/<title>[\s\S]*?<\/title>/, '')
      .replace(/<meta\s+name="description"[\s\S]*?\/>/, '')
      .replace('</head>', `    ${head}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

    if (allowIndexing && route !== '/404') {
      html = html.replace('<meta name="robots" content="noindex, nofollow" />', '<meta name="robots" content="index, follow" />')
    }

    const out = route === '/404' ? 'dist/404.html' : path.join('dist', route, 'index.html')
    await fs.mkdir(path.dirname(out), { recursive: true })
    await fs.writeFile(out, html)
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => r.path !== '/404')
  .map((r) => `  <url><loc>${urlFor(r.path)}</loc></url>`)
  .join('\n')}
</urlset>
`
  await fs.writeFile('dist/sitemap.xml', sitemap)
  await fs.writeFile(
    'dist/robots.txt',
    allowIndexing
      ? `User-agent: *\nAllow: /\n\nSitemap: ${site}sitemap.xml\n`
      : 'User-agent: *\nDisallow: /\n\n# Hades Design concept demo – not the official website. Do not index.\n',
  )
  await fs.writeFile('dist/.nojekyll', '')
  console.log(`Prerendered ${routes.length} routes (incl. 404.html). Indexing ${allowIndexing ? 'ENABLED' : 'disabled'}.`)
} finally {
  await server.close()
}
