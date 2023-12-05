/**
 * @file Declares the game currency class.
 */

import { E } from "../eMath";
import { currency, currencyStatic } from "../classes/currency";
// import { attribute } from "../classes/attribute";
import type { game } from "./game";

/**
 * Represents a game currency. {@link currency} is the data class and {@link currencyStatic} is the static class where all the useful functions are.
 * To use, destruct the `data` and `static` properties from the class.
 */
class gameCurrency {
    public data: currency;
    public static: currencyStatic;

    public game?: game;

    /**
     * Creates a new instance of the game class.
     * @param currencyPointer - A function that returns the current currency value.
     * @param staticPointer - A function that returns the static data for the game.
     * @param gamePointer A pointer to the game instance.
     */
    constructor (currencyPointer: (() => currency) | currency, staticPointer: (() => currencyStatic) | currencyStatic, gamePointer?: game) {
        this.data = typeof currencyPointer === "function" ? currencyPointer() : currencyPointer;
        this.static = typeof staticPointer === "function" ? staticPointer() : staticPointer;

        this.game = gamePointer;
    }

    /**
     * Gets the value of the game currency.
     * @returns The value of the game currency.
     */
    get value (): E {
        return this.data.value;
    }
}

class gameCurrencyGroup {
    
}

export { gameCurrency };