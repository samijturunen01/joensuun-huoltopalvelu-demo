import { code39 } from '../../lib/barcode'

/** Decorative Code 39 barcode (encodes real public data, e.g. the business ID). */
export function Barcode({ value, className, height = 34 }: { value: string; className?: string; height?: number }) {
  const bars = code39(value)
  const total = bars.reduce((a, b) => a + b, 0)
  let x = 0
  const rects: React.ReactNode[] = []
  bars.forEach((w, i) => {
    if (i % 2 === 0) rects.push(<rect key={i} x={x} y={0} width={w} height={height} />)
    x += w
  })
  return (
    <svg viewBox={`0 0 ${total} ${height}`} preserveAspectRatio="none" className={className} aria-hidden="true">
      <g fill="currentColor">{rects}</g>
    </svg>
  )
}
