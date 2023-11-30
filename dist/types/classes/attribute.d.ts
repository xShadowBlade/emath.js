import { E, ESource } from "../../src/eMath";
import { boost } from "../../src/classes/boost";
/**
 * Represents a static attribute in the game.
 */
declare class attribute {
    /**
     * The inital value of the attribute.
     */
    initial: E;
    /**
     * The current value of the attribute.
     */
    value: E;
    /**
     * A boost object that affects the attribute.
     */
    boost: boost;
    /**
     * Constructs a static attribute with an initial effect.
     * @param initial - The inital value of the attribute.
     */
    constructor(initial: ESource);
    /**
     * Updates the value of the attribute based on the provided effect function and initial value.
     * @param effect - The effect function to apply to the attribute.
     * @returns The updated value of the attribute after applying the effect.
     */
    update(effect?: Function): E;
}
export { attribute };
