import { Link } from 'react-router-dom'
import { Logo } from '../brand/Logo'
import { Barcode } from '../ui/Barcode'
import { company } from '../../data/company'
import { navRoutes } from '../../data/seo'

export function Footer() {
  return (
    <footer className="brushed on-dark relative text-white/80">
      <div className="container-x pb-10 pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="h-12 w-auto sm:h-14" />
            <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-white/70">
              Kodinkonehuolto ja varaosat Joensuussa ja Pohjois-Karjalassa – vuodesta 1976.
            </p>
            <div className="mt-8 inline-flex flex-col gap-1.5 rounded-xl border border-white/12 bg-white/[0.03] p-4 text-white/60">
              <Barcode value={company.businessId} className="h-9 w-56 text-white/70" />
              <span className="mono text-[0.72rem] tracking-[0.18em]">Y-TUNNUS {company.businessId}</span>
            </div>
          </div>

          <nav aria-label="Alavalikko" className="lg:col-span-2">
            <h2 className="plate-label mb-4 text-green-400">Sivut</h2>
            <ul className="space-y-2.5">
              {navRoutes.map((r) => (
                <li key={r.path}>
                  <Link to={r.path === '/' ? '/' : `${r.path}/`} className="link-u text-white/85 hover:text-white">
                    {r.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/huoltopyynto/" className="link-u text-white/85 hover:text-white">
                  Huoltopyyntö
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="plate-label mb-4 text-green-400">Yhteystiedot</h2>
            <address className="space-y-2.5 not-italic">
              <p className="font-semibold text-white">{company.name}</p>
              <p>
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </p>
              <p>
                <a href={company.phone.href} className="link-u tabular text-white">
                  Puh. {company.phone.display}
                </a>
              </p>
              <p className="break-all">
                <a href={`mailto:${company.email}`} className="link-u">
                  {company.email}
                </a>
              </p>
              <p>{company.hours.long}</p>
            </address>
          </div>

          <div className="lg:col-span-2">
            <h2 className="plate-label mb-4 text-green-400">Laskutus</h2>
            <dl className="space-y-2.5 text-[0.95rem]">
              <div>
                <dt className="text-white/55">Verkkolaskuosoite</dt>
                <dd className="mono text-white">{company.billing.eInvoiceAddress}</dd>
              </div>
              <div>
                <dt className="text-white/55">Välittäjätunnus</dt>
                <dd className="mono text-white">{company.billing.operatorId}</dd>
              </div>
              <div>
                <dt className="text-white/55">Operaattori</dt>
                <dd className="text-white">{company.billing.operator}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/12 pt-6 text-[0.82rem] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {company.name}</p>
          <p>
            Konseptidemo – Hades Design. Ei yrityksen virallinen verkkosivusto; lomakkeet eivät lähetä tietoja.
          </p>
        </div>
      </div>
    </footer>
  )
}
