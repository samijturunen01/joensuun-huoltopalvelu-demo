import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { ZoneDiagram } from '../ui/ZoneDiagram'
import { euro, workPrices } from '../../data/prices'

const highlights = [workPrices[1], workPrices[4], workPrices[3]]

export function PricePreview() {
  return (
    <section aria-labelledby="hinnat-title" className="py-20 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            code="05"
            label="Hinnasto"
            id="hinnat-title"
            title={
              <>
                Hinnat näkyvillä
                <br />
                etukäteen.
              </>
            }
            intro="Työn ja matkojen hinnat ovat julkisia. Kaikki hinnat sisältävät arvonlisäveron 25,5 %."
          />
          <dl className="mt-10 border-t border-ink/15" data-reveal>
            {highlights.map((p) => (
              <div key={p.label} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-4">
                <dt className="font-medium">{p.label}</dt>
                <dd className="mono tabular whitespace-nowrap text-[1.15rem] font-semibold">{euro(p.price)}</dd>
              </div>
            ))}
          </dl>
          <Link to="/hinnasto/" className="btn btn-ink mt-8">
            Koko hinnasto <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
          </Link>
        </div>
        <div className="lg:col-span-7" data-reveal>
          <div className="plate p-6 sm:p-10">
            <p className="plate-label text-green-700">Matkaveloitukset vyöhykkeittäin</p>
            <ZoneDiagram className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  )
}
