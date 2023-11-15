import { E } from "../eMath";
import { currency, currencyStatic } from "../classes/currency";
import { attribute } from "../classes/attribute";
import type { game } from "./game";

/**
 * Represents a game currency.
 */
class gameCurrency {
    public currencyPointer: currency;
    public staticPointer: currencyStatic;

    /**
     * Creates a new instance of the game class.
     * @param currencyPointer A function that returns the current currency value.
     * @param staticPointer A function that returns the static data for the game.
     */
    constructor (currencyPointer: currency, staticPointer: currencyStatic) {
        this.currencyPointer = currencyPointer;
        this.staticPointer = staticPointer;
    }

    /**
     * Adds an attribute with the given name and value to the game's static pointer.
     * @param name - The name of the attribute to add.
     * @param value - The value of the attribute to add.
     * @returns The newly created attribute.
     */
    // public addAttribute (name: string, value: E): attribute {
    //     return this.staticPointer.attributes[name] = new attribute(value);
    // }
}

class gameCurrencyGroup {
    
}

export { gameCurrency };