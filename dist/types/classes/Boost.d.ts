/**
 * @file Declares the boost class and other helper classes and interfaces.
 */
import { Decimal } from "../E/e";
import type { DecimalSource } from "../E/e";
/**
 * A list of recommended {@link BoostObject.prototype.order} values.
 */
declare enum OperationBoostOrder {
    /**
     * A boost value that sets a new value regardless of the previous accumulated value.
     * Similar to overriding the base effect.
     * @example (input) => new Decimal(10)
     */
    set = 0,
    /**
     * A boost value that adds to the base value/accumulated value
     * @example (input) => input.add(4)
     */
    add = 1,
    /**
     * A boost value that multiplies to the base value/accumulated value
     * @example (input) => input.mul(5)
     */
    multiply = 2,
    /**
     * A boost value that raises the accumulated value to the power of a value.
     * @example (input) => input.pow(1.5)
     */
    polynomial = 2.9,
    /**
     * A boost value is a value raised to the power of the accumulated value.
     * @example (input) => Decimal.pow(2, input)
     */
    exponential = 3,
    /**
     * A boost value relates to tetration.
     * @example (input) => input.tetrate(2)
     */
    tetrate = 4,
    unset = 99
}
/**
 * Represents an individual boost object.
 */
declare class BoostObject {
    /**
     * The ID of the boost.
     */
    readonly id: string;
    /**
     * The name of the boost.
     */
    name: string;
    /**
     * The function that calculates the value of the boost.
     * @param input - The input value.
     * @returns The calculated value.
     * @example
     * // A boost that adds 10 to the input value.
     * (input) => input.add(10)
     *
     * // A boost that multiplies the input value by 2.
     * (input) => input.mul(2)
     */
    value: (input: Decimal) => Decimal;
    /** The order at which the boost is applied. Lower orders are applied first. */
    order: number;
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
    private descriptionSupplier;
    /**
     * @returns The description of the boost.
     */
    get description(): string;
    /**
     * Constructs a new boost object with the given id.
     * @param id - The id to use.
     */
    constructor(id: string);
    withName(name: typeof this.name): BoostObject;
    withValue(value: typeof this.value): BoostObject;
    withOrder(order: typeof this.order): BoostObject;
    withDescriptionSupplier(descriptionSupplier: typeof this.descriptionSupplier): BoostObject;
}
/**
 * Calculates various effects to a base value.
 * Each boost is represented by a {@link BoostObject} which contains the parameters of the boost, and the boost manager calculates the cumulative effect of all boosts on a base value.
 * Typically used in combination with an Attribute or Currency.
 */
declare class Boost {
    /** An array of boost objects. */
    readonly boostArray: BoostObject[];
    /** The base effect value. */
    readonly baseEffect: Decimal;
    /**
     * Constructs a new boost manager.
     * @param baseEffect - The base effect value to which boosts are applied.
     */
    constructor(baseEffect?: DecimalSource);
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
    addBoost(boostToAdd: BoostObject): void;
    addBoosts(boostToAdd: BoostObject[]): void;
    /**
     * Clears all boosts from the boost manager.
     * @example
     * // Clear all boosts
     * boost.clearBoosts();
     * // boostArray is now []
     * // baseEffect is still the same
     */
    clearBoosts(): void;
    sortBoosts(): void;
    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     * @param base - The base effect value to calculate with. Defaults to the base effect of the boost manager.
     * @returns The calculated effect after applying boosts.
     * @example
     * // Calculate the effect of all boosts
     * const finalEffect = boost.calculate();
     */
    calculate(base?: DecimalSource): Decimal;
}
export { Boost, BoostObject, OperationBoostOrder };
