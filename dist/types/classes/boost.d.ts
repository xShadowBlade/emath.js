/**
 * @file Declares the boost class and other helper classes and interfaces.
 */
import { E, ESource } from "../E/eMain";
import type { Pointer } from "../game/game";
/** An object representing a boost. */
interface BoostsObjectInit {
    /** The ID of the boost. */
    id: string;
    /** The name of the boost. */
    name?: string;
    /** @deprecated Use {@link description} instead. This will do nothing */
    desc?: Pointer<string>;
    /**
     * An optional description of the boost.
     * Can be a string or a function that returns a string.
     * Made into a getter function to allow for dynamic descriptions.
     * @example
     * // A dynamic description that returns a string
     * const description = (a, b) => `This is a ${a} that returns a ${b}`;
     * // ... create boost
     * const boost = boost.getBoost("boostID");
     *
     * // Getter property
     * console.log(boost.description); // "This is a undefined that returns a undefined"
     *
     * // Getter function
     * console.log(boost.descriptionFn("dynamic", "string")); // "This is a dynamic that returns a string"
     */
    description?: ((...args: any[]) => string) | string;
    /**
     * The function that calculates the value of the boost.
     * @param input The input value.
     * @returns The calculated value.
     * @example
     * // A boost that adds 10 to the input value.
     * (input) => input.add(10)
     *
     * // A boost that multiplies the input value by 2.
     * (input) => input.mul(2)
     */
    value: (input: E) => E;
    /** The order at which the boost is applied. Lower orders are applied first. */
    order?: number;
}
/** Represents an indiviual boost object. */
declare class BoostObject implements BoostsObjectInit {
    id: string;
    name: string;
    descriptionFn: (...args: any[]) => string;
    /** @deprecated Use {@link description} instead */
    get desc(): string;
    get description(): string;
    value: (input: E) => E;
    order: number;
    constructor(init: BoostObject | BoostsObjectInit);
}
/**
 * Represents a boost manager that applies various effects to a base value. Typically used in combination with attribute or currency classes.
 */
declare class Boost {
    /** An array of boost objects. */
    readonly boostArray: BoostObject[];
    /** The base effect value. */
    readonly baseEffect: E;
    /**
     * Constructs a new boost manager.
     * @param baseEffect - The base effect value to which boosts are applied.
     * @param boosts - An array of boost objects to initialize with.
     */
    constructor(baseEffect?: ESource, boosts?: BoostsObjectInit | BoostsObjectInit[]);
    /**
     * Gets all boosts with the given ID.
     * @param id - A string or regular expression to match the ID of the boosts.
     * @param index - Whether to return the index of the boosts as well.
     * @returns An array of boost objects with the given ID, or a tuple of the array and the index of the boosts.
     * @example
     * // Get all boosts with the ID "healthBoost"
     * const healthBoosts = boost.getBoosts("healthBoost");
     *
     * // Get all boosts with the ID "healthBoost" and their index
     * const [healthBoosts, healthBoostIndexes] = boost.getBoosts("healthBoost", true);
     *
     * // Get all boosts with the ID "healthBoost" or "manaBoost"
     * const healthAndManaBoosts = boost.getBoosts(/(health|mana)Boost/);
     */
    getBoosts(id: string | RegExp): BoostObject[];
    getBoosts(id: string | RegExp, index: boolean): [BoostObject[], number[]];
    /**
     * Gets a boost object by its ID.
     * @deprecated Use {@link getBoosts} instead.
     * @param id - The ID of the boost to retrieve.
     * @returns The boost object if found, or null if not found.
     */
    getBoost(id: string): BoostObject | null;
    /**
     * Removes a boost by its ID. Only removes the first instance of the id.
     * @param id - The ID of the boost to remove.
     * @example
     * // Remove the boost with the ID "healthBoost"
     * boost.removeBoost("healthBoost");
     */
    removeBoost(id: string): void;
    /**
     * Sets or updates a boost with the given parameters.
     * @param id - The ID of the boost.
     * @param name - The name of the boost.
     * @param desc - The description of the boost.
     * @param value - The value of the boost (function).
     * @param order - The order of the boost (higher order go first)
     * @example
     * // Set a boost that multiplies the input value by 2
     * boost.setBoost("doubleBoost", "Double Boost", "Doubles the input value", (input) => input.mul(2));
     */
    setBoost(id: string, name: string, desc: string, value: (input: E) => E, order?: number): void;
    /**
     * Sets or updates a boost with the given parameters.
     * @param boostObj - The boost object containing the parameters.
     * @example
     * // Set a boost that multiplies the input value by 2
     * boost.setBoost({
     *     id: "doubleBoost",
     *     name: "Double Boost",
     *     desc: "Doubles the input value",
     *     value: (input) => input.mul(2),
     * });
     */
    setBoost(boostObj: BoostsObjectInit | BoostsObjectInit[]): void;
    /**
     * @alias setBoost
     * @deprecated Use {@link setBoost} instead.
     */
    addBoost: {
        (id: string, name: string, desc: string, value: (input: E) => E, order?: number): void;
        (boostObj: BoostsObjectInit | BoostsObjectInit[]): void;
    };
    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     * @param base - The base effect value to calculate with. Defaults to the base effect of the boost manager.
     * @returns The calculated effect after applying boosts.
     * @example
     * // Calculate the effect of all boosts
     * const finalEffect = boost.calculate();
     */
    calculate(base?: ESource): E;
}
export { Boost, BoostObject as boostObject, BoostsObjectInit as boostsObjectInit };
