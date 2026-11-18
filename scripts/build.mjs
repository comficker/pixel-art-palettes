// Writes data/ (json, csv, gpl, hex, index.json), assets/swatches/*.png and
// the palette table in every README from src/palettes.js. Run: npm run build
import {mkdir, readdir, readFile, writeFile} from 'node:fs/promises'
import {deflateSync} from 'node:zlib'
import {hexToRgb, palettes, toCsv, toGpl, toHex} from '../src/index.js'

const ROOT = new URL('../', import.meta.url)
const CREDIT = 'Palettes: pixel-art-palettes by SimplePixelArt (https://simplepixelart.com/palettes)'
const RAW = 'https://raw.githubusercontent.com/comficker/pixel-art-palettes/main'

for (const d of ['data/json', 'data/csv', 'data/gpl', 'data/hex', 'assets/swatches']) {
  await mkdir(new URL(d, ROOT), {recursive: true})
}

// --- PNG swatch: one 16×16 cell per colour, 16 to a row ---------------------
const CRC = new Int32Array(256).map((_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c
})
const crc32 = (buf) => {
  let c = -1
  for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ -1) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
  const td = Buffer.concat([Buffer.from(type), data])
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td))
  return Buffer.concat([len, td, crc])
}
function swatch(colors, cell = 16, perRow = 16) {
  const cols = Math.min(perRow, colors.length), rows = Math.ceil(colors.length / perRow)
  const w = cols * cell, h = rows * cell
  const raw = Buffer.alloc((w * 3 + 1) * h)
  for (let y = 0; y < h; y++) {
    raw[y * (w * 3 + 1)] = 0
    for (let x = 0; x < w; x++) {
      const i = Math.floor(y / cell) * perRow + Math.floor(x / cell)
      const [r, g, b] = i < colors.length ? hexToRgb(colors[i]) : [255, 255, 255]
      const o = y * (w * 3 + 1) + 1 + x * 3
      raw[o] = r; raw[o + 1] = g; raw[o + 2] = b
    }
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))])
}

// --- data files ---------------------------------------------------------------
const index = []
for (const p of palettes) {
  const json = {...p, count: p.colors.length, license: 'CC-BY-4.0', credit: CREDIT}
  await writeFile(new URL(`data/json/${p.id}.json`, ROOT), JSON.stringify(json, null, 2) + '\n')
  await writeFile(new URL(`data/csv/${p.id}.csv`, ROOT), toCsv(p))
  await writeFile(new URL(`data/gpl/${p.id}.gpl`, ROOT), toGpl(p))
  await writeFile(new URL(`data/hex/${p.id}.hex`, ROOT), toHex(p))
  await writeFile(new URL(`assets/swatches/${p.id}.png`, ROOT), swatch(p.colors))
  index.push({id: p.id, name: p.name, count: p.colors.length, group: p.group, simplepixelart: p.simplepixelart})
}
await writeFile(new URL('data/index.json', ROOT),
  JSON.stringify({license: 'CC-BY-4.0', credit: CREDIT, palettes: index}, null, 2) + '\n')

// --- README tables ------------------------------------------------------------
// Each README keeps its own header row (translated); the rows are generated.
const rows = palettes.map(p => {
  const f = (ext, dir) => `[${ext}](data/${dir}/${p.id}.${ext})`
  return `| ${p.name} | \`${p.id}\` | ${p.colors.length} | ![${p.name}](${RAW}/assets/swatches/${p.id}.png) | ` +
    `${f('json', 'json')} · ${f('csv', 'csv')} · ${f('gpl', 'gpl')} · ${f('hex', 'hex')} | [↗](${p.simplepixelart.editor}) |`
}).join('\n')
const START = '<!-- palettes:start -->', END = '<!-- palettes:end -->'
for (const f of (await readdir(ROOT)).filter(n => /^README(\.[a-z-]+)?\.md$/.test(n))) {
  const url = new URL(f, ROOT)
  const text = await readFile(url, 'utf8')
  const a = text.indexOf(START), b = text.indexOf(END)
  if (a < 0 || b < 0) continue
  // The header row and its separator sit right after START, then the rows.
  const head = text.slice(a + START.length, b).split('\n').filter(Boolean).slice(0, 2).join('\n')
  await writeFile(url, text.slice(0, a) + START + '\n' + head + '\n' + rows + '\n' + text.slice(b))
}
console.log(`built ${palettes.length} palettes`)
