/**
 * @file Declares the currency class and its related classes (upgrade)
 */
import "reflect-metadata"; // Required for class-transformer
import { Type, Expose } from "class-transformer";
import { E, ESource } from "../E/eMain";
import { Decimal } from "../E/e";
import type { Pointer } from "../game/game";

import { Boost } from "./boost";
import { LRUCache } from "../E/lru-cache";
import { MeanMode, inverseFunctionApprox, calculateSum } from "./numericalAnalysis";

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
function calculateUpgrade (value: ESource, upgrade: UpgradeStatic<string>, start?: ESource, end?: ESource, mode?: MeanMode, iterations?: number, el: boolean = false): [amount: E, cost: E] {
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
        // const cost = upgrade.cost(maxLevelAffordable);
        const cost = E(0);
        return [maxLevelAffordable, cost];
    }

    // Binary Search with sum calculation
    const maxLevelAffordable = inverseFunctionApprox(
        (level: E) => calculateSum(upgrade.cost, level, start),
        value,
        mode,
        iterations,
    ).value.floor();
    const cost = calculateSum(upgrade.cost, maxLevelAffordable, start);
    return [maxLevelAffordable, cost];
}

/**
 * Interface for initializing an upgrade.
 * @template N - The ID of the upgrade.
 */
interface UpgradeInit<N extends string = string> {
    /**
     * The ID of the upgrade.
     * Used to retrieve the upgrade later.
     */
    readonly id: N,

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
    effect?: (level: E, context: UpgradeStatic<N>) => void,

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

/**
 * Interface for an upgrade.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
interface IUpgradeStatic<N extends string = string> extends Omit<UpgradeInit<N>, "level"> {
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

/**
 * Interface for upgrade data.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
interface IUpgradeData<N extends string = string> extends Pick<UpgradeInit<N>, "id" | "level"> {
    // id: string,
    // level: E
}

/**
 * Represents a decimal number in the form of a string. `sign/mag/layer`
 */
type DecimalJSONString = `${number}/${number}/${number}`;
/**
 * Represents the name of an upgrade (EL) that is cached (for map keys fast lookup instead of looping through all upgrades).
 * In the form of: "${id}/el/${level: {@link DecimalJSONString}}"
 */
type UpgradeCachedELName = `${string}/el/${DecimalJSONString}`;
/**
 * Represents the name of an upgrade (Sum) that is cached (for map keys fast lookup instead of looping through all upgrades).
 * In the form of: "${id}/sum/${start: {@link DecimalJSONString}}/${end: {@link DecimalJSONString}}"
 */
type UpgradeCachedSumName = `${string}/sum/${DecimalJSONString}/${DecimalJSONString}`;

/**
 * Converts a decimal number to a JSON string.
 * @param n - The decimal number to convert.
 * @returns The decimal number in the form of a string. `sign/mag/layer` See {@link DecimalJSONString}
 */
function decimalToJSONString (n: ESource): DecimalJSONString {
    n = E(n);
    return `${n.sign}/${n.mag}/${n.layer}` as DecimalJSONString;
}

/**
 * Converts an upgrade to a cache name (sum)
 * @param upgrade - The upgrade to convert or id of the upgrade.
 * @param start - The starting level of the upgrade.
 * @param end - The ending level or quantity to reach for the upgrade.
 * @returns The name of the upgrade (Sum) that is cached. See {@link UpgradeCachedSumName}
 */
function upgradeToCacheNameSum (upgrade: UpgradeStatic<string> | string, start: ESource, end: ESource): UpgradeCachedSumName {
    // return `${upgrade.id}/sum/${start.toString()}/${end.toString()}/${cost.toString()}` as UpgradeCachedSumName;
    const id = typeof upgrade === "string" ? upgrade : upgrade.id;
    return `${id}/sum/${decimalToJSONString(start)}/${decimalToJSONString(end)}}` as UpgradeCachedSumName;
}

/**
 * Converts an upgrade to a cache name (EL)
 * @param upgrade - The upgrade to convert or id of the upgrade.
 * @param level - The level of the upgrade.
 * @returns The name of the upgrade (EL) that is cached. See {@link UpgradeCachedELName}
 */
function upgradeToCacheNameEL (upgrade: UpgradeStatic<string> | string, level: ESource): UpgradeCachedELName {
    // return `${upgrade.id}/el/${level.toString()}` as UpgradeCachedELName;
    const id = typeof upgrade === "string" ? upgrade : upgrade.id;
    return `${id}/el/${decimalToJSONString(level)}` as UpgradeCachedELName;
}

/** Interface for an upgrade that is cached. */
// interface UpgradeCached<el extends boolean = false> extends Pick<UpgradeInit, "id" | "el">{
//     el: el,
// }

/** Interface for an upgrade that is cached. (EL) */
// interface UpgradeCachedEL extends Pick<UpgradeInit, "id" | "el" | "level"> {
//     el: true,
//     level: E,

//     /** The cost of the upgrade at level (el) */
//     cost: E,
// }

/** Interface for an upgrade that is cached. (Not EL) */
// interface UpgradeCachedSum extends Pick<UpgradeInit, "id" | "el" | "level"> {
//     el: false,
//     level: E,

//     /** The cost of the upgrade at level */
//     cost: E,
// }

/** Represents the frontend for an upgrade. */
class UpgradeData<N extends string = string> implements IUpgradeData<N> {
    @Expose() public id: N;
    @Type(() => Decimal) public level;

    constructor (init: Pick<UpgradeInit<N>, "id" | "level">) {
        init = init ?? {}; // class-transformer bug
        this.id = init.id;
        this.level = init.level ? E(init.level) : E(1);
    }
}

/** Represents the backend for an upgrade. */
class UpgradeStatic<N extends string = string> implements IUpgradeStatic<N> {
    public id: N; name; cost; costBulk; maxLevel; effect; el?; descriptionFn;

    public get description (): string {
        return this.descriptionFn();
    }

    /**
     * @returns The data of the upgrade.
     */
    protected dataPointerFn: () => UpgradeData<N>;

    public get data (): UpgradeData<N> {
        return this.dataPointerFn();
    }

    /**
     * @param init - The upgrade object to initialize.
     * @param dataPointer - A function or reference that returns the pointer of the data / frontend.
     */
    constructor (init: UpgradeInit<N>, dataPointer: Pointer<UpgradeData<N>>) {
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
        // many fallbacks for some reason
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
class Currency {
    /** The current value of the currency. */
    @Type(() => Decimal)
    public value: E;

    /** An array that represents upgrades and their levels. */
    @Type(() => UpgradeData)
    public upgrades: UpgradeData<string>[];

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
 * @template U - An array that represents the names of the upgrades.
 * @example
 * const currency = new currencyStatic();
 * currency.gain();
 * console.log(currency.value); // E(1)
 */
class CurrencyStatic<U extends string[] = string[]> {
    /** An array that represents upgrades, their costs, and their effects. */
    // public upgrades: upgradeStatic[];
    public upgrades: Record<U[number] | string, UpgradeStatic<U[number]>>;
    // public upgrades: {
    //     [id: string]: UpgradeStatic;
    //     [Symbol.iterator]: IterableIterator<UpgradeStatic>;
    // };

    /** A cache for upgrades. */
    // protected upgradeCache = new LRUCache<string, UpgradeCached>(100);
    protected upgradeCache: LRUCache<UpgradeCachedELName | UpgradeCachedSumName, undefined>;

    /** The size of the cache. Should be one less than a power of 2. See {@link upgradeCache} */
    protected static cacheSize: number = 127;

    /** A function that returns the pointer of the data */
    protected pointerFn: (() => Currency);

    /** @returns The pointer of the data. */
    protected get pointer () { return this.pointerFn(); }

    /**
     * Updates / applies effects to the currency on load.
     */
    public onLoadData () {
        // console.log("onLoadData", this.upgrades);
        // for (const upgrade of this.upgrades) {
        //     if (upgrade.effect) {
        //         upgrade.effect(upgrade.level, upgrade);
        //     }
        // }
        for (const upgrade of Object.values(this.upgrades)) {
            upgrade.effect?.(upgrade.level, upgrade);
        }
    }

    /** A boost object that affects the currency gain. */
    public boost: Boost;

    /** The default value of the currency. */
    public readonly defaultVal: E;

    /** The default boost of the currency. */
    public readonly defaultBoost: E;

    /**
     * @param pointer - A function or reference that returns the pointer of the data / frontend.
     * @param upgrades - An array of upgrade objects.
     * @param defaults - The default value and boost of the currency.
     */
    constructor (pointer: Pointer<Currency> = new Currency(), upgrades?: UpgradeInit<U[number]>[], defaults = { defaultVal: E(0), defaultBoost: E(1) }) {
        // this.defaultVal = E(defaultVal);
        // this.defaultBoost = E(defaultBoost);
        this.defaultVal = defaults.defaultVal;
        this.defaultBoost = defaults.defaultBoost;

        // this.upgrades = [];
        // @ts-expect-error - Properties are added in the next line
        this.upgrades = {
            // *[Symbol.iterator] () {
            //     for (const upgrade of Object.values(this)) {
            //         yield upgrade;
            //     }
            // },
        };

        if (upgrades) this.addUpgrade(upgrades);

        this.upgrades = this.upgrades as Record<U[number] | string, UpgradeStatic<U[number]>>;

        this.pointerFn = typeof pointer === "function" ? pointer : () => pointer;
        this.boost = new Boost(this.defaultBoost);
        this.upgradeCache = new LRUCache(CurrencyStatic.cacheSize);

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
            // this.upgrades.forEach((upgrade) => {
            //     upgrade.level = E(0);
            // });
            for (const upgrade of Object.values(this.upgrades)) {
                upgrade.level = E(0);
            }
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
    private pointerAddUpgrade (upgrades1: UpgradeInit<U[number]>): UpgradeInit<U[number]> {
        const upgrades2 = new UpgradeData(upgrades1);
        this.pointer.upgrades.push(upgrades2);
        return upgrades1;
    };

    /**
     * Retrieves an upgrade object based on the provided id.
     * @param id - The id of the upgrade to retrieve.
     * @returns The upgrade object if found, otherwise null.
     */
    private pointerGetUpgrade (id?: string): UpgradeData<U[number]> | null {
        let upgradeToGet: UpgradeData<U[number]> | null = null;
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
    // public getUpgrade (id: string): UpgradeStatic | null {
    public getUpgrade (id: string | U[number]): typeof id extends U[number] ? UpgradeStatic<U[number]> : UpgradeStatic<U[number]> | null {
        // let upgradeToGet: UpgradeStatic | null = null;
        // if (id === undefined) {
        //     return null;
        // }
        // // else if (typeof id == "number") {
        // //     upgradeToGet = this.upgrades[id];
        // // }
        // else if (typeof id == "string") {
        //     // for (let i = 0; i < this.upgrades.length; i++) {
        //     //     if (this.upgrades[i].id === id) {
        //     //         upgradeToGet = this.upgrades[i];
        //     //         break;
        //     //     }
        //     // }

        //     upgradeToGet = this.upgrades.find((upgrade) => upgrade.id === id) ?? null;
        // }
        // return upgradeToGet;

        return this.upgrades[id] ?? null;
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
    public addUpgrade (upgrades: UpgradeInit<string> | UpgradeInit<string>[] | Record<string, UpgradeInit<string>>, runEffectInstantly: boolean = true): void {
        // if (!Array.isArray(upgrades)) upgrades = [upgrades];
        if (!Array.isArray(upgrades)) {
            if (typeof upgrades === "object") {
                upgrades = Object.values(upgrades);
            } else {
                upgrades = [upgrades];
            }
        }

        // Adds standard
        // const upgradesDefault: UpgradeStatic[] = [];
        // for (let i = 0; i < upgrades.length; i++) {
        //     // if (!upgrades[i].id) upgrades[i].id = this.upgrades.length + i;
        //     this.pointerAddUpgrade(upgrades[i]);
        //     const currentLength = this.pointer.upgrades.length;
        //     const upgrade = new UpgradeStatic(upgrades[i], () =>
        //         this.pointerGetUpgrade((upgrades as UpgradeInit[])[i].id) as UpgradeData
        //         ??
        //         this.pointer.upgrades[currentLength - 1],
        //     );
        //     if (upgrade.effect && runEffectInstantly) upgrade.effect(upgrade.level, upgrade);
        //     upgradesDefault.push(upgrade);
        // }

        // this.upgrades = this.upgrades.concat(upgradesDefault);

        // Adds standard (object instead of array)
        const upgradesDefault: Record<string, UpgradeStatic<string>> = {};
        for (const upgrade of upgrades) {
            // if (!upgrades[i].id) upgrades[i].id = this.upgrades.length + i;
            this.pointerAddUpgrade(upgrade);
            const currentLength = this.pointer.upgrades.length;
            const upgrade1 = new UpgradeStatic(upgrade, () =>
                this.pointerGetUpgrade(upgrade.id) as UpgradeData<string>
                ??
                this.pointer.upgrades[currentLength - 1],
            );
            if (upgrade1.effect && runEffectInstantly) upgrade1.effect(upgrade1.level, upgrade1);
            upgradesDefault[upgrade.id] = upgrade1;
        }
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
    public updateUpgrade (id: string, upgrade: UpgradeInit<string>): void {
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
     * @param target - The target level or quantity to reach for the upgrade. See the argument in {@link calculateUpgrade}.
     * @param mode - See the argument in {@link calculateUpgrade}.
     * @param iterations - See the argument in {@link calculateUpgrade}.
     * @returns Returns true if the purchase or upgrade is successful, or false if there is not enough currency or the upgrade does not exist.
     * @example
     * // Attempt to buy up to 10 healthBoost upgrades at once
     * currency.buyUpgrade("healthBoost", 10);
     */
    public buyUpgrade (id: string, target?: ESource, mode?: MeanMode, iterations?: number): boolean {
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

        // Deduct the cost from available currency
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

export { Currency as currency, CurrencyStatic as currencyStatic, UpgradeInit, IUpgradeStatic, UpgradeData as upgradeData, UpgradeStatic as upgradeStatic, IUpgradeData };
// export { MeanMode, calculateUpgrade, inverseFunctionApprox, calculateSum, calculateSumLoop, calculateSumApprox };

// Test
/*
const costFn = (level: E) => level.pow(2);

const testUpgrade: UpgradeInit = {
    id: "healthBoost",
    name: "Health Boost",
    description: "Increases health by 10.",
    cost: costFn,
    // maxLevel: 10,
    // effect: (level) => {
    //     // console.log("Health Boost effect", level);
    // },
    el: true,
};

const myCurrency = new CurrencyStatic(undefined, [
    {
        id: "healthBoost",
        name: "Health Boost",
        description: "Increases health by 10.",
        cost: costFn,
        // maxLevel: 10,
        // effect: (level) => {
        //     // console.log("Health Boost effect", level);
        // },
        el: true,
    },
]);

// Add an upgrade
// myCurrency.addUpgrade({
//     id: "healthBoost",
//     name: "Health Boost",
//     description: "Increases health by 10.",
//     cost: costFn,
//     // maxLevel: 10,
//     // effect: (level) => {
//     //     // console.log("Health Boost effect", level);
//     // },
//     el: true,
// });

// Gain currency

// console.log("calc sum", calculateSum(costFn, E(100)));
calculateSum(costFn, E(1000), 0, "1e-4");

const x = E("123.34344e3");

const formatFn = (n: E) => n.format(5, 9, "sc");

for (let i = 0; i < 3; i++) {
    myCurrency.gain(x.mul(1000));

    const newCurrency = myCurrency.value;

    const calc = myCurrency.calculateUpgrade("healthBoost", undefined, "geometric", 15);

    myCurrency.buyUpgrade("healthBoost");

    const upgrade = myCurrency.getUpgrade("healthBoost");

    console.log({
        calc: calc.map(formatFn),
        acc: formatFn(costFn(upgrade?.level ?? E(1)).div(newCurrency)),
    });

    console.log({
        value: formatFn(myCurrency.value),
        level: upgrade?.level,
    });
}

*/