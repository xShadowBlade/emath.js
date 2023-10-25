"use strict";
import { E } from "../../src/eMath.ts";
import { boost } from "../../src/classes/boost.ts";

/**
 * Represents a static attribute in the game.
 *
 * @class
 */
class attribute {
    /**
     * The inital value of the attribute.
     * @type {E}
     */
    public initial: E | number;

    /**
     * The current value of the attribute.
     * @type {E}
     */
    public value: E;

    /**
     * A boost object that affects the attribute.
     * @type {boost}
     */
    public boost: boost;

    /**
     * Constructs a static attribute with an initial effect.
     *
     * @constructor
     * @param {E|Number} initial - The inital value of the attribute.
     */
    constructor (initial: E | number) {
        this.initial = initial;
        this.value = E(initial);
        this.boost = new boost(1);
    }

    /**
     * Updates the value of the attribute based on the provided effect function and initial value.
     *
     * @param {function} effect - The effect function to apply to the attribute.
     * @returns {E} The updated value of the attribute after applying the effect.
     */
    public update (effect: Function): E {
        // Execute the provided effect function
        effect();

        // Calculate and set the new value using the initial value and boost factor
        this.value = this.boost.calculate(this.initial);

        // Return the updated attribute value
        return this.value;
    }
}

export { attribute };
