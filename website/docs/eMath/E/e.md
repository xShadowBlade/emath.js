---
id: E
title: E
---

---

The ``E`` function is the main feature of this package. It is based on [break_eternity.js](https://github.com/Patashu/break_eternity.js), which is a number library for numbers bigger than the normal limit of ``1.79e+308``.

### Usage

Assuming that you already followed the instructions in the [usage guide](../../usage), you can use it as:
```js
const { E } = eMath;

const newNum2 = E(2300); // Number with value 2300
newNum2; // 2300
```

The methods and functions are the same as breaK_eternity.js, which are the same as [Decimal.js](https://github.com/MikeMcl/decimal.js). For example,

```js
const { E } = eMath;

const x = E(123.4567);
const y = E('123456.7e-3');
const z = E(x);
x.equals(y) && y.equals(z) && x.equals(z); // true
```

To call methods, you can call ``E[method]``. For example,

```js
const { E } = eMath;

const x = E(63);
const y = E(7);

E.divide(x, y); // E(9)
```