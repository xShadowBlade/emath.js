/**
 * @file Declares the game currency class.
 */
import type { Attribute } from "../classes/Attribute";
import { AttributeStatic } from "../classes/Attribute";
import type { Game } from "./Game";
/**
 * Represents a game attribute. {@link Attribute} is the data class and {@link AttributeStatic} is the static class where all the useful functions are.
 * To use, destruct the `data` and `static` properties from the class.
 * @template EnableBoosst - Indicates whether the boost is enabled. Defaults to true.
 */
declare class GameAttribute<EnableBoosst extends boolean = true> extends AttributeStatic<EnableBoosst> {
    /**
     * @returns The data for the attribute.
     * @deprecated Use {@link pointer} instead. This property is only here for backwards compatibility.
     */
    get data(): Attribute;
    /**
     * @returns The static data for the attribute.
     * @deprecated Use this class as a static. This property is only here for backwards compatibility.
     */
    get static(): this;
    /** The game pointer/reference */
    game?: Game;
    /**
     * Creates a new instance of the attribute class.
     * @param attributeStaticParams - The parameters for the attribute static class.
     * @param gamePointer A pointer to the game instance.
     */
    constructor(attributeStaticParams: ConstructorParameters<typeof AttributeStatic<EnableBoosst>>, gamePointer?: Game);
}
export { GameAttribute };
