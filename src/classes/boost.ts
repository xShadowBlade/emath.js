"use strict";
import { E, ESource } from "../../src/eMath";

/**
 * Represents a boost manager that applies various effects to a base value.
 *
 * @class
 * @param {number|E} baseEffect - The base effect value to which boosts are applied.
 * @param {...Object} boosts - An array of boost objects to initialize with.
 * @example
 * const myboost = new Game.classes.boost(100, {
 *   id: "reallyCoolboost124",
 *   name: "buff this",
 *   desc: "really cool lol",
 *   type: "add",
 *   value: E(124),
 * });
 */
/**
 * An object representing a boost.
 */
interface boostsObject {
    /**
     * The ID of the boost.
     */
    id: string,
    /**
     * The name of the boost.
     */
    name: string,
    /**
     * An optional description of the boost.
     */
    desc?: string,
    /**
     * @deprecated
     * The type of the boost.
     */
    type?: "add"|"mul"|"pow"|"tetr"|"pent",
    /**
     * The function that calculates the value of the boost.
     * @param input The input value.
     * @returns The calculated value.
     */
    // eslint-disable-next-line no-unused-vars
    value: (input: E) => E,
    /**
     * The order at which the boost is applied. Lower orders are applied first.
     */
    order?: number,
    /**
     * The index of the boost.
     */
    index: number,
}
class boost {
    /**
     * An array of boost objects.
     * @type {boostsObject[]}
     */
    public boostArray: boostsObject[];

    /**
     * The base effect value.
     * @type {E}
     */
    public baseEffect: E;

    /**
     * Constructs a new boost manager.
     *
     * @constructor
     * @param {number} [baseEffect] - The base effect value to which boosts are applied.
     * @param {...boostsObject} boosts - An array of boost objects to initialize with.
     */
    constructor (baseEffect?: ESource, boosts?: boostsObject[]) {
        baseEffect = baseEffect ? E(baseEffect) : 1;
        this.boostArray = boosts ? boosts : [];
        this.baseEffect = E(baseEffect);
    }

    /**
     * Gets a boost object by its ID.
     *
     * @param {string} id - The ID of the boost to retrieve.
     * @returns {boostsObject|null} The boost object if found, or null if not found.
     */
    public bGet (id: string): boostsObject | null {
        let output: boostsObject | null = null;
        for (let i = 0; i < this.boostArray.length; i++) {
            if (i === this.boostArray.length) break;
            if (id === this.boostArray[i].id) {
                output = this.boostArray[i];
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
    public bRemove (id: string): void {
        const bCheck: boostsObject | null = this.bGet(id);
        if (bCheck) {
            delete this.boostArray[bCheck.index];
        }
    }

    /**
     * Sets or updates a boost with the given parameters.
     *
     * @param {string} id - The ID of the boost.
     * @param {string} name - The name of the boost.
     * @param {string} desc - The description of the boost.
     * @param {function} value - The value of the boost (function).
     * @param {number} order - The order of the boost (higher order are go first)
     */
    public bSet (id: string, name: string, desc: string, type: "add"|"mul"|"pow"|"tetr"|"pent", value: () => E, order?: number): void {
        const bCheck: boostsObject | null = this.bGet(id);

        if (!bCheck) {
            this.boostArray.push({ id, name, desc, type, value, order, index: this.boostArray.length });
        } else {
            this.boostArray[bCheck.index] = { id, name, desc, type, value, order, index: this.boostArray.length };
        }
    }

    /**
     * Sets or updates multiple boosts with advanced parameters.
     *
     * @param {...boostsObject} x - boost objects to set or update.
     */
    public bSetAdvanced (...x: boostsObject[]): void {
        for (let i = 0; i < x.length; i++) {
            const bCheck: boostsObject | null = this.bGet(x[i].id);
            if (!bCheck) {
                this.boostArray = this.boostArray.concat(x[i]);
            } else {
                console.log(i);
                this.boostArray[bCheck.index] = x[i];
            }
        }
    }

    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     *
     * @param {number|E} [base=this.baseEffect] - The base effect value to calculate with.
     * @returns {E} The calculated effect after applying boosts.
     */
    public calculate (base: ESource = this.baseEffect): E {
        let output: E = E(base);
        const boosts: boostsObject[] = this.boostArray;
        boosts.sort((a: any, b: any) => a.order - b.order);
        for (let i = 0; i < boosts.length; i++) {
            output = boosts[i].value(output);
        }
        return output;
    }
}

export { boost };