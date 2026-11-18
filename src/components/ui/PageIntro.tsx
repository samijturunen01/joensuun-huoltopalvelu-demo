import { Link } from 'react-router-dom'

interface Props {
  code: string
  label: string
  title: React.ReactNode
  lede?: React.ReactNode
  children?: React.ReactNode
  aside?: React.ReactNode
  crumb: string
}

/** Subpage opening: breadcrumb, plate-style label, editorial title and an optional art column. */
export function PageIntro({ code, label, title, lede, children, aside, crumb }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-ink/10">
      <div className="paper-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(180deg,#000,transparent)]" aria-hidden="true" />
      <div className="container-x relative grid gap-12 pb-14 pt-8 lg:grid-cols-12 lg:pb-20 lg:pt-12">
        <div className={aside ? 'lg:col-span-7' : 'lg:col-span-10'}>
          <nav aria-label="Murupolku" className="plate-label text-ink-3">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-ink">
                  Etusivu
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {crumb}
              </li>
            </ol>
          </nav>
          <p className="plate-label mt-10 flex items-center gap-3 text-green-700">
            <span className="tabular">{code}</span>
            <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
            {label}
          </p>
          <h1 className="display-l mt-5">{title}</h1>
          {lede && <div className="lede mt-6 max-w-[40rem]">{lede}</div>}
          {children}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  )
}
