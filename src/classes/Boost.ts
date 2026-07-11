/* eslint-disable jsdoc/check-param-names */
/**
 * @file Declares the boost class and other helper classes and interfaces.
 */
import type { DecimalSource } from "../E/e";
import { Decimal } from "../E/e";

/**
 * A list of recommended {@link BoostObject.prototype.order} values.
 * In general, these orders are based on the hyperoperation hierarchy.
 */
enum OperationBoostOrder {
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

    /**
     * A boost value relates to pentation.
     */
    pentate = 5,

    /**
     * A boost value that is not set.
     * Default value for {@link BoostObject.prototype.order} if not set.
     */
    unset = 99,
}

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

    /**
     * The order at which the boost is applied.
     * Lower orders are applied first.
     */
    public order: number = OperationBoostOrder.unset;

    /**
     * @returns The description of the boost based on this boost object.
     * @param boostContext - The boost object that this description is based on.
     * @example (boostContext) => `Increases health by x${boostContext.value(new Decimal(0)).format()}`
     */
    protected descriptionSupplier: (boostContext: BoostObject) => string = () => "";

    /**
     * @returns The description of the boost.
     */
    public get description(): string {
        return this.descriptionSupplier(this);
    }

    /**
     * Constructs a new boost object with the given id.
     * @param id - The {@link id} to use.
     */
    constructor(id: string) {
        this.id = id;
    }

    // Setters
    /* eslint-disable jsdoc/require-param, jsdoc/require-returns */
    /** @see {@link BoostObject.prototype.name} */
    public withName(name: typeof this.name): BoostObject {
        this.name = name;
        return this;
    }
    /** @see {@link BoostObject.value} */
    public withValue(value: typeof this.value): BoostObject {
        this.value = value;
        return this;
    }
    /** @see {@link BoostObject.order} */
    public withOrder(order: typeof this.order): BoostObject {
        this.order = order;
        return this;
    }
    /** @see {@link BoostObject.descriptionSupplier} */
    public withDescriptionSupplier(descriptionSupplier: typeof this.descriptionSupplier): BoostObject {
        this.descriptionSupplier = descriptionSupplier;
        return this;
    }
    /* eslint-enable jsdoc/require-param, jsdoc/require-returns */
}

/**
 * Calculates various effects to a base value.
 * Each boost is represented by a {@link BoostObject} which contains the parameters of the boost,
 * and this boost manager calculates the cumulative effect of all boosts on a base value.
 */
class Boost {
    /**
     * A list of all boost objects that have been added to this boost manager.
     */
    public readonly boostArray: BoostObject[] = [];

    /**
     * The base effect value that the first boost is applied to.
     */
    public readonly baseEffect: Decimal;

    /**
     * Constructs a new boost manager.
     * @param baseEffect - The {@link baseEffect} value to use. Defaults to `1`.
     */
    constructor(baseEffect: DecimalSource = Decimal.dOne) {
        this.baseEffect = new Decimal(baseEffect);
    }

    /**
     * Retrieves a boost object based on the provided id.
     * It is recommended to store a reference to the boost when it is created instead of using this method.
     * @param id - The id of the boost to retrieve.
     * @returns The boost object if found, otherwise null.
     */
    public getBoost(id: string): BoostObject | null {
        return this.boostArray.find((boost) => boost.id === id) ?? null;
    }

    /**
     * Removes a boost by its ID or reference. Only removes the first instance found.
     * @param id - The ID or reference of the boost to remove.
     */
    public removeBoost(id: BoostObject | string): void {
        if (typeof id === "string") {
            this.boostArray.splice(
                this.boostArray.findIndex((boost) => boost.id === id),
                1,
            );
        } else {
            this.boostArray.splice(
                this.boostArray.findIndex((boost) => boost === id),
                1,
            );
        }

        this.sortBoosts();
    }

    /**
     * Adds a boost with the given parameters.
     * @param boostToAdd - The boost object to add.
     * @returns The boost object that was added.
     * @example
     * boost.setBoost(
     *     new BoostObject("healthBoost")
     *         .withName("Health Boost")
     *         .withDescriptionSupplier(() => `Boosts health by x${Decimal.pow(2, level.sub(1)).format()}.`)
     *         .withValue((n) => n.mul(Decimal.pow(2, level.sub(1))))
     *         .withOrder(OperationBoostOrder.multiply)
     * );
     */
    public addBoost(boostToAdd: BoostObject): BoostObject {
        this.boostArray.push(boostToAdd);
        this.sortBoosts();
        return boostToAdd;
    }

    /**
     * Adds multiple boosts to the boost manager.
     * @param boostToAdd - An array of boost objects to add.
     * @returns The array of boost objects that were added.
     * @see {@link addBoost}
     */
    public addBoosts(boostToAdd: BoostObject[]): BoostObject[] {
        this.boostArray.push(...boostToAdd);
        this.sortBoosts();
        return boostToAdd;
    }

    /**
     * Clears all boosts from the boost manager.
     */
    public clearBoosts(): void {
        this.boostArray.length = 0;
    }

    /**
     * Sorts the boosts in the boost manager by their order from lowest to highest.
     * Called automatically when a boost is added or removed,
     * but can be called manually if needed or if a boost object's order is changed after being added to the boost manager.
     */
    public sortBoosts(): void {
        this.boostArray.sort((a: BoostObject, b: BoostObject) => a.order - b.order);
    }

    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     * @param base - The base effect value to calculate with. Defaults to the {@link baseEffect} of the boost manager.
     * @returns The calculated effect after applying boosts.
     */
    public calculate(base: DecimalSource = this.baseEffect): Decimal {
        // let output: Decimal = new Decimal(base);
        // let boosts = this.boostArray;

        // for (const boost of boosts) {
        //     output = boost.value(output);
        // }
        // return output;

        return this.boostArray.reduce(
            (accumulatedValue: Decimal, currentBoost: BoostObject) => currentBoost.value(accumulatedValue),
            // Use a new Decimal instance to avoid mutating the original base value if the user supplied value function mutates the input.
            new Decimal(base),
        );
    }
}

export { Boost, BoostObject, OperationBoostOrder };
