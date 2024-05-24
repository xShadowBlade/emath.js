---
id: install
title: Installation Guide
sidebar_label: Installation
sidebar_position: 2
---

---

You can install ``eMath.js`` via [npm](#install-via-npm-recommended) or include it in your HTML file via a [CDN](#include-using-cdn).

> Note: For advanced usage, using npm and Node.js is prefered.

> Warning: HTML CDN as well as nodejs(?) is possibly bugged, causing unexpected behavior when working with the E instance. Typescript usage is prefered.

### Install via npm (recommended)

```bash
npm install emath.js
```

The package has no default exports. Use as the following:

```js
import { Boost, Currency } from "emath.js";
import { Game } from "emath.js";
```

> Warning (experimental): If you are using typescript with webpack, you could import from ``"emath.js/ts"``, ``"emath.js/ts/game"``, or ``"emath.js/ts/pixiGame"`` and compile from source instead. This fixes a bug that causes unexpected behavior when working with the E instance.

### Include using CDN

> Note: There is no development build for CDN, as it is used for nodejs.

#### emath.js

```html
<script src="https://cdn.jsdelivr.net/npm/emath.js@latest/dist/main/eMath.min.js"></script>
```

#### emath.js/game

```html
<script src="https://cdn.jsdelivr.net/npm/emath.js@latest/dist/game/eMath.game.min.js"></script>
```

After you install, check out the [usage docs](./usage)
