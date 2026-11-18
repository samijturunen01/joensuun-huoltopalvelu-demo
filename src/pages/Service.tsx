import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Phone } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { SectionHeading } from '../components/ui/SectionHeading'
import { FaqList } from '../components/ui/FaqList'
import { ContactPanel } from '../components/ui/ContactPanel'
import { ApplianceIcon } from '../components/brand/ApplianceIcon'
import { appliances } from '../data/appliances'
import { brands } from '../data/brands'
import { company } from '../data/company'
import { faqs } from '../data/faq'
import { euro, travelZones, workPrices } from '../data/prices'
import { plateSrc, plateSrcSet } from '../lib/asset'

const prep = [
  'Etsi laitteen tyyppikilpi ja kirjoita ylös merkki, malli, artikkelinumero ja sarjanumero.',
  'Kirjoita ylös mahdolliset vikakoodit ja se, miten vika ilmenee.',
  'Tarkista ostopäivä ja onko takuu vielä voimassa.',
  'Soita, laita viestiä tai lähetä tiedot huoltopyynnöllä.',
]

/** Control-panel art: the appliance family on a dark panel with status LEDs. */
function PanelArt() {
  return (
    <div className="on-dark relative rounded-[2rem] bg-night p-5 text-white shadow-[0_40px_80px_-40px_rgb(5_18_10/0.8)] sm:p-7">
      <div className="night-dots pointer-events-none absolute inset-0 rounded-[2rem]" aria-hidden="true" />
      <div className="relative flex items-center justify-between">
        <p className="plate-label text-green-400">Huollettavat laitteet</p>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="led" />
          <span className="led opacity-40" />
        </span>
      </div>
      <ul className="relative mt-6 grid grid-cols-4 gap-2">
        {appliances.map((a, i) => (
          <li key={a.id} data-reveal style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}>
            <Link
              to={a.inGuide ? `/tyyppikilpi/?laite=${a.id}` : '/varaosat/#merkit'}
              className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2 text-center transition-colors hover:border-green-400 hover:bg-green-400/10"
            >
              <ApplianceIcon id={a.id} className="w-[46%] text-white transition-colors group-hover:text-green-400" />
              <span className="text-[0.68rem] font-medium leading-tight text-white/70 sm:text-[0.75rem]">{a.short}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Service() {
  const shown = appliances.filter((a) => a.photo)
  return (
    <>
      <PageIntro
        crumb="Huolto"
        code="P1"
        label="Kodinkonehuolto"
        title={
          <>
            Kodinkonehuolto Joensuussa ja <span className="text-green-600">Pohjois-Karjalassa.</span>
          </>
        }
        lede="Pyykinpesukoneet, kuivausrummut, jääkaapit, pakastimet, astianpesukoneet, uunit, liedet, keittotasot, mikroaaltouunit ja imurit – huolto ja korjaus 18 merkin laitteisiin, vuodesta 1976."
        aside={<PanelArt />}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={company.phone.href} className="btn btn-primary">
            <Phone size={18} aria-hidden="true" /> Soita {company.phone.display}
          </a>
          <Link to="/huoltopyynto/?tyyppi=huolto" className="btn btn-outline">
            Tee huoltopyyntö <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
          </Link>
        </div>
      </PageIntro>

      {/* Appliances with the company's own photos */}
      <section aria-labelledby="laitteet" className="py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            code="01"
            label="Laitteet"
            id="laitteet"
            title="Mitä huollamme"
            intro="Jokaisen kuvan on ottanut Joensuun Huoltopalvelu. Kuvassa näkyy, mistä laitteen tyyppikilpi yleensä löytyy – sitä kysymme ensimmäisenä."
          />
          <ul className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-12">
            {shown.map((a, i) => {
              const wide = i % 3 === 0
              return (
                <li
                  key={a.id}
                  data-reveal
                  className={wide ? 'md:col-span-7' : 'md:col-span-5'}
                  style={{ '--reveal-delay': `${(i % 2) * 90}ms` } as React.CSSProperties}
                >
                  <Link to={`/tyyppikilpi/?laite=${a.id}`} className="group block">
                    <div className="relative overflow-hidden rounded-[1.4rem] bg-ink">
                      <img
                        src={plateSrc(a.photo!, 960)}
                        srcSet={plateSrcSet(a.photo!)}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        alt={`Tyyppikilpi: ${a.name.toLowerCase()}`}
                        loading="lazy"
                        decoding="async"
                        width={960}
                        height={720}
                        className={`w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] ${
                          wide ? 'aspect-[16/10]' : 'aspect-[4/3]'
                        }`}
                      />
                      <span className="absolute left-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-paper text-ink">
                        <ApplianceIcon id={a.id} className="w-7" />
                      </span>
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-6">
                      <div>
                        <h3 className="font-display text-[1.75rem] font-[740] leading-tight [font-stretch:82%]">{a.name}</h3>
                        <p className="mt-1.5 text-ink-2">{a.hint}</p>
                      </div>
                      <ArrowUpRight size={24} aria-hidden="true" className="mt-1 flex-none text-ink-3 transition-colors group-hover:text-green-600" />
                    </div>
                  </Link>
                </li>
              )
            })}
            <li data-reveal className="md:col-span-5">
              <Link to="/varaosat/#merkit" className="group flex h-full min-h-[16rem] flex-col justify-between rounded-[1.4rem] bg-green-800 p-7 text-white">
                <ApplianceIcon id="keskusimuri" className="w-16 text-green-400" />
                <div>
                  <h3 className="font-display text-[1.75rem] font-[740] leading-tight [font-stretch:82%]">Keskuspölynimurit</h3>
                  <p className="mt-1.5 text-white/80">Allaway- ja Puzer-keskuspölynimurit sekä Volta-pölynimurit.</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Preparation + costs */}
      <section aria-labelledby="valmistaudu" className="border-y border-ink/10 bg-paper-2 py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading code="02" label="Ennen yhteydenottoa" id="valmistaudu" title="Valmistaudu näin." size="m" />
            <ol className="mt-10 space-y-3">
              {prep.map((p, i) => (
                <li key={p} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties} className="plate flex gap-4 p-5">
                  <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-green-600 text-white">
                    <Check size={17} aria-hidden="true" />
                  </span>
                  <span className="pt-1">{p}</span>
                </li>
              ))}
            </ol>
            <Link to="/tyyppikilpi/" className="btn btn-ink mt-8">
              Avaa tyyppikilpiopas <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="on-dark rounded-[1.75rem] bg-night p-7 text-white sm:p-9" data-reveal>
              <p className="plate-label text-green-400">Mitä huolto maksaa</p>
              <dl className="mt-6">
                {[workPrices[1], workPrices[4], travelZones[0], travelZones[1]].map((p) => (
                  <div key={p.label} className="flex items-baseline justify-between gap-4 border-b border-white/12 py-3.5">
                    <dt>{'detail' in p ? `Ajo: ${p.label.toLowerCase()}` : p.label}</dt>
                    <dd className="mono tabular whitespace-nowrap font-semibold">{euro(p.price, 'unit' in p ? p.unit : undefined)}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[0.9rem] text-white/65">Hinnat sisältävät arvonlisäveron 25,5 %.</p>
              <Link to="/hinnasto/" className="btn btn-outline mt-7">
                Koko hinnasto ja matkavyöhykkeet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section aria-labelledby="huoltomerkit" className="py-20 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" code="03" label="Merkit" id="huoltomerkit" title="Huolto 18 merkkiin." size="m" />
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-8">
            {brands.map((b) => (
              <li key={b.id}>
                <Link
                  to={`/tyyppikilpi/?merkki=${b.id}`}
                  className="inline-flex rounded-full border border-ink/20 px-4 py-2 font-display text-[1.25rem] font-[700] [font-stretch:85%] transition-colors hover:border-green-600 hover:bg-green-600 hover:text-white"
                >
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="huolto-ukk" className="border-t border-ink/10 py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" code="04" label="Usein kysyttyä" id="huolto-ukk" title="Huollosta kysytään" size="m" />
          <div className="lg:col-span-8">
            <FaqList items={faqs.filter((f) => f.topics.includes('huolto'))} />
          </div>
        </div>
      </section>
      <ContactPanel title="Kerro, mikä laite reistailee." />
    </>
  )
}
