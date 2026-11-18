import { useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AlertCircle, ArrowRight, CheckCircle2, Info, Loader2 } from 'lucide-react'
import { brands, brandById } from '../../data/brands'
import { appliances, applianceById } from '../../data/appliances'
import { groupById } from '../../data/plateGuide'
import { company } from '../../data/company'
import { validate } from '../../lib/forms/validate'
import { getFormAdapter, isDemoMode } from '../../lib/forms/submit'
import type { FieldErrors, RequestType, ServiceRequest } from '../../lib/forms/types'
import { plateSrc } from '../../lib/asset'

const empty: ServiceRequest = {
  requestType: 'huolto',
  name: '',
  email: '',
  phone: '',
  street: '',
  postalCode: '',
  city: '',
  brand: '',
  appliance: '',
  model: '',
  articleNumber: '',
  serialNumber: '',
  purchaseDate: '',
  warranty: '',
  description: '',
  consent: false,
}

const subscribe = () => () => {}
const OTHER = '__muu'

/** Service request & spare-part enquiry. Demo mode: nothing is sent or stored. */
export function ServiceRequestForm() {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false)
  const [params] = useSearchParams()
  const [data, setData] = useState<ServiceRequest>(empty)
  const [touchedPrefill, setTouchedPrefill] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [customBrand, setCustomBrand] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  // Prefill from ?merkki=…&laite=…&tyyppi=… (from the rating-plate guide and service pages)
  const prefill = useMemo(() => {
    if (!hydrated) return {}
    const b = brandById(params.get('merkki'))
    const a = applianceById(params.get('laite'))
    const t = params.get('tyyppi')
    const clip = (s: string | null) => (s ?? '').slice(0, 60)
    return {
      ...(b ? { brand: b.name } : {}),
      ...(a ? { appliance: a.id } : {}),
      ...(params.get('malli') ? { model: clip(params.get('malli')) } : {}),
      ...(params.get('art') ? { articleNumber: clip(params.get('art')) } : {}),
      ...(t === 'varaosa' || t === 'huolto' || t === 'muu' ? { requestType: t as RequestType } : {}),
    }
  }, [hydrated, params])
  const value: ServiceRequest = touchedPrefill ? data : { ...data, ...prefill }

  const set = <K extends keyof ServiceRequest>(k: K, v: ServiceRequest[K]) => {
    setTouchedPrefill(true)
    setData({ ...value, [k]: v })
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const brand = brands.find((b) => b.name === value.brand)
  const group = groupById(brand?.group)
  const appliance = applianceById(value.appliance)
  const tip = group && appliance ? group.entries[appliance.id] : undefined

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(value)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await getFormAdapter().submit(value)
      setStatus('done')
      setMessage(res.message)
    } catch {
      setStatus('error')
      setMessage(`Lähetys epäonnistui. Soita meille: ${company.phone.display}.`)
    }
    requestAnimationFrame(() => resultRef.current?.focus())
  }

  const err = (k: keyof ServiceRequest) =>
    errors[k] ? (
      <p id={`${k}-error`} className="field-error">
        <AlertCircle size={16} aria-hidden="true" className="mt-0.5 flex-none" /> {errors[k]}
      </p>
    ) : null
  const aria = (k: keyof ServiceRequest, hint?: string) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': [errors[k] ? `${k}-error` : '', hint ?? ''].filter(Boolean).join(' ') || undefined,
  })
  const text = (k: keyof ServiceRequest) => ({
    id: k,
    name: k,
    value: value[k] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => set(k, e.target.value as never),
  })
  const opt = <span className="text-[0.8rem] font-normal text-ink-3">valinnainen</span>
  const req = <span className="text-[0.8rem] font-normal text-green-700">pakollinen</span>

  if (status === 'done') {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="plate p-8 outline-none sm:p-12">
        <CheckCircle2 size={40} aria-hidden="true" className="text-green-600" />
        <h2 className="display-m mt-6">{message}</h2>
        <p className="mt-4 max-w-[34rem] text-[1.05rem] text-ink-2">
          Tämä on Hades Designin konseptidemo: lomake tarkistettiin, mutta tietoja ei lähetetty eikä tallennettu mihinkään.
          Oikeassa käytössä huoltopyyntö välitettäisiin Joensuun Huoltopalvelulle.
        </p>
        <p className="mt-4 text-[1.05rem]">
          Kiireellisissä asioissa soita:{' '}
          <a href={company.phone.href} className="link-u font-semibold">
            {company.phone.display}
          </a>
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setData(empty)
              setTouchedPrefill(true)
              setStatus('idle')
            }}
          >
            Täytä uusi lomake
          </button>
          <Link to="/" className="btn btn-ink">
            Etusivulle
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <form ref={formRef} onSubmit={onSubmit} noValidate className="lg:col-span-8" aria-describedby="form-demo-note">
        {isDemoMode() && (
          <p id="form-demo-note" className="mb-8 flex gap-3 rounded-xl border border-ink/15 bg-paper-2 p-4 text-[0.95rem]">
            <Info size={20} aria-hidden="true" className="mt-0.5 flex-none text-green-700" />
            <span>
              <strong className="font-semibold">Demoversio.</strong> Lomake toimii esittelynä: tietoja ei lähetetä eikä
              tallenneta.
            </span>
          </p>
        )}

        {/* 1 · Request type */}
        <fieldset className="plate p-5 sm:p-7">
          <legend className="sr-only">Asia</legend>
          <p className="plate-label text-green-700" aria-hidden="true">
            01 · Mitä tarvitset?
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Pyynnön tyyppi">
            {(
              [
                ['huolto', 'Huolto / korjaus'],
                ['varaosa', 'Varaosa'],
                ['muu', 'Muu kysymys'],
              ] as [RequestType, string][]
            ).map(([v, l]) => (
              <label
                key={v}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3.5 font-semibold transition-colors ${
                  value.requestType === v ? 'border-green-600 bg-green-100' : 'border-ink/15 hover:border-ink/40'
                }`}
              >
                <input
                  type="radio"
                  name="requestType"
                  value={v}
                  checked={value.requestType === v}
                  onChange={() => set('requestType', v)}
                  className="h-4 w-4 accent-green-600"
                />
                {l}
              </label>
            ))}
          </div>
        </fieldset>

        {/* 2 · Contact */}
        <fieldset className="plate mt-5 p-5 sm:p-7">
          <legend className="sr-only">Yhteystiedot</legend>
          <p className="plate-label text-green-700" aria-hidden="true">
            02 · Yhteystiedot
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="field-label">
                Nimi {req}
              </label>
              <input {...text('name')} {...aria('name')} className="field-input" autoComplete="name" required />
              {err('name')}
            </div>
            <div>
              <label htmlFor="phone" className="field-label">
                Puhelinnumero <span className="text-[0.8rem] font-normal text-ink-3">tai sähköposti</span>
              </label>
              <input {...text('phone')} {...aria('phone')} type="tel" inputMode="tel" className="field-input" autoComplete="tel" placeholder="040 123 4567" />
              {err('phone')}
            </div>
            <div>
              <label htmlFor="email" className="field-label">
                Sähköposti <span className="text-[0.8rem] font-normal text-ink-3">tai puhelin</span>
              </label>
              <input {...text('email')} {...aria('email')} type="email" inputMode="email" className="field-input" autoComplete="email" placeholder="nimi@esimerkki.fi" />
              {err('email')}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="street" className="field-label">
                Katuosoite {opt}
              </label>
              <input {...text('street')} className="field-input" autoComplete="street-address" />
            </div>
            <div>
              <label htmlFor="postalCode" className="field-label">
                Postinumero {opt}
              </label>
              <input {...text('postalCode')} {...aria('postalCode')} inputMode="numeric" maxLength={5} className="field-input" autoComplete="postal-code" />
              {err('postalCode')}
            </div>
            <div>
              <label htmlFor="city" className="field-label">
                Postitoimipaikka {opt}
              </label>
              <input {...text('city')} className="field-input" autoComplete="address-level2" />
            </div>
          </div>
        </fieldset>

        {/* 3 · Appliance */}
        <fieldset className="plate mt-5 p-5 sm:p-7">
          <legend className="sr-only">Laitteen tiedot</legend>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="plate-label text-green-700" aria-hidden="true">
              03 · Laitteen tiedot tyyppikilvestä
            </p>
            <Link to="/tyyppikilpi/" className="text-[0.9rem] font-semibold text-green-700 hover:text-green-900">
              <span className="link-u">Mistä löydän tiedot?</span>
            </Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="brand" className="field-label">
                Merkki {req}
              </label>
              {customBrand ? (
                <input {...text('brand')} {...aria('brand')} className="field-input" placeholder="Kirjoita merkki" autoFocus />
              ) : (
                <select
                  id="brand"
                  name="brand"
                  value={brands.some((b) => b.name === value.brand) ? value.brand : ''}
                  onChange={(e) => {
                    if (e.target.value === OTHER) {
                      setCustomBrand(true)
                      set('brand', '')
                    } else set('brand', e.target.value)
                  }}
                  className="field-input"
                  {...aria('brand')}
                >
                  <option value="">Valitse merkki</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                  <option value={OTHER}>Muu merkki…</option>
                </select>
              )}
              {err('brand')}
            </div>
            <div>
              <label htmlFor="appliance" className="field-label">
                Laite {opt}
              </label>
              <select {...text('appliance')} className="field-input">
                <option value="">Valitse laite</option>
                {appliances.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="model" className="field-label">
                Malli / E-Nr {opt}
              </label>
              <input {...text('model')} className="field-input mono-input" placeholder={group?.fields.model ?? 'esim. Mod. / Type'} />
            </div>
            <div>
              <label htmlFor="articleNumber" className="field-label">
                Artikkelinumero {opt}
              </label>
              <input {...text('articleNumber')} className="field-input mono-input" placeholder={group?.fields.article ?? 'Art.no / PNC / FD'} />
            </div>
            <div>
              <label htmlFor="serialNumber" className="field-label">
                Sarjanumero {opt}
              </label>
              <input {...text('serialNumber')} className="field-input mono-input" placeholder={group?.fields.serial ?? 'S/N / Ser.No. / Z-Nr'} />
            </div>
            <div>
              <label htmlFor="purchaseDate" className="field-label">
                Ostopäivä {opt}
              </label>
              <input {...text('purchaseDate')} type="date" className="field-input" />
            </div>
            <fieldset className="sm:col-span-2">
              <legend className="field-label">Onko takuu voimassa? {opt}</legend>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['kylla', 'Kyllä'],
                    ['ei', 'Ei'],
                    ['en-tieda', 'En tiedä'],
                  ] as const
                ).map(([v, l]) => (
                  <label
                    key={v}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-medium ${
                      value.warranty === v ? 'border-green-600 bg-green-100' : 'border-ink/20'
                    }`}
                  >
                    <input type="radio" name="warranty" value={v} checked={value.warranty === v} onChange={() => set('warranty', v)} className="accent-green-600" />
                    {l}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </fieldset>

        {/* 4 · Description */}
        <fieldset className="plate mt-5 p-5 sm:p-7">
          <legend className="sr-only">Vian kuvaus</legend>
          <p className="plate-label text-green-700" aria-hidden="true">
            04 · Vian kuvaus
          </p>
          <div className="mt-5">
            <label htmlFor="description" className="field-label">
              Viankuvaus, vikakoodit tai kommentti {req}
            </label>
            <textarea
              {...text('description')}
              {...aria('description', 'description-hint')}
              rows={5}
              className="field-input min-h-[9rem] resize-y"
              placeholder={value.requestType === 'varaosa' ? 'Mikä osa tarvitaan? Esim. luukun tiiviste, suodatin…' : 'Miten vika ilmenee? Näkyykö näytöllä vikakoodia?'}
            />
            <p id="description-hint" className="mt-1.5 text-[0.85rem] text-ink-3">
              {value.description.length}/2000 merkkiä
            </p>
            {err('description')}
          </div>
          <div className="mt-6">
            <label className="flex cursor-pointer gap-3 text-[0.95rem]">
              <input
                type="checkbox"
                name="consent"
                checked={value.consent}
                onChange={(e) => set('consent', e.target.checked)}
                {...aria('consent')}
                className="mt-1 h-5 w-5 flex-none accent-green-600"
              />
              <span>
                Tietojani saa käyttää yhteydenottoon tähän huoltopyyntöön liittyen. {req}
              </span>
            </label>
            {err('consent')}
          </div>
        </fieldset>

        {status === 'error' && (
          <div ref={resultRef} tabIndex={-1} role="alert" className="field-error mt-5 rounded-xl bg-red-50 p-4">
            <AlertCircle size={18} aria-hidden="true" /> {message}
          </div>
        )}
        {Object.values(errors).some(Boolean) && (
          <p role="alert" className="field-error mt-5">
            <AlertCircle size={16} aria-hidden="true" className="mt-0.5" /> Tarkista merkityt kentät.
          </p>
        )}

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button type="submit" className="btn btn-primary text-[1.05rem]" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Tarkistetaan…
              </>
            ) : (
              <>
                Lähetä huoltopyyntö <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
              </>
            )}
          </button>
          <p className="text-[0.88rem] text-ink-3">Demoversio – viestiä ei lähetetä.</p>
        </div>
      </form>

      {/* Context-aware helper */}
      <aside className="lg:col-span-4" aria-label="Apua tyyppikilven tietoihin">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <div className="on-dark overflow-hidden rounded-2xl bg-night text-white">
            {tip?.photos[0] ? (
              <img src={plateSrc(tip.photos[0].id, 960)} alt={`Esimerkkikuva: ${tip.photos[0].caption}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="night-dots flex aspect-[4/3] items-center justify-center bg-night-2 p-10 text-center">
                <p className="font-display text-[1.6rem] font-[740] leading-tight [font-stretch:82%]">
                  Valitse merkki ja laite – näytämme, mistä tiedot löytyvät.
                </p>
              </div>
            )}
            <div className="p-6">
              <p className="plate-label text-green-400">{tip ? `${group!.name} · ${appliance!.short}` : 'Vinkki'}</p>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-white/80">
                {tip
                  ? tip.text[0]
                  : 'Merkki, malli, artikkelinumero ja sarjanumero löytyvät yleensä laitteen tyyppikilvestä. Tiedot nopeuttavat oikean varaosan löytämistä.'}
              </p>
              {group?.id === 'bsh' && (
                <p className="mt-3 rounded-lg bg-white/8 p-3 text-[0.88rem] text-white/80">
                  BSH-laitteissa sarjanumero on muotoa <span className="mono">Z-Nr: 00782</span> – ei pitkä tuotantokoodi.
                </p>
              )}
              <Link
                to={`/tyyppikilpi/?${new URLSearchParams({ ...(brand ? { merkki: brand.id } : {}), ...(appliance?.inGuide ? { laite: appliance.id } : {}) })}`}
                className="mt-5 inline-block font-semibold text-green-400 hover:text-white"
              >
                <span className="link-u">Avaa tyyppikilpiopas</span> →
              </Link>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-ink/12 p-6">
            <p className="plate-label text-ink-3">Mieluummin puhelimitse?</p>
            <a href={company.phone.href} className="mt-2 block font-display text-[2rem] font-[760] leading-none [font-stretch:80%] hover:text-green-700">
              {company.phone.display}
            </a>
            <p className="mt-2 text-[0.92rem] text-ink-2">{company.hours.long}</p>
          </div>
        </div>
      </aside>
    </div>
  )
}
