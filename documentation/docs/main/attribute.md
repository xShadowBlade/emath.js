---
id: attribute
title: Attribute
sidebar_label: Attribute
---

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/classes/classes_Attribute.AttributeStatic.html)

The `Attribute` class represents an attribute that can be affected by boosts. It is essentially a wrapper around the `Boost` class, and is used to store the value of the attribute and apply boosts to it.

## Usage

To create an attribute, use the `AttributeStatic` class:

```js title="attribute.js" showLineNumbers
import { AttributeStatic } from "emath.js";

// Create a new attribute with an initial value of 100
const health = new AttributeStatic(100);

// Set a health boost that multiplies the health by 1.1 (See <Boost> for more information)
health.boost.setBoost({
    id: "healthBoost",
    value: (e) => e.mul(1.1),
});

console.log(health.value); // 110
```
