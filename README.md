![Header](https://raw.githubusercontent.com/xShadowBlade/emath.js/main/documentation/static/img/banner.png)

<div align="center">
eMath.js is a JavaScript library designed to provide tools for incremental game development. It includes support for the break_eternity.js library, advanced formatting capabilities, and classes for managing boosts, currency, and attributes in game development.

**NOTE: THIS PACKAGE IS IN DEVELOPMENT AND IS SUBJECT TO MAJOR CHANGES**
<br>
<a href="https://github.com/xShadowBlade/emath.js/commits/main" alt=""><img src="https://img.shields.io/github/last-commit/xShadowBlade/emath.js?label=last%20update&style=for-the-badge"></a>
<a href="https://github.com/xShadowBlade/emath.js/commits/main" alt=""><img src="https://img.shields.io/github/commit-activity/w/xShadowBlade/emath.js?label=updates&style=for-the-badge"></a>
<br>
<img src="https://img.shields.io/github/stars/xShadowBlade/emath.js?color=yellow&style=for-the-badge">
<a href="https://github.com/xShadowBlade/emath.js/issues" alt=""><img src="https://img.shields.io/github/issues/xShadowBlade/emath.js?style=for-the-badge"></a>
 <br><img src="https://img.shields.io/github/v/release/xShadowBlade/emath.js?color=green&style=for-the-badge">
<br><img src="https://img.shields.io/badge/Made%20by%3A-xShadowBlade%232720-blue?style=social&logo=discord">
</div>

Credits to [MrRedShark77](https://github.com/MrRedShark77/) for the formats and inspiration.

## Installation

### Install via npm (recommended)

```bash
npm install emath.js
```

The package has no default exports. Use as the following: (CJS support only in version ^2.0.0)

```js
import { boost, currency, /* import more here */ } from "emath.js";
```

Note: If you are using typescript with webpack, import from ``"emath.js/ts"``, ``"emath.js/ts/game"``, or ``"emath.js/ts/pixiGame"`` instead. This fixes a bug that causes unexpected behavior when working with the E instance.

### Include using CDN

**NOTE: This will not include types**

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

Note: Development build for this is not yet availible.

##### Production/Minified Build

```html
<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/game/eMath.game.min.js"></script>
```

#### emath.js/pixiGame

Note: Development build for this is not yet availible.

##### Production/Minified Build

```html
<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/pixiGame/eMath.pixiGame.min.js"></script>
```

---

Check out the [documentation](https://xshadowblade.github.io/emath.js/)!
