/**
 * @file Declares the currency class and its related classes (upgrade)
 */
import "reflect-metadata"; // Required for class-transformer
import { Type, Expose } from "class-transformer";
import { E, ESource } from "../E/eMain";
import { Decimal } from "../E/e";
import type { Pointer } from "../game/game";

import { boost } from "./boost";

/**
 * Represents different methods to calculate the mean.
 * Mode 1 `"arithmetic"` `(a+b)/2` is the default and a bit faster.
 * Mode 2 `"geometric"` `sqrt(ab)` is more accurate.
 */
type MeanMode = "arithmetic" | "geometric" | 1 | 2;

/**
 * Approximates the inverse of a function at `n` using the bisection / binary search method.
 * @param f - The function to approximate the inverse of. It must be monotonically increasing.
 * @param n - The value to approximate the inverse at.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @param iterations - The amount of iterations to perform. Defaults to `15`.
 * @param target - The target value to reach. If not provided, it defaults to `n`.
 * @returns An object containing the approximate inverse value `"value"` (defaults to the lower bound), the lower bound `"lowerBound"`, and the upper bound `"upperBound"`.
 */
function inverseFunctionApprox (f: (x: E) => E, n: ESource, mode: MeanMode = "geometric", iterations = 15, target?: ESource) {
    // Set the initial bounds
    let lowerBound = E(1);
    // let upperBound = E(n);
    let upperBound = E(target ?? n);
    // if (f(E(n)).lt(n)) {
    //     throw new Error("The function is not monotonically increasing. (f(n) < n)");
    // }
    if (f(upperBound).lt(n)) {
        if (!target) console.warn("The function is not monotonically increasing. (f(n) < n)");
        return {
            value: upperBound,
            lowerBound: upperBound,
            upperBound: upperBound,
        };
    }

    // console.log({ lowerBound, upperBound, iterations });
    let i = 0;
    // Perform the bisection / binary search
    for (; i < iterations; i++) {
        let mid: E;
        switch (mode) {
        case "arithmetic":
        case 1:
            mid = lowerBound.add(upperBound).div(2);
            break;
        case "geometric":
        case 2:
            mid = lowerBound.mul(upperBound).sqrt();
            break;
        // case "pow":
        //     mid = lowerBound.pow(upperBound).ssqrt();
        }

        const midValue = f(mid);
        if (midValue.eq(n)) {
            return {
                value: mid,
                lowerBound: mid,
                upperBound: mid,
            };
        } else if (midValue.lt(n)) {
            lowerBound = mid;
        } else {
            upperBound = mid;
        }
    }

    const out = {
        value: lowerBound,
        lowerBound,
        upperBound,
        iterations: i,
    };

    // console.log(out);

    return out;
}

/**
 * Calculates the sum of `f(n)` from `a` to `b` using a basic loop until the sum is less than or equal to `epsilon` geometrically.
 * @param f - The function `f(n)` to calculate the sum.
 * @param b - The upper limit for the sum.
 * @param a - The lower limit for the sum. Defaults to `0`. The order is reversed because `a` is optional. Deal with it.
 * @param epsilon - The maximum error tolerance.
 * @returns The calculated sum of `f(n)`.
 */
function calculateSum (f: (n: E) => E, b: E, a = 0, epsilon?: E): E {
    epsilon = epsilon ?? E("1e-6");
    let sum: E = E();
    for (let n = E(a); n.lte(b); n = n.add(1)) {
        if (f(n).div(n).lt(epsilon)) break;
        sum = sum.add(f(n));
    }
    return sum;
}

/**
 * Calculates the cost and how many upgrades you can buy
 * Uses {@link inverseFunctionApprox} to calculate the maximum affordable quantity.
 * The priority is: `target === 1` > `costBulk` > `el`
 * @param value - The current value of the currency.
 * @param upgrade - The upgrade object to calculate.
 * @param start - The starting level of the upgrade. Defaults the current level of the upgrade.
 * @param end - The ending level or quantity to reach for the upgrade.
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @param iterations - The amount of iterations to perform. Defaults to `15`.
 * @param el - ie Endless: Flag to exclude the sum calculation and only perform binary search. (DEPRECATED, use `el` in the upgrade object instead)
 * @returns [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [E(0), E(0)].
 */
function calculateUpgrade (value: ESource, upgrade: upgradeStatic, start?: ESource, end?: ESource, mode?: MeanMode, iterations?: number, el: boolean = false): [amount: E, cost: E] {
    value = E(value);
    start = E(start ?? upgrade.level);
    end = E(end ?? value);

    const target = end.sub(start);

    // console.log("calculateUpgrade", { value, start, end, target, mode, iterations, el });

    // Special case: If target is less than 1, just return 0
    if (target.lte(0)) {
        return [E(0), E(0)];
    }

    // Set el from the upgrade object if it exists
    el = (typeof upgrade.el === "function" ? upgrade.el() : upgrade.el) ?? el;

    // Special case: If target is 1, just check it manually
    if (target.eq(1)) {
        const cost = upgrade.cost(upgrade.level);
        const canAfford = value.gte(cost);
        if (el) {
            return [canAfford ? E(1) : E(0), E(0)];
        }
        return [canAfford ? E(1) : E(0), canAfford ? cost : E(0)];
    }

    // Special case: If costBulk exists, use it
    if (upgrade.costBulk) {
        const [cost, amount] = upgrade.costBulk(value, upgrade.level, target);
        const canAfford = value.gte(cost);
        return [canAfford ? amount : E(0), canAfford ? cost : E(0)];
    }

    // Special case for endless upgrades
    if (el) {
        const costTargetFn = (level: E) => upgrade.cost(level.add(start!));
        const maxLevelAffordable = inverseFunctionApprox(costTargetFn, value, mode, iterations, end).value.floor();
        const cost = upgrade.cost(maxLevelAffordable);
        return [maxLevelAffordable, cost];
    }

    // If `maxLevel` is undefined and `el` is not set, warn and return 0
    // if (!upgrade.maxLevel && !el) {
    //     console.warn(`Upgrade "${upgrade.id}" does not have a maximum level and will not work with the automatic binary search / sum. Use \`el\` instead.`);
    //     return [E(0), E(0)];
    // }

    // Binary Search with sum calculation

    const maxLevelAffordable = inverseFunctionApprox(
        (level: E) => calculateSum(upgrade.cost, level),
        value,
        mode,
        iterations,
    ).value.floor();
    const cost = calculateSum(upgrade.cost, maxLevelAffordable);
    return [maxLevelAffordable, cost];
}

/**
 * Interface for initializing an upgrade.
 */
interface UpgradeInit {
    /**
     * The ID of the upgrade.
     * Used to retrieve the upgrade later.
     */
    id: string,

    /** The name of the upgrade. Defaults to the ID. */
    name?: string,

    /**
     * The description of the upgrade.
     * Can be a string or a function that returns a string.
     * Made into a getter function to allow for dynamic descriptions.
     * @example
     * // A dynamic description that returns a string
     * const description = (a, b) => `This is a ${a} that returns a ${b}`;
     *
     * // ... create upgrade here (see currencyStatic.addUpgrade)
     *
     * const upgrade = currencyStatic.getUpgrade("upgradeID");
     *
     * // Getter property
     * console.log(upgrade.description); // "This is a undefined that returns a undefined"
     *
     * // Getter function
     * console.log(upgrade.descriptionFn("dynamic", "string")); // "This is a dynamic that returns a string"
     */
    // description?: Pointer<string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description?: ((...args: any[]) => string) | string,

    /**
     * The cost of upgrades at a certain level.
     * This function should evaluate to a non-negative number, and should be deterministic and continuous for all levels above 0.
     * Also, if you do not set your own `costBulk` function, the function should always be greater than the level.
     * @param level - The CURRENT (not next) level of the upgrade. It will always be a positive integer.
     * @returns The cost of the upgrade. It should be a non-negative integer greater than or equal to 0.
     * @example
     * // A cost function that returns twice the level.
     * (level) => level.mul(2)
     */
    cost: (level: E) => E,

    /**
     * The cost of buying a bulk of upgrades at a certain level. (inverse of cost function)
     * @param level - The current level of the upgrade.
     * @param target - The target level of the upgrade.
     * @returns [cost, amount] - The cost of the upgrades and the amount of upgrades you can buy. If you can't afford any, it returns [E(0), E(0)].
     * @example
     * // A cost function that returns the sum of the levels and the target.
     * // In this example, the cost function is twice the level. The cost bulk function is the sum of the levels and the target.
     * // -target^2 + target + level^2 + level
     * (level, target) => target.pow(2).mul(-1).add(target).add(level.pow(2)).add(level)
     */
    costBulk?: (currencyValue: E, level: E, target: E) => [cost: E, amount: E],

    /**
     * The maximum level of the upgrade.
     * Warning: If not set, the upgrade will not have a maximum level and can continue to increase indefinitely.
     */
    maxLevel?: E

    /**
     * The effect of the upgrade. This runs when the upgrade is bought, and instantly if `runEffectInstantly` is true.
     * @param level - The current level of the upgrade.
     * @param context - The upgrade object.
     */
    effect?: (level: E, context: upgradeStatic) => void,

    /**
     * Endless / Everlasting: Flag to exclude the sum calculation and only perform binary search.
     * Note: A function value is also allowed, and will be evaluated when the upgrade is bought or calculated.
     * (but you should use a getter function instead)
     */
    el?: boolean | (() => boolean),
    // el?: Pointer<boolean>,

    // Below are types that are automatically added
    /**
     * The default level of the upgrade.
     * Automatically set to `1` if not provided.
     */
    level?: E;
}

/** Interface for an upgrade. */
interface IUpgradeStatic extends Omit<UpgradeInit, "level"> {
    maxLevel?: E,
    name: string,
    description: string,

    /**
     * A function that returns a description of the upgrade.
     * @param args - Arguments to pass to the description function.
     * @returns The description of the upgrade.
     */
    descriptionFn: (...args: any[]) => string,
}

/** Interface for upgrade data. */
interface IUpgradeData extends Pick<UpgradeInit, "id" | "level"> {
    id: string,
    level: E
}

/** Represents the frontend for an upgrade. */
class upgradeData implements IUpgradeData {
    @Expose() public id;
    @Type(() => Decimal) public level;

    constructor (init: Pick<UpgradeInit, "id" | "level">) {
        init = init ?? {}; // class-transformer bug
        this.id = init.id ?? -1;
        this.level = init.level ? E(init.level) : E(1);
    }
}

/** Represents the backend for an upgrade. */
class upgradeStatic implements IUpgradeStatic {
    public id; name; cost; costBulk; maxLevel; effect; el?; descriptionFn;

    public get description (): string {
        return this.descriptionFn();
    }

    /**
     * @returns The data of the upgrade.
     */
    protected dataPointerFn: () => upgradeData;

    public get data (): upgradeData {
        return this.dataPointerFn();
    }

    /**
     * @param init - The upgrade object to initialize.
     * @param dataPointer - A function or reference that returns the pointer of the data / frontend.
     */
    constructor (init: UpgradeInit, dataPointer: Pointer<upgradeData>) {
        const data = (typeof dataPointer === "function" ? dataPointer() : dataPointer);
        this.dataPointerFn = typeof dataPointer === "function" ? dataPointer : () => data;
        this.id = init.id;
        this.name = init.name ?? init.id;
        this.descriptionFn = init.description ? (typeof init.description === "function" ? init.description : () => init.description as string) : () => "";
        this.cost = init.cost;
        this.costBulk = init.costBulk;
        this.maxLevel = init.maxLevel;
        this.effect = init.effect;
        this.el = init.el;
    }

    /**
     * The current level of the upgrade.
     * @returns The current level of the upgrade.
     */
    get level (): E {
        return ((this ?? { data: { level: E(1) } }).data ?? { level: E(1) }).level;
    }
    set level (n: ESource) {
        this.data.level = E(n);
    }
}

/**
 * Represents the frontend READONLY for a currency. Useful for saving / data management.
 * Note: This class is created by default when creating a `currencyStatic` class. Use that instead as there are no methods here.
 */
class currency {
    /** The current value of the currency. */
    @Type(() => Decimal)
    public value: E;

    /** An array that represents upgrades and their levels. */
    @Type(() => upgradeData)
    public upgrades: upgradeData[];

    // /** A boost object that affects the currency gain. */
    // @Expose()
    // public boost: boost;

    /** Constructs a new currency object with an initial value of 0. */
    constructor () {
        this.value = E(0);
        this.upgrades = [];
        // this.boost = new boost();
    }
}

/**
 * Represents the backend for a currency in the game.
 * All the functions are here instead of the `currency` class.
 * @example
 * const currency = new currencyStatic();
 * currency.gain();
 * console.log(currency.value); // E(1)
 */
class currencyStatic {
    /** An array that represents upgrades, their costs, and their effects. */
    public upgrades: upgradeStatic[];

    /** A function that returns the pointer of the data */
    protected pointerFn: (() => currency);

    protected get pointer () { return this.pointerFn(); }

    /**
     * Updates / applies effects to the currency on load.
     */
    public onLoadData () {
        // console.log("onLoadData", this.upgrades);
        for (const upgrade of this.upgrades) {
            if (upgrade.effect) {
                upgrade.effect(upgrade.level, upgrade);
            }
        }
    }

    /** A boost object that affects the currency gain. */
    public boost: boost;

    /** The default value of the currency. */
    public defaultVal: E;

    /** The default boost of the currency. */
    public defaultBoost: E;

    /**
     * @param pointer - A function or reference that returns the pointer of the data / frontend.
     * @param defaultVal - The default value of the currency.
     * @param defaultBoost - The default boost of the currency.
     */
    constructor (pointer: Pointer<currency> = new currency(), defaultVal: ESource = E(0), defaultBoost: ESource = E(1)) {
        this.defaultVal = E(defaultVal);
        this.defaultBoost = E(defaultBoost);

        this.upgrades = [];
        this.pointerFn = typeof pointer === "function" ? pointer : () => pointer;
        this.boost = new boost(defaultBoost);

        this.pointer.value = this.defaultVal;
    }

    /**
     * The current value of the currency.
     * @returns The current value of the currency.
     */
    get value (): E {
        return this.pointer.value;
    }
    set value (value: E) {
        this.pointer.value = value;
    }

    /**
     * Resets the currency and upgrade levels.
     * @param resetCurrency - Whether to reset the currency value. Default is true.
     * @param resetUpgradeLevels - Whether to reset the upgrade levels. Default is true.
     * @example
     * currency.reset();
     * console.log(currency.value); // E(0), or the default value
     */
    public reset (resetCurrency: boolean = true, resetUpgradeLevels = true): void {
        if (resetCurrency) this.value = this.defaultVal;
        if (resetUpgradeLevels) {
            this.upgrades.forEach((upgrade) => {
                upgrade.level = E(0);
            });
        };
    }

    /**
     * The new currency value after applying the boost.
     * @param dt Deltatime / multipler in milliseconds, assuming you gain once every second. Ex. 500 = 0.5 seconds = half gain.
     * @returns What you gained.
     * @example
     * currency.gain(Math.random() * 10000); // Gain a random number between 1 and 10.
     */
    public gain (dt: ESource = 1000): E {
        const toAdd = this.boost.calculate().mul(E(dt).div(1000));
        this.pointer.value = this.pointer.value.add(toAdd);
        return toAdd;
    }

    /**
     * Adds an upgrade to the upgrades array.
     * @param upgrades1 Upgrade to add
     * @returns The upgrade object.
     */
    private pointerAddUpgrade (upgrades1: UpgradeInit): UpgradeInit {
        const upgrades2 = new upgradeData(upgrades1);
        this.pointer.upgrades.push(upgrades2);
        return upgrades1;
    };

    /**
     * Retrieves an upgrade object based on the provided id.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     */
    private pointerGetUpgrade (id?: string): upgradeData | null {
        let upgradeToGet: upgradeData | null = null;
        if (id === undefined) {
            return null;
        }
        // for (let i = 0; i < this.pointer.upgrades.length; i++) {
        //     if (this.pointer.upgrades[i].id === id) {
        //         upgradeToGet = this.pointer.upgrades[i];
        //         break;
        //     }
        // }
        upgradeToGet = this.pointer.upgrades.find((upgrade) => upgrade.id === id) ?? null;
        return upgradeToGet;
    }


    /**
     * Retrieves an upgrade object based on the provided id.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     * @example
     * const upgrade = currency.getUpgrade("healthBoost");
     * console.log(upgrade); // upgrade object
     */
    public getUpgrade (id?: string): upgradeStatic | null {
        let upgradeToGet: upgradeStatic | null = null;
        if (id === undefined) {
            return null;
        }
        // else if (typeof id == "number") {
        //     upgradeToGet = this.upgrades[id];
        // }
        else if (typeof id == "string") {
            // for (let i = 0; i < this.upgrades.length; i++) {
            //     if (this.upgrades[i].id === id) {
            //         upgradeToGet = this.upgrades[i];
            //         break;
            //     }
            // }
            upgradeToGet = this.upgrades.find((upgrade) => upgrade.id === id) ?? null;
        }
        return upgradeToGet;
    }

    /**
     * Creates upgrades. To update an upgrade, use {@link updateUpgrade} instead.
     * @param upgrades - An array of upgrade objects.
     * @param runEffectInstantly - Whether to run the effect immediately. Defaults to `true`.
     * @example
     * currenct.addUpgrade({
     *     id: "healthBoost", // The ID of the upgrade, used to retrieve it later
     *     name: "Health Boost", // The name of the upgrade, for display purposes (optional, defaults to the ID)
     *     description: "Increases health by 10.", // The description of the upgrade, for display purposes (optional, defaults to "")
     *     cost: (level) => level.mul(10), // Cost of the upgrade, 10 times the level
     *     maxLevel: 10, // Maximum level of the upgrade (optional, defaults to 1)
     *     // Effect of the upgrade (runs when the upgrade is bought, and instantly if runEffectInstantly is true)
     *     effect: (level, context) => {
     *         // Set / update the boost
     *         // health: currencyStatic
     *         health.boost.setBoost(
     *             "healthBoost",
     *             "Health Boost",
     *             "Boosts health by 2x per level.",
     *             n => n.mul(E.pow(2, level.sub(1))),
     *             2,
     *         );
     *     }
     * });
     */
    public addUpgrade (upgrades: UpgradeInit | UpgradeInit[], runEffectInstantly: boolean = true): void {
        if (!Array.isArray(upgrades)) upgrades = [upgrades];

        // Adds standard
        const upgradesDefault: upgradeStatic[] = [];
        for (let i = 0; i < upgrades.length; i++) {
            // if (!upgrades[i].id) upgrades[i].id = this.upgrades.length + i;
            this.pointerAddUpgrade(upgrades[i]);
            const currentLength = this.pointer.upgrades.length;
            const upgrade = new upgradeStatic(upgrades[i], () =>
                this.pointerGetUpgrade((upgrades as UpgradeInit[])[i].id) as upgradeData
                ??
                this.pointer.upgrades[currentLength - 1],
            );
            if (upgrade.effect && runEffectInstantly) upgrade.effect(upgrade.level, upgrade);
            upgradesDefault.push(upgrade);
        }

        this.upgrades = this.upgrades.concat(upgradesDefault);
    }

    /**
     * Updates an upgrade. To create an upgrade, use {@link addUpgrade} instead.
     * @param id - The id of the upgrade to update.
     * @param upgrade - The upgrade object to update.
     * @example
     * currency.updateUpgrade("healthBoost", {
     *     name: "New Health Boost".
     *     cost: (level) => level.mul(20),
     *     maxLevel: 20,
     *     effect: (level, context) => {
     *         console.log("Health Boost effect");
     *     }
     * });
     */
    public updateUpgrade (id: string, upgrade: UpgradeInit): void {
        const upgrade1 = this.getUpgrade(id);
        if (upgrade1 === null) return;

        upgrade1.name = upgrade.name ?? upgrade1.name;
        upgrade1.cost = upgrade.cost ?? upgrade1.cost;
        upgrade1.maxLevel = upgrade.maxLevel ?? upgrade1.maxLevel;
        upgrade1.effect = upgrade.effect ?? upgrade1.effect;
    }

    /**
     * Calculates the cost and how many upgrades you can buy
     * NOTE: This becomes very slow for higher levels. Use el=`true` to skip the sum calculation and speed up dramatically.
     * See {@link calculateUpgrade} for more information.
     * @param id - The ID or position of the upgrade to calculate.
     * @param target - The target level or quantity to reach for the upgrade. If omitted, it calculates the maximum affordable quantity.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [E(0), E(0)].
     * @example
     * // Calculate how many healthBoost upgrades you can buy and the cost of the upgrades
     * const [amount, cost] = currency.calculateUpgrade("healthBoost", 10);
     */
    // public calculateUpgrade (id: string, target: ESource = 1, el: boolean = false): [amount: E, cost: E] {
    public calculateUpgrade (id: string, target?: ESource, mode?: MeanMode, iterations?: number): [amount: E, cost: E] {
        // const [id] = args;
        const upgrade = this.getUpgrade(id);
        if (upgrade === null) {
            console.warn(`Upgrade "${id}" not found.`);
            return [E(0), E(0)];
        }
        // return calculateUpgrade(this.value, upgrade, target, el);
        return calculateUpgrade(this.value, upgrade, upgrade.level, target ? upgrade.level.add(target) : undefined, mode, iterations);
    }

    /**
     * Calculates how much is needed for the next upgrade.
     * @param id - Index or ID of the upgrade
     * @param target - How many before the next upgrade
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns The cost of the next upgrade.
     * @example
     * // Calculate the cost of the next healthBoost upgrade
     * const nextCost = currency.getNextCost("healthBoost");
     */
    public getNextCost (id: string, target: ESource = 0, mode?: MeanMode, iterations?: number): E {
        const upgrade = this.getUpgrade(id);
        if (upgrade === null) {
            console.warn(`Upgrade "${id}" not found.`);
            return E(0);
        }
        const amount = calculateUpgrade(this.value, upgrade, upgrade.level, upgrade.level.add(target), mode, iterations)[1];

        const nextCost = upgrade.cost(upgrade.level.add(amount));
        return nextCost;
    }

    /**
     * Buys an upgrade based on its ID or array position if enough currency is available.
     * @param id - The ID or position of the upgrade to buy or upgrade.
     * @param target - The target level or quantity to reach for the upgrade.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     * @example
     * // Attempt to buy up to 10 healthBoost upgrades at once
     * currency.buyUpgrade("healthBoost", 10);
     */
    public buyUpgrade (id: string, target: ESource = 1, mode?: MeanMode, iterations?: number): boolean {
        const upgrade = this.getUpgrade(id);
        if (upgrade === null) {
            console.warn(`Upgrade "${id}" not found.`);
            return false;
        }

        const [amount, cost] = this.calculateUpgrade(id, target, mode, iterations);

        // Check if affordable
        if (amount.lte(0)) {
            return false;
        }

        // Deduct the cost from available currency and increase the upgrade level
        this.pointer.value = this.pointer.value.sub(cost);

        // Set the upgrade level
        upgrade.level = upgrade.level.add(amount);

        // console.log("upgrade.level", upgrade.level);

        // Call the effect function if it exists
        upgrade.effect?.(upgrade.level, upgrade);

        // Return true to indicate a successful upgrade
        return true;
    }
}

export { currency, currencyStatic, UpgradeInit, IUpgradeStatic, upgradeData, upgradeStatic, IUpgradeData, calculateUpgrade, inverseFunctionApprox, calculateSum, MeanMode };

// Test
/*
const myCurrency = new currencyStatic();

const costFn = (level: E) => level.pow(2);

// Add an upgrade
myCurrency.addUpgrade({
    id: "healthBoost",
    name: "Health Boost",
    description: "Increases health by 10.",
    cost: costFn,
    // maxLevel: 10,
    // effect: (level) => {
    //     // console.log("Health Boost effect", level);
    // },
    el: true,
});

// Gain currency

const x = E("123.34344e3");

myCurrency.gain(x.mul(1000));

const currentTime = Date.now();

const formatFn = (n: E) => n.format(2, 9, "sc");

const calc = myCurrency.calculateUpgrade("healthBoost", undefined, "geometric", 15);

console.log({
    calc: calc.map(formatFn),
    acc: formatFn(costFn(calc[0]).div(x)),
});
console.log("Time taken:", Date.now() - currentTime, "ms");
*/