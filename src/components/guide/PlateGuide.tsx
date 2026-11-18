import { useSyncExternalStore } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Info } from 'lucide-react'
import { brands, brandById, type GuideGroupId } from '../../data/brands'
import { appliances, applianceById, type ApplianceId } from '../../data/appliances'
import { groupById, guideGroups, otherBrandNote } from '../../data/plateGuide'
import { ApplianceIcon } from '../brand/ApplianceIcon'
import { PlateViewer } from './PlateViewer'

const guideAppliances = appliances.filter((a) => a.inGuide)
const subscribe = () => () => {}
/** false on the server and during hydration, true afterwards – keeps prerendered HTML in sync. */
const useHydrated = () => useSyncExternalStore(subscribe, () => true, () => false)

/**
 * Interactive rating-plate guide. The selection lives in the URL
 * (?merkki=bosch&laite=pesukone) so it can be shared and pre-fills the form.
 */
export function PlateGuide() {
  const hydrated = useHydrated()
  const [params, setParams] = useSearchParams()
  const q = (k: string) => (hydrated ? params.get(k) : null)

  const brand = brandById(q('merkki'))
  const groupId: GuideGroupId = brand?.group ?? (groupById(q('ryhma'))?.id as GuideGroupId | undefined) ?? 'bsh'
  const group = groupById(groupId)!
  const appliance = applianceById(q('laite'))?.inGuide ? applianceById(q('laite'))! : guideAppliances[0]
  const entry = group.entries[appliance.id]
  const unlisted = brand && !brand.group

  const update = (next: Record<string, string | null>) => {
    const p = new URLSearchParams(params)
    for (const [k, v] of Object.entries(next)) {
      if (v === null) p.delete(k)
      else p.set(k, v)
    }
    setParams(p, { replace: true, preventScrollReset: true })
  }

  const requestHref = `/huoltopyynto/?${new URLSearchParams({
    ...(brand ? { merkki: brand.id } : {}),
    laite: appliance.id,
  }).toString()}`

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Selectors */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <fieldset>
            <legend className="plate-label mb-3 flex items-center gap-2 text-green-700">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[0.65rem] text-white">1</span>
              Valitse merkki
            </legend>
            <div className="flex flex-wrap gap-1.5">
              {brands
                .filter((b) => b.category === 'kodinkoneet' || b.group)
                .map((b) => {
                  const on = brand?.id === b.id
                  return (
                    <button
                      key={b.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => update({ merkki: b.id, ryhma: null })}
                      className={`rounded-full border px-3 py-1.5 text-[0.9rem] font-medium transition-colors ${
                        on
                          ? 'border-ink bg-ink text-paper'
                          : b.group === groupId && !unlisted
                            ? 'border-green-600/50 bg-green-100 text-ink hover:border-ink'
                            : 'border-ink/20 hover:border-ink'
                      }`}
                    >
                      {b.name}
                    </button>
                  )
                })}
            </div>
            <p className="mt-3 text-[0.85rem] text-ink-3">
              Vihreällä: merkit, joita valittu ohje koskee ({group.brands}).
            </p>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="plate-label mb-3 flex items-center gap-2 text-green-700">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[0.65rem] text-white">2</span>
              Valitse laite
            </legend>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-2">
              {guideAppliances.map((a) => {
                const on = a.id === appliance.id
                return (
                  <button
                    key={a.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => update({ laite: a.id })}
                    className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left text-[0.9rem] font-medium leading-tight transition-colors ${
                      on ? 'border-green-600 bg-green-600 text-white' : 'border-ink/15 bg-white/60 hover:border-ink/50'
                    }`}
                  >
                    <ApplianceIcon id={a.id as ApplianceId} className="w-6 flex-none" />
                    {a.short}
                  </button>
                )
              })}
            </div>
          </fieldset>
        </div>
      </div>

      {/* Result */}
      <div className="lg:col-span-8" aria-live="polite">
        <div className="plate overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/12 bg-paper-2/70 px-5 py-4 sm:px-7">
            <p className="plate-label text-ink-2">
              {group.name} <span className="text-ink-3">· {appliance.name}</span>
            </p>
            <p className="mono text-[0.72rem] text-ink-3">{group.brands}</p>
          </div>

          <div className="p-5 sm:p-7">
            {unlisted && (
              <div className="mb-6 flex gap-3 rounded-xl bg-green-100 p-4 text-[0.95rem]">
                <Info size={20} aria-hidden="true" className="mt-0.5 flex-none text-green-700" />
                <div>
                  <p className="font-semibold">{brand.name}: ei omaa ohjetta.</p>
                  <p className="mt-1 text-ink-2">{otherBrandNote} Alla vertailukohdaksi:</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {guideGroups.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        aria-pressed={g.id === groupId}
                        onClick={() => update({ ryhma: g.id, merkki: null })}
                        className={`rounded-full border px-3 py-1 text-[0.85rem] ${g.id === groupId ? 'border-ink bg-ink text-paper' : 'border-ink/25'}`}
                      >
                        {g.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <h2 className="display-m !text-[clamp(1.6rem,2.6vw,2.3rem)]">
              Mistä {appliance.genitive} tyyppikilpi löytyy?
            </h2>

            {entry ? (
              <>
                <div className="mt-4 max-w-[46rem] space-y-3 text-[1.05rem] leading-relaxed text-ink-2">
                  {entry.text.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
                {entry.photos.length > 0 ? (
                  <div className={`mt-7 grid gap-6 ${entry.photos.length > 1 ? 'xl:grid-cols-2' : ''}`}>
                    {entry.photos.map((p, i) => (
                      <PlateViewer key={p.id} photo={p} priority={i === 0} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-7 flex items-center gap-5 rounded-2xl border border-dashed border-ink/25 p-5">
                    <ApplianceIcon id={appliance.id} className="w-14 flex-none text-green-700" />
                    <p className="text-[0.95rem] text-ink-2">
                      Tähän laitetyyppiin ei ole valokuvaa – yllä oleva ohje kertoo kilven tavallisen paikan.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="mt-4 max-w-[46rem] text-[1.05rem] text-ink-2">
                Tälle laitetyypille ei ole {group.name}-ohjetta. {otherBrandNote} Esimerkiksi imureissa kilpi on yleensä laitteen
                pohjassa.
              </p>
            )}

            {group.intro && (
              <div className="mt-7 flex gap-3 rounded-xl border border-green-600/30 bg-green-100/60 p-4 text-[0.95rem]">
                <Info size={20} aria-hidden="true" className="mt-0.5 flex-none text-green-700" />
                <p>
                  <strong className="font-semibold">Huom! </strong>
                  {group.intro}
                </p>
              </div>
            )}

            <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-ink/12 bg-ink/12 sm:grid-cols-3">
              {[
                ['Malli', group.fields.model],
                ['Artikkelinumero', group.fields.article],
                ['Sarjanumero', group.fields.serial],
              ].map(([k, v]) => (
                <div key={k} className="bg-label p-4">
                  <p className="plate-label text-ink-3">{k}</p>
                  <p className="mono mt-1 text-[0.9rem] font-semibold">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[26rem] text-[0.95rem] text-ink-2">Löysitkö kilven? Lähetä tiedot – merkki ja laite ovat valmiina lomakkeella.</p>
              <Link to={requestHref} className="btn btn-primary">
                Jatka huoltopyyntöön <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
