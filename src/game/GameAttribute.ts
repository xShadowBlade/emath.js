/**
 * @file Declares the game currency class.
 */
import type { Attribute} from "../classes/Attribute";
import { AttributeStatic } from "../classes/Attribute";
import type { Game } from "./Game";

/**
 * Represents a game attribute. {@link Attribute} is the data class and {@link AttributeStatic} is the static class where all the useful functions are.
 * To use, destruct the `data` and `static` properties from the class.
 * @template B - Indicates whether the boost is enabled. Defaults to true.
 */
class GameAttribute<B extends boolean = true> extends AttributeStatic<B> {
    /**
     * @returns The data for the attribute.
     * @deprecated Use {@link pointer} instead. This property is only here for backwards compatibility.
     */
    public get data (): Attribute {
        return this.pointer;
    }

    /**
     * @returns The static data for the attribute.
     * @deprecated Use this class as a static. This property is only here for backwards compatibility.
     */
    public get static (): this {
        return this;
    }

    /** The game pointer/reference */
    public game?: Game;

    /**
     * Creates a new instance of the attribute class.
     * @param attributeStaticParams - The parameters for the attribute static class.
     * @param gamePointer A pointer to the game instance.
     */
    constructor (attributeStaticParams: ConstructorParameters<typeof AttributeStatic<B>>, gamePointer?: Game) {
        // "backwards compatibility" lol
        if (typeof attributeStaticParams === "function") {
            throw new Error("GameAttribute constructor does not accept a function as the first parameter. Use the <Game>.addAttribute method instead.");
        }

        super(...attributeStaticParams);

        this.game = gamePointer;
    }
}

// TODO: Add gameAttributeGroup class
// class gameAttributeGroup {

// }

export { GameAttribute };
