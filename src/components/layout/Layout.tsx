import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileActionBar } from './MobileActionBar'
import { ScrollManager } from './ScrollManager'
import { useReveals } from '../../hooks/useReveals'
import { metaFor } from '../../data/seo'

export function Layout() {
  const location = useLocation()
  useReveals(location.pathname)

  // Page title + description on client-side navigation (prerendered HTML has them already)
  useEffect(() => {
    const meta = metaFor(location.pathname)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [location.pathname])

  return (
    <>
      <a href="#sisalto" className="skip-link">
        Siirry sisältöön
      </a>
      <ScrollManager />
      <Header />
      <main id="sisalto" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  )
}
