---
id: install
title: Installation Guide
sidebar_label: Installation
---

---

You can install ``eMath.js`` via [npm](#install-via-npm-recommended) or include it in your HTML file via a [CDN](#include-using-cdn).

> Note: For advanced usage, using npm and nodejs is prefered.

> Warning: HTML CDN as well as nodejs(?) is possibly bugged, causing unexpected behavior when working with the E instance. Typescript usage is prefered.

### Install via npm (recommended)

```bash
npm install emath.js
```

The package has no default exports. Use as the following:

```js
import { boost, currency, /* import more here */ } from "emath.js";
```

> Warning: If you are using typescript with webpack, import from ``"emath.js/ts"``, ``"emath.js/ts/game"``, or ``"emath.js/ts/pixiGame"`` instead. This fixes a bug that causes unexpected behavior when working with the E instance.

### Include using CDN

> Note: This will not include types

#### emath.js

##### Development Build

```html
<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/main/eMath.js"></script>
```

##### Production/Minified Build

```html
<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/main/eMath.min.js"></script>
```

#### emath.js/game

##### Development Build

```html
<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/game/eMath.game.js"></script>
```

##### Production/Minified Build

```html
<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/game/eMath.game.min.js"></script>
```

#### emath.js/pixiGame

> [!WARNING]
> CDN usage for this module is not yet available.

After you install, check out the [usage docs](./usage)