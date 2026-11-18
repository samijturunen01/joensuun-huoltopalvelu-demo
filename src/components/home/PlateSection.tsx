import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { PlateDecoder } from '../guide/PlateDecoder'

/** "Kaikki alkaa tyyppikilvestä" – the dark heart of the homepage. */
export function PlateSection() {
  return (
    <section aria-labelledby="kilpi-title" className="on-dark relative overflow-hidden bg-night py-20 text-white lg:py-32">
      <div className="night-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(46_161_92/0.22),transparent)]"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-8"
            code="02"
            label="Tyyppikilpi"
            tone="dark"
            id="kilpi-title"
            title={
              <>
                Kaikki alkaa <span className="text-green-400">tyyppikilvestä.</span>
              </>
            }
            intro="Tyyppikilpi on laitteen henkilökortti. Merkki, malli, artikkelinumero ja sarjanumero kertovat, mikä laite on kyseessä – ja niillä oikea varaosa löytyy varmemmin."
          />
        </div>
        <div className="mt-14 lg:mt-20" data-reveal>
          <PlateDecoder />
        </div>
        <div className="mt-14 flex flex-col gap-3 sm:flex-row" data-reveal>
          <Link to="/tyyppikilpi/" className="btn btn-primary">
            Avaa kuvallinen tyyppikilpiopas <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
          </Link>
          <Link to="/huoltopyynto/" className="btn btn-outline">
            Lähetä tiedot huoltopyynnöllä
          </Link>
        </div>
      </div>
    </section>
  )
}
