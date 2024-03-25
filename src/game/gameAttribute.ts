/**
 * @file Declares the game currency class.
 */

import { E } from "../E/eMain";
import { Attribute, AttributeStatic } from "../classes/attribute";
import type { Game, Pointer } from "./game";

/**
 * Represents a game attribute. {@link Attribute} is the data class and {@link AttributeStatic} is the static class where all the useful functions are.
 * To use, destruct the `data` and `static` properties from the class.
 * WIP, not fully implemented.
 */
class GameAttribute {
    public data: Attribute;
    public static: AttributeStatic;

    public game?: Game;

    /**
     * Creates a new instance of the attribute class.
     * @param attributePointer - A function that returns the current attribute value.
     * @param staticPointer - A function that returns the static data for the attribute.
     * @param gamePointer A pointer to the game instance.
     */
    constructor (attributePointer: Pointer<Attribute>, staticPointer: Pointer<AttributeStatic>, gamePointer?: Game) {
        this.data = typeof attributePointer === "function" ? attributePointer() : attributePointer;
        this.static = typeof staticPointer === "function" ? staticPointer() : staticPointer;

        this.game = gamePointer;
    }

    /**
     * Gets the value of the attribute.
     * NOTE: This getter is sometimes inaccurate.
     * @returns The value of the attribute.
     */
    get value (): E {
        return this.static.value;
    }

    /**
     * Sets the value of the attribute.
     * NOTE: This setter should not be used when boost is enabled.
     * @param value - The value to set the attribute to.
     */
    set value (value: E) {
        this.data.value = value;
    }
}

// TODO: Add gameAttributeGroup class
// class gameAttributeGroup {

// }

export { GameAttribute };