---
id: currency
title: Currency
sidebar_label: Currency
---

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/classes/classes_Currency.CurrencyStatic.html)

The `Currency` and `CurrencyStatic` classes are one of the main classes. It is used to represent currencies, their boosts/multipliers, and their upgrades.

It is not recommended to use this class on its own without a `Game` class, as you will need to manually set up saving and loading, among other things.

## Uses

To create a currency, do either of the following:

1. Using `Game` class (recommended)

    ```js title="currency.js" showLineNumbers
    import { myGame } from "./game.js";

    // 1 parameter - `name` is required. It must be unique,
    // as it is used for saving/loading to identify the currnecy.
    // Another parameter - `upgrades` is optional. See the `Upgrade` class for more information.
    const myCurrency = myGame.addCurrency("myCurrency");

    // <GameCurrency> extends <CurrencyStatic> so it contains the same methods and properties.  
    myCurrency.gain();

    console.log(myCurrency.value); // new Decimal(1)
    ```

2. Using without `Game` class

    ```js title="currency.js" showLineNumbers
    import { CurrencyStatic } from "emath.js";

    const myCurrency = new CurrencyStatic();
    myCurrency.gain();
    console.log(myCurrency.value); // new Decimal(1)
    ```
