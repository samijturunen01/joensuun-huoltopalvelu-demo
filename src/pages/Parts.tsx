import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { SectionHeading } from '../components/ui/SectionHeading'
import { FaqList } from '../components/ui/FaqList'
import { ContactPanel } from '../components/ui/ContactPanel'
import { PlateDecoder } from '../components/guide/PlateDecoder'
import { Barcode } from '../components/ui/Barcode'
import { brands } from '../data/brands'
import { appliances } from '../data/appliances'
import { guideGroups } from '../data/plateGuide'
import { company } from '../data/company'
import { faqs } from '../data/faq'

/** "Varaosalappu" – an order slip that carries the details into the request form. */
function OrderSlip() {
  const navigate = useNavigate()
  const [slip, setSlip] = useState({ merkki: '', laite: '', malli: '', art: '' })
  const go = (e: React.FormEvent) => {
    e.preventDefault()
    const p = new URLSearchParams({ tyyppi: 'varaosa' })
    Object.entries(slip).forEach(([k, v]) => v.trim() && p.set(k, v.trim()))
    navigate(`/huoltopyynto/?${p.toString()}`)
  }
  const field = 'w-full border-0 border-b border-dashed border-ink/30 bg-transparent px-0 py-2 font-mono text-[1rem] focus:border-green-600 focus:outline-none focus:ring-0'
  return (
    <form onSubmit={go} className="plate relative rotate-[0.8deg] p-6 sm:p-8" aria-labelledby="slip-title">
      <div className="flex items-start justify-between gap-4 border-b border-ink/20 pb-4">
        <div>
          <p className="plate-label text-green-700">Varaosalappu</p>
          <h2 id="slip-title" className="mt-1 font-display text-[1.6rem] font-[760] leading-none [font-stretch:80%]">
            Mitä osaa etsit?
          </h2>
        </div>
        <Barcode value="VARAOSA" className="h-8 w-24 text-ink/70" />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="plate-label text-ink-3">Merkki</span>
          <select value={slip.merkki} onChange={(e) => setSlip({ ...slip, merkki: e.target.value })} className={`${field} cursor-pointer`}>
            <option value="">Valitse…</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="plate-label text-ink-3">Laite</span>
          <select value={slip.laite} onChange={(e) => setSlip({ ...slip, laite: e.target.value })} className={`${field} cursor-pointer`}>
            <option value="">Valitse…</option>
            {appliances.map((a) => (
              <option key={a.id} value={a.id}>
                {a.short}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="plate-label text-ink-3">Malli / E-Nr</span>
          <input value={slip.malli} onChange={(e) => setSlip({ ...slip, malli: e.target.value })} className={field} placeholder="esim. Mod." maxLength={60} />
        </label>
        <label className="block">
          <span className="plate-label text-ink-3">Artikkelinumero</span>
          <input value={slip.art} onChange={(e) => setSlip({ ...slip, art: e.target.value })} className={field} placeholder="PNC / Art.Nr / FD" maxLength={60} />
        </label>
      </div>
      <button type="submit" className="btn btn-primary mt-7 w-full">
        Jatka varaosakyselyyn <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
      </button>
      <p className="mt-3 text-center text-[0.82rem] text-ink-3">Tiedot siirtyvät lomakkeelle – voit täydentää ne siellä.</p>
    </form>
  )
}

const groupLabels: Record<string, string> = {
  miele: 'Miele',
  electrolux: 'Electrolux-konserni',
  gorenje: 'Gorenje-konserni',
  bsh: 'BSH-konserni',
}

export function Parts() {
  const others = brands.filter((b) => !b.group)
  return (
    <>
      <PageIntro
        crumb="Varaosat"
        code="P2"
        label="Varaosat"
        title={
          <>
            Varaosat kodinkoneisiin ja <span className="text-green-600">keskuspölynimureihin.</span>
          </>
        }
        lede="Tarvitsetko tiivisteen, suodattimen tai muun osan? Kauttamme saat varaosat 18 merkin laitteisiin. Kun tiedät laitteen merkin, mallin ja artikkelinumeron, oikea osa löytyy varmemmin."
        aside={<OrderSlip />}
      />

      <section aria-labelledby="tunnista" className="py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            code="01"
            label="Tunnista laite"
            id="tunnista"
            title="Oikea osa tunnistetaan kilvestä."
            intro="Varaosien ja huollon tilaamista varten selvitä laitteen tyyppikilvestä merkki, malli ja mahdollinen artikkelinumero."
          />
          <div className="mt-14" data-reveal>
            <PlateDecoder tone="light" />
          </div>
        </div>
      </section>

      <section id="merkit" aria-labelledby="merkit-otsikko" className="border-y border-ink/10 bg-paper-2 py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading code="02" label="Merkit" id="merkit-otsikko" title="Merkit, joihin saat varaosat." size="m" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guideGroups.map((g, i) => (
              <article key={g.id} data-reveal style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties} className="plate flex flex-col p-6">
                <p className="plate-label text-green-700">{groupLabels[g.id]}</p>
                <ul className="mt-4 flex-1 space-y-1">
                  {brands
                    .filter((b) => b.group === g.id)
                    .map((b) => (
                      <li key={b.id} className="font-display text-[1.7rem] font-[740] leading-tight [font-stretch:80%]">
                        {b.name}
                      </li>
                    ))}
                </ul>
                <Link to={`/tyyppikilpi/?ryhma=${g.id}`} className="mt-5 border-t border-ink/12 pt-4 text-[0.92rem] font-semibold text-green-700 hover:text-green-900">
                  <span className="link-u">Tyyppikilpiohje</span> →
                </Link>
              </article>
            ))}
            <article data-reveal className="plate flex flex-col p-6 md:col-span-2 xl:col-span-2">
              <p className="plate-label text-green-700">Muut merkit</p>
              <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {others.map((b) => (
                  <li key={b.id}>
                    <span className="block font-display text-[1.7rem] font-[740] leading-tight [font-stretch:80%]">{b.name}</span>
                    <span className="text-[0.9rem] text-ink-3">{b.label.replace(b.name, '').trim() || b.category}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="tilaa" className="py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-5" code="03" label="Tilaaminen" id="tilaa" title="Näin kysyt varaosaa." size="m" />
          <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:col-span-7">
            {[
              { icon: Phone, t: 'Soita', d: company.phone.display, href: company.phone.href },
              { icon: MessageCircle, t: 'WhatsApp tai tekstiviesti', d: company.phone.display, href: company.whatsapp, ext: true },
              { icon: Send, t: 'Varaosakysely lomakkeella', d: 'Merkki ja laite valmiina', to: '/huoltopyynto/?tyyppi=varaosa' },
              { icon: MapPin, t: 'Tule käymään', d: `${company.address.street} · ${company.hours.label}`, href: company.maps.open, ext: true },
            ].map(({ icon: Icon, t, d, href, to, ext }) => {
              const body = (
                <>
                  <Icon size={22} aria-hidden="true" className="text-green-600" />
                  <span className="mt-6 block font-display text-[1.5rem] font-[740] leading-tight [font-stretch:82%]">{t}</span>
                  <span className="mt-1 block text-ink-2">{d}</span>
                </>
              )
              const cls = 'block h-full bg-label p-6 transition-colors hover:bg-white'
              return (
                <li key={t}>
                  {to ? (
                    <Link to={to} className={cls}>
                      {body}
                    </Link>
                  ) : (
                    <a href={href} className={cls} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {body}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="varaosa-ukk" className="border-t border-ink/10 py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" code="04" label="Usein kysyttyä" id="varaosa-ukk" title="Varaosista kysytään" size="m" />
          <div className="lg:col-span-8">
            <FaqList items={faqs.filter((f) => f.topics.includes('varaosat'))} />
          </div>
        </div>
      </section>
      <ContactPanel title="Kysy varaosaa – kerro merkki ja malli." />
    </>
  )
}
