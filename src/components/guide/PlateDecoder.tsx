import { useState } from 'react'
import { Barcode } from '../ui/Barcode'

type FieldId = 'model' | 'article' | 'serial'

const fields: { id: FieldId; n: number; title: string; aka: string; text: string }[] = [
  {
    id: 'model',
    n: 1,
    title: 'Malli',
    aka: 'Mod. · Type · E-Nr',
    text: 'Laitteen mallimerkintä. Bosch-, Siemens-, Junker- ja Gaggenau-laitteissa malli on E-Nr-kentässä.',
  },
  {
    id: 'article',
    n: 2,
    title: 'Artikkelinumero',
    aka: 'PNC · Prod.No. · Art.Nr · FD',
    text: 'Valmistajan tuotenumero, jolla oikeat varaosat haetaan. BSH-konsernin laitteissa se on muotoa FD 9303.',
  },
  {
    id: 'serial',
    n: 3,
    title: 'Sarjanumero',
    aka: 'S/N · Ser.No. · Z-Nr',
    text: 'Yksilöi juuri sinun laitteesi. BSH-laitteissa muotoa Z-Nr: 00782 – ei pitkä tuotantokoodi kuten 013030265465001783.',
  },
]

/**
 * Interactive, illustrated rating plate: which fields matter when ordering a
 * spare part or a repair. The plate is a drawing with example values.
 */
export function PlateDecoder({ tone = 'dark' }: { tone?: 'light' | 'dark' }) {
  const [active, setActive] = useState<FieldId>('article')
  const hl = (id: FieldId) =>
    `relative rounded-md px-2 -mx-2 py-1 transition-[background-color,box-shadow] duration-300 ${
      active === id ? 'bg-green-400/25 shadow-[0_0_0_2px_#2ea15c]' : ''
    }`
  const pin = (id: FieldId, n: number) => (
    <span
      aria-hidden="true"
      className={`absolute -left-7 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-[0.65rem] font-bold transition-colors ${
        active === id ? 'bg-green-600 text-white' : 'bg-ink/15 text-ink'
      }`}
    >
      {n}
    </span>
  )

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Illustrated plate */}
      <figure className="lg:col-span-7">
        <div
          className="plate mx-auto max-w-[36rem] rotate-[-1.2deg] p-6 pl-10 text-ink sm:p-8 sm:pl-12"
          style={{ background: 'linear-gradient(135deg,#fbfbf8,#e9ebe5 55%,#f6f7f3)' }}
        >
          <div className="flex items-start justify-between gap-4 border-b border-ink/20 pb-3">
            <span className="rounded-[4px] bg-ink px-2.5 py-1 font-display text-[1.05rem] font-[800] tracking-wide text-paper [font-stretch:90%]">
              MERKKI
            </span>
            <span className="mono text-right text-[0.68rem] leading-tight text-ink-2">
              Made in EU
              <br />
              220–240 V ~ 50 Hz
            </span>
          </div>
          <dl className="mono mt-3 grid gap-1.5 text-[0.82rem] sm:text-[0.9rem]">
            <div className={hl('model')}>
              {pin('model', 1)}
              <dt className="inline text-ink-3">Mod. / E-Nr </dt>
              <dd className="inline font-semibold">ESIM 7000 X</dd>
            </div>
            <div className="flex gap-6 px-0 py-1 text-ink-3">
              <span>Type FL 24</span>
              <span>IPX4</span>
              <span>2200 W</span>
            </div>
            <div className={hl('article')}>
              {pin('article', 2)}
              <dt className="inline text-ink-3">PNC / Art.Nr / FD </dt>
              <dd className="inline font-semibold">914 000 000 · 00</dd>
            </div>
            <div className={hl('serial')}>
              {pin('serial', 3)}
              <dt className="inline text-ink-3">Ser.No. / Z-Nr </dt>
              <dd className="inline font-semibold">01234567</dd>
            </div>
          </dl>
          <div className="mt-4 flex items-end justify-between gap-4 border-t border-ink/20 pt-3">
            <Barcode value="ESIM-7000" className="h-9 w-40 text-ink/80" />
            <span className="flex gap-1.5" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-6 w-6 rounded-[3px] border border-ink/40" />
              ))}
            </span>
          </div>
        </div>
        <figcaption className={`plate-label mt-5 text-center ${tone === 'dark' ? 'text-white/50' : 'text-ink-3'}`}>
          Kuvitus · esimerkkikilpi, ei todellinen laite
        </figcaption>
      </figure>

      {/* Field explanations */}
      <ol className="space-y-3 lg:col-span-5" aria-label="Tyyppikilven tärkeimmät tiedot">
        {fields.map((f) => {
          const on = active === f.id
          return (
            <li key={f.id}>
              <button
                type="button"
                aria-pressed={on}
                onMouseEnter={() => setActive(f.id)}
                onFocus={() => setActive(f.id)}
                onClick={() => setActive(f.id)}
                className={`w-full rounded-2xl border p-5 text-left transition-colors duration-300 ${
                  tone === 'dark'
                    ? on
                      ? 'border-green-400 bg-white/[0.06]'
                      : 'border-white/12 hover:border-white/30'
                    : on
                      ? 'border-green-600 bg-white'
                      : 'border-ink/12 hover:border-ink/30'
                }`}
              >
                <span className="flex items-baseline gap-3">
                  <span
                    className={`inline-flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-bold ${
                      on ? 'bg-green-500 text-white' : tone === 'dark' ? 'bg-white/15' : 'bg-ink/10'
                    }`}
                  >
                    {f.n}
                  </span>
                  <span className="font-display text-[1.45rem] font-[740] leading-none [font-stretch:82%]">{f.title}</span>
                  <span className={`mono ml-auto hidden text-[0.72rem] sm:inline ${tone === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                    {f.aka}
                  </span>
                </span>
                <span className={`mt-2.5 block pl-9 text-[0.98rem] leading-relaxed ${tone === 'dark' ? 'text-white/75' : 'text-ink-2'}`}>
                  {f.text}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
