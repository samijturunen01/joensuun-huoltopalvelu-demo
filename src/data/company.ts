/**
 * Verified company facts. Sources: joensuunhuoltopalvelu.fi (primary) and the
 * PRH/YTJ open-data register (business ID, founding date, line of business).
 * See docs/CONTENT_SOURCES.md before changing anything here.
 */
export const company = {
  name: 'Joensuun Huoltopalvelu Oy',
  shortName: 'Joensuun Huoltopalvelu',
  businessId: '0167861-4',
  /** Registered 17.12.1976 (PRH). The website states "vuonna 1976 perustettu". */
  founded: 1976,
  foundedDate: '1976-12-17',
  foundedLabel: '17.12.1976',
  industry: 'Kodinkonehuolto ja varaosat',
  area: 'Joensuu ja Pohjois-Karjala',
  phone: {
    display: '040 532 8734',
    href: 'tel:+358405328734',
    e164: '+358405328734',
  },
  sms: 'sms:+358405328734',
  whatsapp: 'https://wa.me/358405328734',
  email: 'joensuun.huoltopalvelu@telemail.fi',
  address: {
    street: 'Pamilonkatu 34',
    postalCode: '80130',
    city: 'Joensuu',
  },
  /** Coordinates from the company's own Google Maps link on /yhteystiedot. */
  geo: { lat: 62.6227818, lon: 29.7425953 },
  hours: {
    label: 'ma–pe 8.30–16.30',
    long: 'Avoinna arkisin 8.30–16.30',
    opens: '08:30',
    closes: '16:30',
  },
  billing: {
    eInvoiceAddress: '003701678614',
    operatorId: 'E204503',
    operator: 'GEP Finland Oy',
  },
  maps: {
    query: 'Pamilonkatu 34, 80130 Joensuu',
    open: 'https://www.google.com/maps/search/?api=1&query=Pamilonkatu%2034%2C%2080130%20Joensuu',
    directions: 'https://www.google.com/maps/dir/?api=1&destination=Pamilonkatu%2034%2C%2080130%20Joensuu',
    embed: 'https://maps.google.com/maps?q=Pamilonkatu%2034%2C%2080130%20Joensuu&z=16&hl=fi&output=embed',
  },
  originalSite: 'https://www.joensuunhuoltopalvelu.fi/',
} as const

export const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`
