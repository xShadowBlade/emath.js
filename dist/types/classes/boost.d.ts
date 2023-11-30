/**
 * @file Declares the boost class and other helper classes and interfaces.
 */
import { E, ESource } from "../../src/eMath";
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
    name: string;
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
     */
    index?: number;
}
declare class boostObject implements boostsObjectInit {
    id: string;
    name: string;
    desc: string;
    value: (input: E) => E;
    order: number;
    index: number;
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
     * Gets a boost object by its ID.
     * @param id - The ID of the boost to retrieve.
     * @returns The boost object if found, or null if not found.
     */
    bGet(id: string | number): boostObject | null;
    /**
     * Removes a boost by its ID.
     * @param id - The ID of the boost to remove.
     */
    bRemove(id: string): void;
    /**
     * Sets or updates a boost with the given parameters.
     * @param id - The ID of the boost.
     * @param name - The name of the boost.
     * @param desc - The description of the boost.
     * @param value - The value of the boost (function).
     * @param order - The order of the boost (higher order are go first)
     */
    bSet(id: string, name: string, desc: string, value: () => E, order?: number): void;
    /**
     * Sets or updates a boost with the given parameters.
     * @param boostObj - The boost object containing the parameters.
     */
    bSet(boostObj: boostsObjectInit): void;
    /**
     * Sets or updates multiple boosts with advanced parameters.
     * @param boostsArray - boost objects to set or update.
     */
    bSetArray(boostsArray: boostsObjectInit[]): void;
    /**
     * Sets or updates multiple boosts with advanced parameters.
     * @param boostsArray - boost objects to set or update.
     * @deprecated Use bSetArray instead.
     */
    bSetAdvanced(...boostsArray: boostsObjectInit[]): void;
    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     * @param base - The base effect value to calculate with.
     * @returns The calculated effect after applying boosts.
     */
    calculate(base?: ESource): E;
}
export { boost, boostObject };
