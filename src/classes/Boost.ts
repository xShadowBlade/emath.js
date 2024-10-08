/**
 * @file Declares the boost class and other helper classes and interfaces.
 */
import { Decimal } from "../E/e";
import type { DecimalSource } from "../E/e";
import type { Pointer } from "../common/types";

/**
 * An object representing a boost.
 */
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
    // description?: Pointer<string>,
    description?: ((...args: any[]) => string) | string;

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
    order?: number;
}

/**
 * Represents an individual boost object.
 */
class BoostObject implements BoostsObjectInit {
    // Assign the properties from the BoostsObjectInit interface
    public id;
    name;
    value;
    order;

    // TODO: Change the args of descriptionFn to be more specific
    public descriptionFn: (...args: any[]) => string;

    /**
     * @returns The description of the boost.
     * @deprecated Use {@link description} instead
     */
    public get desc(): string {
        return this.description;
    }
    public get description(): string {
        return this.descriptionFn();
    }

    /**
     * Constructs a new boost object.
     * @param init - The initialization object.
     */
    constructor(init: BoostsObjectInit) {
        // Assign the properties from the BoostsObjectInit interface
        this.id = init.id;
        this.name = init.name ?? "";
        this.value = init.value;
        this.order = init.order ?? 99;

        // Assign the description function
        this.descriptionFn = init.description
            ? typeof init.description === "function"
                ? init.description
                : (): string => init.description as string
            : (): string => "";
    }
}

/**
 * Represents a boost manager that applies various effects to a base value.
 * Typically used in combination with Attribute or Currency classes.
 */
class Boost {
    /** An array of boost objects. */
    public readonly boostArray: BoostObject[];

    /** The base effect value. */
    public readonly baseEffect: Decimal;

    /**
     * Constructs a new boost manager.
     * @param baseEffect - The base effect value to which boosts are applied.
     * @param boosts - An array of boost objects to initialize with.
     */
    constructor(baseEffect: DecimalSource = 1, boosts?: BoostsObjectInit | BoostsObjectInit[]) {
        boosts = boosts ? (Array.isArray(boosts) ? boosts : [boosts]) : undefined;
        this.baseEffect = new Decimal(baseEffect);
        this.boostArray = [];
        if (boosts) {
            boosts.forEach((boostObj) => {
                this.boostArray.push(new BoostObject(boostObj));
            });
        }
    }

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
    public getBoosts(id: string | RegExp): BoostObject[];
    public getBoosts(id: string | RegExp, index: boolean): [BoostObject[], number[]];
    public getBoosts(id: string | RegExp, index?: boolean): BoostObject[] | [BoostObject[], number[]] {
        const boostList: BoostObject[] = [];
        const indexList: number[] = [];
        for (let i = 0; i < this.boostArray.length; i++) {
            if (
                (typeof id === "string" && id === this.boostArray[i].id) ||
                (id instanceof RegExp && id.test(this.boostArray[i].id))
            ) {
                boostList.push(this.boostArray[i]);
                indexList.push(i);
            }
        }
        return index ? [boostList, indexList] : boostList;
    }

    /**
     * Gets a boost object by its ID.
     * @deprecated Use {@link getBoosts} instead.
     * @param id - The ID of the boost to retrieve.
     * @returns The boost object if found, or null if not found.
     */
    public getBoost(id: string): BoostObject | null {
        return this.getBoosts(id)[0] ?? null;
    }

    /**
     * Removes a boost by its ID. Only removes the first instance of the id.
     * @param id - The ID of the boost to remove.
     * @example
     * // Remove the boost with the ID "healthBoost"
     * boost.removeBoost("healthBoost");
     */
    public removeBoost(id: string): void {
        for (let i = 0; i < this.boostArray.length; i++) {
            if (id === this.boostArray[i].id) {
                this.boostArray.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Sets or updates a boost with the given parameters.
     * @deprecated Use the other overload instead.
     * @param id - The ID of the boost.
     * @param name - The name of the boost.
     * @param description - The description of the boost.
     * @param value - The value of the boost (function).
     * @param order - The order of the boost (lower order go first)
     * @example
     * // Set a boost that multiplies the input value by 2
     * boost.setBoost("doubleBoost", "Double Boost", "Doubles the input value", (input) => input.mul(2));
     */
    public setBoost(
        id: string,
        name: string,
        description: string,
        value: (input: Decimal) => Decimal,
        order?: number,
    ): void;
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
    public setBoost(boostObj: BoostsObjectInit | BoostsObjectInit[]): void;
    public setBoost(
        arg1: string | (BoostsObjectInit | BoostsObjectInit[]),
        arg2?: string,
        arg3?: string,
        arg4?: (input: Decimal) => Decimal,
        arg5?: number,
    ): void {
        // class-transformer bug where it doesn't recognize the overload
        if (!arg1) return;

        if (typeof arg1 === "string") {
            // Basic set using parameters

            // Assign the parameters to the variables
            const id = arg1;
            const name = arg2 ?? "";
            const description = arg3 ?? "";
            const value = arg4 ?? ((e): Decimal => e);
            const order = arg5;
            const bCheck = this.getBoosts(id, true);

            if (!bCheck[0][0]) {
                this.boostArray.push(new BoostObject({ id, name, description, value, order }));
            } else {
                this.boostArray[bCheck[1][0]] = new BoostObject({
                    id,
                    name,
                    description,
                    value,
                    order,
                });
            }
        } else {
            // Advanced set using boost object
            arg1 = Array.isArray(arg1) ? arg1 : [arg1];
            for (const boost of arg1) {
                const bCheck = this.getBoosts(boost.id, true);
                if (!bCheck[0][0]) {
                    this.boostArray.push(new BoostObject(boost));
                } else {
                    this.boostArray[bCheck[1][0]] = new BoostObject(boost);
                }
            }
        }
    }
    /**
     * @alias setBoost
     * @deprecated Use {@link setBoost} instead.
     */
    public addBoost = this.setBoost.bind(this);

    /**
     * Clears all boosts from the boost manager.
     * @example
     * // Clear all boosts
     * boost.clearBoosts();
     * // boostArray is now []
     * // baseEffect is still the same
     */
    public clearBoosts(): void {
        this.boostArray.length = 0;
    }

    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     * @param base - The base effect value to calculate with. Defaults to the base effect of the boost manager.
     * @returns The calculated effect after applying boosts.
     * @example
     * // Calculate the effect of all boosts
     * const finalEffect = boost.calculate();
     */
    public calculate(base: DecimalSource = this.baseEffect): Decimal {
        let output: Decimal = new Decimal(base);
        let boosts = this.boostArray;

        // Sort boosts by order from lowest to highest
        boosts = boosts.sort((a: BoostObject, b: BoostObject) => a.order - b.order);
        for (const boost of boosts) {
            output = boost.value(output);
        }
        return output;
    }
}

export type { BoostsObjectInit };
export { Boost, BoostObject };
