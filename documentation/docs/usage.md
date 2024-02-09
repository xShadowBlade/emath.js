---
id: usage
title: Usage Guide
sidebar_label: Usage
---

---

After you have installed it via [npm](./install#install-via-npm) or [HTML CDN](./install#include-using-cdn), use as the following:

### Node.js Usage

The ESM package has not default exports. Use as the following: (CJS support only in version ^2.0.0)

```js
import { E } from "emath.js";
const newNum = E(200) // Number with value 200
console.log(newNum.format()) // "200"
```

### HTML Usage

The package exports a variable ``eMath`` and sets it to the window, so you don't need to import it. Use as the following:

```js
const { E } = eMath;
const newNum2 = E(2300) // Number with value 2300
console.log(newNum2.format()) // "2,300"
```

For further information, [visit the documentation](https://xshadowblade.github.io/emath.js/typedoc/index.html)