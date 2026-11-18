import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Phone, X, ArrowRight, MessageCircle } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { navRoutes } from '../../data/seo'
import { company } from '../../data/company'

const toHref = (p: string) => (p === '/' ? '/' : `${p}/`)

export function Header() {
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const isHome = location.pathname === '/' || location.pathname === ''
  const open = openOn === location.pathname
  const setOpen = (v: boolean | ((o: boolean) => boolean)) => {
    const next = typeof v === 'function' ? v(open) : v
    setOpenOn(next ? location.pathname : null)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu: lock scroll, Esc to close, keep focus inside
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const first = menuRef.current?.querySelector<HTMLElement>('a, button')
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenOn(null)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab' && menuRef.current) {
        const f = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a, button'))
        const [a, z] = [f[0], f[f.length - 1]]
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault()
          z.focus()
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault()
          a.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? 'bg-paper/92 shadow-[0_1px_0_rgb(13_26_18/0.1)] backdrop-blur-md'
          : 'bg-paper/0'
      }`}
    >
      <div className="container-x flex h-[var(--header-h)] items-center gap-4">
        <Link to="/" className="group relative z-10 flex shrink-0 items-center gap-3" aria-label="Joensuun Huoltopalvelu Oy – etusivulle">
          <Logo className="h-9 w-auto sm:h-10 lg:h-11" intro={isHome} />
        </Link>
        <span className="plate-label hidden rounded-full border border-ink/20 px-2.5 py-1 text-[0.62rem] text-ink-3 xl:inline-block">
          Konseptidemo
        </span>

        <nav aria-label="Päävalikko" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {navRoutes.map((r) => (
              <li key={r.path}>
                <NavLink
                  to={toHref(r.path)}
                  end={r.path === '/'}
                  className={({ isActive }) =>
                    `relative block rounded-full px-3.5 py-2 text-[0.95rem] font-[560] transition-colors ${
                      isActive ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-ink/6 hover:text-ink'
                    }`
                  }
                >
                  {r.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <a href={company.phone.href} className="btn btn-outline hidden !min-h-11 !px-4 text-[0.95rem] md:inline-flex">
            <Phone size={17} aria-hidden="true" />
            <span className="tabular">{company.phone.display}</span>
          </a>
          <Link to="/huoltopyynto/" className="btn btn-primary hidden !min-h-11 !px-4 text-[0.95rem] sm:inline-flex">
            Huoltopyyntö
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Sulje valikko' : 'Avaa valikko'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile menu – outside <header>: its backdrop-filter would trap position:fixed */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-paper lg:hidden"
      >
        <nav aria-label="Mobiilivalikko" className="container-x flex min-h-full flex-col pb-28 pt-4">
          <ul className="border-t border-ink/12">
            {navRoutes.map((r, i) => (
              <li key={r.path} className="border-b border-ink/12">
                <NavLink
                  to={toHref(r.path)}
                  end={r.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-4 font-display text-[2rem] font-[740] leading-none [font-stretch:80%] ${
                      isActive ? 'text-green-600' : 'text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex items-baseline gap-3">
                        <span className="mono text-xs font-medium text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                        {r.label}
                      </span>
                      {isActive ? <span className="led" aria-hidden="true" /> : <ArrowRight size={22} aria-hidden="true" className="text-ink-3" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link to="/huoltopyynto/" className="btn btn-primary w-full">
              Tee huoltopyyntö <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={company.phone.href} className="btn btn-outline">
                <Phone size={18} aria-hidden="true" /> Soita
              </a>
              <a href={company.whatsapp} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} aria-hidden="true" /> WhatsApp
              </a>
            </div>
            <p className="plate-label mt-4 text-ink-3">
              {company.address.street}, {company.address.city} · {company.hours.label}
            </p>
          </div>
        </nav>
      </div>
    </>
  )
}
