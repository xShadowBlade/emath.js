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
    id: string;
    /**
     * The name of the boost.
     */
    name: string;
    /**
     * An optional description of the boost.
     */
    desc?: string;
    /**
     * @deprecated
     * The type of the boost.
     */
    type?: "add" | "mul" | "pow" | "tetr" | "pent";
    /**
     * The function that calculates the value of the boost.
     * @param input The input value.
     * @returns The calculated value.
     */
    value: (input: E) => E;
    /**
     * The order at which the boost is applied. Lower orders are applied first.
     */
    order?: number;
    /**
     * The index of the boost.
     */
    index?: number;
}
type boostArrayObject = ({
    index: number;
    order: number;
} & boostsObject);
declare class boost {
    /**
     * An array of boost objects.
     * @type {boostArrayObject[]}
     */
    boostArray: boostArrayObject[];
    /**
     * The base effect value.
     * @type {E}
     */
    baseEffect: E;
    /**
     * Normalizes the given boosts object to a boost array object.
     * @param boosts - The boosts object to normalize.
     * @param index - The index to use for the boost array object.
     * @returns The normalized boost array object.
     */
    private static normalizeBoost;
    /**
     * Normalizes an array of boosts to a standardized format.
     * @param boosts - The array of boosts to normalize.
     * @returns An array of normalized boosts.
     */
    private static normalizeBoostArray;
    /**
     * Constructs a new boost manager.
     *
     * @constructor
     * @param {number} [baseEffect] - The base effect value to which boosts are applied.
     * @param {...boostsObject} boosts - An array of boost objects to initialize with.
     */
    constructor(baseEffect?: ESource, boosts?: boostsObject[]);
    /**
     * Gets a boost object by its ID.
     *
     * @param {string} id - The ID of the boost to retrieve.
     * @returns {boostsObject|null} The boost object if found, or null if not found.
     */
    bGet(id: string): boostArrayObject | null;
    /**
     * Removes a boost by its ID.
     *
     * @param {string} id - The ID of the boost to remove.
     */
    bRemove(id: string): void;
    /**
     * Sets or updates a boost with the given parameters.
     *
     * @param {string} id - The ID of the boost.
     * @param {string} name - The name of the boost.
     * @param {string} desc - The description of the boost.
     * @param {function} value - The value of the boost (function).
     * @param {number} order - The order of the boost (higher order are go first)
     */
    bSet(id: string, name: string, desc: string, value: () => E, order?: number): void;
    /**
     * Sets or updates multiple boosts with advanced parameters.
     *
     * @param {...boostsObject} x - boost objects to set or update.
     */
    bSetAdvanced(...x: boostsObject[]): void;
    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     *
     * @param {number|E} [base=this.baseEffect] - The base effect value to calculate with.
     * @returns {E} The calculated effect after applying boosts.
     */
    calculate(base?: ESource): E;
}
export { boost };
