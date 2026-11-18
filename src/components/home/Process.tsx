import { Link } from 'react-router-dom'
import { SectionHeading } from '../ui/SectionHeading'
import { company } from '../../data/company'

const steps = [
  {
    title: 'Katso tyyppikilpi',
    text: 'Kirjoita ylös laitteen merkki, malli ja mahdollinen artikkelinumero. Opas näyttää, mistä kilpi yleensä löytyy.',
    link: { to: '/tyyppikilpi/', label: 'Tyyppikilpiopas' },
  },
  {
    title: 'Ota yhteyttä',
    text: `Soita tai laita viestiä numeroon ${company.phone.display}, lähetä WhatsApp tai sähköpostia, täytä huoltopyyntö – tai tule käymään Pamilonkadulle.`,
    link: { to: '/huoltopyynto/', label: 'Huoltopyyntö' },
  },
  {
    title: 'Sovitaan jatko',
    text: 'Sovitaan huollosta tai varaosan hankinnasta. Työn ja matkojen hinnat näet etukäteen julkisesta hinnastosta.',
    link: { to: '/hinnasto/', label: 'Hinnasto' },
  },
]

/** Three-step program track – the line "runs" like a wash program dial. */
export function Process() {
  return (
    <section aria-labelledby="prosessi-title" className="border-y border-ink/10 bg-paper-2 py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          code="04"
          label="Näin pääset alkuun"
          id="prosessi-title"
          title="Kolme vaihetta korjattuun laitteeseen."
          size="m"
        />
        <div className="relative mt-14" data-inview="">
          <svg className="absolute left-0 right-0 top-[1.4rem] hidden h-2 w-full md:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden="true">
            <line x1="0" y1="1" x2="100" y2="1" stroke="#0d1a12" strokeOpacity=".25" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <line x1="0" y1="1" x2="100" y2="1" stroke="#2ea15c" strokeWidth="3" vectorEffect="non-scaling-stroke" pathLength={1} data-draw="" style={{ transitionDuration: '2.4s' }} />
          </svg>
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} data-reveal style={{ '--reveal-delay': `${200 + i * 260}ms` } as React.CSSProperties}>
                <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-paper font-display text-xl font-[800]">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-display text-[1.8rem] font-[740] [font-stretch:82%]">{s.title}</h3>
                <p className="mt-3 max-w-[22rem] text-ink-2">{s.text}</p>
                <Link to={s.link.to} className="mt-4 inline-block font-semibold text-green-700 hover:text-green-900">
                  <span className="link-u">{s.link.label}</span> →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
