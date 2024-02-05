/**
 * @file Declares the boost class and other helper classes and interfaces.
 */
import { E, ESource } from "../E/eMain";
import { Type, Expose, Exclude } from "class-transformer";

/** An object representing a boost. */
interface boostsObjectInit {
    /** The ID of the boost. */
    id: string,
    /** The name of the boost. */
    name?: string,
    /** An optional description of the boost. */
    desc?: string,
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
    value: (input: E) => E,
    /** The order at which the boost is applied. Lower orders are applied first. */
    order?: number,
}

// /** An interface representing the data of a boost object. */
// interface IBoostObjectData {
//     id: string,
//     level: E,
// }

// class boostObjectData implements IBoostObjectData {
//     @Expose()
//     public id: string;
//     @Expose()
//     public level: E;

//     constructor (id: string, level: ESource = 1) {
//         this.id = id;
//         this.level = E(level);
//     }
// }

class boostObject implements boostsObjectInit {
    public id: string;
    public name: string;
    public desc: string;
    public value: (input: E) => E;
    public order: number;

    constructor (init: boostsObjectInit) {
        this.id = init.id;
        this.name = init.name ?? "";
        this.desc = init.desc ?? "";
        this.value = init.value;
        this.order = init.order ?? 99;
    }
}

// class boostData {
//     @Type(() => boostObjectData)
//     public boostArrayData: boostObjectData[];

//     constructor (boostArrayData?: boostObjectData[]) {
//         this.boostArrayData = boostArrayData ?? [];
//     }
// }

/** Represents a boost manager that applies various effects to a base value. */
class boost {
    /** An array of boost objects. */
    @Type(() => boostObject)
    public boostArray: boostObject[];

    // /** An array of boost data. */
    // @Type(() => boostObjectData)
    // public boostArrayData: boostObjectData[];

    /** The base effect value. */
    @Expose()
    public baseEffect: E;

    /**
     * Constructs a new boost manager.
     * @param baseEffect - The base effect value to which boosts are applied.
     * @param boosts - An array of boost objects to initialize with.
     */
    constructor (baseEffect: ESource = 1, boosts?: boostsObjectInit | boostsObjectInit[]) {
        boosts = boosts ? (Array.isArray(boosts) ? boosts : [boosts]) : undefined;
        this.baseEffect = E(baseEffect);
        this.boostArray = [];
        if (boosts) {
            boosts.forEach((boostObj) => {
                this.boostArray.push(new boostObject(boostObj));
            });
        }
    }

    /**
     * Gets all boosts with the given ID.
     * @param id - A string or regular expression to match the ID of the boosts.
     * @param index - Whether to return the index of the boosts as well.
     * @returns An array of boost objects with the given ID, or a tuple of the array and the index of the boosts.
     */
    public getBoosts (id: string | RegExp): boostObject[];
    public getBoosts (id: string | RegExp, index: boolean): [boostObject[], number[]];
    public getBoosts (id: string | RegExp, index?: boolean): boostObject[] | [boostObject[], number[]] {
        const boostList: boostObject[] = [];
        const indexList: number[] = [];
        for (let i = 0; i < this.boostArray.length; i++) {
            // if (i === this.boostArray.length) break;
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
     * @deprecated Use {@link boost.getBoosts} instead.
     * @param id - The ID of the boost to retrieve.
     * @returns The boost object if found, or null if not found.
     */
    public getBoost (id: string): boostObject | null {
        return this.getBoosts(id)[0] ?? null;
    }

    /**
     * Removes a boost by its ID. Only removes the first instance of the id.
     * @param id - The ID of the boost to remove.
     */
    public removeBoost (id: string): void {
        for (let i = 0; i < this.boostArray.length; i++) {
            if (id === this.boostArray[i].id) {
                this.boostArray.splice(i, 1);
                break;
            }
        }
    }

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
    public setBoost (id: string, name: string, desc: string, value: (input: E) => E, order?: number): void;
    /**
     * Sets or updates a boost with the given parameters.
     * @param boostObj - The boost object containing the parameters.
     */
    public setBoost (boostObj: boostsObjectInit | boostsObjectInit[]): void;
    public setBoost (arg1: string | (boostsObjectInit | boostsObjectInit[]), arg2?: string, arg3?: string, arg4?: (input: E) => E, arg5?: number): void {
        if (!arg1) return; // class-transformer bug
        if (typeof arg1 === "string") {
            // Basic set using parameters
            const id = arg1;
            const name = arg2 ?? "";
            const desc = arg3 ?? "";
            const value = arg4 ?? ((e) => e);
            const order = arg5;
            const bCheck = this.getBoosts(id, true);

            if (!bCheck[0][0]) {
                this.boostArray.push(new boostObject({ id, name, desc, value, order }));
            } else {
                this.boostArray[bCheck[1][0]] = new boostObject({ id, name, desc, value, order });
            }
        } else {
            // Advanced set using boost object
            arg1 = Array.isArray(arg1) ? arg1 : [arg1];
            for (let i = 0; i < arg1.length; i++) {
                const bCheck = this.getBoosts(arg1[i].id, true);
                if (!bCheck[0][0]) {
                    this.boostArray = this.boostArray.concat(new boostObject(arg1[i]));
                } else {
                    this.boostArray[bCheck[1][0]] = new boostObject(arg1[i]);
                }
            }
        }
    }
    /**
     * @alias {@link boost.setBoost}
     * @deprecated Use setBoost instead.
     */
    public addBoost = this.setBoost;

    /**
     * Calculates the cumulative effect of all boosts on the base effect.
     * @param base - The base effect value to calculate with.
     * @returns The calculated effect after applying boosts.
     */
    public calculate (base: ESource = this.baseEffect): E {
        let output: E = E(base);
        let boosts = this.boostArray;
        // Sort boosts by order from lowest to highest
        boosts = boosts.sort((a: boostObject, b: boostObject) => a.order - b.order);
        for (let i = 0; i < boosts.length; i++) {
            output = boosts[i].value(output);
        }
        return output;
    }
}

export { boost, boostObject, boostsObjectInit };