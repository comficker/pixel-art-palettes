import assert from 'node:assert/strict'
import {test} from 'node:test'
import {execFileSync} from 'node:child_process'
import {getPalette, listPalettes, nearest, palettes, remap, searchPalettes, toGpl} from '../src/index.js'

test('every palette is well formed', () => {
  const ids = new Set()
  for (const p of palettes) {
    assert.ok(/^[a-z0-9-]+$/.test(p.id), p.id)
    assert.ok(!ids.has(p.id), `duplicate ${p.id}`); ids.add(p.id)
    assert.ok(p.colors.length >= 2, p.id)
    for (const c of p.colors) assert.match(c, /^#[0-9A-F]{6}$/, `${p.id} ${c}`)
    assert.equal(new Set(p.colors).size, p.colors.length, `${p.id} repeats a colour`)
    assert.ok(p.simplepixelart.page.startsWith('https://simplepixelart.com/'))
  }
})

test('known values', () => {
  assert.equal(getPalette('PICO-8').colors[8], '#FF004D')
  assert.equal(getPalette('ega-64').colors.length, 64)
  assert.equal(getPalette('web-safe-216').colors.length, 216)
  assert.equal(getPalette('rgb-332').colors[255], '#FFFFFF')
  assert.equal(listPalettes('hardware').every(p => p.group === 'hardware'), true)
  assert.deepEqual(searchPalettes('game boy').map(p => p.id), ['game-boy-dmg', 'game-boy-pocket'])
  assert.deepEqual(searchPalettes('game-boy').map(p => p.id), ['game-boy-dmg', 'game-boy-pocket'])
  assert.equal(searchPalettes('', {colors: 4}).length >= 4, true)
})

test('nearest and remap', () => {
  assert.equal(nearest('#FFFFFF', 'game-boy-dmg'), '#9BBC0F')
  assert.equal(nearest('#010101', '1-bit'), '#000000')
  assert.equal(nearest([250, 250, 250], ['#000000', '#FFFFFF']), '#FFFFFF')
  const px = new Uint8ClampedArray([250, 10, 10, 255, 0, 0, 0, 0])
  const out = remap(px, 'cga-16')
  assert.ok(out instanceof Uint8ClampedArray)
  assert.deepEqual([...out], [255, 85, 85, 255, 0, 0, 0, 0])
  assert.deepEqual(remap(['#123456'], 'grayscale-4'), ['#555555'])
  assert.throws(() => nearest('#000000', 'nope'), /Unknown palette/)
})

test('gpl output', () => {
  const g = toGpl(getPalette('1-bit'))
  assert.match(g, /^GIMP Palette\nName: 1-bit\n/)
  assert.match(g, /255 255 255\t#FFFFFF/)
})

test('cli', () => {
  const run = (...a) => execFileSync('node', ['bin/cli.js', ...a], {encoding: 'utf8'})
  assert.match(run('list'), /pico-8/)
  assert.match(run('pico-8', '--format', 'hex'), /^000000\n1D2B53/)
  assert.equal(run('nearest', '#ff8800', 'cga-16').trim(), '#FF5555')
})
