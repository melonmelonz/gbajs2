gbajs2 — Modernized Fork
======

This is a maintained fork of **gbajs2**, a Game Boy Advance emulator
written in JavaScript using HTML5 Canvas and Web Audio. The original
project by [Jeffrey Pfau (endrift)](https://github.com/endrift/gbajs)
dates from 2012-2013 and was later picked up as a community fork by
[Andrew Chase (andychase)](https://github.com/andychase/gbajs2).

Both upstream repositories are effectively archived. This fork
modernizes the codebase so it runs cleanly on current browsers without
relying on deprecated APIs, following FOSS best practices: preserving
the original BSD-2 license, maintaining full attribution to both prior
authors, and documenting every change transparently.

## What changed in this fork

The original library was written against a ~2013 browser landscape. A
number of APIs it relied on have since been deprecated or removed. This
fork brings the engine up to date:

| Area | Before | After |
|------|--------|-------|
| **Audio** | `webkitAudioContext` fallback, `createJavaScriptNode` | Standard `AudioContext`, `createScriptProcessor` only |
| **Keyboard input** | Deprecated `KeyboardEvent.keyCode` (numeric codes) | `KeyboardEvent.code` (layout-independent strings) |
| **Gamepad input** | `webkitGetGamepads()`, vendor-prefixed events (`mozgamepadconnected`, `webkitgamepadconnected`) | Standard `navigator.getGamepads()` and standard events |
| **Gamepad buttons** | Raw number comparison (`button > threshold`) | Modern `GamepadButton.pressed` property |
| **Frame scheduling** | `setTimeout`-based frame loop | `requestAnimationFrame` / `cancelAnimationFrame` |
| **URL API** | `window.webkitURL` fallback | Standard `URL` (universally supported) |
| **Closures** | `var self = this` patterns | Arrow functions with lexical `this` |
| **Serializer** | Instance methods called statically | Proper `static` method declarations |
| **OAM prototype** | Redundant `Object.create` after ES6 `class extends` | Removed dead code |
| **Gamepad disconnect** | Bug: `self.gamepads` instead of `this.gamepads` | Fixed `this` reference |

No emulation behavior was changed. The CPU core, MMU, IRQ, video
renderer, and audio synthesis are identical to upstream.

## Feature list

* Playable compatibility — see the upstream [compatibility list](https://github.com/andychase/gbajs2/wiki/Compatibility-List)
* Good performance on modern browsers
* Pure JavaScript — easy API access, no build step
* Realtime clock and gamepad support (e.g. Pokemon Ruby)
* Save games via localStorage

## Used by

* [scry](https://github.com/melonmelonz/scry) — a browser-based binary
  workbench that vendors this engine for its GBA emulator pane.

## License

Original work by Endrift. Repo: (Archived) https://github.com/endrift/gbajs
Community fork by Andrew Chase: https://github.com/andychase/gbajs2

Copyright (c) 2012-2013, Jeffrey Pfau
Copyright (c) 2020, Andrew Chase
Copyright (c) 2026, Penn Porterfield (modernization)

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
