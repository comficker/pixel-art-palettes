export interface Palette {
  id: string
  name: string
  /** '#RRGGBB', in the palette's own order */
  colors: string[]
  group: 'hardware' | 'standard' | 'basic'
  source: string
  sourceUrl: string | null
  /** The palette on simplepixelart.com: its page, and the editor loaded with it */
  simplepixelart: { page: string, editor: string }
}

export type PaletteRef = string | string[]
export type RGB = [number, number, number]
type Pixels = Uint8Array | Uint8ClampedArray | number[]

export const palettes: Palette[]
export function listPalettes(group?: Palette['group']): Palette[]
export function getPalette(id: string): Palette | undefined
export function searchPalettes(query?: string, opts?: { colors?: number }): Palette[]
export function nearest(color: string | RGB, palette: PaletteRef): string
export function remap<T extends Pixels>(pixels: T, palette: PaletteRef): T
export function remap(pixels: string[], palette: PaletteRef): string[]
export function hexToRgb(hex: string): RGB
export function rgbToHex(rgb: RGB): string
export function rgbToOklab(rgb: RGB): [number, number, number]
export function toGpl(p: Palette): string
export function toCsv(p: Palette): string
export function toHex(p: Palette): string
