import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ZoneDiagram } from '../components/ui/ZoneDiagram'
import { FaqList } from '../components/ui/FaqList'
import { ContactPanel } from '../components/ui/ContactPanel'
import { Barcode } from '../components/ui/Barcode'
import { euro, travelZones, VAT_LABEL, workPrices } from '../data/prices'
import { faqs } from '../data/faq'
import { company } from '../data/company'

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-baseline gap-3 py-3.5">
      <dt className="min-w-0">
        <span className="font-medium">{label}</span>
        {sub && <span className="block text-[0.85rem] text-ink-3">{sub}</span>}
      </dt>
      <span className="mb-1 flex-1 self-end border-b border-dotted border-ink/30" aria-hidden="true" />
      <dd className="mono tabular whitespace-nowrap text-[1.08rem] font-semibold">{value}</dd>
    </div>
  )
}

export function Prices() {
  return (
    <>
      <PageIntro
        crumb="Hinnasto"
        code="P4"
        label="Hinnasto"
        title={
          <>
            Hinnasto. <span className="text-green-600">Selvät summat.</span>
          </>
        }
        lede={`Työn ja matkojen hinnat ovat esillä etukäteen. ${VAT_LABEL}`}
      />

      <section aria-labelledby="tyot" className="py-16 lg:py-24">
        <div className="container-x grid gap-6 lg:grid-cols-12">
          {/* Work prices as a printed receipt / plate */}
          <article className="plate p-6 sm:p-9 lg:col-span-7" data-reveal>
            <div className="flex items-start justify-between gap-4 border-b border-ink/20 pb-5">
              <div>
                <p className="plate-label text-green-700">Työ ja korjaukset</p>
                <h2 id="tyot" className="mt-2 font-display text-[2rem] font-[760] leading-none [font-stretch:80%]">
                  Huolto ja korjaus
                </h2>
              </div>
              <Barcode value={company.businessId} className="h-9 w-28 text-ink/70" />
            </div>
            <dl className="divide-y divide-ink/10">
              {workPrices.map((p) => (
                <Row key={p.label} label={p.label} value={euro(p.price)} />
              ))}
            </dl>
            <p className="plate-label mt-5 text-ink-3">Hinnat sis. alv 25,5 %</p>
          </article>

          <article className="on-dark rounded-[var(--radius-plate)] bg-night p-6 text-white sm:p-9 lg:col-span-5" data-reveal style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
            <p className="plate-label text-green-400">Matkaveloitukset</p>
            <h2 className="mt-2 font-display text-[2rem] font-[760] leading-none [font-stretch:80%]">Ajo vyöhykkeittäin</h2>
            <dl className="mt-5 divide-y divide-white/12 border-t border-white/12">
              {travelZones.map((z) => (
                <div key={z.id} className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt>
                    <span className="font-medium">{z.label}</span>
                    <span className="block text-[0.85rem] text-white/60">{z.detail}</span>
                  </dt>
                  <dd className="mono tabular whitespace-nowrap text-[1.08rem] font-semibold text-green-400">{euro(z.price, z.unit)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[0.95rem] text-white/70">
              Yli 30 kilometrin matkoilta veloitetaan ajo ja matka kilometrien mukaan.
            </p>
          </article>
        </div>
      </section>

      <section aria-labelledby="vyohykkeet" className="border-y border-ink/10 bg-paper-2 py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-4"
            code="02"
            label="Vyöhykkeet"
            id="vyohykkeet"
            title="Matkavyöhykkeet yhdellä silmäyksellä."
            size="m"
            intro="Valitse vyöhyke nähdäksesi sen kaaviossa."
          />
          <div className="lg:col-span-8" data-reveal>
            <ZoneDiagram />
          </div>
        </div>
      </section>

      <section aria-labelledby="hinta-ukk" className="py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading code="03" label="Usein kysyttyä" id="hinta-ukk" title="Hinnoista kysytään" size="m" />
            <Link to="/huoltopyynto/" className="btn btn-primary mt-8">
              Tee huoltopyyntö <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faqs.filter((f) => f.topics.includes('hinnat'))} />
          </div>
        </div>
      </section>
      <ContactPanel title="Kysy hintaa – vastaamme mielellämme." />
    </>
  )
}
