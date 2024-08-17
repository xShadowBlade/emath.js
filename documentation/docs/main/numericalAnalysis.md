---
id: numerical-analysis
title: Numerical Analysis
sidebar_label: Numerical Analysis
---

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/modules/classes_numericalAnalysis.html)

The numerical analysis module contains functions for approximating the inverse of a function, calculating the sum of a function, and rounding a number to the nearest power of a specified base.

These functions are used internally when calculating the cost and amount of upgrades.

## Usage

To use the numerical analysis module, import it from `emath.js`:

```js
import { inverseFunctionApprox, calculateSum, roundingBase } from "emath.js";
```

### `inverseFunctionApprox`

The `inverseFunctionApprox` function approximates the inverse of a function at `n`.

```js title="inverseFunctionApprox.js" showLineNumbers
const f = (x) => x.pow(2);
const inverse = inverseFunctionApprox(f, 16);
console.log(inverse.value); // ~4
```

### `calculateSum`

The `calculateSum` function calculates the sum of `f(n)` from `a` to `b`.

```js title="calculateSum.js" showLineNumbers
const f = (x) => x.pow(2);
const sum = calculateSum(f, 10);
console.log(sum); // ~385
```

### `roundingBase`

The `roundingBase` function rounds a number to the nearest power of a specified base.

```js title="roundingBase.js" showLineNumbers
console.log(roundingBase(123456789, 10, 0, 10)); // 120000000
console.log(roundingBase(123456789, 10, 1, 10)); // 123000000
console.log(roundingBase(123456789, 10, 2, 10)); // 123460000
console.log(roundingBase(245, 2, 0, 10)); // 256
```
