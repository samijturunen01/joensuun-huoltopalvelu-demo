import { useState } from 'react'
import { travelZones, euro } from '../../data/prices'

/**
 * Travel-charge zones from the price list, drawn as rings around the workshop.
 * A schematic, not a map: zone boundaries are not to scale.
 */
export function ZoneDiagram({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  const [active, setActive] = useState<string | null>(null)
  const radii = [62, 112, 162, 206]
  const ink = tone === 'dark' ? '#f1f2ec' : '#0d1a12'
  const muted = tone === 'dark' ? 'rgb(241 242 236 / 0.55)' : 'rgb(13 26 18 / 0.55)'

  return (
    <figure className={className}>
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <svg viewBox="0 0 440 440" className="mx-auto w-full max-w-[26rem]" role="img" aria-labelledby="zone-title">
          <title id="zone-title">Matkaveloitusvyöhykkeet Pamilonkadun liikkeestä: kaupungin alue, alle 20 km, alle 30 km ja yli 30 km.</title>
          <g data-inview="" className="zone-rings">
            {radii.map((r, i) => {
              const z = travelZones[i]
              const on = active === z.id
              return (
                <circle
                  key={z.id}
                  cx="220"
                  cy="220"
                  r={r}
                  fill={on ? 'rgb(46 161 92 / 0.16)' : i === 0 ? 'rgb(46 161 92 / 0.08)' : 'none'}
                  stroke={on ? '#2ea15c' : ink}
                  strokeOpacity={on ? 1 : i === 3 ? 0.35 : 0.5}
                  strokeWidth={on ? 2.5 : 1.25}
                  strokeDasharray={i === 3 ? '3 7' : undefined}
                  pathLength={i === 3 ? undefined : 1}
                  data-draw={i === 3 ? undefined : ''}
                  style={{ '--draw-delay': `${i * 140}ms`, transition: 'fill .3s, stroke .3s, stroke-width .3s, stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1)' } as React.CSSProperties}
                />
              )
            })}
            {/* ring labels */}
            {radii.map((r, i) => {
              const z = travelZones[i]
              const inner = i === 0 ? 14 : radii[i - 1]
              const y = 220 - (inner + r) / 2 - 6
              return (
                <g key={z.id} className="hidden sm:inline" opacity={active && active !== z.id ? 0.4 : 1} style={{ transition: 'opacity .3s' }}>
                  <text x="220" y={y} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="1.2" fill={muted}>
                    {z.label.toUpperCase()}
                  </text>
                  <text x="220" y={y + 17} textAnchor="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="17" fill={ink}>
                    {euro(z.price, z.unit)}
                  </text>
                </g>
              )
            })}
            {/* workshop pin */}
            <circle cx="220" cy="220" r="7" fill="#2ea15c" />
            <circle cx="220" cy="220" r="13" fill="none" stroke="#2ea15c" strokeOpacity=".45" />
            <text x="220" y="250" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="1.2" fill={muted}>
              PAMILONKATU 34
            </text>
          </g>
        </svg>

        <ul className="divide-y divide-current/15 border-y border-current/15" aria-label="Matkaveloitukset">
          {travelZones.map((z) => (
            <li key={z.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(z.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(z.id)}
                onBlur={() => setActive(null)}
                aria-pressed={active === z.id}
                className="flex w-full items-baseline justify-between gap-4 py-3.5 text-left"
              >
                <span>
                  <span className="block font-semibold">{z.label}</span>
                  <span className="text-[0.9rem] opacity-70">{z.detail}</span>
                </span>
                <span className="mono tabular whitespace-nowrap text-[1.05rem] font-semibold">{euro(z.price, z.unit)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className={`plate-label mt-5 ${tone === 'dark' ? 'text-white/65' : 'text-ink-3'}`}>Kaavio, ei mittakaavassa · hinnat sis. alv 25,5 %</figcaption>
    </figure>
  )
}
