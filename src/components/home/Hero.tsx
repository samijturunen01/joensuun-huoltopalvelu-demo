import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Phone, RotateCw } from 'lucide-react'
import { Mark } from '../brand/Mark'
import { MARK, PORTHOLE } from '../brand/geometry'
import { company } from '../../data/company'
import { brandCount } from '../../data/brands'
import { plateSrc, plateSrcSet } from '../../lib/asset'
import { gsap } from '../../lib/motion'
import { introState, prefersReducedMotion, releaseIntroHold } from '../../lib/intro'
import type { PlateImageId } from '../../data/imageManifest'

/** Authentic rating-plate photos shown through the drum window. */
const portholeShots: { id: PlateImageId; caption: string; pos: string }[] = [
  { id: 'miele-pesukone', caption: 'Miele-pyykinpesukone · kilpi täyttöluukun kauluksessa', pos: '58% 50%' },
  { id: 'bsh-pesukone', caption: 'Bosch-pyykinpesukone · kilpi luukun kauluksessa', pos: '40% 40%' },
  { id: 'electrolux-pesukone', caption: 'Electrolux-pyykinpesukone · kilpi luukun kauluksessa', pos: '36% 48%' },
  { id: 'gorenje-pesukone', caption: 'Gorenje-pyykinpesukone · kilpi kauluksen vieressä', pos: '36% 56%' },
  { id: 'miele-uuni', caption: 'Miele-uuni · kilpi rungossa tiivisteen ulkopuolella', pos: '45% 45%' },
  { id: 'bsh-jaakaappi', caption: 'Siemens-jääkaappi · kilpi kaapin sisäsivulla', pos: '50% 45%' },
]

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const [shot, setShot] = useState(0)
  const [spinning, setSpinning] = useState(false)

  // ---- Signature intro: "Linkous" (the spin cycle) ----
  useIsoLayoutEffect(() => {
    const el = root.current
    const playing = document.documentElement.classList.contains('intro-pending')
    if (!el || !playing || introState.navigated || prefersReducedMotion()) {
      releaseIntroHold()
      return
    }
    const q = gsap.utils.selector(el)
    const word = document.querySelector('[data-logo-word]')
    const { cx, cy } = MARK.drum
    let tl: gsap.core.Timeline | undefined

    const ctx = gsap.context(() => {
      // Take over the pre-paint hold with inline states, then release the CSS hold.
      gsap.set(q('[data-intro="draw"]'), { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0 })
      gsap.set(q('[data-intro="line"]'), { y: 0, yPercent: 105 })
      gsap.set(q('[data-intro="hide"]'), { autoAlpha: 0, y: 18 })
      gsap.set(q('[data-part="dot"]'), { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(q('[data-part="gear"]'), { scale: 0, rotate: -160, transformOrigin: '50% 50%' })
      gsap.set(q('[data-part="wave"]'), { opacity: 0 })
      gsap.set(q('[data-porthole]'), { clipPath: 'circle(0% at 50% 50%)' })
      gsap.set(q('[data-porthole] img'), { scale: 1.3, rotate: -30 })
      gsap.set(q('[data-panel]'), { autoAlpha: 0, scale: 0.94, y: 12 })
      if (word) gsap.set(word, { clipPath: 'inset(0% 100% 0% 0%)' })
      releaseIntroHold()

      tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(q('[data-intro="line"]'), { yPercent: 0, duration: 1.05, stagger: 0.09, ease: 'expo.out' }, 0.1)
        .to(q('[data-intro="hide"]'), { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.07 }, 0.5)
        .to(q('[data-panel]'), { autoAlpha: 1, scale: 1, y: 0, duration: 0.8 }, 0.05)
        .set(q('[data-part="housing"]'), { opacity: 1 }, 0.2)
        .to(q('[data-part="housing"]'), { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, 0.2)
        .set(q('[data-part="door"]'), { opacity: 1 }, 0.45)
        .to(q('[data-part="door"]'), { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.45)
        .set(q('[data-part="slot"]'), { opacity: 1 }, 0.7)
        .to(q('[data-part="slot"]'), { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' }, 0.7)
        .to(q('[data-part="dot"]'), { scale: 1, duration: 0.45, ease: 'back.out(3)' }, 0.85)
        .fromTo(q('[data-led-glow]'), { opacity: 0 }, { opacity: 1, duration: 0.18, yoyo: true, repeat: 1, ease: 'none' }, 0.9)
        .to(q('[data-part="gear"]'), { scale: 1, rotate: 0, duration: 0.9 }, 0.85)
        .set(q('[data-part="drum"]'), { opacity: 1 }, 0.95)
        .to(q('[data-part="drum"]'), { strokeDashoffset: 0, duration: 0.75, ease: 'power2.inOut' }, 0.95)
        .to(q('[data-part="wave"]'), { opacity: 1, duration: 0.25 }, 1.3)
        // the drum spins up and slows down like a spin cycle
        .fromTo(
          q('[data-part="spin"]'),
          { rotation: 0, svgOrigin: `${cx} ${cy}` },
          { rotation: 720, svgOrigin: `${cx} ${cy}`, duration: 1.45, ease: 'power2.inOut' },
          1.3,
        )
        .to(q('[data-part="ghost"]'), { opacity: 0.32, duration: 0.45, ease: 'power1.in' }, 1.45)
        .to(q('[data-part="ghost"]'), { opacity: 0, duration: 0.4 }, 2.25)
        .to(q('[data-part="wave"]'), { opacity: 0, duration: 0.35, ease: 'power1.in' }, 2.5)
        // the door opens onto an authentic rating plate
        .to(q('[data-porthole]'), { clipPath: 'circle(50% at 50% 50%)', duration: 0.85, ease: 'power3.inOut' }, 2.45)
        .to(q('[data-porthole] img'), { scale: 1, rotate: 0, duration: 1.3, ease: 'expo.out' }, 2.45)
        .fromTo(q('[data-sticker]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 2.85)
      if (word) tl.to(word, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'power2.inOut' }, 0.55)
      tl.eventCallback('onComplete', () => {
        gsap.set(q('[data-intro], [data-part], [data-porthole], [data-porthole] img, [data-panel], [data-sticker]'), {
          clearProps: 'transform,clipPath,strokeDasharray,strokeDashoffset,opacity,visibility,scale,rotate',
        })
        gsap.set(q('[data-part="wave"], [data-part="ghost"]'), { opacity: 0 })
        if (word) gsap.set(word, { clearProps: 'clipPath' })
      })
    }, el)

    // Never make anyone wait: any interaction finishes the intro instantly.
    const finish = () => tl && tl.progress() < 1 && tl.progress(1)
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
    events.forEach((e) => window.addEventListener(e, finish, { passive: true, once: true }))
    return () => {
      events.forEach((e) => window.removeEventListener(e, finish))
      ctx.revert()
      releaseIntroHold()
    }
  }, [])

  // ---- "Pyöritä rumpua": spin the drum to the next authentic plate photo ----
  const spin = () => {
    if (spinning) return
    const next = (shot + 1) % portholeShots.length
    const el = root.current
    if (!el || prefersReducedMotion()) {
      setShot(next)
      return
    }
    setSpinning(true)
    const q = gsap.utils.selector(el)
    const { cx, cy } = MARK.drum
    gsap
      .timeline({ onComplete: () => setSpinning(false) })
      .to(q('[data-porthole]'), { clipPath: 'circle(0% at 50% 50%)', duration: 0.35, ease: 'power2.in' }, 0)
      .to(q('[data-part="wave"]'), { opacity: 1, duration: 0.2 }, 0.2)
      .to(q('[data-part="ghost"]'), { opacity: 0.3, duration: 0.25 }, 0.25)
      .fromTo(
        q('[data-part="spin"]'),
        { rotation: 0, svgOrigin: `${cx} ${cy}` },
        { rotation: 540, svgOrigin: `${cx} ${cy}`, duration: 1.0, ease: 'power2.inOut' },
        0.15,
      )
      .add(() => setShot(next), 0.6)
      .to(q('[data-part="ghost"]'), { opacity: 0, duration: 0.25 }, 0.95)
      .to(q('[data-part="wave"]'), { opacity: 0, duration: 0.25 }, 1.05)
      .to(q('[data-porthole]'), { clipPath: 'circle(50% at 50% 50%)', duration: 0.6, ease: 'power3.out' }, 1.05)
      .fromTo(q('[data-porthole] img'), { rotate: -25, scale: 1.2 }, { rotate: 0, scale: 1, duration: 0.9, ease: 'expo.out' }, 1.05)
  }

  const current = portholeShots[shot]

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="paper-dots pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(180deg,#000,transparent_85%)]" aria-hidden="true" />
      <div className="container-x relative grid gap-x-10 gap-y-8 pb-16 pt-6 sm:pt-10 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-12 lg:grid-rows-[1fr_auto_1fr] lg:gap-y-0 lg:pb-20 lg:pt-6 xl:gap-x-16">
        {/* Headline (mobile: first, desktop: left column, upper half) */}
        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:self-end">
          <p data-intro="hide" className="plate-label flex items-center gap-3 text-ink-2">
            <span className="led" aria-hidden="true" />
            Kodinkonehuolto ja varaosat · Joensuu
          </p>
          <h1 id="hero-title" className="mt-6">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-intro="line" className="display-m block text-ink-2">
                Kodinkonehuolto ja varaosat
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-intro="line" className="display-xl block">
                Joensuussa
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-intro="line" className="display-xl block text-green-600">
                vuodesta 1976.
              </span>
            </span>
          </h1>
        </div>

        {/* The machine: logo mark at hero scale with a real rating plate behind the door */}
        <div className="relative ml-auto w-[84%] max-w-[30rem] sm:mx-auto sm:w-full lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1 lg:max-w-none lg:self-center">
          <div
            data-panel=""
            className="logo-gradient on-green relative overflow-hidden rounded-[clamp(1.4rem,3vw,2.25rem)] p-[9%] shadow-[0_40px_80px_-40px_rgb(0_57_26/0.7)]"
          >
            <div className="night-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_10%,rgb(255_255_255/0.18),transparent_70%)]"
              aria-hidden="true"
            />
            <div className="relative aspect-[176/190]">
              <div
                data-porthole=""
                className="absolute overflow-hidden rounded-full bg-night-2"
                style={{
                  left: `${PORTHOLE.left}%`,
                  top: `${PORTHOLE.top}%`,
                  width: `${PORTHOLE.width}%`,
                  height: `${PORTHOLE.height}%`,
                }}
              >
                <img
                  key={current.id}
                  src={plateSrc(current.id, 960)}
                  srcSet={plateSrcSet(current.id)}
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  alt={`Joensuun Huoltopalvelun oma kuva: ${current.caption}.`}
                  width={480}
                  height={480}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: current.pos }}
                />
                <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_6px_rgb(0_0_0/0.25),inset_0_18px_40px_rgb(0_0_0/0.35)]" aria-hidden="true" />
              </div>
              <Mark intro drained className="absolute inset-0 h-full w-full text-white" color="#fff" />
              <span
                data-led-glow=""
                aria-hidden="true"
                className="pointer-events-none absolute h-[14%] w-[14%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal opacity-0 blur-xl"
                style={{ left: `${((MARK.dot.cx - 44) / 176) * 100}%`, top: `${((MARK.dot.cy - 48) / 190) * 100}%` }}
              />
            </div>
          </div>

          {/* Plate sticker caption */}
          <div
            data-sticker=""
            className="plate relative z-10 -mt-8 ml-auto mr-4 w-[min(22rem,88%)] p-4 sm:-mt-10 sm:mr-[-0.5rem] lg:mr-[-1.5rem]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="plate-label text-green-700">
                  Kuva {String(shot + 1).padStart(2, '0')}/{String(portholeShots.length).padStart(2, '0')} · tyyppikilpi
                </p>
                <p className="mt-1.5 text-[0.92rem] font-medium leading-snug" aria-live="polite">
                  {current.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={spin}
                disabled={spinning}
                className="group inline-flex h-11 w-11 flex-none items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-green-700 disabled:opacity-60"
                aria-label="Pyöritä rumpua – näytä seuraava tyyppikilpikuva"
              >
                <RotateCw size={18} aria-hidden="true" className="transition-transform duration-500 group-hover:rotate-90" />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-ink/12 pt-3">
              <Link to="/tyyppikilpi/" className="text-[0.9rem] font-semibold text-green-700 hover:text-green-900">
                <span className="link-u">Mistä löydän oman kilpeni?</span>
              </Link>
              <span className="mono text-[0.7rem] text-ink-3">JHP · 1976</span>
            </div>
          </div>
        </div>

        {/* Copy + calls to action (mobile: after the machine) */}
        <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:self-start">
          <p data-intro="hide" className="lede max-w-[36rem] lg:mt-7">
            Pesukone, jääkaappi tai uuni reistailee? Huollamme kodinkoneita ja hankimme niihin varaosat – {brandCount} merkkiä
            Mielestä ja Boschista Electroluxiin ja UPOon. Palvelemme Joensuussa ja koko Pohjois-Karjalassa.
          </p>
          <div data-intro="hide" className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={company.phone.href} className="btn btn-primary text-[1.05rem]">
              <Phone size={19} aria-hidden="true" />
              Soita <span className="tabular">{company.phone.display}</span>
            </a>
            <Link to="/huoltopyynto/" className="btn btn-outline text-[1.05rem]">
              Tee huoltopyyntö <ArrowRight size={19} className="btn-arrow" aria-hidden="true" />
            </Link>
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[3.25rem] items-center gap-2 px-2 font-semibold text-ink-2 hover:text-green-700"
            >
              <MessageCircle size={19} aria-hidden="true" /> <span className="link-u">WhatsApp</span>
            </a>
          </div>
          <dl data-intro="hide" className="mt-12 grid max-w-[40rem] grid-cols-2 border-t border-ink/15 sm:grid-cols-3">
            {[
              ['Avoinna', company.hours.label],
              ['Osoite', company.address.street],
              ['Perustettu', company.foundedLabel],
            ].map(([k, v], i) => (
              <div key={k} className={`pt-4 pr-4 ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
                <dt className="plate-label text-ink-3">{k}</dt>
                <dd className="mt-1.5 font-semibold tabular">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </section>
  )
}
