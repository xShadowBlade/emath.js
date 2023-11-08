import { E, ESource } from "../../src/eMath";
import { boost } from "../../src/classes/boost";
/**
 * Represents a static attribute in the game.
 *
 * @class
 */
declare class attribute {
    /**
     * The inital value of the attribute.
     * @type {E}
     */
    initial: E;
    /**
     * The current value of the attribute.
     * @type {E}
     */
    value: E;
    /**
     * A boost object that affects the attribute.
     * @type {boost}
     */
    boost: boost;
    /**
     * Constructs a static attribute with an initial effect.
     *
     * @constructor
     * @param {ESource} initial - The inital value of the attribute.
     */
    constructor(initial: ESource);
    /**
     * Updates the value of the attribute based on the provided effect function and initial value.
     *
     * @param {function} effect - The effect function to apply to the attribute.
     * @returns {E} The updated value of the attribute after applying the effect.
     */
    update(effect?: Function): E;
}
export { attribute };
