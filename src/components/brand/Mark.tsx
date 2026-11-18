import { useId } from 'react'
import { GEAR_PATH, MARK } from './geometry'

interface MarkProps {
  className?: string
  color?: string
  /** Render the drum wave (the logo's water line). */
  wave?: boolean
  /** Adds the attributes the homepage intro animates. */
  intro?: boolean
  /** Wave hidden at rest (the hero shows a photo through the drum). */
  drained?: boolean
  title?: string
}

/**
 * The washing-machine mark of the Joensuun Huoltopalvelu logo as stroke
 * geometry. Every stroked part has pathLength="1" so it can draw itself.
 */
export function Mark({ className, color = 'currentColor', wave = true, intro = false, drained = false, title }: MarkProps) {
  const uid = useId().replace(/:/g, '')
  const draw = intro ? { 'data-intro': 'draw' } : {}
  const { housing: h, drum, dot, gear } = MARK
  return (
    <svg
      viewBox={MARK.viewBox}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      overflow="visible"
    >
      <defs>
        <clipPath id={`door-cut-${uid}`}>
          <rect x="40" y="40" width="200" height="174.6" />
        </clipPath>
      </defs>
      <g fill="none" stroke={color} strokeWidth={MARK.stroke} strokeLinecap="round" strokeLinejoin="round">
        <rect data-part="housing" x={h.x} y={h.y} width={h.w} height={h.h} rx={h.r} pathLength={1} {...draw} />
        <path
          data-part="door"
          d={MARK.door}
          strokeLinecap="butt"
          clipPath={`url(#door-cut-${uid})`}
          pathLength={1}
          {...draw}
        />
        <circle data-part="drum" cx={drum.cx} cy={drum.cy} r={drum.r} pathLength={1} {...draw} />
        <path data-part="slot" d={MARK.slot} pathLength={1} {...draw} />
        {wave && (
          <g data-part="spin">
            <path data-part="ghost" d={MARK.wave} opacity={0} transform={`rotate(-22 ${drum.cx} ${drum.cy})`} />
            <path data-part="ghost" d={MARK.wave} opacity={0} transform={`rotate(-44 ${drum.cx} ${drum.cy})`} />
            <path data-part="wave" d={MARK.wave} opacity={drained ? 0 : undefined} />
          </g>
        )}
      </g>
      <g fill={color}>
        <circle data-part="dot" cx={dot.cx} cy={dot.cy} r={dot.r} />
        <path data-part="gear" fillRule="evenodd" d={GEAR_PATH} style={{ transformOrigin: `${gear.cx}px ${gear.cy}px` }} />
      </g>
    </svg>
  )
}
