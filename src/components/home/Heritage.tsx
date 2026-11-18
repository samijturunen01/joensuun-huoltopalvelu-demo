import { company } from '../../data/company'
import { asset } from '../../lib/asset'
import { SectionHeading } from '../ui/SectionHeading'

/** Founded 17.12.1976 (PRH) – the 50th anniversary line stays correct over time. */
function anniversaryLine() {
  const now = new Date()
  const fifty = new Date('2026-12-17T00:00:00+02:00')
  if (now < fifty) return 'Joulukuussa 2026 yritys täyttää 50 vuotta.'
  const years = now.getFullYear() - 1976 - (now.getMonth() < 11 || (now.getMonth() === 11 && now.getDate() < 17) ? 1 : 0)
  return `Yritys on toiminut jo ${years} vuotta.`
}

/** "Vuodesta 1976" – company story, kept strictly to verified facts. */
export function Heritage() {
  return (
    <section aria-labelledby="yritys-title" className="relative overflow-hidden border-t border-ink/10 py-20 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            code="06"
            label="Yritys"
            id="yritys-title"
            title="Joensuulainen kodinkonehuolto vuodesta 1976."
            size="m"
          />
          <div className="mt-8 max-w-[38rem] space-y-5 text-[1.08rem] text-ink-2" data-reveal>
            <p>
              {company.name} on perustettu {company.foundedLabel}. Olemme huoltaneet kodinkoneita ja hankkineet niihin
              varaosia Joensuussa ja koko Pohjois-Karjalan alueella jo lähes viisikymmentä vuotta – liikkeemme on
              osoitteessa {company.address.street}.
            </p>
            <p>{anniversaryLine()}</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2" data-reveal>
            <figure className="plate flex items-center gap-5 p-5">
              <img
                src={asset('images/badges/skhl-320.webp')}
                alt="Suomen Kodinkonehuoltojen Liitto ry:n tunnus"
                width={320}
                height={320}
                loading="lazy"
                className="h-20 w-20 flex-none"
              />
              <figcaption className="text-[0.95rem] leading-snug">
                <span className="plate-label block text-ink-3">Liitto</span>
                Suomen Kodinkonehuoltojen Liitto ry
              </figcaption>
            </figure>
            <figure className="plate flex items-center gap-5 p-5">
              <img
                src={asset('images/badges/luotettava-kumppani-720.webp')}
                alt="Luotettava Kumppani -tunnus"
                width={720}
                height={276}
                loading="lazy"
                className="h-auto w-28 flex-none"
              />
              <figcaption className="text-[0.95rem] leading-snug">
                <span className="plate-label block text-ink-3">Ohjelma</span>
                Luotettava Kumppani
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Company plate */}
        <div className="lg:col-span-5" data-reveal>
          <div className="relative">
            <p
              aria-hidden="true"
              className="pointer-events-none select-none font-display text-[clamp(7rem,20vw,15rem)] font-[800] leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_rgb(13_26_18/0.22)] [font-stretch:75%]"
            >
              1976
            </p>
            <dl className="plate mono relative -mt-10 ml-6 p-6 text-[0.92rem] sm:ml-12">
              {[
                ['Toiminimi', company.name],
                ['Y-tunnus', company.businessId],
                ['Perustettu', company.foundedLabel],
                ['Toimiala', 'Kotitalouskoneiden korjaus ja huolto'],
                ['Toiminta-alue', company.area],
              ].map(([k, v], i) => (
                <div key={k} className={`grid grid-cols-[7.5rem_1fr] gap-3 py-2.5 ${i ? 'plate-field' : ''}`}>
                  <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">{k}</dt>
                  <dd className="font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
