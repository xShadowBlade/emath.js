"use strict";
import { E, ESource } from "../../src/eMath";
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
    index?: number,
}
type boostArrayObject = ({index: number, order: number} & boostsObject);

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
class boost {
    /**
     * An array of boost objects.
     */
    public boostArray: boostArrayObject[];

    /**
     * The base effect value.
     */
    public baseEffect: E;

    /**
     * Normalizes the given boosts object to a boost array object.
     * @param boosts - The boosts object to normalize.
     * @param index - The index to use for the boost array object.
     * @returns The normalized boost array object.
     */
    private static normalizeBoost (boosts: boostsObject, index?: number): boostArrayObject {
        if (!boosts.order) boosts.order = 99;
        if (!boosts.index) boosts.index = index ? index : 0;
        return boosts as boostArrayObject;
    }

    /**
     * Normalizes an array of boosts to a standardized format.
     * @param boosts - The array of boosts to normalize.
     * @returns An array of normalized boosts.
     */
    private static normalizeBoostArray (boosts: boostsObject[]): boostArrayObject[] {
        const output: boostArrayObject[] = [];
        boosts.forEach((boostItem, i) => {
            output.push(this.normalizeBoost(boostItem, i));
        });
        return output;
    }

    /**
     * Constructs a new boost manager.
     *
     * @constructor
     * @param baseEffect - The base effect value to which boosts are applied.
     * @param boosts - An array of boost objects to initialize with.
     */
    constructor (baseEffect?: ESource, boosts?: boostsObject | boostsObject[]) {
        boosts = boosts ? (Array.isArray(boosts) ? boosts : [boosts]) : undefined;

        baseEffect = baseEffect ? E(baseEffect) : 1;
        this.baseEffect = E(baseEffect);
        if (boosts) {
            this.boostArray = boost.normalizeBoostArray(boosts);
        } else {
            this.boostArray = [];
        }
    }

    /**
     * Gets a boost object by its ID.
     *
     * @param id - The ID of the boost to retrieve.
     * @returns The boost object if found, or null if not found.
     */
    public bGet (id: string): boostArrayObject | null {
        let output: boostArrayObject | null = null;
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
     * @param id - The ID of the boost to remove.
     */
    public bRemove (id: string): void {
        const bCheck: boostArrayObject | null = this.bGet(id);
        if (bCheck) {
            delete this.boostArray[bCheck.index];
        }
    }

    /**
     * Sets or updates a boost with the given parameters.
     *
     * @param id - The ID of the boost.
     * @param name - The name of the boost.
     * @param desc - The description of the boost.
     * @param value - The value of the boost (function).
     * @param order - The order of the boost (higher order are go first)
     */
    public bSet(id: string, name: string, desc: string, value: () => E, order?: number): void;

    /**
     * Sets or updates a boost with the given parameters.
     *
     * @param boostObj - The boost object containing the parameters.
     */
    public bSet(boostObj: boostsObject): void;
    public bSet (arg1: string | boostsObject, arg2?: string, arg3?: string, arg4?: () => E, arg5?: number): void {
        if (typeof arg1 === "string") {
            const id = arg1;
            const name = arg2 || "";
            const desc = arg3 || "";
            const value = arg4 || (() => E(0));
            const order = arg5;
            const bCheck = this.bGet(id);

            if (!bCheck) {
                this.boostArray.push(boost.normalizeBoost({ id, name, desc, value, order, index: this.boostArray.length }));
            } else {
                this.boostArray[bCheck.index] = boost.normalizeBoost({ id, name, desc, value, order, index: this.boostArray.length });
            }
        } else {
            const boostObj = arg1;
            const bCheck = this.bGet(boostObj.id);

            if (!bCheck) {
                this.boostArray.push(boost.normalizeBoost(boostObj));
            } else {
                this.boostArray[bCheck.index] = boost.normalizeBoost(boostObj);
            }
        }
    }

    /**
     * Sets or updates multiple boosts with advanced parameters.
     *
     * @param boostsArray - boost objects to set or update.
     */
    public bSetArray (boostsArray: boostsObject[]): void {
        for (let i = 0; i < boostsArray.length; i++) {
            const bCheck = this.bGet(boostsArray[i].id);
            if (!bCheck) {
                this.boostArray = this.boostArray.concat(boost.normalizeBoost(boostsArray[i]));
            } else {
                console.log(i);
                this.boostArray[bCheck.index] = boost.normalizeBoost(boostsArray[i]);
            }
        }
    }

    /**
     * Sets or updates multiple boosts with advanced parameters.
     * @deprecated Use bSetArray instead.
     */
    public bSetAdvanced (...boostsArray: boostsObject[]): void { this.bSetArray(boostsArray); };

    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     *
     * @param base - The base effect value to calculate with.
     * @returns The calculated effect after applying boosts.
     */
    public calculate (base: ESource = this.baseEffect): E {
        let output: E = E(base);
        const boosts = this.boostArray;
        boosts.sort((a: boostArrayObject, b: boostArrayObject) => a.order - b.order);
        for (let i = 0; i < boosts.length; i++) {
            output = boosts[i].value(output);
        }
        return output;
    }
}

export { boost };