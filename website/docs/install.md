---
id: install
title: Installation Guide
sidebar_label: Installation
---

---

You can install ``eMath.js`` via [npm](#install-via-npm) or include it in your HTML file via a [CDN](#include-using-cdn).

### Install via npm:

```bash
npm install emath.js
```

The package exports a default export named ``eMath``. Use as the following: (CJS support only in version ^2.0.0)

```js
import eMath from "emath.js";
```

### Include using CDN
**NOTE: This will not include types**
#### Development Build

```html
<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/eMath.bundle.js"></script>
```

#### Production/Minified Build

```html
<script src="https://cdn.jsdelivr.net/gh/xShadowBlade/emath.js/dist/eMath.min.js"></script>
```

After you install, check out the [usage docs](./usage)