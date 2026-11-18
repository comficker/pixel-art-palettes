# Paletas de pixel art — códigos hex de PICO-8, Game Boy, CGA e mais

`pixel-art-palettes`: paletas de cores de pixel art clássicas — PICO-8, Game Boy, CGA, EGA, cores seguras para web e mais — em arquivos JSON, CSV, `.gpl` do GIMP/Aseprite e `.hex`, com uma pequena biblioteca para achar a cor mais próxima e uma CLI.

[English](README.md) · [简体中文](README.zh.md) · [Español](README.es.md) · **Português** · [Русский](README.ru.md) · [한국어](README.ko.md) · [日本語](README.ja.md)

## Paletas

Cada paleta vem de um hardware, de um padrão publicado ou de uma fórmula — veja [SOURCES.md](SOURCES.md). A última coluna a abre no editor online gratuito [SimplePixelArt](https://simplepixelart.com).

<!-- palettes:start -->
| Paleta | id | Cores | Amostra | Arquivos | Editor |
|---|---|---|---|---|---|
| PICO-8 | `pico-8` | 16 | ![PICO-8](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/pico-8.png) | [json](data/json/pico-8.json) · [csv](data/csv/pico-8.csv) · [gpl](data/gpl/pico-8.gpl) · [hex](data/hex/pico-8.hex) | [↗](https://simplepixelart.com/editor) |
| Game Boy (DMG) | `game-boy-dmg` | 4 | ![Game Boy (DMG)](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/game-boy-dmg.png) | [json](data/json/game-boy-dmg.json) · [csv](data/csv/game-boy-dmg.csv) · [gpl](data/gpl/game-boy-dmg.gpl) · [hex](data/hex/game-boy-dmg.hex) | [↗](https://simplepixelart.com/editor?palette=0f380f-306230-8bac0f-9bbc0f) |
| Game Boy Pocket | `game-boy-pocket` | 4 | ![Game Boy Pocket](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/game-boy-pocket.png) | [json](data/json/game-boy-pocket.json) · [csv](data/csv/game-boy-pocket.csv) · [gpl](data/gpl/game-boy-pocket.gpl) · [hex](data/hex/game-boy-pocket.hex) | [↗](https://simplepixelart.com/editor?palette=1b1b1b-525252-a6a6a6-e0e0e0) |
| CGA 16 | `cga-16` | 16 | ![CGA 16](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/cga-16.png) | [json](data/json/cga-16.json) · [csv](data/csv/cga-16.csv) · [gpl](data/gpl/cga-16.gpl) · [hex](data/hex/cga-16.hex) | [↗](https://simplepixelart.com/editor?palette=000000-0000aa-00aa00-00aaaa-aa0000-aa00aa-aa5500-aaaaaa-74cd0d6d) |
| CGA Mode 4, palette 1 (high) | `cga-mode-4-palette-1` | 4 | ![CGA Mode 4, palette 1 (high)](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/cga-mode-4-palette-1.png) | [json](data/json/cga-mode-4-palette-1.json) · [csv](data/csv/cga-mode-4-palette-1.csv) · [gpl](data/gpl/cga-mode-4-palette-1.gpl) · [hex](data/hex/cga-mode-4-palette-1.hex) | [↗](https://simplepixelart.com/editor?palette=000000-55ffff-ff55ff-ffffff) |
| CGA Mode 4, palette 0 (high) | `cga-mode-4-palette-0` | 4 | ![CGA Mode 4, palette 0 (high)](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/cga-mode-4-palette-0.png) | [json](data/json/cga-mode-4-palette-0.json) · [csv](data/csv/cga-mode-4-palette-0.csv) · [gpl](data/gpl/cga-mode-4-palette-0.gpl) · [hex](data/hex/cga-mode-4-palette-0.hex) | [↗](https://simplepixelart.com/editor) |
| EGA 64 | `ega-64` | 64 | ![EGA 64](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/ega-64.png) | [json](data/json/ega-64.json) · [csv](data/csv/ega-64.csv) · [gpl](data/gpl/ega-64.gpl) · [hex](data/hex/ega-64.hex) | [↗](https://simplepixelart.com/editor) |
| RGB 3-3-2 | `rgb-332` | 256 | ![RGB 3-3-2](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/rgb-332.png) | [json](data/json/rgb-332.json) · [csv](data/csv/rgb-332.csv) · [gpl](data/gpl/rgb-332.gpl) · [hex](data/hex/rgb-332.hex) | [↗](https://simplepixelart.com/editor) |
| Web-safe 216 | `web-safe-216` | 216 | ![Web-safe 216](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/web-safe-216.png) | [json](data/json/web-safe-216.json) · [csv](data/csv/web-safe-216.csv) · [gpl](data/gpl/web-safe-216.gpl) · [hex](data/hex/web-safe-216.hex) | [↗](https://simplepixelart.com/editor) |
| 1-bit | `1-bit` | 2 | ![1-bit](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/1-bit.png) | [json](data/json/1-bit.json) · [csv](data/csv/1-bit.csv) · [gpl](data/gpl/1-bit.gpl) · [hex](data/hex/1-bit.hex) | [↗](https://simplepixelart.com/editor?palette=000000-ffffff-akhvledianialyona) |
| Grayscale 4 | `grayscale-4` | 4 | ![Grayscale 4](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/grayscale-4.png) | [json](data/json/grayscale-4.json) · [csv](data/csv/grayscale-4.csv) · [gpl](data/gpl/grayscale-4.gpl) · [hex](data/hex/grayscale-4.hex) | [↗](https://simplepixelart.com/editor?palette=000000-555555-aaaaaa-ffffff) |
| Grayscale 8 | `grayscale-8` | 8 | ![Grayscale 8](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/grayscale-8.png) | [json](data/json/grayscale-8.json) · [csv](data/csv/grayscale-8.csv) · [gpl](data/gpl/grayscale-8.gpl) · [hex](data/hex/grayscale-8.hex) | [↗](https://simplepixelart.com/editor?palette=000000-242424-484848-6d6d6d-919191-b6b6b6-dadada-ffffff) |
| Grayscale 16 | `grayscale-16` | 16 | ![Grayscale 16](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/grayscale-16.png) | [json](data/json/grayscale-16.json) · [csv](data/csv/grayscale-16.csv) · [gpl](data/gpl/grayscale-16.gpl) · [hex](data/hex/grayscale-16.hex) | [↗](https://simplepixelart.com/editor) |
| Primary 8 | `primary-8` | 8 | ![Primary 8](https://raw.githubusercontent.com/comficker/pixel-art-palettes/main/assets/swatches/primary-8.png) | [json](data/json/primary-8.json) · [csv](data/csv/primary-8.csv) · [gpl](data/gpl/primary-8.gpl) · [hex](data/hex/primary-8.hex) | [↗](https://simplepixelart.com/editor?palette=000000-ffffff-ff0000-00ff00-0000ff-ffff00-00ffff-ff00ff-usbugraus) |
<!-- palettes:end -->

## Usar os arquivos

Sem instalar nada: todos os arquivos estão em [`data/`](data), ou direto de um CDN:

```
https://cdn.jsdelivr.net/npm/pixel-art-palettes/data/gpl/pico-8.gpl
https://cdn.jsdelivr.net/npm/pixel-art-palettes/data/json/pico-8.json
```

`.gpl` importa no Aseprite, GIMP, Krita e Inkscape; `.hex` em editores no estilo Lospec; `data/index.json` lista todos.

## Usar a biblioteca

```bash
npm install pixel-art-palettes
```

```js
import {getPalette, nearest, remap} from 'pixel-art-palettes'

getPalette('pico-8').colors          // ['#000000', '#1D2B53', …]
nearest('#ff8800', 'game-boy-dmg')   // '#9BBC0F'  (OKLab distance)
remap(rgbaBytes, 'cga-16')           // a new RGBA array, every pixel moved to a CGA colour
```

Também exporta `listPalettes(group?)`, `searchPalettes(query, {colors})`, `toGpl`, `toCsv` e `toHex`, com tipos TypeScript.

## Usar a CLI

```bash
npx pixel-art-palettes list
npx pixel-art-palettes pico-8 --format gpl > pico-8.gpl
npx pixel-art-palettes nearest "#ff8800" cga-16
```

## Sobre o SimplePixelArt

O [SimplePixelArt](https://simplepixelart.com) é um editor de pixel art gratuito no navegador: camadas, animação, sprite sheets, tilesets para Godot e Tiled, um [conversor de imagem em pixel art](https://simplepixelart.com/converter) e uma [biblioteca de paletas](https://simplepixelart.com/palettes). Para assistentes de IA há um servidor MCP gratuito, o [simplepixelart-mcp](https://github.com/comficker/pixel-art-mcp).

## Contribuir

Achou uma cor errada ou fez uma paleta que gostaria de incluir? [Abra uma issue](https://github.com/comficker/pixel-art-palettes/issues/new/choose). Paletas de artistas só entram com a concordância do autor com a CC BY 4.0.

## Licença

- Código (`src/`, `bin/`, `scripts/`): [MIT](LICENSE)
- Dados das paletas e amostras (`data/`, `assets/`): [CC BY 4.0](LICENSE-DATA) — dê o crédito
  `Palettes: pixel-art-palettes by SimplePixelArt (https://simplepixelart.com/palettes)`
