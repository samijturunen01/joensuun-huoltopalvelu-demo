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

        <ul className="mt-14 flex flex-wrap items-baseline gap-x-[0.18em] gap-y-1 border-t border-ink/15 pt-10 lg:mt-20" aria-label="Merkit">
          {brands.map((b, i) => (
            <li key={b.id} data-reveal="fade" style={{ '--reveal-delay': `${i * 35}ms` } as React.CSSProperties} className="inline-flex items-baseline">
              <Link
                to={`/tyyppikilpi/?merkki=${b.id}`}
                className="group relative inline-flex items-start font-display text-[clamp(2rem,5.4vw,5rem)] font-[760] leading-[1.02] tracking-[-0.025em] text-ink transition-colors duration-300 [font-stretch:76%] hover:text-green-600"
                aria-label={`${b.label}${b.group ? ` – tyyppikilpiohje (${groupLabel[b.group]})` : ''}`}
              >
                {b.name}
                <sup className="mono ml-1 mt-[0.5em] text-[0.62rem] font-medium uppercase tracking-[0.12em] text-ink-3 transition-colors group-hover:text-green-700 sm:text-[0.7rem]">
                  {b.category === 'kodinkoneet' ? (b.group ? groupLabel[b.group] : '') : b.category}
                </sup>
              </Link>
              {i < brands.length - 1 && (
                <span className="mx-[0.25em] inline-block h-[0.32em] w-[0.32em] translate-y-[-0.2em] rounded-full bg-green-500 text-[clamp(2rem,5.4vw,5rem)]" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
