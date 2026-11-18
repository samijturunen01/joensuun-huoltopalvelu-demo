import { useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { company, fullAddress } from '../../data/company'

/**
 * Privacy-conscious Google Maps: nothing loads from Google until the visitor
 * asks for the map. Uses the keyless embed URL (no paid API key).
 */
export function MapEmbed() {
  const [load, setLoad] = useState(false)
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-ink/12 bg-paper-2">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/9]">
        {load ? (
          <iframe
            title={`Kartta: ${company.name}, ${fullAddress}`}
            src={company.maps.embed}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="paper-dots absolute inset-0 flex items-center justify-center p-6">
            {/* Schematic placeholder – street grid lines, not a real map */}
            <svg className="absolute inset-0 h-full w-full text-ink/12" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round">
                <path d="M-20 300C160 270 300 260 820 210" />
                <path d="M380 -20L430 470" />
                <path d="M-20 120L820 60" strokeWidth="8" />
                <path d="M620 -20L560 470" strokeWidth="8" />
              </g>
            </svg>
            <div className="relative max-w-sm text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg">
                <MapPin size={26} aria-hidden="true" />
              </span>
              <p className="mt-4 font-display text-[1.6rem] font-[750] leading-tight [font-stretch:82%]">{fullAddress}</p>
              <button type="button" onClick={() => setLoad(true)} className="btn btn-ink mt-5">
                Näytä kartta
              </button>
              <p className="mt-3 text-[0.82rem] text-ink-3">Kartta ladataan Googlelta vasta, kun valitset sen.</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 border-t border-ink/12 bg-label p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 font-semibold">
          <MapPin size={18} aria-hidden="true" className="text-green-700" /> {fullAddress}
        </p>
        <div className="flex flex-wrap gap-2">
          <a href={company.maps.directions} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-11 !px-4 text-[0.95rem]">
            <Navigation size={17} aria-hidden="true" /> Katso reittiohjeet
          </a>
          <a href={company.maps.open} target="_blank" rel="noopener noreferrer" className="btn btn-outline !min-h-11 !px-4 text-[0.95rem]">
            Avaa Google Mapsissa
          </a>
        </div>
      </div>
    </div>
  )
}
