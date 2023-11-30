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
     * The function that calculates the value of the boost.
     * @param input The input value.
     * @returns The calculated value.
     */
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

class boostObject implements boostsObjectInit {
    public id: string;
    public name: string;
    public desc: string;
    public value: (input: E) => E;
    public order: number;
    public index: number;

    constructor (init: boostsObjectInit) {
        this.id = init.id;
        this.name = init.name;
        this.desc = init.desc ?? "";
        this.value = init.value;
        this.order = init.order ?? 99;
        this.index = init.index ?? -1;
    }
}

/**
 * Represents a boost manager that applies various effects to a base value.
 */
class boost {
    /**
     * An array of boost objects.
     */
    public boostArray: boostObject[];

    /**
     * The base effect value.
     */
    public baseEffect: E;

    /**
     * Constructs a new boost manager.
     * @param baseEffect - The base effect value to which boosts are applied.
     * @param boosts - An array of boost objects to initialize with.
     */
    constructor (baseEffect?: ESource, boosts?: boostsObjectInit | boostsObjectInit[]) {
        boosts = boosts ? (Array.isArray(boosts) ? boosts : [boosts]) : undefined;
        this.baseEffect = E(baseEffect ?? 1);
        this.boostArray = [];
        // this.boostArray = new boostObjectArray(boosts);
        if (boosts) {
            boosts.forEach((boostObj) => {
                this.boostArray.push(new boostObject(boostObj));
            });
        }
    }

    /**
     * Gets a boost object by its ID.
     * @param id - The ID of the boost to retrieve.
     * @returns The boost object if found, or null if not found.
     */
    public bGet (id: string | number): boostObject | null {
        let output: boostObject | null = null;
        for (let i = 0; i < this.boostArray.length; i++) {
            // if (i === this.boostArray.length) break;
            if (id === i || id == this.boostArray[i].id) {
                output = this.boostArray[i];
                output["index"] = i;
            }
        }
        return output;
    }

    /**
     * Removes a boost by its ID.
     * @param id - The ID of the boost to remove.
     */
    public bRemove (id: string): void {
        const bCheck = this.bGet(id);
        if (bCheck) {
            delete this.boostArray[bCheck.index];
        }
    }

    /**
     * Sets or updates a boost with the given parameters.
     * @param id - The ID of the boost.
     * @param name - The name of the boost.
     * @param desc - The description of the boost.
     * @param value - The value of the boost (function).
     * @param order - The order of the boost (higher order are go first)
     */
    public bSet (id: string, name: string, desc: string, value: () => E, order?: number): void;

    /**
     * Sets or updates a boost with the given parameters.
     * @param boostObj - The boost object containing the parameters.
     */
    public bSet (boostObj: boostsObjectInit): void;
    public bSet (arg1: string | boostsObjectInit, arg2?: string, arg3?: string, arg4?: () => E, arg5?: number): void {
        if (typeof arg1 === "string") {
            const id = arg1;
            const name = arg2 || "";
            const desc = arg3 || "";
            const value = arg4 || (() => E(0));
            const order = arg5;
            const bCheck = this.bGet(id);

            if (!bCheck) {
                this.boostArray.push(new boostObject({ id, name, desc, value, order, index: this.boostArray.length }));
            } else {
                this.boostArray[bCheck.index] = new boostObject({ id, name, desc, value, order, index: this.boostArray.length });
            }
        } else {
            const boostObj = arg1;
            const bCheck = this.bGet(boostObj.id);

            if (!bCheck) {
                this.boostArray.push(new boostObject(boostObj));
            } else {
                this.boostArray[bCheck.index] = new boostObject(boostObj);
            }
        }
    }

    /**
     * Sets or updates multiple boosts with advanced parameters.
     * @param boostsArray - boost objects to set or update.
     */
    public bSetArray (boostsArray: boostsObjectInit[]): void {
        for (let i = 0; i < boostsArray.length; i++) {
            const bCheck = this.bGet(boostsArray[i].id);
            if (!bCheck) {
                this.boostArray = this.boostArray.concat(new boostObject(boostsArray[i]));
            } else {
                console.log(i);
                this.boostArray[bCheck.index] = new boostObject(boostsArray[i]);
            }
        }
    }

    /**
     * Sets or updates multiple boosts with advanced parameters.
     * @param boostsArray - boost objects to set or update.
     * @deprecated Use bSetArray instead.
     */
    public bSetAdvanced (...boostsArray: boostsObjectInit[]): void { this.bSetArray(boostsArray); };

    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     * @param base - The base effect value to calculate with.
     * @returns The calculated effect after applying boosts.
     */
    public calculate (base: ESource = this.baseEffect): E {
        let output: E = E(base);
        const boosts = this.boostArray;
        boosts.sort((a: boostObject, b: boostObject) => a.order - b.order);
        for (let i = 0; i < boosts.length; i++) {
            output = boosts[i].value(output);
        }
        return output;
    }
}

export { boost, boostObject };