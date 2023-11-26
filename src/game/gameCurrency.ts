import { E } from "../eMath";
import { currency, currencyStatic } from "../classes/currency";
import { attribute } from "../classes/attribute";
import type { game } from "./game";

/**
 * Represents a game currency.
 * To use, destruct the `data` and `static` properties from the class.
 */
class gameCurrency {
    public data: currency;
    public static: currencyStatic;

    /**
     * Creates a new instance of the game class.
     * @param currencyPointer A function that returns the current currency value.
     * @param static A function that returns the static data for the game.
     */
    constructor (currencyPointer: currency, staticPointer: currencyStatic) {
        this.data = currencyPointer;
        this.static = staticPointer;
    }

    // get value (): E {
    //     return this.data.value;
    // }

    /**
     * Adds an attribute with the given name and value to the game's static pointer.
     * @param name - The name of the attribute to add.
     * @param value - The value of the attribute to add.
     * @returns The newly created attribute.
     */
    // public addAttribute (name: string, value: E): attribute {
    //     return this.static.attributes[name] = new attribute(value);
    // }
}

class gameCurrencyGroup {
    
}

export { gameCurrency };