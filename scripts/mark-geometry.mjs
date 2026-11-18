/**
 * Geometry of the washing-machine mark, rebuilt from Logofinalnew-colors.png
 * (coordinates in the original 1244×285 logo space; stroke width 9).
 * Shared by the build script (static SVG files) and mirrored in
 * src/components/brand/mark.ts (animated React component).
 * The reconstruction was overlaid on the original artwork to verify the fit.
 */
export const BADGE = { w: 1244, h: 285, r: 22 }
export const MARK = {
  viewBox: '44 48 176 190',
  stroke: 9,
  housing: { x: 52.5, y: 56.3, w: 159, h: 172.5, r: 9.5 },
  door: 'M52.5 97.4H130.4A62.5 62.5 0 0 1 162.6 213.2',
  drum: { cx: 130.4, cy: 158.6, r: 45.8 },
  wave: 'M85 162.5C100 147 117 149 130 160.5S160 175 175.6 156.6',
  slot: 'M73.3 76.2H109.3',
  dot: { cx: 155, cy: 76.5, r: 8 },
  gear: { cx: 183.6, cy: 82 },
}

export function gearPath(cx, cy, rb = 9.6, rt = 12.8, hw = 3.1, hole = 3.6, n = 6, rot = -90) {
  const f = (v) => +v.toFixed(2)
  const pts = []
  for (let i = 0; i < n; i++) {
    const a = ((rot + (i * 360) / n) * Math.PI) / 180
    const t = hw / rt
    const tb = hw / rb
    const p = (r, ang) => [f(cx + r * Math.cos(ang)), f(cy + r * Math.sin(ang))]
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

/** Static SVG markup of the mark (no <svg> wrapper), in logo coordinates. */
export function markSvgInner(color) {
  const m = MARK
  return (
    `<defs><clipPath id="jhp-door-cut"><rect x="40" y="40" width="200" height="174.6"/></clipPath></defs>` +
    `<g fill="none" stroke="${color}" stroke-width="${m.stroke}" stroke-linecap="round" stroke-linejoin="round">` +
    `<rect x="${m.housing.x}" y="${m.housing.y}" width="${m.housing.w}" height="${m.housing.h}" rx="${m.housing.r}"/>` +
    `<path d="${m.door}" stroke-linecap="butt" clip-path="url(#jhp-door-cut)"/>` +
    `<circle cx="${m.drum.cx}" cy="${m.drum.cy}" r="${m.drum.r}"/>` +
    `<path d="${m.wave}"/><path d="${m.slot}"/></g>` +
    `<g fill="${color}"><circle cx="${m.dot.cx}" cy="${m.dot.cy}" r="${m.dot.r}"/><path fill-rule="evenodd" d="${gearPath(m.gear.cx, m.gear.cy)}"/></g>`
  )
}
