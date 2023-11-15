import { currency, currencyStatic } from "../classes/currency";
/**
 * Represents a game currency.
 */
declare class gameCurrency {
    currencyPointer: currency;
    staticPointer: currencyStatic;
    /**
     * Creates a new instance of the game class.
     * @param currencyPointer A function that returns the current currency value.
     * @param staticPointer A function that returns the static data for the game.
     */
    constructor(currencyPointer: currency, staticPointer: currencyStatic);
}
export { gameCurrency };
