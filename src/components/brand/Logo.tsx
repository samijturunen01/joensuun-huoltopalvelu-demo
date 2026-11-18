import { useId } from 'react'
import { asset } from '../../lib/asset'
import { BADGE, GEAR_PATH, MARK, WORD_BOX } from './geometry'

/**
 * The authentic Joensuun Huoltopalvelu logo badge: logo gradient, washing-machine
 * mark and the wordmark traced 1:1 from the original artwork. The wordmark is an
 * <image> so the homepage intro can wipe it in like a label being applied.
 */
export function Logo({ className, intro = false }: { className?: string; intro?: boolean }) {
  const uid = useId().replace(/:/g, '')
  const { housing: h, drum, dot } = MARK
  return (
    <svg viewBox={`0 0 ${BADGE.w} ${BADGE.h}`} className={className} role="img" aria-label="Joensuun Huoltopalvelu Oy">
      <defs>
        <linearGradient id={`lg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5AC071" />
          <stop offset=".22" stopColor="#2EA15C" />
          <stop offset=".36" stopColor="#008648" />
          <stop offset=".78" stopColor="#005A29" />
          <stop offset="1" stopColor="#005223" />
        </linearGradient>
        <clipPath id={`dc-${uid}`}>
          <rect x="40" y="40" width="200" height="174.6" />
        </clipPath>
      </defs>
      <rect width={BADGE.w} height={BADGE.h} rx={BADGE.r} fill={`url(#lg-${uid})`} />
      <g fill="none" stroke="#fff" strokeWidth={MARK.stroke} strokeLinecap="round" strokeLinejoin="round">
        <rect x={h.x} y={h.y} width={h.w} height={h.h} rx={h.r} />
        <path d={MARK.door} strokeLinecap="butt" clipPath={`url(#dc-${uid})`} />
        <circle cx={drum.cx} cy={drum.cy} r={drum.r} />
        <path d={MARK.wave} />
        <path d={MARK.slot} />
      </g>
      <g fill="#fff">
        <circle cx={dot.cx} cy={dot.cy} r={dot.r} />
        <path fillRule="evenodd" d={GEAR_PATH} />
      </g>
      <image
        href={asset('brand/wordmark-white.svg')}
        x={WORD_BOX.x}
        y={WORD_BOX.y}
        width={WORD_BOX.w}
        height={WORD_BOX.h}
        data-logo-word=""
        data-intro={intro ? 'wipe' : undefined}
      />
    </svg>
  )
}
