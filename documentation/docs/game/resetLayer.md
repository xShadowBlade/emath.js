---
id: resetLayer
title: ResetLayer
sidebar_label: ResetLayer
---

[Link to auto generated docs](https://xshadowblade.github.io/emath.js/typedoc/classes/game_ResetLayer.GameReset.html)

<!-- .d.ts for reference 
/**
 * @file This file contains all the reset layer related classes.
 */
import type { GameCurrency } from "./GameCurrency";
/**
 * Represents a game reset.
 */
declare class GameReset {
    /** The unique identifier for the game reset to prevent infinite loops. */
    private readonly id;
    /** The currencies to reset. */
    readonly currenciesToReset: GameCurrency[];
    /** The extender for the game reset. */
    readonly extender: GameReset[];
    /**
     * Custom code to run after {@link reset} is called but BEFORE the currencies are reset
     * @param resetContext - The reset context that the reset is called in.
     */
    onReset?: (resetContext: GameReset) => void;
    /**
     * Creates a new instance of the game reset.
     * @param currenciesToReset The currencies to reset.
     * @param extender The extender for the game reset. WARNING: Do not set this to the same object, as it will cause an infinite loop.
     */
    constructor(currenciesToReset: GameCurrency | GameCurrency[], extender?: GameReset | GameReset[]);
    /**
     * Resets a currency to its default value, and runs the extender's reset function if it exists (recursively).
     */
    reset(): void;
}
export { GameReset };
-->

The `ResetLayer` class is a class that represents a game reset. It is used to reset currencies to their default values and run custom code before the currencies are reset. The `ResetLayer` class is typically for reset layers such as prestiges.

## Usage

The `ResetLayer` class can be created by using the `<Game>.addReset` method. The `addReset` method takes a `GameCurrency` or an array of `GameCurrency` as the first parameter and an optional `GameReset` or an array of `GameReset` as the second parameter. The first parameter is the currency or currencies to reset, and the second parameter is the extender for the game reset.

```js title="resetLayer.js"
import { myGame } from "./game.js";
import { myCurrency } from "./currency.js";

// New currency
const gems = game.addCurrency("gems");

// Replace `myCurrency` with the currency you want to reset.
// When reset1.reset is called, it resets the value and upgrades of `coins`
const reset1 = game.addReset(myCurrency);

reset1.onReset = () => {
    // Gain gems on reset
    gems.gain();
}

// Call the reset
reset1.reset();

// New currency (again)
const diamonds = game.addCurrency("diamonds");

// When reset2.reset is called, it resets the value and upgrades of `coins` and `gems` and runs the onReset function of reset1
const reset2 = game.addReset(myCurrency, reset1);

// Call the reset
reset2.reset();
```
