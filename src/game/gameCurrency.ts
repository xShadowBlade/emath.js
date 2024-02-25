/**
 * @file Declares the game currency class.
 */

import { E } from "../E/eMain";
import { currency, currencyStatic } from "../classes/currency";
// import { attribute } from "../classes/attribute";
import type { game, Pointer } from "./game";

/**
 * Represents a game currency. {@link currency} is the data class and {@link currencyStatic} is the static class where all the useful functions are.
 * To use, destruct the `data` and `static` properties from the class.
 * @template Name - The name of the currency. This is optional, and you can use it for display purposes.
 */
class gameCurrency<Name extends string> {
    public dataPointer: () => currency;
    public staticPointer: () => currencyStatic;
    public name: Name;

    get data (): currency {
        return this.dataPointer();
    }
    get static (): currencyStatic {
        return this.staticPointer();
    }

    public game?: game;

    /**
     * Creates a new instance of the game class.
     * @param currencyPointer - A function that returns the current currency value.
     * @param staticPointer - A function that returns the static data for the game.
     * @param gamePointer A pointer to the game instance.
     * @param name - The name of the currency. This is optional, and you can use it for display purposes.
     */
    constructor (currencyPointer: Pointer<currency>, staticPointer: Pointer<currencyStatic>, gamePointer: game, name: Name) {
        // this.data = typeof currencyPointer === "function" ? currencyPointer() : currencyPointer;
        // this.static = typeof staticPointer === "function" ? staticPointer() : staticPointer;

        this.dataPointer = typeof currencyPointer === "function" ? currencyPointer : () => currencyPointer;
        this.staticPointer = typeof staticPointer === "function" ? staticPointer : () => staticPointer;

        this.game = gamePointer;

        this.name = name;

        // Add an event on load to update upgrade effects
        this.game?.dataManager.addEventOnLoad(() => {
            this.static.onLoadData();
        });
    }

    /**
     * Gets the value of the game currency.
     * Note: There is no setter for this property. To change the value of the currency, use the corresponding methods in the static class.
     * @returns The value of the game currency.
     */
    get value (): E {
        return this.data.value;
    }

    // /**
    //  * Changes the pointer to the currency data. Warning: Do not use this unless you know what you're doing.
    //  * @param currencyPointer - A function or pointer that returns the current currency value.
    //  */
    // public updateDataPointer (currencyPointer: (() => currency) | currency): void {
    //     this.data = typeof currencyPointer === "function" ? currencyPointer() : currencyPointer;
    // }
}

// class gameCurrencyGroup {

// }

export { gameCurrency };