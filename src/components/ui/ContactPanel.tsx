import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, MessageSquare, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { Mark } from '../brand/Mark'

/** Closing call to action: the logo badge turned into a contact panel. */
export function ContactPanel({ title = 'Soita, laita viestiä tai tule käymään.' }: { title?: string }) {
  return (
    <section aria-labelledby="contact-cta" className="container-x py-16 lg:py-24">
      <div className="logo-gradient on-green relative overflow-hidden rounded-[clamp(1.5rem,3vw,2.5rem)] px-6 py-12 text-white sm:px-10 lg:px-16 lg:py-20">
        <div className="night-dots pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <Mark
          className="pointer-events-none absolute -bottom-[18%] -right-[8%] w-[min(34rem,70%)] text-white opacity-[0.09]"
          color="#fff"
        />
        <div className="relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="plate-label flex items-center gap-3 text-white/80">
              <span className="led !bg-signal" aria-hidden="true" /> Ota yhteyttä
            </p>
            <h2 id="contact-cta" className="display-l mt-5 max-w-[14ch]" data-reveal>
              {title}
            </h2>
            <p className="mt-6 max-w-[34rem] text-[1.1rem] text-white/85">
              Yhteydenoton voi hoitaa niin kuin itselle sopii: puhelimella, tekstiviestillä, WhatsAppissa, sähköpostilla tai
              käymällä liikkeessä Pamilonkadulla.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={company.phone.href} className="btn btn-light text-[1.05rem]">
                <Phone size={19} aria-hidden="true" /> <span className="tabular">{company.phone.display}</span>
              </a>
              <Link to="/huoltopyynto/" className="btn btn-outline text-[1.05rem]">
                Tee huoltopyyntö <ArrowRight size={19} className="btn-arrow" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ul className="grid content-end gap-px overflow-hidden rounded-2xl bg-white/15 lg:col-span-5">
            {[
              { icon: MessageCircle, label: 'WhatsApp', value: company.phone.display, href: company.whatsapp, ext: true },
              { icon: MessageSquare, label: 'Tekstiviesti', value: company.phone.display, href: company.sms },
              { icon: Mail, label: 'Sähköposti', value: company.email, href: `mailto:${company.email}` },
              { icon: MapPin, label: 'Käyntiosoite', value: `${company.address.street}, ${company.address.city}`, href: company.maps.open, ext: true },
              { icon: Clock, label: 'Aukioloajat', value: company.hours.long },
            ].map(({ icon: Icon, label, value, href, ext }) => {
              const inner = (
                <>
                  <Icon size={20} aria-hidden="true" className="mt-0.5 flex-none text-signal" />
                  <span className="min-w-0">
                    <span className="plate-label block text-white/65">{label}</span>
                    <span className="mt-1 block break-words font-semibold">{value}</span>
                  </span>
                </>
              )
              return (
                <li key={label} className="bg-green-900/55 backdrop-blur-[2px]">
                  {href ? (
                    <a
                      href={href}
                      className="flex gap-4 px-5 py-4 transition-colors hover:bg-white/10"
                      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex gap-4 px-5 py-4">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
