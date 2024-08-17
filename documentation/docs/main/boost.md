---
id: boost
title: Boost
sidebar_label: Boost
---

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/classes/classes_Boost.Boost.html)

The `Boost` class represents a boost manager that applies various effects to a base value. It is typically used in combination with other classes such as `Attribute` or `Currency` to represent the effect of upgrades or multipliers.

You probably do not need to use this class on its own often, as it is created by default whenever you use a `Boost` or `Attribute` class.

## Uses

To create and add boosts, do

```js title="boost.js" showLineNumbers
import { Boost } from "emath.js";

const myBoost = new Boost(); // With param `baseEffect`, defaults to 1

// Set a boost that multiplies the input value by 2
myBoost.setBoost({
    id: "doubleBoost",
    name: "Double Boost",
    desc: "Doubles the input value",
    value: (input) => input.mul(2),
});

console.log(myBoost.calculate()); // new Decimal(2)
```
