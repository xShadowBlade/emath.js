/**
 * @file Declares the game currency class.
 */
import { E } from "../E/eMain";
import { currency, currencyStatic } from "../classes/currency";
import type { game } from "./game";
/**
 * Represents a game currency. {@link currency} is the data class and {@link currencyStatic} is the static class where all the useful functions are.
 * To use, destruct the `data` and `static` properties from the class.
 */
declare class gameCurrency {
    dataPointer: () => currency;
    staticPointer: () => currencyStatic;
    get data(): currency;
    get static(): currencyStatic;
    game?: game;
    /**
     * Creates a new instance of the game class.
     * @param currencyPointer - A function that returns the current currency value.
     * @param staticPointer - A function that returns the static data for the game.
     * @param gamePointer A pointer to the game instance.
     */
    constructor(currencyPointer: (() => currency) | currency, staticPointer: (() => currencyStatic) | currencyStatic, gamePointer: game);
    /**
     * Gets the value of the game currency.
     * @returns The value of the game currency.
     */
    get value(): E;
}
export { gameCurrency };
