import { company } from './company'
import { brandCount } from './brands'

/**
 * Frequently asked questions. Every answer is based on information published
 * on joensuunhuoltopalvelu.fi – see docs/CONTENT_SOURCES.md.
 */
export interface Faq {
  id: string
  q: string
  a: string
  topics: Array<'huolto' | 'varaosat' | 'hinnat' | 'yleinen'>
}

export const faqs: Faq[] = [
  {
    id: 'mita-tietoja',
    q: 'Mitä tietoja tarvitsen varaosan tai huollon tilaamiseen?',
    a: 'Selvitä laitteen merkki, malli ja mahdollinen artikkelinumero – ja mielellään myös sarjanumero. Tiedot löytyvät yleensä laitteen tyyppikilvestä. Kerro lisäksi lyhyesti, miten vika ilmenee ja näkyykö laitteessa vikakoodia.',
    topics: ['huolto', 'varaosat', 'yleinen'],
  },
  {
    id: 'missa-kilpi',
    q: 'Mistä löydän laitteeni tyyppikilven?',
    a: 'Se riippuu laitteesta ja merkistä. Pyykinpesukoneessa kilpi on yleensä täyttöluukun kauluksen vieressä, jääkaapissa kaapin sisäsivulla ja keittotasossa laitteen pohjassa. Tyyppikilpioppaastamme löydät kuvalliset ohjeet Mielen, Electroluxin, Gorenjen ja BSH:n laitteisiin.',
    topics: ['huolto', 'varaosat', 'yleinen'],
  },
  {
    id: 'merkit',
    q: 'Mihin merkkeihin saan varaosat ja huollon?',
    a: `Kauttamme saat varaosat ja huollon ${brandCount} merkkiin: AEG, Electrolux, Asko, Allaway, Bosch, Elektro Helios, Gorenje, Gaggenau, Hisense, Junker, Miele, Puzer, Progress, Rosenlew, Siemens, UPO, Volta ja Zanussi.`,
    topics: ['huolto', 'varaosat', 'yleinen'],
  },
  {
    id: 'hinta',
    q: 'Paljonko huolto maksaa?',
    a: 'Hinnastomme on julkinen. Esimerkiksi tarkistuskorjaus on 39,50 € ja yleiskorjauksen työtunti 79,95 €. Matkaveloitus Joensuun kaupungin alueella on 15,20 €. Kaikki hinnat sisältävät arvonlisäveron 25,5 %.',
    topics: ['huolto', 'hinnat'],
  },
  {
    id: 'matkat',
    q: 'Miten matkat veloitetaan?',
    a: 'Matkaveloitus määräytyy vyöhykkeen mukaan: kaupungin alue 15,20 €, alle 20 km 30,35 € ja alle 30 km 40,50 €. Yli 30 kilometrin matkoilta veloitetaan ajo ja matka 1,60 €/km.',
    topics: ['huolto', 'hinnat'],
  },
  {
    id: 'alue',
    q: 'Millä alueella toimitte?',
    a: `Toimimme Joensuussa sekä koko Pohjois-Karjalan alueella. Liikkeemme on osoitteessa ${company.address.street}, ${company.address.city}.`,
    topics: ['huolto', 'yleinen'],
  },
  {
    id: 'yhteys',
    q: 'Miten saan teihin yhteyden?',
    a: `Soita tai laita tekstiviesti numeroon ${company.phone.display}, lähetä WhatsApp-viesti tai sähköpostia osoitteeseen ${company.email}. Voit myös tulla käymään – olemme avoinna arkisin 8.30–16.30.`,
    topics: ['yleinen', 'varaosat'],
  },
]
