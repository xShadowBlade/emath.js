/**
 * @file Declares the game currency class.
 */
import { E } from "../E/eMain";
import { Currency, CurrencyStatic } from "../classes/currency";
import type { Game, Pointer } from "./game";
/**
 * Represents a game currency. {@link Currency} is the data class and {@link CurrencyStatic} is the static class where all the useful functions are.
 * To use, destruct the `data` and `static` properties from the class.
 * @template N - The name of the currency. This is optional, and you can use it for display purposes.
 */
declare class GameCurrency<N extends string> {
    dataPointer: () => Currency;
    staticPointer: () => CurrencyStatic;
    name: N;
    get data(): Currency;
    get static(): CurrencyStatic;
    game?: Game;
    /**
     * Creates a new instance of the game class.
     * @param currencyPointer - A function that returns the current currency value.
     * @param staticPointer - A function that returns the static data for the game.
     * @param gamePointer A pointer to the game instance.
     * @param name - The name of the currency. This is optional, and you can use it for display purposes.
     */
    constructor(currencyPointer: Pointer<Currency>, staticPointer: Pointer<CurrencyStatic>, gamePointer: Game, name: N);
    /**
     * Gets the value of the game currency.
     * Note: There is no setter for this property. To change the value of the currency, use the corresponding methods in the static class.
     * @returns The value of the game currency.
     */
    get value(): E;
}
export { GameCurrency };
