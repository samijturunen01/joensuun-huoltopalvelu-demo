/**
 * Washing-machine mark geometry, rebuilt from the authentic logo
 * (Logofinalnew-colors.png, 1244×285 space, stroke 9) – mirrors scripts/mark-geometry.mjs.
 */
export const MARK = {
  viewBox: '44 48 176 190',
  vb: { x: 44, y: 48, w: 176, h: 190 },
  stroke: 9,
  housing: { x: 52.5, y: 56.3, w: 159, h: 172.5, r: 9.5 },
  door: 'M52.5 97.4H130.4A62.5 62.5 0 0 1 162.6 213.2',
  drum: { cx: 130.4, cy: 158.6, r: 45.8 },
  wave: 'M85 162.5C100 147 117 149 130 160.5S160 175 175.6 156.6',
  slot: 'M73.3 76.2H109.3',
  dot: { cx: 155, cy: 76.5, r: 8 },
  gear: { cx: 183.6, cy: 82 },
} as const

export const BADGE = { w: 1244, h: 285, r: 22 }
export const WORD_BOX = { x: 230, y: 112, w: 968, h: 122 }

export function gearPath(cx: number, cy: number, rb = 9.6, rt = 12.8, hw = 3.1, hole = 3.6, n = 6, rot = -90) {
  const f = (v: number) => +v.toFixed(2)
  const pts: number[][] = []
  for (let i = 0; i < n; i++) {
    const a = ((rot + (i * 360) / n) * Math.PI) / 180
    const t = hw / rt
    const tb = hw / rb
    const p = (r: number, ang: number) => [f(cx + r * Math.cos(ang)), f(cy + r * Math.sin(ang))]
    pts.push(p(rb, a - tb * 1.25), p(rt, a - t), p(rt, a + t), p(rb, a + tb * 1.25))
  }
  let d = `M${pts[0].join(' ')}`
  for (let i = 0; i < n; i++) {
    const b = i * 4
    d += `L${pts[b + 1].join(' ')}L${pts[b + 2].join(' ')}L${pts[b + 3].join(' ')}`
    d += `A${rb} ${rb} 0 0 1 ${pts[((i + 1) % n) * 4].join(' ')}`
  }
  d += `ZM${f(cx + hole)} ${cy}A${hole} ${hole} 0 1 0 ${f(cx - hole)} ${cy}A${hole} ${hole} 0 1 0 ${f(cx + hole)} ${cy}Z`
  return d
}

export const GEAR_PATH = gearPath(MARK.gear.cx, MARK.gear.cy)

/** Porthole (inner drum) box as percentages of the mark's viewBox – for HTML overlays. */
export const PORTHOLE = (() => {
  const r = MARK.drum.r - MARK.stroke / 2
  const { x, y, w, h } = MARK.vb
  return {
    left: ((MARK.drum.cx - r - x) / w) * 100,
    top: ((MARK.drum.cy - r - y) / h) * 100,
    width: ((2 * r) / w) * 100,
    height: ((2 * r) / h) * 100,
  }
})()
