---
id: item
title: Item
sidebar_label: Item
---

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/classes/classes_Item.Item.html)

The `Item` class represents an item that can be bought with a currency. An item is similar to an upgrade, except that it doesn't have a level nor a scalable cost.

It can be used internally in the `CurrencyStatic` class.

## Usage

There is currently only one way to create items:

1. Create items using the `addItem` method of the `CurrencyStatic` class. See [Currency Docs](./currency) for more information on the ways to create currencies.

```js
// If using `CurrencyStatic` class on its own (not recommended)
// import { myCurrency } from "./currency.js";

// If using `Game` class
import { myGame } from "./game.js";
// Create the currency with the game (See Currency docs for more information)
const myCurrency = myGame.addCurrency("myCurrency");

myCurrency.addItem({
    id: "item1",
    name: "Gold Coin",
    description: "A coin made of gold.",
    effect: (amount) => console.log(`You have ${amount} gold coins.`),
    cost: () => new Decimal(1000),
});

// Buy the max amount of the item
myCurrency.buyItem("item1");
```
