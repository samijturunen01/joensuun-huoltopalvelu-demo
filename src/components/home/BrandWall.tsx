import { Link } from 'react-router-dom'
import { brands, brandCount } from '../../data/brands'
import { SectionHeading } from '../ui/SectionHeading'

const groupLabel: Record<string, string> = {
  miele: 'Miele',
  electrolux: 'Electrolux',
  gorenje: 'Gorenje',
  bsh: 'BSH',
}

/** The 18 brands as a typographic wall (names set in type, no third-party logos). */
export function BrandWall() {
  return (
    <section aria-labelledby="merkit-title" className="py-20 lg:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-7"
            code="03"
            label="Merkit"
            id="merkit-title"
            title={
              <>
                {brandCount} merkkiä,
                <br />
                yksi osoite.
              </>
            }
          />
          <p data-reveal className="lede self-end lg:col-span-5">
            Kauttamme saat varaosat ja huollon näihin merkkeihin – kodinkoneista keskuspölynimureihin. Valitse merkki, niin
            näet sen tyyppikilpiohjeen.
          </p>
        </div>

        <ul
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/15 pt-10 sm:grid-cols-3 lg:mt-20 lg:flex lg:flex-wrap lg:items-baseline lg:gap-x-[0.55em] lg:gap-y-2 lg:text-[clamp(2rem,5.2vw,5rem)]"
          aria-label="Merkit"
        >
          {brands.map((b, i) => {
            const tag = b.category === 'kodinkoneet' ? (b.group ? groupLabel[b.group] : '') : b.category
            return (
              <li key={b.id} data-reveal="fade" style={{ '--reveal-delay': `${i * 35}ms` } as React.CSSProperties}>
                <Link
                  to={`/tyyppikilpi/?merkki=${b.id}`}
                  className="group inline-flex flex-col items-start font-display font-[760] leading-[1.02] tracking-[-0.025em] text-ink transition-colors duration-300 [font-stretch:76%] hover:text-green-600 lg:flex-row"
                  aria-label={`${b.label}${b.group ? ` – tyyppikilpiohje (${groupLabel[b.group]})` : ''}`}
                >
                  <span className="text-[clamp(1.9rem,8vw,2.6rem)] lg:text-[1em]">{b.name}</span>
                  {tag && (
                    <span className="mono mt-1 text-[0.66rem] font-medium uppercase tracking-[0.12em] text-ink-3 transition-colors group-hover:text-green-700 lg:ml-1.5 lg:mt-[0.55em] lg:text-[0.7rem]">
                      {tag}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
