import { Link } from 'react-router-dom'
import { MessageCircle, Phone, Wrench } from 'lucide-react'
import { company } from '../../data/company'

/** Always-reachable contact on phones: call, WhatsApp, service request. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Pikayhteydet"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night/95 pb-[env(safe-area-inset-bottom)] text-white backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-3">
        <li>
          <a href={company.phone.href} className="flex h-16 flex-col items-center justify-center gap-1 text-[0.78rem] font-semibold">
            <Phone size={20} aria-hidden="true" className="text-green-400" />
            Soita
          </a>
        </li>
        <li className="border-x border-white/10">
          <a
            href={company.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-16 flex-col items-center justify-center gap-1 text-[0.78rem] font-semibold"
          >
            <MessageCircle size={20} aria-hidden="true" className="text-green-400" />
            WhatsApp
          </a>
        </li>
        <li>
          <Link to="/huoltopyynto/" className="flex h-16 flex-col items-center justify-center gap-1 text-[0.78rem] font-semibold">
            <Wrench size={20} aria-hidden="true" className="text-green-400" />
            Huoltopyyntö
          </Link>
        </li>
      </ul>
    </nav>
  )
}
