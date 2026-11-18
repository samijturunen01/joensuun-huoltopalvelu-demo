import type { ApplianceId } from '../../data/appliances'
import { MARK } from './geometry'
import { Mark } from './Mark'

/**
 * Appliance icon family drawn on the logo's own grid (viewBox and 9-unit
 * stroke of the washing-machine mark), so every icon belongs to the brand.
 */
const H = MARK.housing
const housing = <rect x={H.x} y={H.y} width={H.w} height={H.h} rx={H.r} />

const shapes: Record<Exclude<ApplianceId, 'pesukone'>, React.ReactNode> = {
  jaakaappi: (
    <>
      <rect x="79" y="52.5" width="106" height="181" rx="9.5" />
      <path d="M79 108H185" />
      <path d="M100 74V90M100 128V166" />
      <circle cx="164" cy="80" r="1.5" />
    </>
  ),
  astianpesukone: (
    <>
      {housing}
      <path d="M52.5 97.4H211.5" />
      <path d={MARK.slot} />
      <path d="M98 118H166" />
      <path d="M78 150V200H186V150M104 150V200M132 150V200M160 150V200" />
    </>
  ),
  uuni: (
    <>
      {housing}
      <path d="M52.5 97.4H211.5" />
      <circle cx="80" cy="76.5" r="7.5" />
      <circle cx="112" cy="76.5" r="7.5" />
      <path d="M150 76.5H186" />
      <path d="M86 116H178" />
      <rect x="78" y="134" width="108" height="72" rx="9" />
    </>
  ),
  keittotaso: (
    <>
      <rect x="52.5" y="82" width="159" height="124" rx="11" />
      <circle cx="96" cy="124" r="21" />
      <circle cx="164" cy="121" r="15" />
      <circle cx="164" cy="170" r="12" />
      <circle cx="96" cy="176" r="10" />
    </>
  ),
  mikro: (
    <>
      <rect x="52.5" y="82" width="159" height="124" rx="9.5" />
      <rect x="70" y="99" width="88" height="90" rx="8" />
      <path d="M176 82V206" />
      <path d="M190 104H197M190 124H197" />
      <circle cx="193.5" cy="168" r="7" />
    </>
  ),
  imuri: (
    <>
      <circle cx="164" cy="178" r="36" />
      <circle cx="164" cy="178" r="11" />
      <path d="M130 166C104 158 92 120 112 84" />
      <path d="M112 84L72 210" />
      <path d="M54 212H98" />
    </>
  ),
  keskusimuri: (
    <>
      <rect x="100" y="52.5" width="68" height="146" rx="28" />
      <path d="M100 100H168" />
      <circle cx="134" cy="76" r="1.5" />
      <path d="M134 198.5V232" />
      <path d="M118 232H150" />
      <path d="M100 160C76 160 62 176 62 206" />
    </>
  ),
}

export function ApplianceIcon({ id, className }: { id: ApplianceId; className?: string }) {
  if (id === 'pesukone') return <Mark className={className} />
  return (
    <svg viewBox={MARK.viewBox} className={className} aria-hidden="true" overflow="visible">
      <g fill="none" stroke="currentColor" strokeWidth={MARK.stroke} strokeLinecap="round" strokeLinejoin="round">
        {shapes[id]}
      </g>
    </svg>
  )
}
