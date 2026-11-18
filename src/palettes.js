/**
 * The palettes, as their makers or the standard define them.
 *
 * Only colour sets whose values come from a hardware or published standard
 * (or a formula), so there is no question about redistributing them. Artist
 * palettes (Sweetie 16, ENDESGA, AAP-64, Resurrect 64…) wait until their
 * authors agree to a licence; see SOURCES.md.
 */

const hex2 = v => v.toString(16).padStart(2, '0').toUpperCase()
const rgb = (r, g, b) => `#${hex2(r)}${hex2(g)}${hex2(b)}`
const SITE = 'https://simplepixelart.com'

/** Evenly spaced greys from black to white. */
const grays = n => Array.from({length: n}, (_, i) => {
  const v = Math.round(i * 255 / (n - 1))
  return rgb(v, v, v)
})

// EGA: every combination of 2 bits per channel (0x00, 0x55, 0xAA, 0xFF).
const EGA = []
for (const r of [0, 85, 170, 255]) for (const g of [0, 85, 170, 255]) for (const b of [0, 85, 170, 255]) EGA.push(rgb(r, g, b))

// Web-safe: 6 levels per channel (0x00, 0x33 … 0xFF).
const WEB = []
for (const r of [0, 51, 102, 153, 204, 255]) for (const g of [0, 51, 102, 153, 204, 255]) for (const b of [0, 51, 102, 153, 204, 255]) WEB.push(rgb(r, g, b))

// RGB 3-3-2: 8 levels of red and green, 4 of blue, in byte order.
const RGB332 = Array.from({length: 256}, (_, i) =>
  rgb(Math.round((i >> 5) * 255 / 7), Math.round(((i >> 2) & 7) * 255 / 7), Math.round((i & 3) * 255 / 3)))

/**
 * @typedef {object} PaletteDef
 * @property {string} id
 * @property {string} name
 * @property {string[]} colors          '#RRGGBB', in the palette's own order
 * @property {string} group             hardware | standard | basic
 * @property {string} source            where the values come from
 * @property {string|null} sourceUrl
 * @property {string|null} sitePalette  id on simplepixelart.com/palettes, when it has a page
 */

/** @type {PaletteDef[]} */
export const DEFS = [
  {
    id: 'pico-8', name: 'PICO-8', group: 'hardware',
    colors: ['#000000', '#1D2B53', '#7E2553', '#008751', '#AB5236', '#5F574F', '#C2C3C7', '#FFF1E8',
      '#FF004D', '#FFA300', '#FFEC27', '#00E436', '#29ADFF', '#83769C', '#FF77A8', '#FFCCAA'],
    source: 'The 16 fixed colours of the PICO-8 fantasy console by Lexaloffle Games.',
    sourceUrl: 'https://www.lexaloffle.com/pico-8.php', sitePalette: null,
  },
  {
    id: 'game-boy-dmg', name: 'Game Boy (DMG)', group: 'hardware',
    colors: ['#0F380F', '#306230', '#8BAC0F', '#9BBC0F'],
    source: 'The four green shades of the original Game Boy screen, in the values most emulators and pixel artists use.',
    sourceUrl: 'https://en.wikipedia.org/wiki/Game_Boy', sitePalette: '0f380f-306230-8bac0f-9bbc0f',
  },
  {
    id: 'game-boy-pocket', name: 'Game Boy Pocket', group: 'hardware',
    colors: ['#1B1B1B', '#525252', '#A6A6A6', '#E0E0E0'],
    source: 'The four grey shades of the Game Boy Pocket screen.',
    sourceUrl: 'https://en.wikipedia.org/wiki/Game_Boy_Pocket', sitePalette: '1b1b1b-525252-a6a6a6-e0e0e0',
  },
  {
    id: 'cga-16', name: 'CGA 16', group: 'hardware',
    colors: ['#000000', '#0000AA', '#00AA00', '#00AAAA', '#AA0000', '#AA00AA', '#AA5500', '#AAAAAA',
      '#555555', '#5555FF', '#55FF55', '#55FFFF', '#FF5555', '#FF55FF', '#FFFF55', '#FFFFFF'],
    source: 'The IBM Color Graphics Adapter RGBI palette, including the brown adjustment of colour 6.',
    sourceUrl: 'https://en.wikipedia.org/wiki/Color_Graphics_Adapter', sitePalette: '000000-0000aa-00aa00-00aaaa-aa0000-aa00aa-aa5500-aaaaaa-74cd0d6d',
  },
  {
    id: 'cga-mode-4-palette-1', name: 'CGA Mode 4, palette 1 (high)', group: 'hardware',
    colors: ['#000000', '#55FFFF', '#FF55FF', '#FFFFFF'],
    source: 'CGA 320×200 four-colour mode, palette 1 at high intensity (cyan, magenta, white).',
    sourceUrl: 'https://en.wikipedia.org/wiki/Color_Graphics_Adapter', sitePalette: '000000-55ffff-ff55ff-ffffff',
  },
  {
    id: 'cga-mode-4-palette-0', name: 'CGA Mode 4, palette 0 (high)', group: 'hardware',
    colors: ['#000000', '#55FF55', '#FF5555', '#FFFF55'],
    source: 'CGA 320×200 four-colour mode, palette 0 at high intensity (green, red, yellow).',
    sourceUrl: 'https://en.wikipedia.org/wiki/Color_Graphics_Adapter', sitePalette: null,
  },
  {
    id: 'ega-64', name: 'EGA 64', group: 'hardware',
    colors: EGA,
    source: 'Every colour the IBM Enhanced Graphics Adapter can show: 2 bits per channel.',
    sourceUrl: 'https://en.wikipedia.org/wiki/Enhanced_Graphics_Adapter', sitePalette: null,
  },
  {
    id: 'rgb-332', name: 'RGB 3-3-2', group: 'standard',
    colors: RGB332,
    source: '8-bit colour with 3 bits of red, 3 of green and 2 of blue, as used by many 8-bit systems and image formats.',
    sourceUrl: 'https://en.wikipedia.org/wiki/8-bit_color', sitePalette: null,
  },
  {
    id: 'web-safe-216', name: 'Web-safe 216', group: 'standard',
    colors: WEB,
    source: 'The 216 web-safe colours: 6 levels (00, 33, 66, 99, CC, FF) per channel.',
    sourceUrl: 'https://en.wikipedia.org/wiki/Web_colors#Web-safe_colors', sitePalette: null,
  },
  {
    id: '1-bit', name: '1-bit', group: 'basic',
    colors: ['#000000', '#FFFFFF'],
    source: 'Black and white.', sourceUrl: null, sitePalette: '000000-ffffff-akhvledianialyona',
  },
  {
    id: 'grayscale-4', name: 'Grayscale 4', group: 'basic',
    colors: grays(4), source: 'Four evenly spaced greys.', sourceUrl: null, sitePalette: '000000-555555-aaaaaa-ffffff',
  },
  {
    id: 'grayscale-8', name: 'Grayscale 8', group: 'basic',
    colors: ['#000000', '#242424', '#484848', '#6D6D6D', '#919191', '#B6B6B6', '#DADADA', '#FFFFFF'],
    source: 'Eight evenly spaced greys (i × 255 / 7, rounded down).', sourceUrl: null, sitePalette: '000000-242424-484848-6d6d6d-919191-b6b6b6-dadada-ffffff',
  },
  {
    id: 'grayscale-16', name: 'Grayscale 16', group: 'basic',
    colors: grays(16), source: 'Sixteen evenly spaced greys.', sourceUrl: null, sitePalette: null,
  },
  {
    id: 'primary-8', name: 'Primary 8', group: 'basic',
    colors: ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'],
    source: 'Black, white, the RGB primaries and their secondaries.', sourceUrl: null,
    sitePalette: '000000-ffffff-ff0000-00ff00-0000ff-ffff00-00ffff-ff00ff-usbugraus',
  },
]

/** Where a palette lives on SimplePixelArt: its page and the editor loaded with it. */
export function siteLinks(def) {
  return def.sitePalette
    ? {page: `${SITE}/palettes/${def.sitePalette}`, editor: `${SITE}/editor?palette=${def.sitePalette}`}
    : {page: `${SITE}/palettes`, editor: `${SITE}/editor`}
}
