import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { appliances } from '../../data/appliances'
import { ApplianceIcon } from '../brand/ApplianceIcon'
import { SectionHeading } from '../ui/SectionHeading'
import { plateSrc } from '../../lib/asset'

/**
 * "Mikä laite reistailee?" – appliance index. Hovering a row turns the round
 * preview into a drum window showing the company's own plate photo.
 */
export function ApplianceIndex() {
  const [active, setActive] = useState(0)
  const current = appliances[active]

  return (
    <section aria-labelledby="laitteet-title" className="relative border-t border-ink/10 py-20 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <SectionHeading
              code="01"
              label="Laitteet"
              id="laitteet-title"
              title={
                <>
                  Mikä laite
                  <br />
                  reistailee?
                </>
              }
              intro="Huollamme ja hankimme varaosia yleisimpiin kodinkoneisiin. Valitse laite – näytämme, mistä sen tyyppikilpi yleensä löytyy."
            />
            {/* Drum-window preview (desktop) */}
            <div className="relative mt-12 hidden aspect-square w-[min(19rem,80%)] lg:block" aria-hidden="true">
              <div className="absolute inset-0 rounded-full border-[10px] border-ink" />
              <div className="absolute inset-[22px] overflow-hidden rounded-full bg-paper-2">
                {appliances.map((a, i) =>
                  a.photo ? (
                    <img
                      key={a.id}
                      src={plateSrc(a.photo, 480)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={480}
                      height={480}
                      className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]"
                      style={{ opacity: i === active ? 1 : 0, transform: i === active ? 'rotate(0deg) scale(1)' : 'rotate(-35deg) scale(1.2)' }}
                    />
                  ) : null,
                )}
                {!current.photo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-800 text-white">
                    <ApplianceIcon id={current.id} className="w-1/2" />
                  </div>
                )}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_14px_30px_rgb(0_0_0/0.3)]" />
              </div>
              <span className="mono absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap pt-3 text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">
                {current.photo ? 'Oma kuva · tyyppikilpi' : 'Keskuspölynimurit'}
              </span>
            </div>
          </div>
        </div>

        <ol className="border-t border-ink/15 lg:col-span-7" aria-label="Laitteet, joita huollamme">
          {appliances.map((a, i) => (
            <li key={a.id} className="border-b border-ink/15" data-reveal style={{ '--reveal-delay': `${i * 45}ms` } as React.CSSProperties}>
              <Link
                to={a.inGuide ? `/tyyppikilpi/?laite=${a.id}` : '/varaosat/#merkit'}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group grid grid-cols-[3rem_1fr_auto] items-center gap-x-4 gap-y-1 py-5 sm:grid-cols-[2.5rem_4rem_1fr_auto] sm:py-6"
              >
                <span className="mono tabular hidden text-xs text-ink-3 sm:block">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 sm:h-14 sm:w-14 ${
                    active === i ? 'bg-green-600 text-white' : 'bg-paper-2 text-ink'
                  }`}
                >
                  <ApplianceIcon id={a.id} className="w-7 sm:w-8" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[1.45rem] font-[730] leading-tight [font-stretch:82%] sm:text-[1.9rem]">
                    {a.name}
                  </span>
                  <span className="mt-1 block text-[0.95rem] leading-snug text-ink-2">{a.hint}</span>
                </span>
                <ArrowUpRight
                  size={24}
                  aria-hidden="true"
                  className="text-ink-3 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-600"
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
