"use strict";
import { E } from "../../src/eMath.js"; // actually ../../src/eMath.js

/**
 * Represents a boost manager that applies various effects to a base value.
 *
 * @class
 * @param {number|E} baseEffect - The base effect value to which boosts are applied.
 * @param {...Object} boosts - An array of boost objects to initialize with.
 * @example
 * const myBoost = new Game.classes.boost(100, {
 *   id: "reallyCoolBoost124",
 *   name: "buff this",
 *   desc: "really cool lol",
 *   type: "add",
 *   value: E(124),
 * });
 */
const boost = class {
    /**
     * Constructs a new boost manager.
     *
     * @constructor
     * @param {number} [baseEffect] - The base effect value to which boosts are applied.
     * @param {function} pointer - returns Game.classes.boost
     * @param {...Object} boosts - An array of boost objects to initialize with.
     */
    constructor (baseEffect = 1, pointer, ...boosts) {
        /**
         * An array of boost objects.
         * @type {Object[]}
         */
        this.boost = boosts;

        /**
         * A function that returns the pointer of the data
         * @type {function}
         */
        this.pointer = pointer;

        /**
         * The base effect value.
         * @type {E}
         */
        this.baseEffect = E(baseEffect);
    }

    /**
     * Gets a boost object by its ID.
     *
     * @param {string} id - The ID of the boost to retrieve.
     * @returns {Object|null} The boost object if found, or null if not found.
     */
    bGet (id) {
        let output = null;
        for (let i = 0; i < this.boost.length; i++) {
            if (i == this.boost.length) break;
            if (id == this.boost[i].id) {
                output = this.boost[i];
                output["index"] = i;
            }
        }
        return output;
    }

    /**
     * Removes a boost by its ID.
     *
     * @param {string} id - The ID of the boost to remove.
     */
    bRemove (id) { delete this.bGet(id); }

    /**
     * Sets or updates a boost with the given parameters.
     *
     * @param {string} id - The ID of the boost.
     * @param {string} name - The name of the boost.
     * @param {string} desc - The description of the boost.
     * @param {function} value - The value of the boost (function).
     * @param {number} order - The order of the boost (higher order are go first)
     */
    bSet (id, name, desc, value, order) {
        const bCheck = this.bGet(id);
        console.log(this.bGet(id));
        if (!bCheck) {
            this.boost.push({ id, name, desc, value, order });
        } else {
            this.boost[bCheck.index] = { id, name, desc, value, order };
        }
    }

    /**
     * Sets or updates multiple boosts with advanced parameters.
     *
     * @param {...Object} x - Boost objects to set or update.
     */
    bSetAdvanced (...x) {
        for (let i = 0; i < x.length; i++) {
            if (!this.bGet(x[i].id)) {
                this.boost = this.boost.concat(x[i]);
            } else {
                console.log(i);
                this.boost[this.bGet(x[i].id).index] = x[i];
            }
        }
    }

    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     *
     * @param {number|E} [base=this.baseEffect] - The base effect value to calculate with.
     * @returns {E} The calculated effect after applying boosts.
     */
    calculate (base = this.baseEffect) {
        let output = E(base);
        const boosts = this.boost;
        boosts.sort((a, b) => a.order - b.order);
        for (let i = 0; i < boosts.length; i++) {
            output = boosts[i].value(output);
        }
        return output;
    }
};
// Game.classes.boost = class {

// }
export { boost };