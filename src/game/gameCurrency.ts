/**
 * @file Declares the game currency class.
 */

import { E } from "../E/eMain";
import { Currency, CurrencyStatic } from "../classes/currency";
// import { attribute } from "../classes/attribute";
import type { Game, Pointer } from "./game";

/**
 * Represents a game currency. {@link Currency} is the data class and {@link CurrencyStatic} is the static class where all the useful functions are.
 * To use, destruct the `data` and `static` properties from the class.
 * @template N - The name of the currency. This is optional, and you can use it for display purposes.
 */
class GameCurrency<N extends string> {
    public dataPointer: () => Currency;
    public staticPointer: () => CurrencyStatic;
    public name: N;

    get data (): Currency {
        return this.dataPointer();
    }
    get static (): CurrencyStatic {
        return this.staticPointer();
    }

    public game?: Game;

    /**
     * Creates a new instance of the game class.
     * @param currencyPointer - A function that returns the current currency value.
     * @param staticPointer - A function that returns the static data for the game.
     * @param gamePointer A pointer to the game instance.
     * @param name - The name of the currency. This is optional, and you can use it for display purposes.
     */
    constructor (currencyPointer: Pointer<Currency>, staticPointer: Pointer<CurrencyStatic>, gamePointer: Game, name: N) {
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

export { GameCurrency };