import type { ApplianceId } from './appliances'
import type { GuideGroupId } from './brands'
import type { PlateImageId } from './imageManifest'

/**
 * Rating-plate ("tyyppikilpi") guide. Text and photos come from the
 * company's own guide on joensuunhuoltopalvelu.fi/ota-yhteytta/ – the
 * wording has only been lightly copy-edited (spelling, standard Finnish).
 * The photos were taken by the company; no photo is reused for another group.
 */
export interface GuidePhoto {
  id: PlateImageId
  caption: string
}

export interface GuideEntry {
  text: string[]
  photos: GuidePhoto[]
}

export interface GuideGroup {
  id: GuideGroupId
  name: string
  brands: string
  intro?: string
  /** Field names as printed on this group's plates / used in the original form. */
  fields: { model: string; article: string; serial: string }
  entries: Partial<Record<ApplianceId, GuideEntry>>
}

const hob =
  'Keittotason tyyppikilpi on laitteen pohjassa. Taso pitää yleensä nostaa irti pöytälevystä – tai jos tason alla on vetolaatikosto ja upotusreikä on avoinna, kilven pystyy lukemaan alakautta.'

const fridgeLong =
  'Kilpi löytyy jääkaapin sisäpuolelta kaapin sivusta joko silmänkorkeudelta tai vihanneslokeron takaa. Jääkaappipakastimissa kilpi on yleensä alimman vihanneslokeron takana. Pakastimissa kilpi voi olla silmänkorkeudella tai alimman lokeron takana rungon sivussa.'

const washerDoor =
  'Pyykinpesukoneen ja kuivausrummun tyyppikilven löydät avaamalla täyttöluukun: kilpi on rungossa kauluskumin eli tiivisteen reunan vieressä, tai se voi olla myös luukun sisäpinnassa. Jos luukkua ei voi avata, isompi kilpi löytyy laitteen takaa.'

const topLoaderLint =
  'Päältä täytettävissä pyykinpesukoneissa, etenkin vanhemmissa, tyyppikilpi on yleensä nukkasihdin luukussa – näet sen, kun avaat luukun.'

export const guideGroups: GuideGroup[] = [
  {
    id: 'miele',
    name: 'Miele',
    brands: 'Miele ja Miele Professional',
    fields: { model: 'Malli / Type', article: 'M-Nr / artikkelinumero', serial: 'Nr / sarjanumero' },
    entries: {
      jaakaappi: { text: [fridgeLong], photos: [] },
      pesukone: {
        text: [washerDoor, topLoaderLint],
        photos: [
          { id: 'miele-pesukone', caption: 'Edestä täytettävä pyykinpesukone – kilpi täyttöluukun kauluksessa.' },
          { id: 'miele-kuivausrumpu', caption: 'Kuivausrummun kilpi laitteen takana.' },
        ],
      },
      uuni: {
        text: ['Uunien ja liesien laitetiedot löytyvät, kun avaat uunin luukun kokonaan auki: kilpi on rungossa tiivisteen ulkopuolella.'],
        photos: [{ id: 'miele-uuni', caption: 'Uunin kilpi rungossa tiivisteen ulkopuolella.' }],
      },
      astianpesukone: {
        text: ['Astianpesukoneen tyyppikilven löydät, kun avaat laitteen luukun: kilpi on luukun yläosassa.'],
        photos: [{ id: 'miele-astianpesukone', caption: 'Astianpesukoneen kilpi luukun yläosassa.' }],
      },
      keittotaso: { text: [hob], photos: [] },
      mikro: {
        text: ['Mikroaaltouunin tyyppikilven löydät, kun avaat luukun: kilpi on rungossa luukun alla joko poikittain tai pystyssä käyttöpaneelin sivussa.'],
        photos: [],
      },
      imuri: {
        text: ['Imurin tyyppikilpi on imurin pohjassa.'],
        photos: [{ id: 'miele-imuri', caption: 'Pölynimurin kilpi laitteen pohjassa.' }],
      },
    },
  },
  {
    id: 'electrolux',
    name: 'Electrolux-konserni',
    brands: 'Electrolux, AEG, Progress ja Rosenlew',
    fields: { model: 'Mod. / malli', article: 'PNC / Prod.No. / artikkelinumero', serial: 'Ser.No. / S-No / sarjanumero' },
    entries: {
      jaakaappi: {
        text: ['Kilpi löytyy kaapin sisäpuolelta kaapin sivusta, yleensä vihanneslokeron takaa.'],
        photos: [{ id: 'electrolux-jaakaappi', caption: 'Jääkaappipakastimen kilpi kaapin sisäsivulla.' }],
      },
      pesukone: {
        text: [
          'Pyykinpesukoneen ja kuivausrummun tyyppikilven löydät avaamalla täyttöluukun: kilpi on rungossa kauluskumin eli tiivisteen reunan vieressä. Jos luukkua ei voi avata, isompi kilpi löytyy laitteen takaa.',
          'Päältä täytettävissä pyykinpesukoneissa tyyppikilpi löytyy luukun ollessa auki luukun hakasen vierestä.',
        ],
        photos: [{ id: 'electrolux-pesukone', caption: 'Edestä täytettävän pyykinpesukoneen kilpi luukun kauluksessa.' }],
      },
      uuni: {
        text: ['Uunien ja liesien laitetiedot löytyvät, kun avaat uunin luukun: kilpi on uunikammion alareunassa.'],
        photos: [{ id: 'electrolux-uuni', caption: 'Lieden kilpi uunikammion alareunassa.' }],
      },
      astianpesukone: {
        text: ['Astianpesukoneen tyyppikilven löydät, kun avaat luukun: kilpi on luukun oikealla sivulla.'],
        photos: [{ id: 'electrolux-astianpesukone', caption: 'Astianpesukoneen kilpi luukun oikealla sivulla.' }],
      },
      keittotaso: { text: [hob], photos: [] },
      mikro: {
        text: ['Mikroaaltouunin tyyppikilven löydät, kun avaat luukun: kilpi on pystyssä oven ja käyttöpaneelin välissä.'],
        photos: [{ id: 'electrolux-mikro', caption: 'Mikroaaltouunin kilpi oven ja käyttöpaneelin välissä.' }],
      },
    },
  },
  {
    id: 'gorenje',
    name: 'Gorenje-konserni',
    brands: 'UPO, Gorenje, Asko ja Hisense',
    intro: 'Gorenje-konserniin kuuluvat merkit UPO, Gorenje, Asko ja Hisense.',
    fields: { model: 'Model / malli', article: 'Art.Nr / artikkelinumero', serial: 'Serial No / sarjanumero' },
    entries: {
      jaakaappi: {
        text: [fridgeLong],
        photos: [{ id: 'gorenje-jaakaappi', caption: 'UPO-jääkaappipakastimen kilpi kaapin sisäsivulla.' }],
      },
      pesukone: {
        text: [washerDoor, topLoaderLint],
        photos: [
          { id: 'gorenje-pesukone', caption: 'Edestä täytettävä Gorenje-pyykinpesukone – kilpi luukun kauluksen vieressä.' },
          { id: 'gorenje-pesukone-paalta', caption: 'Päältä täytettävä (vanhempi) pyykinpesukone – kilpi nukkasihdin luukussa.' },
        ],
      },
      uuni: {
        text: [
          'Uunien ja liesien laitetiedot löytyvät, kun avaat uunin luukun kokonaan auki: kilpi on rungossa uuniholvin alla keskellä tiivisteen alapuolella.',
          'Vanhemmissa liesissä kilpi löytyy, kun vedät lieden ulos kalusteista: kilpi on rungon jommallakummalla kyljellä.',
        ],
        photos: [{ id: 'gorenje-uuni', caption: 'UPO-lieden kilpi uuniholvin alla tiivisteen alapuolella.' }],
      },
      astianpesukone: {
        text: ['Astianpesukoneen tyyppikilven löydät, kun avaat luukun: kilpi on luukun ja rungon välissä oikealla puolella.'],
        photos: [{ id: 'gorenje-astianpesukone', caption: 'Asko-astianpesukoneen kilpi luukun ja rungon välissä.' }],
      },
      keittotaso: {
        text: [hob],
        photos: [{ id: 'gorenje-keittotaso', caption: 'UPO-induktiotason kilpi laitteen pohjassa.' }],
      },
      mikro: {
        text: ['Mikroaaltouunin tyyppikilven löydät, kun avaat luukun: kilpi on rungossa luukun alla joko poikittain tai pystyssä käyttöpaneelin sivussa.'],
        photos: [{ id: 'gorenje-mikro', caption: 'Gorenje-mikroaaltouunin kilpi rungossa luukun alla.' }],
      },
    },
  },
  {
    id: 'bsh',
    name: 'BSH-konserni',
    brands: 'Bosch, Siemens, Junker ja Gaggenau',
    intro:
      'BSH-konsernin tyyppikilvissä artikkelinumero on esimerkiksi muotoa FD 9303 ja sarjanumero muotoa Z-Nr: 00782 – ei muotoa 013030265465001783, sillä se on tuotantoon liittyvä koodi. Laitetyypistä riippuen sarjanumeron edessä ei aina lue Z-Nr. Silloin numero löytyy neliön sisältä, jossa lukee E-Nr ja FD-numero, tai se on niiden lähellä.',
    fields: { model: 'E-Nr / malli', article: 'FD-numero / artikkelinumero', serial: 'Z-Nr / sarjanumero' },
    entries: {
      jaakaappi: {
        text: ['Kilpi löytyy kaapin sisäpuolelta kaapin sivusta joko silmänkorkeudelta tai vihanneslokeron takaa. Pakastimissa kilpi voi olla silmänkorkeudella tai alimman lokeron sivulla.'],
        photos: [{ id: 'bsh-jaakaappi', caption: 'Siemens-jääkaapin kilpi kaapin sisäsivulla.' }],
      },
      pesukone: {
        text: [washerDoor],
        photos: [{ id: 'bsh-pesukone', caption: 'Bosch-pyykinpesukoneen kilpi luukun kauluksessa.' }],
      },
      uuni: {
        text: ['Uunien ja liesien laitetiedot löytyvät, kun avaat uunin luukun: kilpi on uuniluukun sivussa tai uunikammion reunassa oikealla sivulla (pieni tarra).'],
        photos: [{ id: 'bsh-uuni', caption: 'Bosch-uunin pieni kilpitarra uunikammion reunassa.' }],
      },
      astianpesukone: {
        text: [
          'Astianpesukoneen tiedot löydät, kun avaat luukun: ne on stanssattu luukun yläreunaan jyvän vasemmalle puolelle.',
          'Tiedot kannattaa valaista taskulampulla, jotta tekstit näkyvät paremmin.',
        ],
        photos: [{ id: 'bsh-astianpesukone', caption: 'BSH-astianpesukoneen tiedot stanssattuna luukun yläreunaan.' }],
      },
      keittotaso: { text: [hob], photos: [] },
      mikro: {
        text: ['Mikroaaltouunin tyyppikilven löydät, kun avaat luukun: kilpi on pystyssä luukun sivun ja näppäinpaneelin välissä.'],
        photos: [{ id: 'bsh-mikro', caption: 'Bosch-mikroaaltouunin kilpi luukun ja näppäinpaneelin välissä.' }],
      },
    },
  },
]

export const groupById = (id: string | null | undefined) => guideGroups.find((g) => g.id === id)

/** Note from the original guide for brands that have no dedicated instructions. */
export const otherBrandNote =
  'Jos merkkiäsi ei ole ohjeissa, kilvet ovat yleensä hyvin samanlaisissa paikoissa kuin näissä ohjeissa kerrotaan.'
