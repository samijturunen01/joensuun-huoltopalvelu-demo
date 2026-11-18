import { PageIntro } from '../components/ui/PageIntro'
import { SectionHeading } from '../components/ui/SectionHeading'
import { PlateGuide } from '../components/guide/PlateGuide'
import { PlateDecoder } from '../components/guide/PlateDecoder'
import { ContactPanel } from '../components/ui/ContactPanel'

export function PlateGuidePage() {
  return (
    <>
      <PageIntro
        crumb="Tyyppikilpi"
        code="P3"
        label="Tyyppikilpiopas"
        title={
          <>
            Mistä löydän <span className="text-green-600">tyyppikilven?</span>
          </>
        }
        lede="Valitse laitteen merkki ja laitetyyppi. Näytämme, mistä kilpi yleensä löytyy – kuvat ovat Joensuun Huoltopalvelun omia. Ohjeet kattavat Mielen sekä Electrolux-, Gorenje- ja BSH-konsernien laitteet."
      />
      <section aria-label="Tyyppikilpiopas" className="py-12 lg:py-16">
        <div className="container-x">
          <PlateGuide />
        </div>
      </section>
      <section aria-labelledby="kilven-tiedot" className="on-dark relative overflow-hidden bg-night py-20 text-white lg:py-28">
        <div className="night-dots pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeading
            code="02"
            label="Kilven tiedot"
            tone="dark"
            id="kilven-tiedot"
            title="Nämä kolme tietoa riittävät alkuun."
            intro="Kilvissä on paljon merkintöjä. Huoltoa ja varaosia varten tärkeimmät ovat malli, artikkelinumero ja sarjanumero."
          />
          <div className="mt-14" data-reveal>
            <PlateDecoder />
          </div>
        </div>
      </section>
      <ContactPanel title="Kilpi löytyi? Lähetä tiedot." />
    </>
  )
}
