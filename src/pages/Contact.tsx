import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, MessageSquare, Phone } from 'lucide-react'
import { PageIntro } from '../components/ui/PageIntro'
import { SectionHeading } from '../components/ui/SectionHeading'
import { MapEmbed } from '../components/contact/MapEmbed'
import { Barcode } from '../components/ui/Barcode'
import { company, fullAddress } from '../data/company'

const channels = [
  { icon: Phone, label: 'Soita', value: company.phone.display, href: company.phone.href },
  { icon: MessageSquare, label: 'Tekstiviesti', value: company.phone.display, href: company.sms },
  { icon: MessageCircle, label: 'WhatsApp', value: company.phone.display, href: company.whatsapp, ext: true },
  { icon: Mail, label: 'Sähköposti', value: company.email, href: `mailto:${company.email}` },
]

export function Contact() {
  return (
    <>
      <PageIntro
        crumb="Yhteystiedot"
        code="P6"
        label="Yhteystiedot"
        title={
          <>
            Lähetä viesti tai <span className="text-green-600">tule käymään.</span>
          </>
        }
        lede="Voit ottaa yhteyttä sähköpostilla, WhatsAppilla, soittamalla tai perinteisellä tekstiviestillä."
        aside={
          <div className="plate p-6 sm:p-8">
            <p className="plate-label text-green-700">Puhelin</p>
            <a href={company.phone.href} className="mt-2 block font-display text-[clamp(2.6rem,6vw,4.2rem)] font-[780] leading-none tracking-[-0.02em] [font-stretch:76%] hover:text-green-700">
              {company.phone.display}
            </a>
            <div className="mt-6 grid gap-4 border-t border-ink/12 pt-5 sm:grid-cols-2">
              <p className="flex gap-3">
                <Clock size={20} aria-hidden="true" className="mt-0.5 flex-none text-green-600" />
                <span>
                  <span className="plate-label block text-ink-3">Avoinna</span>
                  <span className="font-semibold">Arkisin 8.30–16.30</span>
                </span>
              </p>
              <p className="flex gap-3">
                <MapPin size={20} aria-hidden="true" className="mt-0.5 flex-none text-green-600" />
                <span>
                  <span className="plate-label block text-ink-3">Käyntiosoite</span>
                  <span className="font-semibold">
                    {company.address.street}, {company.address.postalCode} {company.address.city}
                  </span>
                </span>
              </p>
            </div>
          </div>
        }
      />

      <section aria-labelledby="kanavat" className="py-16 lg:py-24">
        <div className="container-x">
          <h2 id="kanavat" className="sr-only">
            Yhteydenottotavat
          </h2>
          <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ icon: Icon, label, value, href, ext }) => (
              <li key={label}>
                <a
                  href={href}
                  className="group flex h-full flex-col bg-label p-6 transition-colors hover:bg-white sm:p-7"
                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon size={24} aria-hidden="true" className="text-green-600" />
                  <span className="plate-label mt-8 text-ink-3">{label}</span>
                  <span className="mt-1 break-words font-display text-[1.45rem] font-[730] leading-tight [font-stretch:84%] group-hover:text-green-700">
                    {value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] bg-green-800 p-6 text-white sm:flex-row sm:items-center sm:p-7">
            <p className="max-w-[36rem] text-[1.05rem]">
              Huoltopyynnössä voit kertoa laitteen tiedot ja vian kerralla – lomake auttaa löytämään tiedot tyyppikilvestä.
            </p>
            <Link to="/huoltopyynto/" className="btn btn-light flex-none">
              Tee huoltopyyntö <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="sijainti" className="border-t border-ink/10 py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading code="02" label="Sijainti" id="sijainti" title="Pamilonkatu 34, Joensuu." size="m" />
            <p className="mt-6 text-ink-2">Liike on Joensuussa Pamilonkadulla. Palvelemme Joensuussa ja koko Pohjois-Karjalan alueella.</p>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <MapEmbed />
          </div>
        </div>
      </section>

      <section aria-labelledby="laskutus" className="border-t border-ink/10 bg-paper-2 py-16 lg:py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <div className="plate p-6 sm:p-8">
            <h2 id="laskutus" className="plate-label text-green-700">
              Laskutusosoitteemme
            </h2>
            <dl className="mono mt-4 text-[0.95rem]">
              {[
                ['Verkkolaskuosoite', company.billing.eInvoiceAddress],
                ['Välittäjätunnus', company.billing.operatorId],
                ['Operaattori', company.billing.operator],
              ].map(([k, v], i) => (
                <div key={k} className={`grid grid-cols-[10rem_1fr] gap-3 py-3 ${i ? 'plate-field' : ''}`}>
                  <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="plate p-6 sm:p-8">
            <h2 className="plate-label text-green-700">Yritystiedot</h2>
            <dl className="mono mt-4 text-[0.95rem]">
              {[
                ['Yritys', company.name],
                ['Y-tunnus', company.businessId],
                ['Osoite', fullAddress],
              ].map(([k, v], i) => (
                <div key={k} className={`grid grid-cols-[10rem_1fr] gap-3 py-3 ${i ? 'plate-field' : ''}`}>
                  <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <Barcode value={company.businessId} className="mt-5 h-9 w-48 text-ink/70" />
          </div>
        </div>
      </section>
    </>
  )
}
