#!/usr/bin/env node
import {getPalette, listPalettes, nearest, toCsv, toGpl, toHex} from '../src/index.js'

const HELP = `pixel-art-palettes — classic pixel art palettes

Usage:
  pixel-art-palettes list                       all palette ids
  pixel-art-palettes <id> [--format F]          print a palette (F: json, gpl, csv, hex; default json)
  pixel-art-palettes nearest <#hex> <id>        closest colour in a palette

Examples:
  pixel-art-palettes pico-8 --format gpl > pico-8.gpl
  pixel-art-palettes nearest "#ff8800" game-boy-dmg

Open any palette in the online editor: https://simplepixelart.com/palettes`

const args = process.argv.slice(2)
const fmtAt = args.indexOf('--format')
const format = fmtAt >= 0 ? args[fmtAt + 1] : 'json'
const rest = fmtAt >= 0 ? args.filter((_, i) => i !== fmtAt && i !== fmtAt + 1) : args

function fail(msg) {
  console.error(msg)
  process.exit(1)
}

const [cmd, a, b] = rest
if (!cmd || cmd === '-h' || cmd === '--help') {
  console.log(HELP)
} else if (cmd === 'list') {
  for (const p of listPalettes()) console.log(`${p.id.padEnd(22)} ${String(p.colors.length).padStart(3)}  ${p.name}`)
} else if (cmd === 'nearest') {
  if (!a || !b) fail('Usage: pixel-art-palettes nearest <#hex> <id>')
  try { console.log(nearest(a, b)) } catch (e) { fail(e.message) }
} else {
  const p = getPalette(cmd)
  if (!p) fail(`Unknown palette "${cmd}". Run "pixel-art-palettes list".`)
  const out = {json: () => JSON.stringify(p, null, 2) + '\n', gpl: () => toGpl(p), csv: () => toCsv(p), hex: () => toHex(p)}[format]
  if (!out) fail(`Unknown format "${format}". Use json, gpl, csv or hex.`)
  process.stdout.write(out())
}
