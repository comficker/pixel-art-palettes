import {DEFS, siteLinks} from './palettes.js'

/**
 * @typedef {object} Palette
 * @property {string} id
 * @property {string} name
 * @property {string[]} colors      '#RRGGBB'
 * @property {string} group
 * @property {string} source
 * @property {string|null} sourceUrl
 * @property {{page: string, editor: string}} simplepixelart
 */

/** @type {Palette[]} */
export const palettes = DEFS.map(d => ({
  id: d.id,
  name: d.name,
  colors: [...d.colors],
  group: d.group,
  source: d.source,
  sourceUrl: d.sourceUrl,
  simplepixelart: siteLinks(d),
}))

const byId = new Map(palettes.map(p => [p.id, p]))

/** All palettes, optionally only one group (hardware | standard | basic). */
export function listPalettes(group) {
  return group ? palettes.filter(p => p.group === group) : palettes.slice()
}

/** A palette by id (case-insensitive), or undefined. */
export function getPalette(id) {
  return byId.get(String(id).toLowerCase())
}

/** Palettes whose id or name contains `query`, or that have exactly `colors` colours. */
export function searchPalettes(query = '', {colors} = {}) {
  const q = String(query).toLowerCase().trim()
  return palettes.filter(p =>
    (!q || p.id.includes(q) || p.name.toLowerCase().includes(q)) &&
    (!colors || p.colors.length === colors))
}

// --- colour maths -----------------------------------------------------------

export function hexToRgb(hex) {
  const h = String(hex).replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error(`Not a #RRGGBB colour: ${hex}`)
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16))
}

export function rgbToHex([r, g, b]) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }

/** sRGB [0-255] → OKLab [L, a, b]. Distances there track what the eye sees
 *  far better than plain RGB, at a fraction of CIEDE2000's cost. */
export function rgbToOklab([r, g, b]) {
  const R = lin(r), G = lin(g), B = lin(b)
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B)
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B)
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B)
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ]
}

function resolve(palette) {
  if (Array.isArray(palette)) return palette
  const p = getPalette(palette)
  if (!p) throw new Error(`Unknown palette "${palette}". Known: ${palettes.map(x => x.id).join(', ')}`)
  return p.colors
}

function matcher(palette) {
  const cols = resolve(palette)
  const labs = cols.map(h => rgbToOklab(hexToRgb(h)))
  const cache = new Map()
  return (rgb) => {
    const key = (rgb[0] << 16) | (rgb[1] << 8) | rgb[2]
    let i = cache.get(key)
    if (i === undefined) {
      const [L, A, B] = rgbToOklab(rgb)
      let best = Infinity
      labs.forEach(([l, a, b], j) => {
        const d = (L - l) ** 2 + (A - a) ** 2 + (B - b) ** 2
        if (d < best) { best = d; i = j }
      })
      cache.set(key, i)
    }
    return {index: i, hex: cols[i]}
  }
}

/** The palette colour closest to `color` ('#RRGGBB' or [r, g, b]), in OKLab. */
export function nearest(color, palette) {
  const rgb = Array.isArray(color) ? color : hexToRgb(color)
  return matcher(palette)(rgb).hex
}

/**
 * Every pixel moved to its nearest palette colour.
 * Takes RGBA bytes (Uint8Array / Uint8ClampedArray / number[], length 4n) and
 * returns a new array of the same type; transparent pixels are left alone.
 * Also takes an array of '#RRGGBB' strings and returns one.
 */
export function remap(pixels, palette) {
  const match = matcher(palette)
  if (pixels.length && typeof pixels[0] === 'string') return pixels.map(h => match(hexToRgb(h)).hex)
  const out = new pixels.constructor(pixels.length)
  for (let i = 0; i < pixels.length; i += 4) {
    out[i + 3] = pixels[i + 3]
    if (pixels[i + 3] === 0) { out[i] = pixels[i]; out[i + 1] = pixels[i + 1]; out[i + 2] = pixels[i + 2]; continue }
    const [r, g, b] = hexToRgb(match([pixels[i], pixels[i + 1], pixels[i + 2]]).hex)
    out[i] = r; out[i + 1] = g; out[i + 2] = b
  }
  return out
}

// --- file formats -----------------------------------------------------------

/** GIMP palette (.gpl), which Aseprite, Krita and Inkscape also read. */
export function toGpl(p) {
  const lines = ['GIMP Palette', `Name: ${p.name}`, `Columns: ${Math.min(16, p.colors.length)}`,
    `# ${p.colors.length} colours · ${p.simplepixelart.page}`, '#']
  for (const h of p.colors) {
    const [r, g, b] = hexToRgb(h)
    lines.push(`${String(r).padStart(3)} ${String(g).padStart(3)} ${String(b).padStart(3)}\t${h}`)
  }
  return lines.join('\n') + '\n'
}

/** CSV with a header: index,hex,r,g,b. */
export function toCsv(p) {
  return 'index,hex,r,g,b\n' + p.colors.map((h, i) => [i, h, ...hexToRgb(h)].join(',')).join('\n') + '\n'
}

/** One RRGGBB per line, the .hex format Lospec and many editors import. */
export function toHex(p) {
  return p.colors.map(h => h.slice(1)).join('\n') + '\n'
}
