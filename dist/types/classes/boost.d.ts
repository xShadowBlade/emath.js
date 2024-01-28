/**
 * @file Declares the boost class and other helper classes and interfaces.
 */
import { E, ESource } from "../E/eMain";
/**
 * An object representing a boost.
 */
interface boostsObjectInit {
    /**
     * The ID of the boost.
     */
    id: string;
    /**
     * The name of the boost.
     */
    name?: string;
    /**
     * An optional description of the boost.
     */
    desc?: string;
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
     * @deprecated Don't use this.
     */
    index?: number;
}
declare class boostObject implements boostsObjectInit {
    id: string;
    name: string;
    desc: string;
    value: (input: E) => E;
    order: number;
    constructor(init: boostsObjectInit);
}
/**
 * Represents a boost manager that applies various effects to a base value.
 */
declare class boost {
    /**
     * An array of boost objects.
     */
    boostArray: boostObject[];
    /**
     * The base effect value.
     */
    baseEffect: E;
    /**
     * Constructs a new boost manager.
     * @param baseEffect - The base effect value to which boosts are applied.
     * @param boosts - An array of boost objects to initialize with.
     */
    constructor(baseEffect?: ESource, boosts?: boostsObjectInit | boostsObjectInit[]);
    /**
     * Gets all boosts with the given ID.
     * @param id - A string or regular expression to match the ID of the boosts.
     * @param i - Whether to return the index of the boosts as well.
     * @returns An array of boost objects with the given ID, or a tuple of the array and the index of the boosts.
     */
    getBoosts(id: string | RegExp): boostObject[];
    getBoosts(id: string | RegExp, index: boolean): [boostObject[], number[]];
    /**
     * Gets a boost object by its ID.
     * @deprecated Use {@link boost.getBoosts} instead.
     * @param id - The ID of the boost to retrieve.
     * @returns The boost object if found, or null if not found.
     */
    getBoost(id: string): boostObject | null;
    /**
     * Removes a boost by its ID. Only removes the first instance of the id.
     * @param id - The ID of the boost to remove.
     */
    removeBoost(id: string): void;
    /**
     * Sets or updates a boost with the given parameters.
     * @param id - The ID of the boost.
     * @param name - The name of the boost.
     * @param desc - The description of the boost.
     * @param value - The value of the boost (function).
     * NOTE: There is a weird webpack(?) bug where the input can sometimes be 0 instead of the actual input.
     * Use {@link E.clone}(input) to get the actual input.
     * @param order - The order of the boost (higher order go first)
     */
    setBoost(id: string, name: string, desc: string, value: (input: E) => E, order?: number): void;
    /**
     * Sets or updates a boost with the given parameters.
     * @param boostObj - The boost object containing the parameters.
     */
    setBoost(boostObj: boostsObjectInit | boostsObjectInit[]): void;
    /**
     * @alias {@link boost.setBoost}
     * @deprecated Use setBoost instead.
     */
    addBoost: {
        (id: string, name: string, desc: string, value: (input: E) => E, order?: number): void;
        (boostObj: boostsObjectInit | boostsObjectInit[]): void;
    };
    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     * @param base - The base effect value to calculate with.
     * @returns The calculated effect after applying boosts.
     */
    calculate(base?: ESource): E;
}
export { boost, boostObject, boostsObjectInit };
