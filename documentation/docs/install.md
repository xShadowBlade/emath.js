---
id: install
title: Installation Guide
sidebar_label: Installation
sidebar_position: 2
---

---

You can install ``eMath.js`` via [npm](#install-via-npm-recommended) or include it in your HTML file via a [CDN](#include-using-cdn).

> Note: For advanced usage, using npm and typescript is recommended.

### Install via npm (recommended)

```bash
npm install emath.js
```

The package has no default exports. Use as the following:

```js
import { Boost, Currency } from "emath.js";
import { Game } from "emath.js/game";
```

> Warning (experimental): If you are using typescript with webpack, you could import from ``"emath.js/ts"``, ``"emath.js/ts/game"``, or ``"emath.js/ts/presets"`` and compile from source instead.

### Include using CDN

Include the following script in your HTML file. It will set the global variable `eMath` to the `window` object.

> Note: There is no development build for CDN, as it is used for nodejs.
> Replace `@latest` with the version you want to use. (e.g. `@8.3.0`), or use `@latest` for the latest version.

#### emath.js

```html
<script src="https://cdn.jsdelivr.net/npm/emath.js@latest/dist/main/eMath.min.js"></script>
```

#### emath.js/game

Also includes `"emath.js"` so you only need to include this script.

```html
<script src="https://cdn.jsdelivr.net/npm/emath.js@latest/dist/game/eMath.game.min.js"></script>
```

#### emath.js/presets

Sets the global variable `eMathPresets` to the `window` object.

> Note: This does not include either `"emath.js"` or `"emath.js/game"`.

```html
<script src="https://cdn.jsdelivr.net/npm/emath.js@latest/dist/presets/eMath.presets.min.js"></script>
```

After you install, check out the [usage docs](./usage)
