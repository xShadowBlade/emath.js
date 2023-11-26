import { currency, currencyStatic } from "../classes/currency";
/**
 * Represents a game currency.
 * To use, destruct the `data` and `static` properties from the class.
 */
declare class gameCurrency {
    data: currency;
    static: currencyStatic;
    /**
     * Creates a new instance of the game class.
     * @param currencyPointer A function that returns the current currency value.
     * @param static A function that returns the static data for the game.
     */
    constructor(currencyPointer: currency, staticPointer: currencyStatic);
}
export { gameCurrency };
