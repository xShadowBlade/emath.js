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
    public getBoost (id: string | number): boostObject | null {
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
     * @alias {@link boost.getBoost}
     * @deprecated Use getBoost instead.
     */
    public bGet = this.getBoost;

    /**
     * Removes a boost by its ID.
     * @param id - The ID of the boost to remove.
     */
    public removeBoost (id: string): void {
        const bCheck = this.bGet(id);
        if (bCheck) {
            delete this.boostArray[bCheck.index];
        }
    }
    /**
     * @alias {@link boost.removeBoost}
     * @deprecated Use removeBoost instead.
     */
    public bRemove = this.removeBoost;

    /**
     * Sets or updates a boost with the given parameters.
     * @param id - The ID of the boost.
     * @param name - The name of the boost.
     * @param desc - The description of the boost.
     * @param value - The value of the boost (function).
     * @param order - The order of the boost (higher order go first)
     */
    public setBoost (id: string, name: string, desc: string, value: (input: E) => E, order?: number): void;

    /**
     * Sets or updates a boost with the given parameters.
     * @param boostObj - The boost object containing the parameters.
     */
    public setBoost (boostObj: boostsObjectInit | boostsObjectInit[]): void;
    public setBoost (arg1: string | (boostsObjectInit | boostsObjectInit[]), arg2?: string, arg3?: string, arg4?: (input: E) => E, arg5?: number): void {
        if (typeof arg1 === "string") {
            // Basic set using parameters
            const id = arg1;
            const name = arg2 ?? "";
            const desc = arg3 ?? "";
            const value = arg4 ?? ((e) => e);
            const order = arg5;
            const bCheck = this.bGet(id);

            if (!bCheck) {
                this.boostArray.push(new boostObject({ id, name, desc, value, order, index: this.boostArray.length }));
            } else {
                this.boostArray[bCheck.index] = new boostObject({ id, name, desc, value, order, index: this.boostArray.length });
            }
        } else {
            // Advanced set using boost object
            arg1 = Array.isArray(arg1) ? arg1 : [arg1];
            for (let i = 0; i < arg1.length; i++) {
                const bCheck = this.bGet(arg1[i].id);
                if (!bCheck) {
                    this.boostArray = this.boostArray.concat(new boostObject(arg1[i]));
                } else {
                    this.boostArray[bCheck.index] = new boostObject(arg1[i]);
                }
            }
        }
    }
    /**
     * @alias {@link boost.setBoost}
     * @deprecated Use setBoost instead.
     */
    public bSet = this.setBoost;
    /**
     * @alias {@link boost.setBoost}
     * @deprecated Use setBoost instead.
     */
    public addBoost = this.setBoost;

    /**
     * Sets or updates multiple boosts with advanced parameters.
     * @alias {@link boost.setBoost}
     * @deprecated Use setBoost instead.
     * @param boostsArray - boost objects to set or update.
     */
    public bSetArray (boostsArray: boostsObjectInit | boostsObjectInit[]): void {
        this.setBoost(boostsArray);
    }

    /**
     * Sets or updates multiple boosts with advanced parameters.
     * @alias {@link boost.setBoost}
     * @deprecated Use setBoost instead.
     * @param boostsArray - boost objects to set or update.
     * @deprecated Use setBoost instead.
     */
    public bSetAdvanced (...boostsArray: boostsObjectInit[]): void { this.setBoost(boostsArray); };

    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     * @param base - The base effect value to calculate with.
     * @returns The calculated effect after applying boosts.
     */
    public calculate (base: ESource = this.baseEffect): E {
        let output: E = E(base);
        const boosts = this.boostArray;
        // Sort boosts by order from lowest to highest
        boosts.sort((a: boostObject, b: boostObject) => a.order - b.order);
        for (let i = 0; i < boosts.length; i++) {
            output = boosts[i].value(output);
        }
        return output;
    }
}

export { boost, boostObject, boostsObjectInit };