import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { Mark } from '../components/brand/Mark'
import { company } from '../data/company'
import { navRoutes } from '../data/seo'

export function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative overflow-hidden">
      <div className="container-x grid items-center gap-12 py-16 lg:min-h-[70svh] lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          <p className="plate-label flex items-center gap-3 text-green-700">
            <span className="led" aria-hidden="true" /> Virhekoodi 404
          </p>
          <h1 id="nf-title" className="display-l mt-5">
            Tämä sivu taisi jäädä <span className="text-green-600">linkoukseen.</span>
          </h1>
          <p className="lede mt-6 max-w-[34rem]">
            Hakemaasi sivua ei löytynyt. Se on voinut siirtyä tai osoitteessa on kirjoitusvirhe. Tästä pääset takaisin oikeille
            raiteille:
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {navRoutes.map((r) => (
              <li key={r.path}>
                <Link
                  to={r.path === '/' ? '/' : `${r.path}/`}
                  className="inline-flex rounded-full border border-ink/20 px-4 py-2 font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/" className="btn btn-primary">
              Etusivulle <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
            </Link>
            <a href={company.phone.href} className="btn btn-outline">
              <Phone size={18} aria-hidden="true" /> {company.phone.display}
            </a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="logo-gradient mx-auto w-full max-w-[22rem] rounded-[2rem] p-[9%]">
            <Mark className="w-full animate-[nf-spin_2.4s_cubic-bezier(.65,0,.35,1)_1] text-white" color="#fff" />
          </div>
        </div>
      </div>
      <style>{`@keyframes nf-spin{0%{transform:rotate(-8deg) scale(.96)}60%{transform:rotate(3deg)}100%{transform:none}}`}</style>
    </section>
  )
}
