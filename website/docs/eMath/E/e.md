---
id: E
title: E
---

---

The ``E`` function is the main feature of this package. It is based on [break_eternity.js](https://github.com/Patashu/break_eternity.js), which is a number library for numbers bigger than the normal limit of ``1.79e+308``.

### Usage

Assuming that you already followed the instructions in the [usage guide](./usage), you can use it as:
```js
const { E } = eMath;
const newNum2 = E(2300) // Number with value 2300
console.log(newNum2.format()) // "2,300"
```