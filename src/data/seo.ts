/** Routes, navigation labels and page metadata (used by the app and the prerenderer). */
export interface RouteMeta {
  path: string
  label: string
  title: string
  description: string
  nav?: boolean
}

export const routes: RouteMeta[] = [
  {
    path: '/',
    label: 'Etusivu',
    nav: true,
    title: 'Joensuun Huoltopalvelu Oy – kodinkonehuolto ja varaosat Joensuussa vuodesta 1976',
    description:
      'Kodinkoneiden huolto ja varaosat Joensuussa ja Pohjois-Karjalassa vuodesta 1976. Miele, Bosch, Siemens, Electrolux, AEG, UPO, Gorenje ja muut. Soita 040 532 8734.',
  },
  {
    path: '/huolto',
    label: 'Huolto',
    nav: true,
    title: 'Kodinkonehuolto Joensuu – pesukoneet, jääkaapit, uunit | Joensuun Huoltopalvelu',
    description:
      'Pyykinpesukoneiden, jääkaappien, astianpesukoneiden, uunien, keittotasojen ja imureiden huolto Joensuussa ja Pohjois-Karjalassa. Julkinen hinnasto ja selkeät matkaveloitukset.',
  },
  {
    path: '/varaosat',
    label: 'Varaosat',
    nav: true,
    title: 'Kodinkoneiden varaosat Joensuu – 18 merkkiä | Joensuun Huoltopalvelu',
    description:
      'Varaosat Miele-, Bosch-, Siemens-, Electrolux-, AEG-, UPO-, Gorenje- ja Asko-kodinkoneisiin sekä Allaway- ja Puzer-keskuspölynimureihin. Tyyppikilven tiedoilla oikea osa löytyy varmemmin.',
  },
  {
    path: '/tyyppikilpi',
    label: 'Tyyppikilpi',
    nav: true,
    title: 'Mistä löydän tyyppikilven? Kuvallinen opas | Joensuun Huoltopalvelu',
    description:
      'Kuvallinen opas kodinkoneen tyyppikilven etsimiseen: Miele, Electrolux, AEG, UPO, Gorenje, Asko, Bosch ja Siemens. Löydä malli-, artikkeli- ja sarjanumero.',
  },
  {
    path: '/hinnasto',
    label: 'Hinnasto',
    nav: true,
    title: 'Hinnasto – kodinkonehuollon hinnat Joensuussa | Joensuun Huoltopalvelu',
    description:
      'Kodinkonehuollon hinnat ja matkaveloitukset: tarkistuskorjaus 39,50 €, yleiskorjauksen työtunti 79,95 €, ajo kaupungin alueella 15,20 €. Hinnat sis. alv 25,5 %.',
  },
  {
    path: '/yhteystiedot',
    label: 'Yhteystiedot',
    nav: true,
    title: 'Yhteystiedot – Pamilonkatu 34, Joensuu | Joensuun Huoltopalvelu',
    description:
      'Joensuun Huoltopalvelu Oy, Pamilonkatu 34, 80130 Joensuu. Puh. 040 532 8734, avoinna arkisin 8.30–16.30. Soita, laita viestiä, WhatsApp tai tule käymään.',
  },
  {
    path: '/huoltopyynto',
    label: 'Huoltopyyntö',
    title: 'Huoltopyyntö ja varaosakysely | Joensuun Huoltopalvelu',
    description:
      'Lähetä huoltopyyntö tai varaosakysely: kerro laitteen merkki, malli, artikkeli- ja sarjanumero sekä vian kuvaus. Lomake auttaa löytämään tiedot tyyppikilvestä.',
  },
  {
    path: '/404',
    label: 'Sivua ei löytynyt',
    title: 'Sivua ei löytynyt | Joensuun Huoltopalvelu',
    description: 'Hakemaasi sivua ei löytynyt. Palaa etusivulle tai ota yhteyttä: 040 532 8734.',
  },
]

export const navRoutes = routes.filter((r) => r.nav)
export const metaFor = (path: string) => {
  const clean = path.replace(/\/+$/, '') || '/'
  return routes.find((r) => r.path === clean) ?? routes.find((r) => r.path === '/404')!
}
