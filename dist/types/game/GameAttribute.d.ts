/**
 * @file Declares the game currency class.
 */
import type { E } from "../E/eMain";
import type { Attribute, AttributeStatic } from "../classes/Attribute";
import type { Game, Pointer } from "./Game";
/**
 * Represents a game attribute. {@link Attribute} is the data class and {@link AttributeStatic} is the static class where all the useful functions are.
 * To use, destruct the `data` and `static` properties from the class.
 * WIP, not fully implemented.
 * @template B - Indicates whether the boost is enabled. Defaults to true.
 */
declare class GameAttribute<B extends boolean = true> {
    data: Attribute;
    static: AttributeStatic<B>;
    game?: Game;
    /**
     * Creates a new instance of the attribute class.
     * @param attributePointer - A function that returns the current attribute value.
     * @param staticPointer - A function that returns the static data for the attribute.
     * @param gamePointer A pointer to the game instance.
     */
    constructor(attributePointer: Pointer<Attribute>, staticPointer: Pointer<AttributeStatic<B>>, gamePointer?: Game);
    /**
     * Gets the value of the attribute.
     * NOTE: This getter is sometimes inaccurate.
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
export { GameAttribute };
