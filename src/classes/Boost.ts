/**
 * @file Declares the boost class and other helper classes and interfaces.
 */
import { Decimal } from "../E/e";
import type { DecimalSource } from "../E/e";

/**
 * Represents an individual boost object.
 */
// TODO: rename this
class BoostObject {
    /**
     * The ID of the boost.
     */
    public readonly id: string;

    /**
     * The name of the boost.
     */
    public name = "";

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
    public value: (input: Decimal) => Decimal = (input) => input;

    /** The order at which the boost is applied. Lower orders are applied first. */
    public order = 99;

    // TODO: redo this example
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
    private descriptionSupplier: (boostContext: BoostObject) => string = () => "";

    /**
     * @returns The description of the boost.
     */
    public get description(): string {
        return this.descriptionSupplier(this);
    }

    /**
     * Constructs a new boost object.
     */
    constructor(id: string) {
        this.id = id;
    }

    // Setters
    public withName(name: typeof this.name): BoostObject {
        this.name = name;
        return this;
    }
    public withValue(value: typeof this.value): BoostObject {
        this.value = value;
        return this;
    }
    public withOrder(order: typeof this.order): BoostObject {
        this.order = order;
        return this;
    }
    public withDescriptionSupplier(descriptionSupplier: typeof this.descriptionSupplier): BoostObject {
        this.descriptionSupplier = descriptionSupplier;
        return this;
    }
}

/**
 * Calculates various effects to a base value.
 * Each boost is represented by a {@link BoostObject} which contains the parameters of the boost, and the boost manager calculates the cumulative effect of all boosts on a base value.
 * Typically used in combination with an Attribute or Currency.
 */
class Boost {
    /** An array of boost objects. */
    public readonly boostArray: BoostObject[];

    /** The base effect value. */
    public readonly baseEffect: Decimal;

    /**
     * Constructs a new boost manager.
     * @param baseEffect - The base effect value to which boosts are applied.
     */
    constructor(baseEffect: DecimalSource = Decimal.dOne) {
        this.baseEffect = new Decimal(baseEffect);
        this.boostArray = [];
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
    public addBoost(boostToAdd: BoostObject) {
        this.boostArray.push(boostToAdd);
    }
    public addBoosts(boostToAdd: BoostObject[]) {
        this.boostArray.push(...boostToAdd);
    }

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

    public sortBoosts(): void {
        this.boostArray.sort((a: BoostObject, b: BoostObject) => a.order - b.order);
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
        // let output: Decimal = new Decimal(base);
        // let boosts = this.boostArray;

        // // Sort boosts by order from lowest to highest
        // boosts = boosts.sort((a: BoostObject, b: BoostObject) => a.order - b.order);

        // for (const boost of boosts) {
        //     output = boost.value(output);
        // }
        // return output;

        return this.boostArray.reduce(
            (accumulatedValue: Decimal, currentBoost: BoostObject) => currentBoost.value(accumulatedValue),
            new Decimal(base),
        );
    }
}

export { Boost, BoostObject };
