/**
 * @file Declares the game currency class.
 */
import { E } from "../eMain";
import { attribute, attributeStatic } from "../classes/attribute";
import type { game } from "./game";
/**
 * Represents a game attribute. {@link attribute} is the data class and {@link attributeStatic} is the static class where all the useful functions are.
 * To use, destruct the `data` and `static` properties from the class.
 */
declare class gameAttribute {
    data: attribute;
    static: attributeStatic;
    game?: game;
    /**
     * Creates a new instance of the attribute class.
     * @param attributePointer - A function that returns the current attribute value.
     * @param staticPointer - A function that returns the static data for the attribute.
     * @param gamePointer A pointer to the game instance.
     */
    constructor(attributePointer: (() => attribute) | attribute, staticPointer: (() => attributeStatic) | attributeStatic, gamePointer?: game);
    /**
     * Gets the value of the attribute.
     * @returns The value of the attribute.
     */
    get value(): E;
    /**
     * Sets the value of the attribute.
     * NOTE: This setter should not be used when boost is enabled.
     * @param value - The value to set the attribute to.
     */
    set value(value: E);
}
export { gameAttribute };
