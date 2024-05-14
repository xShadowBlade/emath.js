/**
 * @file Declares the upgrade and upgradeStatic classes as well as the calculateUpgrade function.
 */
import "reflect-metadata";
import { Type, Expose } from "class-transformer";
import { E, ESource } from "../E/eMain";
import { Decimal } from "../E/e";
import type { Pointer } from "../game/Game";
import { LRUCache } from "../E/lru-cache";
import { MeanMode, inverseFunctionApprox, calculateSum } from "./numericalAnalysis";
import type { CurrencyStatic } from "./Currency";

/**
 * Calculates the cost and how many upgrades you can buy
 * Uses {@link inverseFunctionApprox} to calculate the maximum affordable quantity.
 * The priority is: `target === 1` > `costBulk` > `el`
 * @param value - The current value of the currency.
 * @param upgrade - The upgrade object to calculate.
 * @param start - The starting level of the upgrade. Defaults the current level of the upgrade.
 * @param end - The ending level or quantity to reach for the upgrade. If not provided, it will buy the maximum amount of upgrades possible (using target = Infinity).
 * @param mode - The mode/mean method to use. See {@link MeanMode}
 * @param iterations - The amount of iterations to perform. Defaults to `15`.
 * @param el - ie Endless: Flag to exclude the sum calculation and only perform binary search. (DEPRECATED, use `el` in the upgrade object instead)
 * @returns [amount, cost] - Returns the amount of upgrades you can buy and the cost of the upgrades. If you can't afford any, it returns [E(0), E(0)].
 */
function calculateUpgrade (value: ESource, upgrade: UpgradeStatic, start?: ESource, end: ESource = Infinity, mode?: MeanMode, iterations?: number, el = false): [amount: E, cost: E] {
    value = E(value);
    start = E(start ?? upgrade.level);
    end = E(end);

    const target = end.sub(start);

    // console.log("calculateUpgrade", { value, start, end, target, mode, iterations, el });
    // Special case: If target is less than 1, just return 0
    if (target.lt(0)) {
        console.warn("calculateUpgrade: Invalid target: ", target);
        return [E(0), E(0)];
    }

    // Set el from the upgrade object if it exists
    el = (typeof upgrade.el === "function" ? upgrade.el() : upgrade.el) ?? el;

    // Get the cache
    // TODO: Fix cache
    // const cached = el ? upgrade.getCached("el", start) : upgrade.getCached("sum", start, end);
    // if (cached) {
    //     console.log("cached", cached, el, start, end, upgrade.id, upgrade.level.toString());
    //     const { cost } = cached;
    //     if (value.gte(cost)) {
    //         if (el) {
    //             const cachedEL = cached as UpgradeCachedEL;
    //             return [cachedEL.level, E(0)];
    //         }
    //         const cachedSum = cached as UpgradeCachedSum;
    //         return [cachedSum.end.sub(cachedSum.start), cost];
    //     }
    // }

    // Special case: If target is 1, just check it manually
    if (target.eq(1)) {
        // console.log("target === 1");
        const cost = upgrade.cost(upgrade.level);
        const canAfford = value.gte(cost);
        let out: [E, E] = [E(0), E(0)];
        if (el) {
            // return [canAfford ? E(1) : E(0), E(0)];
            out[0] = canAfford ? E(1) : E(0);

            // Set the cache
            // upgrade.setCached("el", start, cost);
            return out;
        } else {
            out = [canAfford ? E(1) : E(0), canAfford ? cost : E(0)];

            // Set the cache
            // upgrade.setCached("sum", start, end, cost);
            return out;
        }
    }

    // Special case: If costBulk exists, use it
    if (upgrade.costBulk) {
        // console.log("costBulk");
        const [amount, cost] = upgrade.costBulk(value, upgrade.level, target);
        const canAfford = value.gte(cost);
        const out: [E, E] = [canAfford ? amount : E(0), canAfford && !el ? cost : E(0)];

        // Set the cache

        // TODO
        // if (el) {
        //     upgrade.setCached("el", start, cost);
        // } else {
        //     upgrade.setCached("sum", start, end, cost);
        // }

        return out;
    }

    // Special case for endless upgrades
    if (el) {
        // console.log("el");
        const costTargetFn = (level: E): E => upgrade.cost(level.add(start));
        const maxLevelAffordable = E.min(end, inverseFunctionApprox(costTargetFn, value, mode, iterations).value.floor());
        // const cost = upgrade.cost(maxLevelAffordable);
        const cost = E(0);

        // Set the cache
        // upgrade.setCached("el", start, cost);
        return [maxLevelAffordable, cost];
    }

    // Binary Search with sum calculation
    // console.log("binary search");
    const maxLevelAffordable = inverseFunctionApprox(
        (x: E) => calculateSum(upgrade.cost, x, start),
        value,
        mode,
        iterations,
    ).value.floor()
        .min(start.add(target).sub(1));
    const cost = calculateSum(upgrade.cost, maxLevelAffordable, start);

    // console.log({ maxLevelAffordable, cost });
    const maxLevelAffordableActual = maxLevelAffordable.sub(start).add(1).max(0);

    // console.log({ maxLevelAffordable, maxLevelAffordableActual, cost });
    // Set the cache
    // upgrade.setCached("sum", start, end, cost);
    return [maxLevelAffordableActual, cost];
}

/**
 * Interface for initializing an upgrade.
 */
interface UpgradeInit {
    /**
     * The ID of the upgrade.
     * Used to retrieve the upgrade later.
     */
    readonly id: string;

    /** The name of the upgrade. Defaults to the ID. */
    name?: string;

    /**
     * The description of the upgrade.
     * Can be a string or a function that returns a string.
     * Made into a getter function to allow for dynamic descriptions.
     * Note: The use of a function is deprecated. Use a getter function instead.
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
    description?: ((...args: any[]) => string) | string;

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
    cost: (level: E) => E;

    /**
     * The cost of buying a bulk of upgrades at a certain level. (inverse of cost function).
     * EL is automatically applied to the cost.
     * WARNING: In v8.x.x and above, the return order is [amount, cost] instead of [cost, amount].
     * @param level - The current level of the upgrade.
     * @param target - The target level of the upgrade. If you want to buy the maximum amount of upgrades possible, this will be `Infinity`.
     * @returns [amount, cost] - The cost of the upgrades and the amount of upgrades you can buy. If you can't afford any, it returns [E(0), E(0)].
     * @example
     * // A cost function that returns the sum of the levels and the target.
     * // In this example, the cost function is twice the level. The cost bulk function is the sum of the levels and the target.
     * // -target^2 + target + level^2 + level
     * (level, target) => target.pow(2).mul(-1).add(target).add(level.pow(2)).add(level)
     */
    costBulk?: (currencyValue: E, level: E, target: E) => [amount: E, cost: E];

    /**
     * The maximum level of the upgrade.
     * Warning: If not set, the upgrade will not have a maximum level and can continue to increase indefinitely.
     */
    maxLevel?: E;

    /**
     * The effect of the upgrade. This runs when the upgrade is bought, and instantly if `runEffectInstantly` is true.
     * @param level - The current level of the upgrade.
     * @param upgradeContext - The upgrade object that the effect is being run on.
     * @param currencyContext - The currency static class that the upgrade is being run on.
     */
    effect?: (level: E, upgradeContext: UpgradeStatic, currencyContext: CurrencyStatic) => void;

    /**
     * Endless / Everlasting: Flag to exclude the sum calculation and only perform binary search.
     * Note: A function value is also allowed, and will be evaluated when the upgrade is bought or calculated.
     * (but you should use a getter function instead)
     */
    el?: boolean | (() => boolean);

    // Below are types that are automatically added
    /**
     * The default level of the upgrade.
     * Automatically set to `1` if not provided.
     */
    level?: E;
};

/**
 * Infers the id type of an upgrade array
 * @template U - The upgrade array
 * @example
 * const testUpg = [
 *     {
 *         id: "upgId1",
 *         cost: (level: E): E => level.mul(10),
 *     },
 *     {
 *         id: "upgId2",
 *         cost: (level: E): E => level.mul(20),
 *     },
 * ] as const satisfies UpgradeInit[]
 *
 * type test = UpgradeInitArrayType<typeof testUpg> // "upgId1" | "upgId2"
 */
type UpgradeInitArrayType<U extends UpgradeInit[]> = U[number]["id"] extends never ? string : U[number]["id"];


/**
 * Interface for an upgrade.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
interface IUpgradeStatic extends Omit<UpgradeInit, "level"> {
    maxLevel?: E;
    name: string;
    description: string;
    defaultLevel: E;

    /**
     * A function that returns a description of the upgrade.
     * @param args - Arguments to pass to the description function.
     * @returns The description of the upgrade.
     */
    descriptionFn: (...args: any[]) => string;
}

/**
 * Converts an upgrade init to a static upgrade.
 * @deprecated - This is no longer used
 */
type ConvertInitToStatic<T extends UpgradeInit> = Omit<T, "level"> & { defaultLevel: E; descriptionFn: (...args: any[]) => string };

/**
 * Interface for upgrade data.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
type IUpgradeData = Pick<UpgradeInit, "id" | "level">

/**
 * Represents a decimal number in the form of a string. `sign/mag/layer`
 * @deprecated Use an object index instead.
 */
type DecimalJSONString = `${number}/${number}/${number}`;

/**
 * Represents the name of an upgrade (EL) that is cached (for map keys fast lookup instead of looping through all upgrades).
 * In the form of: "el/${level: {@link DecimalJSONString}}"
 * @deprecated Use an object index instead.
 */
type UpgradeCachedELName = `el/${DecimalJSONString}`;

/**
 * Represents the name of an upgrade (Sum) that is cached (for map keys fast lookup instead of looping through all upgrades).
 * In the form of: "sum/${start: {@link DecimalJSONString}}/${end: {@link DecimalJSONString}}"
 * @deprecated Use an object index instead.
 */
type UpgradeCachedSumName = `sum/${DecimalJSONString}/${DecimalJSONString}`;

/**
 * Converts a decimal number to a JSON string.
 * @deprecated Use an object index instead.
 * @param n - The decimal number to convert.
 * @returns The decimal number in the form of a string. `sign/mag/layer` See {@link DecimalJSONString}
 */
function decimalToJSONString (n: ESource): DecimalJSONString {
    n = E(n);
    return `${n.sign}/${n.mag}/${n.layer}`;
}

/**
 * Converts an upgrade to a cache name (sum)
 * @deprecated Use an object index instead.
 * @param start - The starting level of the upgrade.
 * @param end - The ending level or quantity to reach for the upgrade.
 * @returns The name of the upgrade (Sum) that is cached. See {@link UpgradeCachedSumName}
 */
function upgradeToCacheNameSum (start: ESource, end: ESource): UpgradeCachedSumName {
    // return `${upgrade.id}/sum/${start.toString()}/${end.toString()}/${cost.toString()}` as UpgradeCachedSumName;
    return `sum/${decimalToJSONString(start)}/${decimalToJSONString(end)}}` as UpgradeCachedSumName;
}

/**
 * Converts an upgrade to a cache name (EL)
 * @deprecated Use an object index instead.
 * @param level - The level of the upgrade.
 * @returns The name of the upgrade (EL) that is cached. See {@link UpgradeCachedELName}
 */
function upgradeToCacheNameEL (level: ESource): UpgradeCachedELName {
    // return `${upgrade.id}/el/${level.toString()}` as UpgradeCachedELName;
    return `el/${decimalToJSONString(level)}`;
}

/**
 * Interface for an upgrade that is cached.
 * @template EL - Whether the upgrade is EL or not.
 */
interface UpgradeCached<EL extends boolean = false> extends Pick<UpgradeInit, "id" | "el"> {
    el: EL;
}

/** Interface for an upgrade that is cached. (EL) */
interface UpgradeCachedEL extends UpgradeCached<true>, Pick<UpgradeInit, "level"> {
    level: E;

    /** The cost of the upgrade at level (el) */
    cost: E;
}

/** Interface for an upgrade that is cached. (Not EL) */
interface UpgradeCachedSum extends UpgradeCached {
    start: E;
    end: E;

    /**
     * The cost of the upgrade from start to end. (summation)
     */
    cost: E;
}

/**
 * Represents the frontend for an upgrade.
 * @template N - The ID of the upgrade. See {@link UpgradeInit}
 */
class UpgradeData implements IUpgradeData {
    @Expose() public id: string;
    @Type(() => Decimal) public level;

    /**
     * Constructs a new upgrade object with an initial level of 1 (or the provided level)
     * @param init - The upgrade object to initialize.
     */
    constructor (init: Pick<UpgradeInit, "id" | "level">) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        init = init ?? {}; // class-transformer bug
        this.id = init.id;
        this.level = init.level ? E(init.level) : E(1);
    }
}

/**
 * Represents the backend for an upgrade.
 */
class UpgradeStatic implements IUpgradeStatic {
    public id; name; cost; costBulk; maxLevel; effect; el?; descriptionFn; defaultLevel: E;

    /** The default size of the cache. Should be one less than a power of 2. */
    public static cacheSize = 63;

    /** The cache to store the values of certain upgrade levels */
    public cache: LRUCache<UpgradeCachedELName | UpgradeCachedSumName, UpgradeCachedEL | UpgradeCachedSum>;

    /** @returns The data of the upgrade. */
    protected dataPointerFn: () => UpgradeData;

    /** @returns The data of the upgrade. */
    public get data (): UpgradeData {
        return this.dataPointerFn();
    }

    public get description (): string {
        return this.descriptionFn();
    }

    /**
     * The current level of the upgrade.
     * @returns The current level of the upgrade.
     */
    get level (): E {
        // many fallbacks for some reason
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return ((this ?? { data: { level: E(1) } }).data ?? { level: E(1) }).level;
    }
    set level (n: ESource) {
        this.data.level = E(n);
    }

    /**
     * Constructs a new static upgrade object.
     * @param init - The upgrade object to initialize.
     * @param dataPointer - A function or reference that returns the pointer of the data / frontend.
     * @param cacheSize - The size of the cache. Should be one less than a power of 2. See {@link cache}
     */
    constructor (init: UpgradeInit, dataPointer: Pointer<UpgradeData>, cacheSize?: number) {
        const data = (typeof dataPointer === "function" ? dataPointer() : dataPointer);
        this.dataPointerFn = typeof dataPointer === "function" ? dataPointer : (): UpgradeData => data;
        this.cache = new LRUCache(cacheSize ?? UpgradeStatic.cacheSize);
        this.id = init.id;
        this.name = init.name ?? init.id;
        this.descriptionFn = init.description ? (typeof init.description === "function" ? init.description : (): string => init.description as string) : (): string => "";
        this.cost = init.cost;
        this.costBulk = init.costBulk;
        this.maxLevel = init.maxLevel;
        this.effect = init.effect;
        this.el = init.el;
        this.defaultLevel = init.level ?? E(1);
    }

    /**
     * Gets the cached data of the upgrade.
     * @param type - The type of the cache. "sum" or "el"
     * @param start - The starting level of the upgrade.
     * @param end - The ending level or quantity to reach for the upgrade.
     * @returns The data of the upgrade.
     */
    public getCached (type: "sum", start: ESource, end: ESource): UpgradeCachedSum | undefined;
    public getCached (type: "el", start: ESource): UpgradeCachedEL | undefined;
    public getCached (type: "sum" | "el", start: ESource, end?: ESource): UpgradeCachedEL | UpgradeCachedSum | undefined {
        if (type === "sum") {
            return this.cache.get(upgradeToCacheNameSum(start, end ?? E(0)));
        } else {
            return this.cache.get(upgradeToCacheNameEL(start));
        }
    }

    /**
     * Sets the cached data of the upgrade.
     * @param type - The type of the cache. "sum" or "el"
     * @param start - The starting level of the upgrade.
     * @param end - The ending level or quantity to reach for the upgrade.
     * @param cost - The cost of the upgrade.
     */
    public setCached(type: "sum", start: ESource, end: ESource, cost: ESource): UpgradeCachedSum;
    public setCached(type: "el", level: ESource, cost: ESource): UpgradeCachedEL;
    public setCached (type: "sum" | "el", start: ESource, endOrStart: ESource, costSum?: ESource): UpgradeCachedEL | UpgradeCachedSum {
        const data = type === "sum" ? {
            id: this.id,
            el: false,
            start: E(start),
            end: E(endOrStart),
            cost: E(costSum),
        } : {
            id: this.id,
            el: true,
            level: E(start),
            cost: E(endOrStart),
        };

        if (type === "sum") {
            this.cache.set(upgradeToCacheNameSum(start, endOrStart), data as UpgradeCachedSum);
        } else {
            this.cache.set(upgradeToCacheNameEL(start), data as UpgradeCachedEL);
        }

        return data as UpgradeCachedEL | UpgradeCachedSum;
    }
}

export { IUpgradeStatic, IUpgradeData, UpgradeInit, UpgradeData, UpgradeStatic, UpgradeInitArrayType, ConvertInitToStatic, calculateUpgrade };
export { DecimalJSONString, UpgradeCachedELName, UpgradeCachedSumName, decimalToJSONString, upgradeToCacheNameEL, UpgradeCached, UpgradeCachedEL, UpgradeCachedSum };